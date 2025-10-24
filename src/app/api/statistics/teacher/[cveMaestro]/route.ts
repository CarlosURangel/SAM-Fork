// ...existing code...
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verify } from "jsonwebtoken";

export async function GET(
  req: NextRequest,
  { params }: { params: { cveMaestro: string } }
) {
  try {
    const { cveMaestro } = await params;

    const cookie = req.cookies.get("Auth_SAM");
    const authToken = cookie?.value;
    if (!authToken) {
      return NextResponse.json({ error: "Token no proporcionado" }, { status: 401 });
    }
    const payload = verify(authToken, process.env.JWT_SECRET!);
    const cveAdmin = typeof payload === "object" ? payload.cveAdmin : undefined;
    if (!cveAdmin) {
      return NextResponse.json({ error: "Acceso no autorizado" }, { status: 403 });
    }

    const allAdvisories = await prisma.advisories.findMany({
      where: { cveMaestro },
      select: {
        teacher: {
          select: {
            fullName: true,
          },
        },
        idSubject: true,
        subject: {
          select: { name: true },
        },
      },
    });

    let name: string | null | undefined = null;
    if (allAdvisories.length > 0) {
      name = allAdvisories[0].teacher?.fullName ?? null;
    } 
    else{
      const result = await prisma.teachers.findUnique({
        where: {
          cveMaestro
        },
        select:{
          fullName:true
        }
      })
      name = result?.fullName
    }

    const statsBySubject = new Map<
      string,
      {
        idSubject: string;
        name: string;
        total: number;
      }
    >();

    for (const advisory of allAdvisories) {
      const subjectId = advisory.idSubject;
      if (!subjectId) continue;

      const subjectName = advisory.subject?.name ?? "Sin nombre";

      const existing = statsBySubject.get(subjectId);
      if (existing) {
        existing.total += 1;
      } else {
        statsBySubject.set(subjectId, {
          idSubject: subjectId,
          name: subjectName,
          total: 1,
        });
      }
    }

    const advisories = Array.from(statsBySubject.values());

    const result = {
      name,
      totalAdvisories: allAdvisories.length,
      advisories,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al generar las estadísticas" },
      { status: 500 }
    );
  }
}