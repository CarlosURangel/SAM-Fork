import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verify } from "jsonwebtoken";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    if (!cveMaestro) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const student = await prisma.students.findUnique({
      where: { idStudent: params.id },
    });

    if (!student || student.cveMaestro !== cveMaestro) {
      return NextResponse.json(
        { error: "Alumno no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(student);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al obtener estudiante" },
      { status: 500 }
    );
  }
}
