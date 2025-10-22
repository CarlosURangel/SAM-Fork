import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verify } from "jsonwebtoken";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const cookie = req.cookies.get("Auth_SAM");
    const authToken = cookie?.value;

    if (!authToken) {
      return NextResponse.json(
        { error: "Token no proporcionado" },
        { status: 401 }
      );
    }
    const payload = verify(authToken, process.env.JWT_SECRET!);
    const cveMaestro =
      typeof payload === "object" ? payload.cveMaestro : undefined;
    const cveAdmin = typeof payload === "object" ? payload.cveAdmin : undefined;

    if (!cveMaestro && !cveAdmin) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const { fullName, expedient, semester, idCareer, cveMaestroBody } =
      await req.json();

    if (typeof fullName !== "string" || fullName.length < 8) {
      return NextResponse.json(
        { error: "El nombre completo debe tener al menos 8 caracteres." },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(expedient)) {
      return NextResponse.json(
        { error: "El expediente debe ser un número de 6 dígitos" },
        { status: 400 }
      );
    }

    const semestreNum = Number(semester);
    if (isNaN(semestreNum) || semestreNum < 1 || semestreNum > 8) {
      return NextResponse.json(
        { error: "El semestre debe ser un número entre 1 y 8." },
        { status: 400 }
      );
    }

    if (!idCareer) {
      return NextResponse.json(
        { error: "Debe seleccionar una carrera." },
        { status: 400 }
      );
    }

    const existingStudent = await prisma.students.findFirst({
      where: {
        OR: [{ expedient: expedient }, { fullName: fullName }],
      },
    });

    if (existingStudent) {
      if (existingStudent.expedient === expedient) {
        return NextResponse.json(
          {
            error: "El expediente ingresado ya existe.",
          },
          { status: 400 }
        );
      }
      if (existingStudent.fullName === fullName) {
        return NextResponse.json(
          { error: "Ya existe un alumno con ese nombre." },
          { status: 400 }
        );
      }
    }

    const student = await prisma.students.create({
      data: {
        fullName,
        expedient,
        semester: semestreNum,
        idCareer,
        cveMaestro: cveMaestro ?? cveMaestroBody,
      },
    });
    return NextResponse.json(student, { status: 201 });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = (error.meta as { target?: string[] })?.target;
        if (target?.includes("expedient")) {
          return NextResponse.json(
            { error: "El expediente ya existe." },
            { status: 409 }
          );
        }
        if (target?.includes("fullName")) {
          return NextResponse.json(
            { error: "El nombre completo ya existe." },
            { status: 409 }
          );
        }
      }
    }

    return NextResponse.json(
      { error: error.message || "Error al crear alumno" },
      { status: 500 }
    );
  }
}
