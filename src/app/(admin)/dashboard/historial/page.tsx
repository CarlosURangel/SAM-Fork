"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { TableBase } from "@/components/tables/TableBase";
// Importamos el mismo diálogo y su tipo
import {
  AdvisoryDialog,
  FullAdvisoryData,
} from "@/components/forms/RegisterPrivateLesson";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { HistoryAdmin } from "../../../../types/table";
import { ArrowUpDown } from "lucide-react";

// --- Columnas Dinámicas ---
const createHistoryColumns = (
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

const Page = () => {
  const [allAdvisories, setAllAdvisories] = useState<HistoryAdmin[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [advisoryToEdit, setAdvisoryToEdit] = useState<HistoryAdmin | null>(
    null
  );

  const colums2Search = ["student.fullName", "subject.name"];

  const fetchHistory = useCallback(async () => {
    try {
      const response = await fetch("/api/advisories/");
      if (!response.ok) throw new Error("Error al cargar el historial");
      setAllAdvisories(await response.json());
    } catch (error) {
      console.error(error);
      setAllAdvisories([]);
    }
  }, []);

  console.log(allAdvisories);
  console.log(advisoryToEdit);
  useEffect(() => {
    document.title = "Historial de Asesorías";
    fetchHistory();
  }, [fetchHistory]);

  const handleEdit = (advisory: HistoryAdmin) => {
    setAdvisoryToEdit(advisory);
    setIsModalOpen(true);
  };

  const handleActionComplete = () => {
    setIsModalOpen(false);
    fetchHistory();
  };

  const columns = useMemo(() => createHistoryColumns(handleEdit), []);

  return (
    <section className="mx-16 mt-28 flex-1">
      <div className="mb-5">
        <h1 className="text-3xl font-semibold">Historial de Asesorías</h1>
      </div>

      <AdvisoryDialog
        advisoryToEdit={advisoryToEdit}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onActionComplete={handleActionComplete}
      />

      <TableBase<HistoryAdmin>
        data={allAdvisories}
        columns={columns}
        searchBy={colums2Search}
      />
    </section>
  );
};

export default Page;
