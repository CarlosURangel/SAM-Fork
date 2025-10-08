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
      className="mt-2 grid gap-y-1 gap-x-3 w-full text-xs pr-2"
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

  // Calcular columnas del layout
  const legendCols = breakdownData.length > 8 ? 2 : 1;

  const BASE_PIE_AREA = 180;
  const ITEM_HEIGHT = 22;
  const EXTRA_GAP = 12;

  // Filas del legend según columnas
  const legendRows = Math.ceil(breakdownData.length / legendCols);

  const naturalHeight = BASE_PIE_AREA + legendRows * ITEM_HEIGHT + EXTRA_GAP;

  const MIN_CHART_HEIGHT = 260;
  const MAX_CHART_HEIGHT = 420;

  const chartHeight = Math.max(
    MIN_CHART_HEIGHT,
    Math.min(naturalHeight, MAX_CHART_HEIGHT)
  );

  const legendMaxHeight = Math.max(60, chartHeight - BASE_PIE_AREA - EXTRA_GAP);

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
        <ChartContainer
          config={chartConfig}
          className="w-full"
          style={{ height: chartHeight }}
        >
          <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
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
              labelLine={false}
            >
              {breakdownData.map((entry) => (
                <Cell key={`cell-${entry.subject}`} fill={entry.fill} />
              ))}
            </Pie>

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
