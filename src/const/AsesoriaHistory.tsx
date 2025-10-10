import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { HistoryUser } from "@/types/table";

export const dataHistoryUser: HistoryUser[] = [
  {
    date: "17/03/2024",
    nameStudent: "Juan Perez",
    career: "Ing. de Software",
    semester: "6",
    subject: "Programación Orientada en Objetos",
  },
  {
    date: "15/03/2024",
    nameStudent: "María Gómez",
    career: "Ana María López",
    semester: "4",
    subject: "Estructuras de Datos",
  },
  {
    date: "10/03/2024",
    nameStudent: "Carlos Rodríguez",
    career: "Luis Fernando Martínez",
    semester: "8",
    subject: "Bases de Datos Avanzadas",
  },
  {
    date: "05/03/2024",
    nameStudent: "Laura Fernández",
    career: "Sofía Hernández",
    semester: "2",
    subject: "Introducción a la Programación",
  },
  {
    date: "01/03/2024",
    nameStudent: "Miguel Sánchez",
    career: "Diego Ramírez",
    semester: "10",
    subject: "Desarrollo de Aplicaciones Móviles",
  },
];

export const columnsHistoryUser: ColumnDef<HistoryUser>[] = [
  {
    accessorKey: "date",
    header: "Fecha",
    cell: ({ row }) => (
      <div className="capitalize"> {row.getValue("date")} </div>
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
    accessorKey: "subject",
    header: "Materia",
    cell: ({ row }) => (
      <div className="capitalize"> {row.getValue("subject")} </div>
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
    accessorKey: "download",
    header: "",
    cell: ({ row }) => (
      <Link href={``} className="text-blue-600 underline">
        Descargar PDF
      </Link>
    ),
  },
];
