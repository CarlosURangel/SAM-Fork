"use client";

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

export default function ChartTutoringPerSubject({
  description,
  chartConfig,
  data,
}: ChartTutoringPerSubjectProps) {
  // Helper para formatear ticks siempre como string
  const formatTick = (value: string | number) => {
    const key = String(value); // Convertimos a string por seguridad
    const label = chartConfig[key]?.label;
    return typeof label === "string" ? label : key;
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
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ left: 40, right: 30 }}
          >
            <YAxis
              dataKey="subject"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={formatTick} // Usamos la función refinada
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
