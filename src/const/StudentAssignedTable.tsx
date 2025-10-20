import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { on } from "events";

// El tipo completo del objeto que recibimos de la API
export type FullStudentData = {
  idStudent: string;
  expedient: string;
  fullName: string;
  semester: number;
  idCareer: string;
  career: { name: string };
};

// Convertimos las columnas en una función que recibe los manejadores de eventos
export const createStudentColumns = (
  onEdit: (student: FullStudentData) => void,
  onRegister: (student: FullStudentData) => void,
  onViewHistory: (student: FullStudentData) => void
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
      accessorKey: "career.name", // Accedemos al nombre anidado
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
        const student = row.original;

        return (
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={() => onEdit(student)}>
              Editar
            </Button>
            <Button variant="outline" size="sm" onClick={() => onViewHistory(student)}>
              Ver Historial
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRegister(student)}
            >
              Registrar
            </Button>
          </div>
        );
      },
    },
  ];
