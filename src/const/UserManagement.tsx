import { UserManagement } from "@/types/table";
import {
    ColumnDef
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link";

export const columnsUserManagement: ColumnDef<UserManagement>[] = [
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
            <Link
                href={`/dashboard/gestion-de-usuarios/alumnos-asignados/${row.original.cveTeacher}`}
                className="text-blue-600 underline"
            >
                Ver
            </Link>
        ),
    },
    {
        accessorKey: "statistics",
        header: "Estadísticas de las asesorías",
        cell: ({ row }) => (
            <Link
                href={``}
                className="text-blue-600 underline"
            >
                Ver
            </Link>
        ),
    },
    {
        accessorKey: "total",
        header: "Número total de Asesorías",
        cell: ({ row }) => (
            <div className="capitalize" > {row.getValue("total")} </div>
        ),
    },
]
