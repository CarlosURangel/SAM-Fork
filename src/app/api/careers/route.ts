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
    const token = authHeader.replace("Bearer ", "");
    const payload = verify(token, process.env.JWT_SECRET!);
    const cveMaestro =
      typeof payload === "object" ? payload.cveMaestro : undefined;
    const cveAdmin = typeof payload === "object" ? payload.cveAdmin : undefined;

    if (!cveMaestro && !cveAdmin) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }
    const careers = await prisma.careers.findMany();
    return NextResponse.json(careers, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al obtener las carreras" },
      { status: 500 }
    );
  }
}
