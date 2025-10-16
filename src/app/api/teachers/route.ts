import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";


export async function GET(req: NextRequest) {
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
    const cveAdmin = typeof payload === "object" ? payload.cveAdmin : undefined;
    if (!cveAdmin) {
      return NextResponse.json(
        { error: "Token inválido o sin clave de admin" },
        { status: 401 }
      );
    }
    const teachers = await prisma.teachers.findMany();
    const result = await Promise.all(
      teachers.map(async (teacher) => {
        const total = await prisma.advisories.count({
          where: { cveMaestro: teacher.cveMaestro ?? undefined },
        });
        return { ...teacher, total: total };
      })
    );
    if (!teachers || teachers.length === 0) {
      return NextResponse.json({ error: "No se encontraron profesores" }, { status: 404 });
    }
    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error al obtener los profesores" }, { status: 500 });
  }
}