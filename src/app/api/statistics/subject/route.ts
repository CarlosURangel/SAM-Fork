import { prisma } from "@/lib/db";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

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

    const advisoriesBySubject = await prisma.advisories.groupBy({
      by: ["idSubject"],
      _count: { idAdvisory: true },
    });

    const subjectIds = advisoriesBySubject
      .filter((item) => item._count.idAdvisory > 0)
      .map((item) => item.idSubject);

    if (subjectIds.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const subjects = await prisma.subjects.findMany({
      where: { idSubject: { in: subjectIds } },
      select: { idSubject: true, name: true },
    });

    const result = advisoriesBySubject
      .filter((item) => item._count.idAdvisory > 0)
      .map((item) => {
        const subject = subjects.find((s) => s.idSubject === item.idSubject);
        return {
          name: subject?.name || "Materia desconocida",
          total: item._count.idAdvisory,
        };
      })
      .sort((a, b) => b.total - a.total);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al obtener estadísticas" },
      { status: 500 }
    );
  }
}
