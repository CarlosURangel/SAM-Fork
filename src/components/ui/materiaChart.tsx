"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip as ReTooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

// 🎯 Colores para la gráfica de pie
const PIE_COLORS = ["#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8"];

// 📌 Datos de ejemplo para materias por profesor
const materiasPorProfesor: Record<string, { name: string; value: number }[]> = {
  "Juan Pérez": [
    { name: "Matemáticas", value: 5 },
    { name: "Física", value: 3 },
    { name: "Química", value: 2 },
  ],
  "María López": [
    { name: "Historia", value: 4 },
    { name: "Geografía", value: 6 },
  ],
};

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

// 🔹 Tooltip personalizado con gráfica de pie
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const profesor = payload[0].payload.nombre;
    const pieData = materiasPorProfesor[profesor] || [];

    return (
      <div className="bg-white p-3 rounded-md shadow-md border">
        <strong className="block mb-2">{profesor}</strong>

        {/* Aquí renderizamos la gráfica de pie de forma independiente */}
        <PieChart width={220} height={200}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={70}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {pieData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={PIE_COLORS[index % PIE_COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>
    );
  }
  return null;
};

export function AsesoriasPorDocenteChart({ data }: Props) {
  const datosOrdenados = [...data].sort((a, b) => b.total - a.total);

  // Función para cortar el nombre si es muy largo
  const renderCustomTick = (props: any) => {
    const { x, y, payload } = props;
    const maxLength = 10;
    const shortLabel =
      payload.value.length > maxLength
        ? payload.value.substring(0, maxLength) + "…"
        : payload.value;

    return (
      <g transform={`translate(${x}, ${y})`}>
        <text
          x={0}
          y={0}
          dx={6} // mueve horizontalmente para centrar
          dy={8} // separación desde el eje
          textAnchor="start" // alinea el inicio del texto
          fontSize={12}
          fill="#000"
          transform="rotate(90)"
        >
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
              height={100}
              tick={renderCustomTick}
              tickLine={false}
              axisLine={false}
            />
            <YAxis hide />
            {/* Tooltip modificado */}
            <ReTooltip content={<CustomTooltip />} />
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
