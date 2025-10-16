"use client";
import React, { useEffect, useState, useCallback } from "react";
import { AddStudentDialog } from "@/components/forms/AddStudentDialog";
import { TableBase } from "@/components/tables/TableBase";
import { StudentAssigned } from "@/types/table";
import { columnsStudentAssigned } from "@/const/StudentAssigned";

// Este tipo representa la estructura de cada objeto en el array
// que devuelve tu API GET /api/students
type StudentFromApi = {
  expedient: string;
  fullName: string;
  semester: number;
  career: {
    name: string;
  };
};

const Page = () => {
  const [dataStudentAssigned, setDataStudentAssigned] = useState<
    StudentAssigned[]
  >([]);

  // Creamos la función para obtener los datos y la envolvemos en useCallback
  // para poder pasarla de forma segura al componente del modal.
  const fetchMyStudents = useCallback(async () => {
    try {
      // Usamos la API correcta que obtiene los alumnos del profesor logueado
      const response = await fetch("/api/students", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Importante para enviar la cookie de sesión
      });

      if (!response.ok) {
        console.error("Error al obtener los alumnos:", response.statusText);
        setDataStudentAssigned([]); // En caso de error, dejamos la tabla vacía
        return;
      }

      const studentsFromApi: StudentFromApi[] = await response.json();

      // Mapeamos los datos de la API al formato que la tabla espera
      const formattedData: StudentAssigned[] = studentsFromApi.map(
        (student) => ({
          exp: student.expedient,
          nameStudent: student.fullName,
          career: student.career.name,
          semester: student.semester.toString(), // Convertimos el semestre a string
        })
      );

      setDataStudentAssigned(formattedData);
    } catch (error) {
      console.error(
        "Ocurrió un error al procesar la solicitud de alumnos:",
        error
      );
      setDataStudentAssigned([]);
    }
  }, []); // El array vacío asegura que la función no se recree innecesariamente

  // Este useEffect se ejecuta solo una vez cuando el componente se monta
  useEffect(() => {
    document.title = "Mis Alumnos";
    fetchMyStudents();
  }, [fetchMyStudents]);

  return (
    <section className="mx-16 mt-28 flex-1">
      <div className="flex flex-row w-full justify-between items-center mb-5">
        <h1 className="text-3xl font-semibold">Mis Alumnos</h1>
        {/* Pasamos la función de recarga al modal */}
        <AddStudentDialog onStudentAdded={fetchMyStudents} />
      </div>
      {/* La tabla ahora usa los datos del estado y las columnas correctas */}
      <TableBase<StudentAssigned>
        data={dataStudentAssigned}
        columns={columnsStudentAssigned}
        searchBy="exp"
      />
    </section>
  );
};

export default Page;
