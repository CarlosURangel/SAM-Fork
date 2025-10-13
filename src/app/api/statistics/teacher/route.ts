import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

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
          where: { cveMaestro: teacher.cveMaestro ?? undefined }
        });

        if (total === 0) return null;

        const advisoriesBySubject = await prisma.advisories.groupBy({
          by: ["idSubject"],
          where: { cveMaestro: teacher.cveMaestro ?? undefined },
          _count: { idAdvisory: true },
        });

        const subjectIds = advisoriesBySubject.map(item => item.idSubject);
        const subjects = await prisma.subjects.findMany({
          where: { idSubject: { in: subjectIds } },
          select: { idSubject: true, name: true },
        });

        const advisoryPerSubject = advisoriesBySubject.map(item => {
          const subject = subjects.find(s => s.idSubject === item.idSubject);
          return {
            name: subject?.name || "Materia desconocida",
            total: item._count.idAdvisory,
          };
        });

        return {
          idMaestro: teacher.idMaestro,
          cveMaestro: teacher.cveMaestro,
          nombreMaestro: teacher.fullName,
          total,
          advisoryPerSubject
        };
      })
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al obtener estadísticas" },
      { status: 500 }
    );
  }
}