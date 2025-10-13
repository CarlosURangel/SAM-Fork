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
    const cveMaestro =
      typeof payload === "object" ? payload.cveMaestro : undefined;
    if (!cveMaestro) {
      return NextResponse.json(
        { error: "Token inválido o sin clave de maestro" },
        { status: 401 }
      );
    }
    const advisories = await prisma.advisories.findMany({
      where: { cveMaestro },
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
