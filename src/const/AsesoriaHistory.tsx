import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

// 1. Definimos y exportamos el tipo para la estructura completa de datos que nos da la API.
// Esto permite que otros archivos (como la página y el modal) lo usen.
export type FullAdvisoryData = {
  idAdvisory: string;
  advisoryDate: string | null;
  topic: string | null;
  status: string; // Incluimos 'status' para que coincida con los datos de la DB
  student: {
    fullName: string;
    expedient: string;
    semester: number;
    idCareer: string;
    career: { name: string };
  };
  subject: {
    idSubject: string;
    name: string;
  };
};

// 2. Convertimos las columnas en una función que recibe el manejador para la edición.
// Esto nos permite "inyectar" la lógica desde la página principal.
export const createHistoryColumns = (
  onEdit: (advisory: FullAdvisoryData) => void
): ColumnDef<FullAdvisoryData>[] => [
  {
    // Usamos el ID explícito para que el `searchBy` de la página funcione correctamente.
    id: "nameStudent",
    accessorKey: "student.fullName",
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
  // La columna de fecha se queda fuera por ahora para simplificar,
  // la tabla usará el tipo `HistoryUser` que ya la tiene.
  // La agregaremos si es necesario.
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
