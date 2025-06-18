"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Customized,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface DocenteData {
  nombre: string;
  total: number;
}

interface Props {
  data: DocenteData[];
}

const chartConfig = {
  total: {
    label: "Total Asesorías",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function AsesoriasPorDocenteChart({ data }: Props) {
  const datosOrdenados = [...data].sort((a, b) => b.total - a.total);

  // Función para cortar el nombre si es muy largo
  const renderCustomTick = (props: any) => {
    const { x, y, payload } = props;
    const maxLength = 10; // cantidad de caracteres máximos a mostrar
    const shortLabel =
      payload.value.length > maxLength
        ? payload.value.substring(0, maxLength) + "…"
        : payload.value;

    return (
      <g transform={`translate(${x}, ${y + 10})`}>
        <text x={0} y={0} textAnchor="middle" fontSize={12} fill="#000">
          {shortLabel}
        </text>
      </g>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asesorías por Docente</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={datosOrdenados}
            margin={{ top: 20, bottom: 100 }}
            width={Math.max(600, datosOrdenados.length * 90)}
            height={400}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="nombre"
              interval={0}
              height={60}
              tick={renderCustomTick}
              tickLine={false}
              axisLine={false}
            />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="total" fill="var(--color-total)" radius={8}>
              <LabelList
                dataKey="total"
                position="top"
                offset={10}
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
