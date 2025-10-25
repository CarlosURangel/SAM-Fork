import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    await prisma.subjects.deleteMany({});
    await prisma.careers.deleteMany({});
    await prisma.admin.deleteMany({});

    const adminsPath = path.join(process.cwd(), "admins.json");
    if (fs.existsSync(adminsPath)) {
      const adminsData = JSON.parse(fs.readFileSync(adminsPath, "utf-8"));
      if (Array.isArray(adminsData) && adminsData.length > 0) {
        const adminsToInsert = adminsData.map((a: any) => ({
          idAdmin: a.idAdmin,
          name: a.name,
          rol: a.rol ?? "admin",
          cveAdmin: a.cveAdmin,
        }));
        await prisma.admin.createMany({
          data: adminsToInsert,
          skipDuplicates: true,
        });
      }
    }

    const filePath = path.join(process.cwd(), "carreras.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const carrerasJson = JSON.parse(data);

    for (const carreraObj of carrerasJson.carreras) {
      const code = carreraObj.carrera.match(/\((.*?)\)/)?.[1] || "";
      const carrera = await prisma.careers.create({
        data: {
          code,
          name: carreraObj.carrera,
        },
      });

      for (const semestre of carreraObj.semestres) {
        if (!semestre.materias) continue;
        for (const materia of semestre.materias) {
          await prisma.subjects.create({
            data: {
              code: materia.clave,
              name: materia.nombre,
              semester: parseInt(semestre.nombre?.match(/\d+/)?.[0] || "0"),
              idCareer: carrera.idCareer,
            },
          });
        }
      }
    }

    return NextResponse.json({ message: "Seed ejecutada correctamente" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}