import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verify } from "jsonwebtoken";

export async function POST(req: NextRequest) {
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
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }
    const { idCareer, semester } = await req.json();
    const subjects = await prisma.subjects.findMany({
      where: {
        idCareer,
        semester: Number(semester),
      },
    });
    if (subjects.length === 0) {
      return NextResponse.json(
        { error: "No se encontraron materias" },
        { status: 404 }
      );
    }
    return NextResponse.json(subjects, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al filtrar materias" },
      { status: 500 }
    );
  }
}
