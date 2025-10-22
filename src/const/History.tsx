import {
    ColumnDef
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HistoryAdmin } from "@/types/table";

export const createHistoryColumnsAdmin = (
  onEdit: (advisory: HistoryAdmin) => void
): ColumnDef<HistoryAdmin>[] => [
  {
    accessorKey: "advisoryDate",
    header: "Fecha",
    cell: ({ row }) =>
      row.original.advisoryDate
        ? new Date(row.original.advisoryDate).toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "N/A",
  },
  {
    accessorKey: "teacher.fullName",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 flex items-center gap-2"
        >
          Nombre del profesor
          <ArrowUpDown size={15} />
        </button>
      );
    },
  },
  {
    accessorKey: "student.fullName",
    header: "Alumnos asignados",
  },
  {
    accessorKey: "student.semester",
    header: "Semestre",
  },
  {
    accessorKey: "subject.name",
    header: "Materia",
  },
  {
    id: "actions",
    header: () => <div className="text-right"></div>,
    cell: ({ row }) => (
      <div className="text-right">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(row.original)}
        >
          Editar
        </Button>
        <Button variant="outline" size="sm" onClick={() => ""}>
          Descargar PDF
        </Button>
      </div>
    ),
  },
];