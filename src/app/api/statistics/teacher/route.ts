import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verify } from "jsonwebtoken";

const CHART_COLORS = [
  "#083C6E",
  "#4299E1",
  "#F56565",
  "#48BB78",
  "#ED8936",
  "#9F7AEA",
  "#38B2AC",
  "#ECC94B",
  "#D53F8C",
  "#667EEA",
];

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
        { error: "Acceso no autorizado" },
        { status: 403 }
      );
    }

    const allAdvisories = await prisma.advisories.findMany({
      select: {
        teacher: { select: { fullName: true, cveMaestro: true } },
        subject: { select: { name: true } },
      },
    });

    const statsByTeacher = new Map<
      string,
      {
        name: string;
        total: number;
        breakdownMap: Map<string, number>;
      }
    >();

    for (const advisory of allAdvisories) {
      const teacherId = advisory.teacher.cveMaestro;
      if (!teacherId) continue;

      const subjectName = advisory.subject.name;

      if (!statsByTeacher.has(teacherId)) {
        statsByTeacher.set(teacherId, {
          name: advisory.teacher.fullName,
          total: 0,
          breakdownMap: new Map<string, number>(),
        });
      }

      const teacherStat = statsByTeacher.get(teacherId)!;
      teacherStat.total++;
      teacherStat.breakdownMap.set(
        subjectName,
        (teacherStat.breakdownMap.get(subjectName) || 0) + 1
      );
    }

    const finalChartData = Array.from(statsByTeacher.values()).map(
      (teacherStat) => ({
        name: teacherStat.name,
        total: teacherStat.total,
        breakdown: Array.from(teacherStat.breakdownMap.entries()).map(
          ([subject, count], index) => ({
            subject,
            count,
            fill: CHART_COLORS[index % CHART_COLORS.length],
          })
        ),
      })
    );

    return NextResponse.json(finalChartData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al generar las estadísticas" },
      { status: 500 }
    );
  }
}
