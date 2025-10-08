// src/components/ui/columns/RegistrosColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export type Registro = {
  nombre: string
  fecha: string
  carrera: string
  semestre: string
  materia: string
}

export const columnasRegistros: ColumnDef<Registro>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre del alumno",
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
  },
  {
    accessorKey: "carrera",
    header: "Carrera",
  },
  {
    accessorKey: "semestre",
    header: "Semestre",
  },
  {
    accessorKey: "materia",
    header: "Materia",
  },
  {
    id: "editar",
    cell: ({ row }) => (
      <button
        className="text-blue-600 underline"
        onClick={() => console.log("Editar registro", row.original)}
      >
        Editar
      </button>
    ),
  },
  {
    id: "pdf",
    cell: ({ row }) => (
      <Link
        href={`/registros/${row.original.nombre}/pdf`}
        className="text-blue-600 underline"
        target="_blank"
      >
        Descargar PDF
      </Link>
    ),
  },
]
