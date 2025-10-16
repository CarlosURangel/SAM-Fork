"use client";
import React, { useEffect, useState } from "react";
import { TableBase } from "@/components/tables/TableBase";
import { HistoryUser } from "@/types/table";
import { columnsHistoryUser, dataHistoryUser } from "@/const/AsesoriaHistory";

type AdvisoryFromApi = {
  student: {
    fullName: string;
    semester: number;
    career: {
      name: string;
    };
  };
  subject: {
    name: string;
  };
  advisoryDate: string | null;
  topic: string | null;
  status: string;
};

const Page = () => {
  const [historyData, setHistoryData] = useState<HistoryUser[]>([]);

  useEffect(() => {
    document.title = "Historial de Asesorías";

    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/advisories/teacher", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Error al obtener el historial:", response.statusText);
          setHistoryData([]);
          return;
        }

        const advisoriesFromApi: AdvisoryFromApi[] = await response.json();

        // Transformamos los datos de la API al formato que la tabla espera
        const formattedData: HistoryUser[] = advisoriesFromApi.map(
          (advisory) => ({
            nameStudent: advisory.student.fullName,
            subject: advisory.subject.name,
            // Formateamos la fecha para que sea legible y manejamos el caso de que sea nula
            date: advisory.advisoryDate
              ? new Date(advisory.advisoryDate).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Fecha no asignada",
            topic: advisory.topic || "Sin tema", // Usamos un texto por defecto si el tema es nulo
            status: advisory.status,
            career: advisory.student.career.name,
            semester: advisory.student.semester.toString(),
          })
        );

        setHistoryData(formattedData);
      } catch (error) {
        console.error("Error al procesar el historial de asesorías:", error);
        setHistoryData([]);
      }
    };

    fetchHistory();
  }, []); // Se ejecuta solo una vez al cargar la página

  return (
    <section className="mx-16 mt-28 flex-1">
      <div className="mb-5">
        <h1 className="text-3xl font-semibold">Historial de Asesorías</h1>
      </div>
      <TableBase<HistoryUser>
        data={historyData}
        columns={columnsHistoryUser}
        searchBy="nameStudent"
      />
    </section>
  );
};

export default Page;
