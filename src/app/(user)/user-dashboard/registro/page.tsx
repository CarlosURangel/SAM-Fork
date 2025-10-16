"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { StudentDialog } from "@/components/forms/AddStudentDialog"; // Puede que necesites renombrar el import si el archivo se llama AddStudentDialog.tsx
import { TableBase } from "@/components/tables/TableBase";
import { createStudentColumns, FullStudentData } from "@/const/StudentAssignedTable"; // Importamos la función y el tipo
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Page = () => {
  // Este estado ahora guardará los datos completos de la API
  const [allStudents, setAllStudents] = useState<FullStudentData[]>([]);
  
  // Estados para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<FullStudentData | null>(null);

  const fetchMyStudents = useCallback(async () => {
    try {
      const response = await fetch("/api/students");
      if (!response.ok) throw new Error('Error al cargar alumnos');
      const data = await response.json();
      setAllStudents(data);
    } catch (error) {
      console.error(error);
      setAllStudents([]);
    }
  }, []);

  useEffect(() => {
    document.title = "Mis Alumnos";
    fetchMyStudents();
  }, [fetchMyStudents]);

  // --- Manejadores de acciones que la página controlará ---
  const handleEdit = (student: FullStudentData) => {
    setStudentToEdit(student); // Guardamos el alumno a editar
    setIsModalOpen(true);      // Abrimos el modal
  };
  
  const handleAdd = () => {
    setStudentToEdit(null); // Nos aseguramos que no hay datos de edición
    setIsModalOpen(true);   // Abrimos el modal
  };

  const handleActionComplete = () => {
      setIsModalOpen(false); // Cerramos el modal
      fetchMyStudents();    // Y refrescamos la tabla para ver los cambios
  };

  // Creamos las columnas pasando la función `handleEdit`
  const columns = useMemo(() => createStudentColumns(handleEdit), []);

  return (
    <section className="mx-16 mt-28 flex-1">
      <div className="flex flex-row w-full justify-between items-center mb-5">
        <h1 className="text-3xl font-semibold">Mis Alumnos</h1>
        {/* Este botón ahora solo llama a nuestra función para abrir el modal en modo "añadir" */}
        <Button onClick={handleAdd} className="h-10 bg-[#083C6E] text-slate-50 flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            <span>Añadir alumno</span>
        </Button>
      </div>

      {/* El modal ahora vive aquí y es controlado por el estado de la página */}
      <StudentDialog 
        studentToEdit={studentToEdit}
        onActionComplete={handleActionComplete}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
      
      {/* La tabla ahora recibe los datos completos y las columnas dinámicas */}
      <TableBase<FullStudentData>
        data={allStudents}
        columns={columns}
        searchBy="expedient"
      />
    </section>
  );
};

export default Page;