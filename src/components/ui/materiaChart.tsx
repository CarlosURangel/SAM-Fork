"use client";

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface MateriaData {
  materia: string;
  total: number;
}

interface Props {
  data: MateriaData[];
}

const chartConfig = {
  total: {
    label: "Total Asesorías",
    color: "var(--chart-1)", // puedes personalizarlo
  },
} satisfies ChartConfig;

export function AsesoriasPorMateriaChart({ data }: Props) {
  const datosOrdenados = [...data].sort((a, b) => b.total - a.total);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asesorías por Materia</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={datosOrdenados}
            layout="vertical"
            margin={{ left: 20, right: 20 }} // Añadí margen derecho
            width={500}
            height={Math.max(300, datosOrdenados.length * 40)}
          >
            <CartesianGrid horizontal={false} />

            <XAxis type="number" dataKey="total" hide />
            <YAxis
              type="category"
              dataKey="materia"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={80} // Aumenta el ancho para los nombres
              tick={{ fontSize: 12 }} // Reduce el tamaño de fuente si es necesario
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="total" fill="var(--color-total)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
