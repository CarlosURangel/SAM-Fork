// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/db";
// import { v4 as uuidv4 } from "uuid";

// export async function POST(req: NextRequest) {
//   try {
//     const { nombre, apellidoPaterno, apellidoMaterno, cveMaestro } =
//       await req.json();

//     if (typeof nombre !== "string" || nombre.length < 3) {
//       return NextResponse.json(
//         { error: "El nombre debe ser un string de al menos 3 caracteres." },
//         { status: 400 }
//       );
//     }
//     if (typeof apellidoPaterno !== "string" || apellidoPaterno.length < 3) {
//       return NextResponse.json(
//         {
//           error:
//             "El apellido paterno debe ser un string de al menos 3 caracteres.",
//         },
//         { status: 400 }
//       );
//     }
//     if (typeof apellidoMaterno !== "string" || apellidoMaterno.length < 3) {
//       return NextResponse.json(
//         {
//           error:
//             "El apellido materno debe ser un string de al menos 3 caracteres.",
//         },
//         { status: 400 }
//       );
//     }
//     if (!/^\d{6}$/.test(cveMaestro)) {
//       return NextResponse.json(
//         { error: "El expediente debe ser exactamente de una longitud de 6" },
//         { status: 400 }
//       );
//     }
//     const teacher = await prisma.teachers.create({
//       data: {
//         idMaestro: uuidv4(),
//         nombreMaestro: nombre + " " + apellidoPaterno + " " + apellidoMaterno,
//         apellidoMaterno,
//         apellidoPaterno,
//         cveMaestro,
//         rol: "teacher",
//       },
//     });
//     return NextResponse.json(teacher, { status: 201 });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.message || "Error al crear maestro" },
//       { status: 500 }
//     );
//   }
// }
