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