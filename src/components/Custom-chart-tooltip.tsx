"use client";

import React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Cell, Legend, LegendProps } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ProfessorData,
  chartConfig,
  SubjectBreakdown,
} from "@/app/data/asesorias-data";

// Legend personalizado: nombre bonito + count + %, con columnas dinámicas
function CustomLegendContent({
  payload,
  data,
  cols = 1,
}: LegendProps & { data: SubjectBreakdown[]; cols?: number }) {
  if (!payload || !Array.isArray(payload)) return null;

  const total = data.reduce((s, d) => s + d.count, 0);
  const counts = new Map(data.map((d) => [d.subject, d.count]));

  return (
    <ul
      className="mt-2 grid gap-y-1 gap-x-3 w-full text-xs pr-2" // pr-2 para scrollbar
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {payload.map((item: any) => {
        // Recharts pasa el nameKey como `value` en el payload del legend
        const subject: string = String(
          item?.value ?? item?.payload?.name ?? ""
        );
        const niceLabel =
          chartConfig[subject as keyof typeof chartConfig]?.label ?? subject;
        const count = counts.get(subject) ?? 0;
        const pct = total ? Math.round((count * 100) / total) : 0;
        const dotColor = item?.color ?? item?.payload?.fill;

        return (
          <li key={subject} className="flex items-center gap-2 min-w-0">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
              style={{ backgroundColor: dotColor }}
              aria-hidden
            />
            <span className="truncate">{niceLabel}</span>
            <span className="ml-auto tabular-nums shrink-0">
              {count} ({pct}%)
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  const professorInfo: ProfessorData = payload[0].payload;
  const breakdownData = professorInfo.breakdown;

  // ====== Cálculo de layout dinámico ======
  // Si hay muchos items, usamos 2 columnas para reducir altura
  const legendCols = breakdownData.length > 8 ? 2 : 1;

  // Alturas base (ajústalas a tu gusto)
  const BASE_PIE_AREA = 180; // espacio vertical reservado para el pie (incluye márgenes del chart)
  const ITEM_HEIGHT = 22; // alto aproximado de cada fila del legend (text-xs)
  const EXTRA_GAP = 12; // separación entre gráfica y legend

  // Filas del legend según columnas
  const legendRows = Math.ceil(breakdownData.length / legendCols);

  // Altura "natural" que querríamos para contener todo sin scroll
  const naturalHeight = BASE_PIE_AREA + legendRows * ITEM_HEIGHT + EXTRA_GAP;

  // Límites para no crecer infinito ni quedar muy chico
  const MIN_CHART_HEIGHT = 260;
  const MAX_CHART_HEIGHT = 420;

  // Altura final del contenedor (responsive container)
  const chartHeight = Math.max(
    MIN_CHART_HEIGHT,
    Math.min(naturalHeight, MAX_CHART_HEIGHT)
  );

  // Altura máxima disponible para el legend dentro del contenedor
  const legendMaxHeight = Math.max(60, chartHeight - BASE_PIE_AREA - EXTRA_GAP);

  // Si el legend se pasa, lo hacemos scrollable
  const legendOverflowY = naturalHeight > MAX_CHART_HEIGHT ? "auto" : "visible";

  return (
    <Card className="w-80 h-fit border-2 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{professorInfo.name}</CardTitle>
        <CardDescription>
          Desglose de {professorInfo.total} asesorías
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Un SOLO hijo para ChartContainer: el PieChart */}
        <ChartContainer
          config={chartConfig}
          className="w-full"
          style={{ height: chartHeight }}
        >
          <PieChart
            // margen inferior pequeño; el espacio real lo reserva el contenedor dinámico
            margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={breakdownData}
              dataKey="count"
              nameKey="subject"
              innerRadius={0}
              outerRadius={70}
              strokeWidth={4}
              labelLine={false} // sin labels; todo va al legend
            >
              {breakdownData.map((entry) => (
                <Cell key={`cell-${entry.subject}`} fill={entry.fill} />
              ))}
            </Pie>

            {/* Legend nativo de Recharts con contenido custom “estilo shadcn” */}
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              content={
                <CustomLegendContent data={breakdownData} cols={legendCols} />
              }
              wrapperStyle={{
                paddingTop: 6,
                maxHeight: legendMaxHeight,
                overflowY: legendOverflowY as React.CSSProperties["overflowY"],
              }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
