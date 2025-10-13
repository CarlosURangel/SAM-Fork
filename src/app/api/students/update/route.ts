import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verify } from 'jsonwebtoken'

export async function PUT(req: NextRequest) {
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

    const { idStudent, fullName, expedient, semester, idCareer } = await req.json()

    if (typeof fullName !== 'string' || fullName.length < 8) {
      return NextResponse.json({ error: 'El nombre completo debe ser un string de al menos 8 caracteres.' }, { status: 400 })
    }

    if (!/^\d{6}$/.test(expedient)) {
      return NextResponse.json({ error: 'El expediente debe ser exactamente de una longitud de 6' }, { status: 400 })
    }

    const semestreNum = Number(semester)
    if (isNaN(semestreNum) || semestreNum < 1 || semestreNum > 8) {
      return NextResponse.json({ error: 'El semestre debe ser un número entre 1 y 8.' }, { status: 400 })
    }

    if (!idCareer) {
      return NextResponse.json({ error: 'La carrera es obligatoria.' }, { status: 400 })
    }

    const student = await prisma.students.update({
      where: { idStudent },
      data: {
        fullName,
        expedient,
        semester: semestreNum,
        idCareer,
        cveMaestro,
      },
    })
    return NextResponse.json(student, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error al crear alumno' },
      { status: 500 }
    )
  }
}