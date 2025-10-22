import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import path from "path";
import fs from "fs";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const advisory = await prisma.advisories.findUnique({
    where: { idAdvisory: id },
    include: {
      teacher: {
        select: {
          fullName: true,
          cveMaestro: true,
        },
      },
      student: {
        select: {
          fullName: true,
          expedient: true,
          semester: true,
          career: {
            select: { name: true, shortName: true },
          },
        },
      },
      subject: {
        select: { name: true },
      },
    },
  });

  if (!advisory) {
    return NextResponse.json({ error: "Asesoría no encontrada" }, { status: 404 });
  }

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // carta
  const { width, height } = page.getSize();

  const titleFontSize = 14;
  const subtitleFontSize = 12;
  const textFontSize = 10;
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const logoPath = path.resolve("./public/logo.jpg");
  let logoBytes: Buffer | null = null;
  try {
    logoBytes = fs.readFileSync(logoPath);
  } catch (e) {
    logoBytes = null;
  }
  if (logoBytes) {
    const logoImage = await pdfDoc.embedJpg(logoBytes);
    const logoDims = logoImage.scale(0.2);
    page.drawImage(logoImage, {
      x: 50,
      y: height - 50 - logoDims.height,
      width: logoDims.width,
      height: logoDims.height,
    });
    page.drawImage(logoImage, {
      x: width - 50 - logoDims.width,
      y: height - 50 - logoDims.height,
      width: logoDims.width,
      height: logoDims.height,
    });
  }

  const title1 = "UNIVERSIDAD AUTONOMA DE QUERETARO";
  const title2 = "FACULTAD DE INFORMATICA";
  const title1Width = boldFont.widthOfTextAtSize(title1, titleFontSize);
  const title2Width = boldFont.widthOfTextAtSize(title2, subtitleFontSize);
  page.drawText(title1, {
    x: (width - title1Width) / 2,
    y: height - 90,
    size: titleFontSize,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(title2, {
    x: (width - title2Width) / 2,
    y: height - 110,
    size: subtitleFontSize,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  function wrapText(text: string, maxWidth: number, fnt: any, fSize: number) {
    if (!text) return [];
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";
    for (const word of words) {
      const testLine = currentLine ? currentLine + " " + word : word;
      if (fnt.widthOfTextAtSize(testLine, fSize) <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        if (fnt.widthOfTextAtSize(word, fSize) > maxWidth) {
          let partial = "";
          for (const ch of word) {
            const testPartial = partial + ch;
            if (fnt.widthOfTextAtSize(testPartial, fSize) <= maxWidth) {
              partial = testPartial;
            } else {
              if (partial) lines.push(partial);
              partial = ch;
            }
          }
          if (partial) currentLine = partial;
          else currentLine = "";
        } else {
          currentLine = word;
        }
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  function toTitleCase(str: string) {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const datos = [
    { label: "Nombre del alumno: ", value: advisory.student.fullName ?? "" },
    { label: "Expediente: ", value: advisory.student.expedient ?? "" },
    { label: "Semestre: ", value: String(advisory.student.semester ?? "") },
    {
      label: "Carrera: ",
      value: `${advisory.student.career.name ?? ""} ${advisory.student.career.shortName ?? ""}`.trim(),
    },
    { label: "Nombre del Maestro: ", value: toTitleCase(advisory.teacher.fullName ?? "") },
    { label: "Clave del Maestro: ", value: advisory.teacher.cveMaestro ?? "" },
    { label: "Materia: ", value: advisory.subject.name ?? "" },
    { label: "Tema de la asesoría: ", value: advisory.topic ?? "No especificado" },
    {
      label: "Fecha de Asesoría: ",
      value: advisory.advisoryDate ? advisory.advisoryDate.toLocaleDateString() : "No especificada",
    },
    { label: "Tipo de Asesoría: ", value: "Presencial" },
  ];

  function drawLabelAndValue(label: string, value: string, y: number) {
    const gap = 8;
    const labelWidth = boldFont.widthOfTextAtSize(label, textFontSize);
    const valueWidth = font.widthOfTextAtSize(value, textFontSize);
    const totalWidth = labelWidth + gap + valueWidth;
    const xStart = (width - totalWidth) / 2;
    page.drawText(label, {
      x: xStart,
      y,
      size: textFontSize,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(value, {
      x: xStart + labelWidth + gap,
      y,
      size: textFontSize,
      font: font,
      color: rgb(0, 0, 0),
    });
  }

  let yPosition = height - 170;
  const lineSpacing = 28;
  const wrapMax = width - 140;

  for (const item of datos) {
    if (item.label.startsWith("Tema")) {
      const labelWidth = boldFont.widthOfTextAtSize(item.label, textFontSize);
      const labelX = (width - labelWidth) / 2;
      page.drawText(item.label, {
        x: labelX,
        y: yPosition,
        size: textFontSize,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      yPosition -= lineSpacing;
      const lines = wrapText(item.value, wrapMax, font, textFontSize);
      for (const line of lines) {
        const lw = font.widthOfTextAtSize(line, textFontSize);
        page.drawText(line, {
          x: (width - lw) / 2,
          y: yPosition,
          size: textFontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
        yPosition -= lineSpacing;
      }
      yPosition -= 10;
    } else {
      drawLabelAndValue(item.label, item.value, yPosition);
      yPosition -= lineSpacing;
    }
  }

  const firmaY = 50;
  const leftX = 100;
  const rightX = width - 220;
  const lineWidth = 130;
  const lineOffset = 18;

  page.drawText("_".repeat(30), {
    x: leftX,
    y: firmaY + lineOffset,
    size: textFontSize,
    font: font,
    color: rgb(0, 0, 0),
  });
  page.drawText("_".repeat(30), {
    x: rightX,
    y: firmaY + lineOffset,
    size: textFontSize,
    font: font,
    color: rgb(0, 0, 0),
  });

  page.drawText(toTitleCase(advisory.teacher.fullName ?? ""), {
    x: leftX,
    y: firmaY,
    size: textFontSize,
    font: font,
    color: rgb(0, 0, 0),
  });
  page.drawText((advisory.student.fullName ?? ""), {
    x: rightX,
    y: firmaY,
    size: textFontSize,
    font: font,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=Asesoria-${advisory.student.expedient ?? "asesoria"}.pdf`,
    },
  });
}