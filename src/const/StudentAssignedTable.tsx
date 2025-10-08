import { StudentAssigned } from "@/types/table";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export const dataStudentAssignedTable: StudentAssigned[] = [
  {
    exp: "243596",
    nameStudent: "Juan Pérez",
    career: "Ingeniería en Sistemas",
    semester: "5",
  },
  {
    exp: "243597",
    nameStudent: "María López",
    career: "Ing. de Software",
    semester: "7",
  },
  {
    exp: "243598",
    nameStudent: "Carlos Sánchez",
    career: "Lic. en Informática",
    semester: "3",
  },
  {
    exp: "243599",
    nameStudent: "Ana Gómez",
    career: "Ing. en Sistemas",
    semester: "1",
  },
  {
    exp: "243600",
    nameStudent: "Luis Fernández",
    career: "Ing. de Software",
    semester: "9",
  },
  {
    exp: "243601",
    nameStudent: "Sofía Ramírez",
    career: "Lic. en Informática",
    semester: "4",
  },
];

export const columnsStudentAssignedTable: ColumnDef<StudentAssigned>[] = [
  {
    accessorKey: "exp",
    header: "Expediente",
    cell: ({ row }) => (
      <div className="capitalize"> {row.getValue("exp")} </div>
    ),
  },
  {
    accessorKey: "nameStudent",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 flex items-center gap-2"
        >
          Nombre del alumno
          <ArrowUpDown size={15} />
        </button>
      );
    },
    cell: ({ row }) => <div> {row.getValue("nameStudent")} </div>,
  },
  {
    accessorKey: "career",
    header: "Carrera",
    cell: ({ row }) => (
      <div className="capitalize"> {row.getValue("career")} </div>
    ),
  },
  {
    accessorKey: "semester",
    header: "Semestre",
    cell: ({ row }) => (
      <div className="capitalize"> {row.getValue("semester")} </div>
    ),
  },
  {
    accessorKey: "edit",
    header: "",
    cell: ({ row }) => (
      <Link href={``} className="text-blue-600 underline">
        Editar
      </Link>
    ),
  },
  {
    accessorKey: "seeHistory",
    header: "",
    cell: ({ row }) => (
      <Link href={``} className="text-blue-600 underline">
        Ver Historial
      </Link>
    ),
  },
  {
    accessorKey: "register",
    header: "",
    cell: ({ row }) => (
      <Link href={``} className="text-blue-600 underline">
        Registrar
      </Link>
    ),
  },
];
