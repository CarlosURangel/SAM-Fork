"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
import { asesoriasData, chartConfig } from "@/app/data/asesorias-data";

export function AsesoriasChart() {
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
            data={asesoriasData}
            margin={{ top: 20, right: 20, bottom: 80, left: 20 }}
            barCategoryGap="30%"
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{
                fontSize: 12,
                fill: "var(--foreground)/80",
                fontWeight: 500,
              }}
              tickFormatter={(value) => value.slice(0, 10)}
              angle={90}
              textAnchor="end"
              dy={50}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "var(--foreground)/80" }}
            />

            <ChartTooltip cursor={false} content={<CustomTooltip />} />

            <Bar
              dataKey="total"
              fill="var(--color-total)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
