import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const tablas = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`
  return NextResponse.json(tablas)
}