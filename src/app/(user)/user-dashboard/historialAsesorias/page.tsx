"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import { TableBase } from "@/components/tables/TableBase";
import { AdvisoryDialog } from "@/components/forms/RegisterPrivateLesson";
import {
  createHistoryColumns,
  FullAdvisoryData,
} from "@/const/AsesoriaHistory";
import { ColumnDef } from "@tanstack/react-table";

const Page = () => {
  const params = useParams();
  // 1. El estado ahora almacena los datos completos y originales de la API
  const [allAdvisories, setAllAdvisories] = useState<FullAdvisoryData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [advisoryToEdit, setAdvisoryToEdit] = useState<FullAdvisoryData | null>(
    null
  );

  const searchValue = params.name?.toString().replaceAll("%20", " ") || "";

  const fetchHistory = useCallback(async () => {
    try {
      const response = await fetch("/api/advisories/teacher");
      if (!response.ok) throw new Error("Error al cargar el historial");
      setAllAdvisories(await response.json());
    } catch (error) {
      console.error(error);
      setAllAdvisories([]);
    }
  }, []);

  useEffect(() => {
    document.title = "Historial de Asesorías";
    fetchHistory();
  }, [fetchHistory]);

  const handleEdit = (advisory: FullAdvisoryData) => {
    setAdvisoryToEdit(advisory);
    setIsModalOpen(true);
  };

  const handleActionComplete = () => {
    setIsModalOpen(false);
    fetchHistory();
  };

  const columns = useMemo(() => createHistoryColumns(handleEdit), []);

  // 2. Aplanamos los datos para la búsqueda y formateamos la fecha
  const dataForTable = useMemo(() => {
    const dataWithFlatStudentName = allAdvisories.map((advisory) => ({
      ...advisory,
      nameStudent: advisory.student.fullName, // Creamos la propiedad simple para la búsqueda
      // Formateamos la fecha directamente aquí
      date: advisory.advisoryDate
        ? new Date(advisory.advisoryDate).toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "N/A",
    }));

    // Si hay un término de búsqueda en la URL, filtramos
    if (searchValue) {
      return dataWithFlatStudentName.filter((advisory) =>
        advisory.nameStudent.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return dataWithFlatStudentName;
  }, [allAdvisories, searchValue]);

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

      {/* 3. La tabla ahora es consistente */}
      <TableBase<(typeof dataForTable)[0]>
        data={dataForTable}
        columns={columns as ColumnDef<(typeof dataForTable)[0]>[]}
        searchBy="nameStudent" // Esto ahora funciona porque creamos la propiedad 'nameStudent'
      />
    </section>
  );
};

export default Page;
