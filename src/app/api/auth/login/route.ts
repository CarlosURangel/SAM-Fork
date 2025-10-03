import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken"; 
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { nombreMaestro, cveMaestro } = await req.json();

    const user = await prisma.teachers.findUnique({
      where: { cveMaestro },
    });

    if (!user || user.nombreMaestro !== nombreMaestro) {
      return NextResponse.json(
        { message: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const payload = {
      id: user.idMaestro,
      nombreMaestro: user.nombreMaestro,
      cveMaestro: user.cveMaestro,
    };

    const token = sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "8h",
    });

    if (!token) {
      return NextResponse.json(
        { message: "Error al generar token" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Inicio de sesión exitoso", user, token },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al iniciar sesión" },
      { status: 500 }
    );
  }
}
