import { StudentAssigned } from "@/types/table";
import {
    ColumnDef
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button";
import { FullStudentData } from "@/types/advisory";


export const dataStudentAssigned: StudentAssigned[] = [
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
]

export const createStudentsColumns = (
    onEdit: (student: FullStudentData) => void,
    onViewHistory: (student: FullStudentData) => void,
): ColumnDef<FullStudentData>[] => [
        {
            accessorKey: "expedient",
            header: "Expediente",
        },
        {
            accessorKey: "fullName",
            header: ({ column }) => (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0 m-0 flex items-center gap-2"
                >
                    Nombre del alumno
                    <ArrowUpDown size={15} />
                </button>
            ),
        },
        {
            accessorKey: "career.name", 
            header: "Carrera",
        },
        {
            accessorKey: "semester",
            header: "Semestre",
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => {
                const student = row.original; // Aquí tenemos todos los datos de la fila

                return (
                    <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm" onClick={() => onEdit(student)}>
                            Editar
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onViewHistory(student)}
                        >
                            Ver Historial
                        </Button>
                    </div>
                );
            },
        },
    ]
