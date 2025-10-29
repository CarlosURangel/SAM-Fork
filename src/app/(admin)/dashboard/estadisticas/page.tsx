"use client";
import React, { useEffect, useState } from "react";
import { AsesoriasChart } from "@/components/Asesorias-chart";
import { chartConfig } from "@/const/ChartTutoringPerSubject";
import ChartTutoringPerSubject from "@/components/chars/ChartTutoringPerSubject";
import { DataChartTutoringPerSubject } from "@/types/chart";
import { subjectsApi } from "@/types/apis";
import { ordenarYColorearPorCantidad } from "@/lib/colorUtils";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ChartSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[350px] w-full animate-pulse" />
    </CardContent>
  </Card>
);

const page = () => {
  const [dataChartTutoringPerSubject, setDataChartTutoringPerSubject] =
    useState<DataChartTutoringPerSubject[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Estadísticas";

    const fetchTeachers = async () => {
      try {
        const response = await fetch("/api/statistics/subject", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data: subjectsApi[] = await response.json();
        const newData: DataChartTutoringPerSubject[] = data.map(
          (subject: subjectsApi) => ({
            id: subject.name.toLowerCase().replace(/\s+/g, ""),
            subject: subject.name,
            count: subject.total,
            fill: "#8884d8",
          })
        );
        setDataChartTutoringPerSubject(ordenarYColorearPorCantidad(newData));
      } catch (error) {
        console.error("Error al obtener los profesores:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <section className="mx-16 mt-28 flex-1">
      <h1 className="text-3xl mb-10">Estadísticas</h1>

      {isLoading ? (
        <div className="flex flex-col gap-8">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      ) : (
        <>
          <ChartTutoringPerSubject
            description="Enero - Junio 2025"
            chartConfig={chartConfig}
            data={dataChartTutoringPerSubject}
          />
          <div className="mt-8">
            <AsesoriasChart />
          </div>
        </>
      )}
    </section>
  );
};

export default page;
