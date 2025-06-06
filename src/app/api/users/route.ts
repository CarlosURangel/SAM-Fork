import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { nombre, correo, expediente } = await req.json()
    const user = await prisma.user.create({
      data: { nombre, correo, expediente },
    })
    return NextResponse.json(user, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error al crear usuario' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error al obtener usuarios' },
      { status: 500 }
    )
  }
}