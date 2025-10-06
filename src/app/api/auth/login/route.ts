import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken"; 
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { nombre, cve } = await req.json();

    const teacher = await prisma.teachers.findUnique({
      where: { cveMaestro: cve },
    });

    if (teacher && teacher.nombreMaestro === nombre) {
      const payload = {
        id: teacher.idMaestro,
        nombreMaestro: teacher.nombreMaestro,
        cveMaestro: teacher.cveMaestro,
        rol: "teacher",
      };
      const token = sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "8h",
      });
      return NextResponse.json(
        { message: "Inicio de sesión exitoso", user: teacher, token },
        { status: 200 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { cveAdmin: cve },
    });

    if (admin && admin.name === nombre) {
      const payload = {
        id: admin.idAdmin,
        name: admin.name,
        rol: "admin",
      };
      const token = sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "8h",
      });
      return NextResponse.json(
        { message: "Inicio de sesión exitoso", user: admin, token },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Credenciales inválidas" },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al iniciar sesión" },
      { status: 500 }
    );
  }
}