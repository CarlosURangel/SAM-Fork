// import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/db'
// import { verify } from 'jsonwebtoken'

// export async function POST(req: NextRequest) {
//   try {
//     const authHeader = req.headers.get('authorization')
//     if (!authHeader) {
//       return NextResponse.json({ error: 'Token no proporcionado' }, { status: 401 })
//     }
//     const token = authHeader.replace('Bearer ', '')

//     const payload = verify(token, process.env.JWT_SECRET!)
//     const cveMaestro = typeof payload === 'object' ? payload.cveMaestro : undefined

//     if (!cveMaestro) {
//       return NextResponse.json({ error: 'Token inválido o sin clave de maestro' }, { status: 401 })
//     }

//     const { fullName, expedient, semester, idCareer } = await req.json()

//     if (typeof fullName !== 'string' || fullName.length < 8) {
//       return NextResponse.json({ error: 'El nombre completo debe ser un string de al menos 8 caracteres.' }, { status: 400 })
//     }

//     if (!/^\d{6}$/.test(expedient)) {
//       return NextResponse.json({ error: 'El expediente debe ser exactamente de una longitud de 6' }, { status: 400 })
//     }

//     const semestreNum = Number(semester)
//     if (isNaN(semestreNum) || semestreNum < 1 || semestreNum > 8) {
//       return NextResponse.json({ error: 'El semestre debe ser un número entre 1 y 8.' }, { status: 400 })
//     }

//     if (!idCareer) {
//       return NextResponse.json({ error: 'La carrera es obligatoria.' }, { status: 400 })
//     }

//     const student = await prisma.students.create({
//       data: {
//         fullName,
//         expedient,
//         semester: semestreNum,
//         idCareer,
//         cveMaestro,
//       },
//     })
//     return NextResponse.json(student, { status: 201 })
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.message || 'Error al crear alumno' },
//       { status: 500 }
//     )
//   }
// }