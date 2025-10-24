import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { FullAdvisoryData } from "@/types/advisory";

export const createHistoryColumns = (
  onEdit: (advisory: FullAdvisoryData) => void,
  downloadPDF: (idAdvisory: string, exp: string) => void,
): ColumnDef<FullAdvisoryData>[] => [
    { accessorKey: "student.fullName", header: "Alumno" },
    { accessorKey: "subject.name", header: "Materia" },
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
    { accessorKey: "topic", header: "Tema" },
    {
      id: "actions",
      header: () => <div className="text-right"></div>,
      cell: ({ row }) => (
        <div className="text-right flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(row.original)}
          >
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadPDF(row.original.idAdvisory, row.original.student.expedient)}
          >
            Descargar PDF
          </Button>
        </div>
      ),
    },
  ];
