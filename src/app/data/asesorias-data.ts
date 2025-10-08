import { ChartConfig } from "@/components/ui/chart";

export type SubjectBreakdown = {
  subject: string;
  count: number;
  fill: string;
};

export type ProfessorData = {
  name: string;
  total: number;
  breakdown: SubjectBreakdown[];
};

// Datos de ejemplo con colores hexadecimales
export const asesoriasData: ProfessorData[] = [
  {
    name: "Dr. Carlos Gómez",
    total: 15,
    breakdown: [
      { subject: "Bases de Datos", count: 7, fill: "#1f78b4" },
      { subject: "Estructuras de Datos", count: 4, fill: "#33a02c" },
      { subject: "Sistemas Operativos", count: 2, fill: "#e31a1c" },
      { subject: "POO", count: 2, fill: "#ff7f00" },
    ],
  },
  {
    name: "Mtra. Laura Torres",
    total: 10,
    breakdown: [
      { subject: "Cálculo", count: 5, fill: "#6a3d9a" },
      { subject: "Álgebra Lineal", count: 3, fill: "#b15928" },
      { subject: "Matemáticas Discretas", count: 2, fill: "#a6cee3" },
    ],
  },
  {
    name: "Ing. Roberto Valdez",
    total: 18,
    breakdown: [
      { subject: "Redes", count: 9, fill: "#fb9a99" },
      { subject: "Seguridad Informática", count: 5, fill: "#fdbf6f" },
      { subject: "Arquitectura de Computadoras", count: 4, fill: "#cab2d6" },
    ],
  },
  {
    name: "Dra. Sofía Jiménez",
    total: 12,
    breakdown: [
      { subject: "IA", count: 6, fill: "#ffff99" },
      { subject: "Aprendizaje Automático", count: 4, fill: "#b2df8a" },
      {
        subject: "Procesamiento de Lenguaje Natural",
        count: 2,
        fill: "#8dd3c7",
      },
    ],
  },
  {
    name: "Lic. Andrea López",
    total: 8,
    breakdown: [
      { subject: "Desarrollo Web", count: 6, fill: "#bebada" },
      { subject: "Bases de Datos", count: 2, fill: "#1f78b4" },
    ],
  },
  {
    name: "Mtro. Miguel Castro",
    total: 14,
    breakdown: [
      { subject: "Ingeniería de Software", count: 8, fill: "#fdb462" },
      { subject: "POO", count: 4, fill: "#ff7f00" },
      { subject: "Pruebas de Software", count: 2, fill: "#fccde5" },
    ],
  },
  {
    name: "Dra. Isabel Méndez",
    total: 9,
    breakdown: [
      { subject: "Sistemas Distribuidos", count: 5, fill: "#bc80bd" },
      { subject: "Computación en la Nube", count: 4, fill: "#ccebc5" },
    ],
  },
  {
    name: "Ing. Jorge Ramos",
    total: 11,
    breakdown: [
      { subject: "Tópicos", count: 5, fill: "#ffed6f" },
      { subject: "IoT", count: 4, fill: "#a65628" },
      { subject: "Sistemas Embebidos", count: 2, fill: "#984ea3" },
    ],
  },
  {
    name: "Dr. Fernando Ruiz",
    total: 16,
    breakdown: [
      { subject: "Análisis de Algoritmos", count: 9, fill: "#4daf4a" },
      { subject: "Estructuras de Datos", count: 7, fill: "#33a02c" },
    ],
  },
  {
    name: "Mtra. Patricia Solís",
    total: 7,
    breakdown: [
      { subject: "Interacción Humano-Computadora", count: 4, fill: "#999999" },
      { subject: "Diseño UX/UI", count: 3, fill: "#e41a1c" },
    ],
  },
  {
    name: "Ing. Guillermo Pérez",
    total: 13,
    breakdown: [
      { subject: "Compiladores", count: 6, fill: "#377eb8" },
      { subject: "Sistemas Operativos", count: 4, fill: "#e31a1c" },
      { subject: "Arquitectura de Computadoras", count: 3, fill: "#cab2d6" },
    ],
  },
  {
    name: "Dra. Marcela Herrera",
    total: 10,
    breakdown: [
      { subject: "Criptografía", count: 5, fill: "#4da6ff" },
      { subject: "Seguridad en Redes", count: 3, fill: "#a27a00" },
      { subject: "Hacking Ético", count: 2, fill: "#54b435" },
    ],
  },
  {
    name: "Mtro. Luis Vargas",
    total: 17,
    breakdown: [
      { subject: "POO", count: 8, fill: "#ff7f00" },
      { subject: "Programación Funcional", count: 5, fill: "#d29034" },
      { subject: "Estructuras de Datos", count: 4, fill: "#33a02c" },
    ],
  },
  {
    name: "Ing. Sandra Mora",
    total: 9,
    breakdown: [
      { subject: "Redes", count: 5, fill: "#fb9a99" },
      { subject: "Cisco", count: 4, fill: "#a5a58d" },
    ],
  },
  {
    name: "Dr. Alejandro Cruz",
    total: 14,
    breakdown: [
      { subject: "Big Data", count: 7, fill: "#565264" },
      { subject: "Minería de Datos", count: 5, fill: "#2a6f97" },
      { subject: "Bases de Datos", count: 2, fill: "#1f78b4" },
    ],
  },
  {
    name: "Mtra. Verónica Ríos",
    total: 11,
    breakdown: [
      { subject: "Sistemas de Información", count: 6, fill: "#6a4c93" },
      {
        subject: "Gestión de Proyectos de Software",
        count: 5,
        fill: "#419d78",
      },
    ],
  },
  {
    name: "Ing. Ricardo Navarro",
    total: 43,
    breakdown: [
      { subject: "Robótica", count: 8, fill: "#9c27b0" },
      { subject: "Control", count: 5, fill: "#d81e5b" },
      { subject: "Metodologías Ágiles", count: 8, fill: "#8ac926" },
      { subject: "DevOps", count: 7, fill: "#136f63" },
      {
        subject: "Gestión de Proyectos de Software",
        count: 5,
        fill: "#419d78",
      },
      { subject: "Visión por Computadora", count: 6, fill: "#2e294e" },
      { subject: "Procesamiento de Imágenes", count: 4, fill: "#674d8b" },
    ],
  },
  {
    name: "Dr. Raúl Sánchez",
    total: 14,
    breakdown: [
      { subject: "IA", count: 7, fill: "#ffff99" },
      { subject: "Aprendizaje Automático", count: 5, fill: "#b2df8a" },
      { subject: "Robótica", count: 2, fill: "#9c27b0" },
    ],
  },
  {
    name: "Mtra. Estela Romero",
    total: 11,
    breakdown: [
      { subject: "Desarrollo Web", count: 6, fill: "#bebada" },
      { subject: "Diseño UX/UI", count: 3, fill: "#e41a1c" },
      { subject: "Bases de Datos", count: 2, fill: "#1f78b4" },
    ],
  },
  {
    name: "Ing. Juan Pineda",
    total: 16,
    breakdown: [
      { subject: "Redes", count: 8, fill: "#fb9a99" },
      { subject: "Seguridad en Redes", count: 5, fill: "#a27a00" },
      { subject: "Cisco", count: 3, fill: "#a5a58d" },
    ],
  },
  {
    name: "Dra. Carolina Vargas",
    total: 13,
    breakdown: [
      { subject: "Sistemas Operativos", count: 7, fill: "#e31a1c" },
      { subject: "Compiladores", count: 4, fill: "#377eb8" },
      { subject: "Arquitectura de Computadoras", count: 2, fill: "#cab2d6" },
    ],
  },
  {
    name: "Mtro. Óscar Rivera",
    total: 9,
    breakdown: [
      { subject: "POO", count: 5, fill: "#ff7f00" },
      { subject: "Ingeniería de Software", count: 4, fill: "#fdb462" },
    ],
  },
  {
    name: "Dr. Andrés Gutiérres",
    total: 15,
    breakdown: [
      { subject: "Análisis de Algoritmos", count: 10, fill: "#4daf4a" },
      { subject: "Estructuras de Datos", count: 5, fill: "#33a02c" },
    ],
  },
  {
    name: "Lic. Mónica Castro",
    total: 10,
    breakdown: [
      { subject: "Big Data", count: 6, fill: "#565264" },
      { subject: "Ciencia de Datos", count: 4, fill: "#8338ec" },
    ],
  },
  {
    name: "Ing. Fausto Mendoza",
    total: 17,
    breakdown: [
      { subject: "Control", count: 9, fill: "#d81e5b" },
      { subject: "Robótica", count: 8, fill: "#9c27b0" },
    ],
  },
  {
    name: "Dra. Rebeca Salazar",
    total: 12,
    breakdown: [
      { subject: "Sistemas Distribuidos", count: 7, fill: "#bc80bd" },
      { subject: "Computación en la Nube", count: 5, fill: "#ccebc5" },
    ],
  },
  {
    name: "Mtro. Javier Cortés",
    total: 8,
    breakdown: [
      { subject: "Metodologías Ágiles", count: 4, fill: "#8ac926" },
      {
        subject: "Gestión de Proyectos de Software",
        count: 4,
        fill: "#419d78",
      },
    ],
  },
  {
    name: "Dr. Manuel Pérez",
    total: 19,
    breakdown: [
      { subject: "Bases de Datos", count: 12, fill: "#1f78b4" },
      { subject: "Minería de Datos", count: 7, fill: "#2a6f97" },
    ],
  },
  {
    name: "Mtra. Ana Morales",
    total: 10,
    breakdown: [
      { subject: "Criptografía", count: 6, fill: "#4da6ff" },
      { subject: "Hacking Ético", count: 4, fill: "#54b435" },
    ],
  },
  {
    name: "Ing. Carlos Varela",
    total: 16,
    breakdown: [
      { subject: "POO", count: 8, fill: "#ff7f00" },
      { subject: "Programación Funcional", count: 8, fill: "#d29034" },
    ],
  },
  {
    name: "Dra. Sofía Jiménez",
    total: 11,
    breakdown: [
      { subject: "IA", count: 5, fill: "#ffff99" },
      {
        subject: "Procesamiento de Lenguaje Natural",
        count: 3,
        fill: "#8dd3c7",
      },
      { subject: "Aprendizaje Automático", count: 3, fill: "#b2df8a" },
    ],
  },
  {
    name: "Mtro. Pedro López",
    total: 12,
    breakdown: [
      { subject: "Álgebra Lineal", count: 7, fill: "#b15928" },
      { subject: "Cálculo", count: 5, fill: "#6a3d9a" },
    ],
  },
  {
    name: "Ing. Gabriel Ramos",
    total: 14,
    breakdown: [
      { subject: "Sistemas de Información", count: 9, fill: "#6a4c93" },
      { subject: "Inteligencia de Negocios", count: 5, fill: "#39393c" },
    ],
  },
  {
    name: "Dra. Laura Flores",
    total: 11,
    breakdown: [
      { subject: "IoT", count: 6, fill: "#a65628" },
      { subject: "Sistemas Embebidos", count: 5, fill: "#984ea3" },
    ],
  },
  {
    name: "Mtro. Héctor Durán",
    total: 13,
    breakdown: [
      { subject: "Visión por Computadora", count: 7, fill: "#2e294e" },
      { subject: "Procesamiento de Imágenes", count: 6, fill: "#674d8b" },
    ],
  },
  {
    name: "Ing. Fernanda Torres",
    total: 10,
    breakdown: [
      { subject: "Estructuras de Datos", count: 5, fill: "#33a02c" },
      { subject: "Análisis de Algoritmos", count: 5, fill: "#4daf4a" },
    ],
  },
  {
    name: "Dr. Jorge Medina",
    total: 18,
    breakdown: [
      { subject: "DevOps", count: 9, fill: "#136f63" },
      { subject: "Sistemas Operativos", count: 5, fill: "#e31a1c" },
      { subject: "Ingeniería de Software", count: 4, fill: "#fdb462" },
    ],
  },
  {
    name: "Dra. Diana Castro",
    total: 10,
    breakdown: [
      { subject: "Visión por Computadora", count: 6, fill: "#2e294e" },
      { subject: "Procesamiento de Imágenes", count: 4, fill: "#674d8b" },
    ],
  },
  {
    name: "Mtro. Javier Salazar",
    total: 15,
    breakdown: [
      { subject: "Metodologías Ágiles", count: 8, fill: "#8ac926" },
      { subject: "DevOps", count: 7, fill: "#136f63" },
    ],
  },
  {
    name: "Ing. Elena Fuentes",
    total: 12,
    breakdown: [
      { subject: "Inteligencia de Negocios", count: 7, fill: "#39393c" },
      { subject: "Ciencia de Datos", count: 5, fill: "#8338ec" },
    ],
  },
];

