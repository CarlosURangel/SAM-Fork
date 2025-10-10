import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { nombre, cve } = await req.json();

    const apiRes = await fetch(`${process.env.API_URL}${cve}`);
    const apiData = await apiRes.json();

    if (apiData.response === "true") {
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

      const response = NextResponse.json(
        { message: "Inicio de sesión exitoso"},
        { status: 200 }
      );
      response.cookies.set("Auth_SAM", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 8, 
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      return response;
    }

    const admin = await prisma.admin.findUnique({
      where: { cveAdmin: cve },
    });

    if (admin && admin.name === nombre) {
      const payload = {
        id: admin.idAdmin,
        cveAdmin: admin.cveAdmin,
        name: admin.name,
        rol: "admin",
      };
      const token = sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "8h",
      });

      const response = NextResponse.json(
        { message: "Inicio de sesión exitoso", },
        { status: 200 }
      );
      response.cookies.set("Auth_SAM", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 8, 
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      return response;
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