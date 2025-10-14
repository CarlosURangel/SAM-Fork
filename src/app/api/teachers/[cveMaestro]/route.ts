import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verify } from "jsonwebtoken";

export async function GET(
  req: NextRequest,
  { params }: { params: { cveMaestro: string } }
) {
  try {
    const { cveMaestro } = await params;

    if (!cveMaestro) {
      return NextResponse.json(
        { error: "Falta el parámetro cveMaestro" },
        { status: 400 }
      );
    }

    const cookie = req.cookies.get("Auth_SAM");
    const authToken = cookie?.value;

    if (!authToken) {
      return NextResponse.json(
        { error: "Token no proporcionado " },
        { status: 401 }
      );
    }
    const payload = verify(authToken, process.env.JWT_SECRET!);
    const cveAdmin = typeof payload === "object" ? payload.cveAdmin : undefined;
    if (!cveAdmin) {
      return NextResponse.json(
        { error: "Token inválido o sin clave de admin" },
        { status: 401 }
      );
    }

    const maestro = await prisma.teachers.findUnique({
      where: { cveMaestro },
      include: {
        students: {
          select: {
            idStudent: true,
            fullName: true,
            expedient: true,
            career: { select: { name: true } },
            semester: true,
          }
        },
      },
    });

    if (!maestro) {
      return NextResponse.json(
        { error: "Maestro no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(maestro, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al obtener el maestro" },
      { status: 500 }
    );
  }
}
