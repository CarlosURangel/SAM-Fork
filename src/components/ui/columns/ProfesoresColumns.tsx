// src/components/ui/columns/ProfesoresColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export type Profesor = {
  nombre: string
  asesorias: number
}

export const columnasProfesores: ColumnDef<Profesor>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre del profesor",
  },
  {
    accessorKey: "asesorias",
    header: "Número de asesorías",
  },
  {
    id: "alumnos",
    cell: ({ row }) => (
      <Link
        href={`/profesores/${row.original.nombre}/alumnos`}
        className="text-blue-600 underline"
      >
        Alumnos asignados
      </Link>
    ),
  },
  {
    id: "estadisticas",
    cell: ({ row }) => (
      <Link
        href={`/profesores/${row.original.nombre}/estadisticas`}
        className="text-blue-600 underline"
      >
        Estadísticas de asesoría
      </Link>
    ),
  },
]