export const chartConfig = {
  total: { label: "Total Asesorías", color: "#4a4a4a" },
  IA: { label: "Inteligencia Artificial", color: "#ffff99" },
  POO: { label: "Programación Orientada a Objetos", color: "#ff7f00" },
  Tópicos: { label: "Tópicos Avanzados", color: "#ffed6f" },
  "Álgebra Lineal": { label: "Álgebra Lineal", color: "#b15928" },
  Redes: { label: "Redes de Computadoras", color: "#fb9a99" },
  Cálculo: { label: "Cálculo Diferencial", color: "#6a3d9a" },
  "Bases de Datos": { label: "Bases de Datos", color: "#1f78b4" },
  "Estructuras de Datos": { label: "Estructuras de Datos", color: "#33a02c" },
  "Sistemas Operativos": { label: "Sistemas Operativos", color: "#e31a1c" },
  "Matemáticas Discretas": { label: "Matemáticas Discretas", color: "#a6cee3" },
  "Seguridad Informática": { label: "Seguridad Informática", color: "#fdbf6f" },
  "Arquitectura de Computadoras": {
    label: "Arquitectura de Computadoras",
    color: "#cab2d6",
  },
  "Aprendizaje Automático": {
    label: "Aprendizaje Automático",
    color: "#b2df8a",
  },
  "Procesamiento de Lenguaje Natural": {
    label: "Procesamiento de Lenguaje Natural",
    color: "#8dd3c7",
  },
  "Desarrollo Web": { label: "Desarrollo Web", color: "#bebada" },
  "Ingeniería de Software": {
    label: "Ingeniería de Software",
    color: "#fdb462",
  },
  "Pruebas de Software": { label: "Pruebas de Software", color: "#fccde5" },
  "Sistemas Distribuidos": { label: "Sistemas Distribuidos", color: "#bc80bd" },
  "Computación en la Nube": {
    label: "Computación en la Nube",
    color: "#ccebc5",
  },
  IoT: { label: "Internet de las Cosas", color: "#a65628" },
  "Sistemas Embebidos": { label: "Sistemas Embebidos", color: "#984ea3" },
  "Análisis de Algoritmos": {
    label: "Análisis de Algoritmos",
    color: "#4daf4a",
  },
  "Interacción Humano-Computadora": {
    label: "Interacción Humano-Computadora",
    color: "#999999",
  },
  "Diseño UX/UI": { label: "Diseño UX/UI", color: "#e41a1c" },
  Compiladores: { label: "Compiladores", color: "#377eb8" },
  Criptografía: { label: "Criptografía", color: "#4da6ff" },
  "Seguridad en Redes": { label: "Seguridad en Redes", color: "#a27a00" },
  "Hacking Ético": { label: "Hacking Ético", color: "#54b435" },
  "Programación Funcional": {
    label: "Programación Funcional",
    color: "#d29034",
  },
  Cisco: { label: "Certificación Cisco", color: "#a5a58d" },
  "Big Data": { label: "Big Data", color: "#565264" },
  "Minería de Datos": { label: "Minería de Datos", color: "#2a6f97" },
  "Sistemas de Información": {
    label: "Sistemas de Información",
    color: "#6a4c93",
  },
  "Gestión de Proyectos de Software": {
    label: "Gestión de Proyectos de Software",
    color: "#419d78",
  },
  Robótica: { label: "Robótica", color: "#9c27b0" },
  Control: { label: "Teoría de Control", color: "#d81e5b" },
  "Visión por Computadora": {
    label: "Visión por Computadora",
    color: "#2e294e",
  },
  "Procesamiento de Imágenes": {
    label: "Procesamiento de Imágenes",
    color: "#674d8b",
  },
  "Metodologías Ágiles": { label: "Metodologías Ágiles", color: "#8ac926" },
  DevOps: { label: "DevOps", color: "#136f63" },
  "Inteligencia de Negocios": {
    label: "Inteligencia de Negocios",
    color: "#39393c",
  },
  "Ciencia de Datos": { label: "Ciencia de Datos", color: "#8338ec" },
} satisfies ChartConfig;
