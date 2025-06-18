// src/components/ui/columns/AlumnosColumns.ts

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Alumno = {
  expediente: string;
  nombre: string;
  carrera: string;
  semestre: string;
};

export const columnasAlumnos: ColumnDef<Alumno>[] = [
  {
    accessorKey: "expediente",
    header: "Expediente",
  },
  {
    accessorKey: "nombre",
    header: "Nombre del alumno",
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
    id: "editar",
    cell: ({ row }) => (
      <button
        className="text-blue-600 underline"
        onClick={() => console.log("Editar", row.original)}
      >
        Editar
      </button>
    ),
  },
  {
    id: "historial",
    cell: ({ row }) => (
      <Link
        href={`/alumnos/${row.original.expediente}/historial`}
        className="text-blue-600 underline"
      >
        Ver historial
      </Link>
    ),
  },
  {
    id: "registrar",
    cell: ({ row }) => (
      <Link
        href={`/alumnos/${row.original.expediente}/registrar`}
        className="text-blue-600 underline"
      >
        Registrar
      </Link>
    ),
  },
];
