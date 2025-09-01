import {
    ColumnDef
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { HistoryAdmin } from "@/types/table";


export const dataHistoryAdmin: HistoryAdmin[] = [
    {
        date: "17/03/2024",
        nameTeacher: "Juan Perez",
        students: "Constantino Abraham",
        semester: "6",
        subject: "Programación Orientada en Objetos",
    },
    {
        date: "15/03/2024",
        nameTeacher: "María Gómez",
        students: "Ana María López",
        semester: "4",
        subject: "Estructuras de Datos",
    },
    {
        date: "10/03/2024",
        nameTeacher: "Carlos Rodríguez",
        students: "Luis Fernando Martínez",
        semester: "8",
        subject: "Bases de Datos Avanzadas",
    },
    {
        date: "05/03/2024",
        nameTeacher: "Laura Fernández",
        students: "Sofía Hernández",
        semester: "2",
        subject: "Introducción a la Programación",
    },
    {
        date: "01/03/2024",
        nameTeacher: "Miguel Sánchez",
        students: "Diego Ramírez",
        semester: "10",
        subject: "Desarrollo de Aplicaciones Móviles",
    },
]

export const columnsHistoryAdmin: ColumnDef<HistoryAdmin>[] = [
    {
        accessorKey: "date",
        header: "Fecha",
        cell: ({ row }) => (
            <div className="capitalize" > {row.getValue("date")} </div>
        ),
    },
    {
        accessorKey: "nameTeacher",
        header: ({ column }) => {
            return (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="p-0 m-0 flex items-center gap-2"
                >
                    Nombre del profesor
                    < ArrowUpDown size={15}/>
                </button>
            )
        },
        cell: ({ row }) => <div> {row.getValue("nameTeacher")} </div>,
    },
    {
        accessorKey: "students",
        header: "Alumnos asignados",
        cell: ({ row }) => (
            <div className="capitalize" > {row.getValue("students")} </div>
        ),
    },
    {
        accessorKey: "semester",
        header: "Semestre",
        cell: ({ row }) => (
            <div className="capitalize" > {row.getValue("semester")} </div>
        ),
    },
    {
        accessorKey: "subject",
        header: "Materia",
        cell: ({ row }) => (
            <div className="capitalize" > {row.getValue("subject")} </div>
        ),
    },
    {
        accessorKey: "edit",
        header: "",
        cell: ({ row }) => (
            <Link
                href={``}
                className="text-blue-600 underline"
            >
                Editar
            </Link>
        ),
    },
    {
        accessorKey: "download",
        header: "",
        cell: ({ row }) => (
            <Link
                href={``}
                className="text-blue-600 underline"
            >
                Descargar PDF
            </Link>
        ),
    },
]
