"use client";

import {
  columnasAlumnos,
  Alumno,
} from "@/components/ui/columns/AlumnosColumns";
import { DataTable } from "@/components/ui/dataTable";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AsesoriasPorMateriaChart } from "@/components/ui/materiaChart";
import { AsesoriasPorDocenteChart } from "@/components/ui/docenteChart";

//datos de ejemplo
const datosMateria = [
  { materia: "Introducción a la Programación", total: 12 },
  { materia: "Algoritmos", total: 8 },
  { materia: "Estructura de Datos", total: 5 },
  { materia: "Inteligencia Artificial ", total: 5 },
  { materia: "Servicios Cloud", total: 5 },
  { materia: "Diseño de Interfaces", total: 5 },
];

const datosDocentes = [
  { nombre: "Viviana Michell Campbell Rodriguez ", total: 22 },
  { nombre: "Andrea Elizabeth Gongora Tun", total: 19 },
  { nombre: "Carlo Giovanni Cetina", total: 17 },
  { nombre: "Cesar Estevez Serrato", total: 14 },
  { nombre: "Luis Antonio Diaz Jimenez", total: 9 },
];

export default function Home() {
  //Información de ejemplo
  const datos: Alumno[] = [
    {
      expediente: "315266",
      nombre: "Mario Pérez",
      carrera: "Ingeniería en Sistemas",
      semestre: "5",
    },
    {
      expediente: "315267",
      nombre: "Carlos Rangel",
      carrera: "Informática",
      semestre: "6",
    },
    {
      expediente: "315268",
      nombre: "Lautaro Martínez",
      carrera: "Computación",
      semestre: "4",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4"> Alumnos</h1>
      <DataTable columns={columnasAlumnos} data={datos} />

      <div className="mt-8">
        <Button>Click me</Button>
        <Textarea />
      </div>
      <div className="w-7/12">
        <AsesoriasPorMateriaChart data={datosMateria} />
      </div>
      <AsesoriasPorDocenteChart data={datosDocentes} />

      {/* <AsesoriasPorDocenteChart data ={AsesoriaDocenteData}/> */}
    </div>
  );
}
