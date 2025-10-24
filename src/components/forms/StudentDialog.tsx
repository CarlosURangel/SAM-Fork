"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- Componentes Internos (se mantienen igual para consistencia de layout) ---
const TextInput = ({ label, value, onChange, className, ...props }: any) => (
  <div className={`grid w-full items-center gap-1.5 ${className}`}>
    <Label htmlFor={props.id || label}>{label}</Label>
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      id={props.id || label}
      {...props}
    />
  </div>
);
const SelectForm = ({
  label,
  value,
  onValueChange,
  placeholder,
  options,
  className,
}: any) => (
  <div className={`grid w-full items-center gap-1.5 ${className}`}>
    <Label htmlFor={label}>{label}</Label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id={label}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option: any) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

// --- Tipos ---
type Career = { idCareer: string; name: string };
// Usamos un tipo similar al de las columnas
type StudentData = {
  idStudent: string;
  fullName: string;
  expedient: string;
  semester: number;
  idCareer: string;
};

// --- Componente Principal del Diálogo (Modificado) ---
export const StudentDialog = ({
  studentToEdit,
  onActionComplete,
  open,
  onOpenChange,
  cveMaestro,
}: {
  studentToEdit: StudentData | null; // Si es null, creamos. Si tiene datos, editamos.
  onActionComplete: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cveMaestro?: string;
}) => {
  // Estados del formulario
  const [fullName, setFullName] = useState("");
  const [expedient, setExpedient] = useState("");
  const [semester, setSemester] = useState("");
  const [idCareer, setIdCareer] = useState("");
  // Estado para las carreras y errores
  const [careers, setCareers] = useState<Career[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isEditMode = studentToEdit !== null;

  // Efecto para llenar el formulario cuando se abre
  useEffect(() => {
    if (open) {
      if (isEditMode) {
        // Modo Edición: Llenar con datos existentes
        setFullName(studentToEdit.fullName);
        setExpedient(studentToEdit.expedient);
        setSemester(String(studentToEdit.semester));
        setIdCareer(studentToEdit.idCareer);
      } else {
        // Modo Creación: Limpiar el formulario
        resetForm();
      }

      // Cargar carreras en ambos modos
      const fetchCareers = async () => {
        try {
          const response = await fetch("/api/careers");
          if (!response.ok) throw new Error("Error al cargar carreras");
          setCareers(await response.json());
        } catch (err) {
          setError("No se pudieron cargar las carreras.");
        }
      };
      fetchCareers();
    }
  }, [studentToEdit, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const url = isEditMode ? "/api/students/update" : "/api/students/register";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          idStudent: isEditMode ? studentToEdit.idStudent : undefined,
          fullName,
          expedient,
          semester: Number(semester),
          idCareer,
          cveMaestroBody: cveMaestro ?? "",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            `Error al ${isEditMode ? "actualizar" : "crear"} el alumno`
        );
      }

      onActionComplete(); // Llama a la función para refrescar la tabla
      onOpenChange(false); // Cierra el modal
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFullName("");
    setExpedient("");
    setSemester("");
    setIdCareer("");
    setError(null);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) resetForm();
      }}
    >
      <DialogContent className="w-full grid items-center gap-8 md:gap-12 max-w-[40vw] p-10">
        <DialogHeader>
          <DialogTitle className="text-center font-medium text-2xl">
            {isEditMode ? "Editar Alumno" : "Añadir Alumno"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <TextInput
              label="Nombre Completo:"
              value={fullName}
              onChange={setFullName}
              className="col-span-2"
              maxLength={70}
            />
            <TextInput
              label="Expediente:"
              value={expedient}
              onChange={setExpedient}
              className="col-span-1"
              disabled={isEditMode}
              maxLength={6}
              type="number"
            />
            <SelectForm
              label="Semestre:"
              value={semester}
              onValueChange={setSemester}
              options={Array.from({ length: 8 }, (_, i) => ({
                value: String(i + 1),
                label: `${i + 1}° Semestre`,
              }))}
              className="col-span-1"
            />
            <SelectForm
              label="Carrera:"
              value={idCareer}
              onValueChange={setIdCareer}
              options={careers.map((c) => ({
                value: c.idCareer,
                label: c.name,
              }))}
              className="col-span-2"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center -mt-4">{error}</p>
          )}
          <DialogFooter className="h-11 justify-center">
            <Button type="submit" className="h-full w-80 bg-[#083C6E]">
              {isEditMode ? "Guardar Cambios" : "Añadir Alumno"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
