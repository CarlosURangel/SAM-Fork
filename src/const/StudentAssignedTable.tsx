import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FullStudentData } from "@/types/advisory";

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
