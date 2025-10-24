import { Button } from "@/components/ui/button";
import { UserManagement } from "@/types/table";
import {
    ColumnDef
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link";
import { Router } from "next/router";

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
                    < ArrowUpDown size={15} />
                </button>
            )
        },
        cell: ({ row }) => <div> {row.getValue("nameTeacher")} </div>,
    },
    {
        accessorKey: "students",
        header: () => {
            return (
                <div className="flex w-full justify-center">Alumnos asignados</div>
            )
        },
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="w-full flex justify-center">
                    <Button asChild size="sm" variant="primaryBlue">
                        <Link href={`/dashboard/gestion-de-usuarios/alumnos-asignados/${user.cveTeacher}`}>Ver</Link>
                    </Button>
                </div>
            );
        },
    },
    {
        accessorKey: "statistics",
        header: () => {
            return (
                <div className="flex w-full justify-center">Estadísticas de las asesorías</div>
            )
        },
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="w-full flex justify-center">
                    <Button asChild variant="primaryBlue" size="sm">
                        <Link href={`/dashboard/estadisticas/${user.cveTeacher}`}>Ver</Link>
                    </Button>
                </div>
            );
        },
    },
    {
        accessorKey: "total",
        header: "Número total de Asesorías",
        cell: ({ row }) => (
            <div className="capitalize" > {row.getValue("total")} </div>
        ),
    },
]
