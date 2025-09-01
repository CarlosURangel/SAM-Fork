import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken"; 
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { nombre, expediente } = await req.json();

    // Llama a la API externa falta implementar API
    // const externalRes = await fetch("ruta a la api", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ nombre, expediente }),
    // });

    // Verifica las credenciales en la base de datos con los usuarios de prueba
    const user = await prisma.user.findUnique({
      where: { nombre, expediente },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Credenciales invalidas" },
        { status: 401 }
      );
    }

    const payload = {
      nombre: user.nombre,
      expediente: user.expediente,
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
      { message: "Inicio de sesion exitoso", user, token },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al iniciar sesion" },
      { status: 500 }
    );
  }
}
