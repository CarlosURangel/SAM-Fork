import { prisma } from "@/lib/db";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Token no proporcionado" },
        { status: 401 }
      );
    }
    const token = authHeader.replace("Bearer ", "");

    const payload = verify(token, process.env.JWT_SECRET!);
    const cveMaestro =
      typeof payload === "object" ? payload.cveMaestro : undefined;
    if (!cveMaestro) {
      return NextResponse.json(
        { error: "Token inválido o sin clave de maestro" },
        { status: 401 }
      );
    }
    const students = await prisma.students.findMany({
      where: { cveMaestro },
    });
    if (!students || students.length === 0) {
      return NextResponse.json(
        { error: "No se encontraron alumnos" },
        { status: 404 }
      );
    }
    return NextResponse.json(students, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al obtener los alumnos" },
      { status: 500 }
    );
  }
}
