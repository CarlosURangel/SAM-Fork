import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {

    const nuevoAdmin = await prisma.admin.create({
      data: {
        idAdmin: uuidv4(),
        name: "AdminPrueba",
        rol: "admin",
        cveAdmin: "111222",
      },
    });
       
    return NextResponse.json(nuevoAdmin, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al crear admin" },
      { status: 500 }
    );
  }
}