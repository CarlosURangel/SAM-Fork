import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Esta función GET obtendrá TODAS las materias de la base de datos
export async function GET(req: NextRequest) {
  try {
    // 1. Hacemos la consulta a la base de datos sin ningún filtro
    const allSubjects = await prisma.subjects.findMany();

    // 2. Verificamos si la tabla está vacía
    if (allSubjects.length === 0) {
      return NextResponse.json(
        { message: "No se encontraron materias en la base de datos." },
        { status: 404 }
      );
    }

    // 3. Devolvemos todas las materias encontradas
    return NextResponse.json(allSubjects, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al obtener todas las materias" },
      { status: 500 }
    );
  }
}
