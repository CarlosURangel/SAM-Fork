"use client";

import { DataTable } from "@/components/ui/dataTable";
import {
  columnasAlumnos,
  Alumno,
} from "@/components/ui/columns/AlumnosColumns";
import {
  columnasProfesores,
  Profesor,
} from "@/components/ui/columns/ProfesoresColumns";
import {
  columnasRegistros,
  Registro,
} from "@/components/ui/columns/RegistrosColumns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Sidebar from "@/components/ui/sidebar";
// import Chart from "@/components/chars/ChartTutoringPerSubject";
import { AsesoriasChart } from "@/components/Asesorias-chart";

export default function Home() {
  //Información de ejemplo
  const alumnos: Alumno[] = [
    {
      expediente: "A001",
      nombre: "Carlos López",
      carrera: "Contaduría",
      semestre: "6",
    },
    {
      expediente: "A002",
      nombre: "María Pérez",
      carrera: "Ingeniería",
      semestre: "4",
    },
  ];

  const profesores: Profesor[] = [
    { nombre: "Dr. Ramírez", asesorias: 12 },
    { nombre: "Mtra. González", asesorias: 8 },
  ];

  const registros: Registro[] = [
    {
      nombre: "Carlos López",
      fecha: "2025-08-20",
      carrera: "Contaduría",
      semestre: "6",
      materia: "Matemáticas",
    },
    {
      nombre: "María Pérez",
      fecha: "2025-08-22",
      carrera: "Ingeniería",
      semestre: "4",
      materia: "Física",
    },
  ];

  return (
    <div className="min-h-screen">
      <Sidebar />

      <main className="pl-64 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Alumnos</h1>
        <div className="space-y-10 p-6">
          <section>
            <h2 className="text-xl font-bold mb-4">Tabla de Alumnos</h2>
            <DataTable columns={columnasAlumnos} data={alumnos} />
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Tabla de Profesores</h2>
            <DataTable columns={columnasProfesores} data={profesores} />
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Tabla de Registros</h2>
            <DataTable columns={columnasRegistros} data={registros} />
          </section>
        </div>
        {/* <Chart /> */}
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col gap-4 w-full lg:w-5/12">
            <Button>Click me</Button>
            <Textarea />
          </div>
        </div>
        <div className="mt-8">
          <AsesoriasChart />
        </div>
      </main>
    </div>
  );
}
