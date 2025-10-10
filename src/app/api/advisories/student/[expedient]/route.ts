import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { expedient: string } }) {
  try {
    const advisories = await prisma.advisories.findMany({
      where: { expStudent: params.expedient },
    });

    if (!advisories || advisories.length === 0) {
      return NextResponse.json(
        { error: "No se encontraron asesorías" },
        { status: 404 }
      );
    }
    return NextResponse.json(advisories, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al obtener las asesorías" },
      { status: 500 }
    );
  }
}