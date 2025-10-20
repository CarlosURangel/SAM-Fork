import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { FullStudentData } from "./StudentAssignedTable"; // Importamos el tipo maestro del estudiante

// 1. Definimos y exportamos el tipo "maestro" para una asesoría completa.
// Este será el ÚNICO tipo de datos que usaremos en la página de historial.
export type FullAdvisoryData = {
  idAdvisory: string;
  advisoryDate: string | null;
  topic: string | null;
  status: string;
  student: FullStudentData; // Usamos el tipo importado para la propiedad 'student'
  subject: {
    idSubject: string;
    name: string;
  };
};

// 2. La función ahora usará este tipo único y consistente.
export const createHistoryColumns = (
  onEdit: (advisory: FullAdvisoryData) => void
): ColumnDef<FullAdvisoryData>[] => [
  {
    accessorKey: "student.fullName",
    header: "Alumno",
  },
  {
    accessorKey: "student.career.name",
    header: "Carrera",
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
    accessorKey: "date", // Usaremos una clave simple para la fecha formateada
    header: "Fecha",
  },
  {
    accessorKey: "topic",
    header: "Tema",
  },
  {
    id: "actions",
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => {
      const advisory = row.original;
      return (
        <div className="text-right">
          <Button variant="outline" size="sm" onClick={() => onEdit(advisory)}>
            Editar
          </Button>
        </div>
      );
    },
  },
];
