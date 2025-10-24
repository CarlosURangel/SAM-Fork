"use client";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomTooltip } from "./Custom-chart-tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfessorData, chartConfig } from "@/app/data/asesorias-data";

// Colores de la gráfica de barras
const START_COLOR = "#083C6E";
const END_COLOR = "#BBD7EF";

// Paleta de colores para la gráfica de pie del tooltip
const CHART_COLORS = [
  "#083C6E",
  "#4299E1",
  "#F56565",
  "#48BB78",
  "#ED8936",
  "#9F7AEA",
  "#38B2AC",
  "#ECC94B",
  "#D53F8C",
  "#667EEA",
];

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const interpolateColor = (color1: string, color2: string, factor: number) => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return color1;
  const result = {
    r: Math.round(rgb1.r + factor * (rgb2.r - rgb1.r)),
    g: Math.round(rgb1.g + factor * (rgb2.g - rgb1.g)),
    b: Math.round(rgb1.b + factor * (rgb2.b - rgb1.b)),
  };
  return `rgb(${result.r}, ${result.g}, ${result.b})`;
};

export function AsesoriasChart() {
  const [data, setData] = useState<ProfessorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/statistics/teacher");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "No se pudieron obtener los datos de la gráfica."
          );
        }
        type RawProfessorData = Omit<ProfessorData, "breakdown"> & {
          breakdown: { subject: string; count: number }[];
        };
        const rawData: RawProfessorData[] = await response.json();

        const dataWithColors: ProfessorData[] = rawData
          .filter(Boolean)
          .map((teacher) => {
            const coloredBreakdown = teacher.breakdown.map((item, index) => ({
              ...item,
              fill: CHART_COLORS[index % CHART_COLORS.length],
            }));

            return {
              name: teacher.name,
              total: teacher.total,
              breakdown: coloredBreakdown,
            };
          });

        setData(dataWithColors);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="min-h-[400px] w-full" />
      </CardContent>
    </Card>;
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/f" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="min-h-[400px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    <Card>
      <CardHeader>
        <CardTitle>Error al cargar la gráfica</CardTitle>
        <CardDescription>{error}</CardDescription>
      </CardHeader>
    </Card>;
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error al cargar la gráfica</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reporte de Asesorías por Profesor</CardTitle>
        <CardDescription>
          Pasa el cursor sobre una barra para ver el desglose por materia.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig as ChartConfig}
          className="min-h-[400px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{ top: 20, right: 20, bottom: 80, left: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.slice(0, 15)}
              angle={-45}
              textAnchor="end"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              allowDecimals={false}
            />

            <ChartTooltip cursor={false} content={<CustomTooltip />} />

            <Bar dataKey="total" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={interpolateColor(
                    START_COLOR,
                    END_COLOR,
                    data.length > 1 ? index / (data.length - 1) : 1
                  )}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
