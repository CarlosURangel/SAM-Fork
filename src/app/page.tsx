"use client"
import { columnasAlumnos, Alumno } from "@/components/ui/columns/AlumnosColumns"
import { DataTable } from "@/components/ui/DataTable"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"


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
  ]

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4"> Alumnos</h1>
      <DataTable columns={columnasAlumnos} data={datos} />

      <div className="mt-8">
        <Button>Click me</Button>
        <Textarea/>
      </div>
    </div>
  )
}
