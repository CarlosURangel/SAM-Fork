import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  // Consulta directa a la base de datos usando Prisma.$queryRaw
  const tablas = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`
  return NextResponse.json(tablas)
}