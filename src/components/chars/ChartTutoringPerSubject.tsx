"use client";

import { useState, useEffect } from "react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartTutoringPerSubjectProps } from "@/types/chart";

// Función para medir ancho del texto (solo se ejecutará en el cliente)
const getTextWidth = (text: string, font = "12px sans-serif") => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  context.font = font;
  return context.measureText(text).width;
};

export default function ChartTutoringPerSubject({
  description,
  chartConfig,
  data,
}: ChartTutoringPerSubjectProps) {
  // Formatear label según chartConfig
  const formatTick = (value: string | number) => {
    const key = String(value);
    const label = chartConfig[key]?.label;
    return typeof label === "string" ? label : key;
  };

  // Margen izquierdo dinámico, calculado solo en cliente
  const [leftMargin, setLeftMargin] = useState(10);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const widths = data.map((item) =>
      getTextWidth(formatTick(item.subject))
    );
    setLeftMargin(Math.max(...widths, 0) + 10); // +10px de padding
  }, [data, chartConfig]);

  // Tick personalizado pegado al final de la barra
  const CustomYAxisTick = ({ y, index }: any) => {
    const label = formatTick(data[index].subject);
    const barValue = data[index].count;
    return (
      <text
        x={leftMargin + barValue} // justo al final de la barra
        y={y}
        textAnchor="end"          // alineación al final
        dominantBaseline="middle"
        style={{ fontSize: 12 }}
      >
        {label}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Número total de asesorías por materia</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: leftMargin, right: 10, top: 10, bottom: 10 }}
            width={0} // ancho flexible
            height={data.length * 40} // altura proporcional
          >
            <YAxis
              dataKey="subject"
              type="category"
              tickLine={false}
              axisLine={false}
              tick={({ y, index }) => (
                <CustomYAxisTick y={y} index={index} />
              )}
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="count"
              layout="vertical"
              radius={4}
              fill="var(--color-count)"
            >
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
