import { ChartConfig } from "@/components/ui/chart";

// Datos de asesorías combinados con id correspondiente al chartConfig
export const combinedAsesoriasData = [
  { id: "ia", subject: "IA", count: 18, fill: "#ffff99" },
  { id: "poo", subject: "POO", count: 14, fill: "#ff7f00" },
  { id: "calculo", subject: "Cálculo", count: 15, fill: "#6a3d9a" },
  { id: "algebraLineal", subject: "Álgebra Lineal", count: 10, fill: "#b15928" },
  { id: "redes", subject: "Redes", count: 13, fill: "#fb9a99" },
  { id: "basesDatos", subject: "Bases de Datos", count: 20, fill: "#1f78b4" },
  { id: "estructurasDatos", subject: "Estructuras de Datos", count: 16, fill: "#33a02c" },
  { id: "sistemasOperativos", subject: "Sistemas Operativos", count: 11, fill: "#e31a1c" },
  { id: "desarrolloWeb", subject: "Desarrollo Web", count: 6, fill: "#bebada" },
  { id: "ingenieriaSoftware", subject: "Ingeniería de Software", count: 21, fill: "#fdb462" },
  { id: "sistemasDistribuidos", subject: "Sistemas Distribuidos", count: 11, fill: "#bc80bd" },
  { id: "analisisAlgoritmos", subject: "Análisis de Algoritmos", count: 19, fill: "#4daf4a" },
  { id: "robotica", subject: "Robótica", count: 10, fill: "#9c27b0" },
  { id: "metodologiasAgiles", subject: "Metodologías Ágiles", count: 12, fill: "#8ac926" },
  { id: "cienciaDatos", subject: "Ciencia de Datos", count: 8, fill: "#8338ec" },
  { id: "criptografia", subject: "Criptografía", count: 9, fill: "#4da6ff" },
  { id: "compiladores", subject: "Compiladores", count: 7, fill: "#377eb8" },
];

export const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig
