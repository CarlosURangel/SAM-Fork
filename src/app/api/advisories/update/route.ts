import { prisma } from "@/lib/db";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
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
    const { idAdvisory, expStudent, idSubject, advisoryDate, topic, cveMaestroBody } =
      await req.json();

    if (!expStudent || !idSubject || !advisoryDate || !topic) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    if (typeof topic !== "string" || topic.length < 5) {
      return NextResponse.json(
        { error: "El tema debe ser un string de al menos 5 caracteres." },
        { status: 400 }
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(advisoryDate)) {
      return NextResponse.json(
        { error: "La fecha debe tener formato YYYY-MM-DD." },
        { status: 400 }
      );
    }

    const fechaAsesoria = new Date(advisoryDate + "T00:00:00Z");

    const newAdvisory = await prisma.advisories.update({
      where: { idAdvisory: idAdvisory },
      data: {
        expStudent,
        cveMaestro: cveMaestro ?? cveMaestroBody,
        idSubject,
        advisoryDate: fechaAsesoria,
        topic,
        creation_date: new Date(),
        status: "Pending",
      },
    });
    return NextResponse.json(newAdvisory, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al obtener las asesorías" },
      { status: 500 }
    );
  }
}
