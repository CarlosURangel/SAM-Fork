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
    const authToken = authHeader.replace("Bearer ", "");
    const payload = verify(authToken, process.env.JWT_SECRET!);
    const cveAdmin = typeof payload === "object" ? payload.cveAdmin : undefined;
    if (!cveAdmin) {
      return NextResponse.json(
        { error: "Token inválido o sin clave de admin" },
        { status: 401 }
      );
    }
    const advisories = await prisma.advisories.findMany();
    if (!advisories || advisories.length === 0) {
        return NextResponse.json({ error: "No se encontraron asesorías" }, { status: 404 });
    }
    return NextResponse.json(advisories, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al obtener las asesorías" },
      { status: 500 }
    );
  }
}
