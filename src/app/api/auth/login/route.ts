import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { nombre, cve } = await req.json();


    const apiRes = await fetch(`${process.env.API_URL}${cve}`);
    const apiData = await apiRes.json();

    

    if (apiData.response === "true" ) {
      let teacher = await prisma.teachers.findUnique({
        where: { cveMaestro: cve },
      });

      if (!teacher) {
        teacher = await prisma.teachers.create({
          data: {
            idMaestro: apiData.profesor.idMaestro,
            cveMaestro: apiData.profesor.cveMaestro,
            fullName: apiData.profesor.nombreMaestro,
            rol: "teacher",
          },
        });
      }

      const payload = {
        id: teacher.idMaestro,
        cveMaestro: teacher.cveMaestro,
        nombreMaestro: apiData.profesor.nombreMaestro,
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