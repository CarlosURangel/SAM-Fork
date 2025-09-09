import { ChartConfig } from "@/components/ui/chart";

// Datos de asesorías combinados con id correspondiente al chartConfig
export const combinedAsesoriasData = [
  { id: "ia", subject: "IA", count: 18, fill: "#ffff99" },
  { id: "poo", subject: "POO", count: 14, fill: "#ff7f00" },
  { id: "calculo", subject: "Cálculo", count: 15, fill: "#6a3d9a" },
  { id: "algebraLineal", subject: "Álgebra Lineal", count: 10, fill: "#b15928" },
  { id: "redes", subject: "Redes", count: 14, fill: "#fb9a99" },
  { id: "basesDatos", subject: "Bases de Datos", count: 12, fill: "#1f78b4" },
  { id: "estructurasDatos", subject: "Estructuras de Datos", count: 16, fill: "#33a02c" },
  { id: "sistemasOperativos", subject: "Sistemas Operativos", count: 11, fill: "#e31a1c" },
  { id: "desarrolloWeb", subject: "Desarrollo Web", count: 6, fill: "#bebada" },
  { id: "ingenieriaSoftware", subject: "Ingeniería de Software", count: 12, fill: "#fdb462" },
  { id: "sistemasDistribuidos", subject: "Sistemas Distribuidos", count: 11, fill: "#bc80bd" },
  { id: "analisisAlgoritmos", subject: "Análisis de Algoritmos", count: 14, fill: "#4daf4a" },
  { id: "robotica", subject: "Robótica", count: 10, fill: "#9c27b0" },
  { id: "metodologiasAgiles", subject: "Metodologías Ágiles", count: 12, fill: "#8ac926" },
  { id: "cienciaDatos", subject: "Ciencia de Datos", count: 8, fill: "#8338ec" },
  { id: "criptografia", subject: "Criptografía", count: 9, fill: "#4da6ff" },
  { id: "compiladores", subject: "Compiladores", count: 7, fill: "#377eb8" },
];

export const chartConfig = {
  count: { label: "Cantidad de Asesorías", color: "hsl(var(--chart-1))" },

  ia: { label: "Inteligencia Artificial", color: "#ffff99" },
  poo: { label: "Programación Orientada a Objetos", color: "#ff7f00" },
  calculo: { label: "Cálculo", color: "#6a3d9a" },
  algebraLineal: { label: "Álgebra Lineal", color: "#b15928" },
  redes: { label: "Redes de Computadoras", color: "#fb9a99" },
  basesDatos: { label: "Bases de Datos", color: "#1f78b4" },
  estructurasDatos: { label: "Estructuras de Datos", color: "#33a02c" },
  sistemasOperativos: { label: "Sistemas Operativos", color: "#e31a1c" },
  desarrolloWeb: { label: "Desarrollo Web", color: "#bebada" },
  ingenieriaSoftware: { label: "Ingeniería de Software", color: "#fdb462" },
  sistemasDistribuidos: { label: "Sistemas Distribuidos", color: "#bc80bd" },
  analisisAlgoritmos: { label: "Análisis de Algoritmos", color: "#4daf4a" },
  robotica: { label: "Robótica", color: "#9c27b0" },
  metodologiasAgiles: { label: "Metodologías Ágiles", color: "#8ac926" },
  cienciaDatos: { label: "Ciencia de Datos", color: "#8338ec" },
  criptografia: { label: "Criptografía", color: "#4da6ff" },
  compiladores: { label: "Compiladores", color: "#377eb8" },
} satisfies ChartConfig;
