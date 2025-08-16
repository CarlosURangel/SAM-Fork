"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Datos de asesorías combinados para el nuevo gráfico
const combinedAsesoriasData = [
  { subject: "IA", count: 18, fill: "#ffff99" },
  { subject: "POO", count: 14, fill: "#ff7f00" },
  { subject: "Cálculo", count: 15, fill: "#6a3d9a" },
  { subject: "Álgebra Lineal", count: 10, fill: "#b15928" },
  { subject: "Redes", count: 14, fill: "#fb9a99" },
  { subject: "Bases de Datos", count: 12, fill: "#1f78b4" },
  { subject: "Estructuras de Datos", count: 16, fill: "#33a02c" },
  { subject: "Sistemas Operativos", count: 11, fill: "#e31a1c" },
  { subject: "Desarrollo Web", count: 6, fill: "#bebada" },
  { subject: "Ingeniería de Software", count: 12, fill: "#fdb462" },
  { subject: "Sistemas Distribuidos", count: 11, fill: "#bc80bd" },
  { subject: "Análisis de Algoritmos", count: 14, fill: "#4daf4a" },
  { subject: "Robótica", count: 10, fill: "#9c27b0" },
  { subject: "Metodologías Ágiles", count: 12, fill: "#8ac926" },
  { subject: "Ciencia de Datos", count: 8, fill: "#8338ec" },
  { subject: "Criptografía", count: 9, fill: "#4da6ff" },
  { subject: "Compiladores", count: 7, fill: "#377eb8" },
];

const chartConfig = {
  count: {
    label: "Cantidad de Asesorías",
    color: "hsl(var(--chart-1))",
  },
  // La propiedad 'subject' ahora se usa como la clave para los colores y etiquetas
  IA: { label: "Inteligencia Artificial", color: "#ffff99" },
  POO: { label: "Programación Orientada a Objetos", color: "#ff7f00" },
  Cálculo: { label: "Cálculo", color: "#6a3d9a" },
  "Álgebra Lineal": { label: "Álgebra Lineal", color: "#b15928" },
  Redes: { label: "Redes de Computadoras", color: "#fb9a99" },
  "Bases de Datos": { label: "Bases de Datos", color: "#1f78b4" },
  "Estructuras de Datos": { label: "Estructuras de Datos", color: "#33a02c" },
  "Sistemas Operativos": { label: "Sistemas Operativos", color: "#e31a1c" },
  "Desarrollo Web": { label: "Desarrollo Web", color: "#bebada" },
  "Ingeniería de Software": {
    label: "Ingeniería de Software",
    color: "#fdb462",
  },
  "Sistemas Distribuidos": { label: "Sistemas Distribuidos", color: "#bc80bd" },
  "Análisis de Algoritmos": {
    label: "Análisis de Algoritmos",
    color: "#4daf4a",
  },
  Robótica: { label: "Robótica", color: "#9c27b0" },
  "Metodologías Ágiles": { label: "Metodologías Ágiles", color: "#8ac926" },
  "Ciencia de Datos": { label: "Ciencia de Datos", color: "#8338ec" },
  Criptografía: { label: "Criptografía", color: "#4da6ff" },
  Compiladores: { label: "Compiladores", color: "#377eb8" },
} satisfies ChartConfig;

export default function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Número total de asesorías por materia</CardTitle>
        <CardDescription>Enero - Junio 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig as ChartConfig}>
          <BarChart
            accessibilityLayer
            data={combinedAsesoriasData}
            layout="vertical"
            margin={{
              left: 40,
              right: 30,
            }}
          >
            <YAxis
              dataKey="subject"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
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
              {/* <LabelList
                dataKey="subject"
                position="insideLeft"
                offset={8}
                className="fill-foreground/80"
                fontSize={12}
              /> */}
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
