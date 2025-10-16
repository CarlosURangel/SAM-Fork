"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { PlusIcon } from "lucide-react";

// --- Componentes de Formulario Internos para replicar tu layout ---

// Componente para un campo de texto con su etiqueta
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

// Componente para un campo de select con su etiqueta
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

// --- Componente Principal del Diálogo ---

type Career = { idCareer: string; name: string };

export const AddStudentDialog = ({
  onStudentAdded,
}: {
  onStudentAdded: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentExp, setStudentExp] = useState("");
  const [semester, setSemester] = useState("");
  const [careerId, setCareerId] = useState("");
  const [careers, setCareers] = useState<Career[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchCareers = async () => {
        try {
          const response = await fetch("/api/careers");
          if (!response.ok) throw new Error("Error al cargar carreras");
          const data: Career[] = await response.json();
          setCareers(data);
        } catch (err) {
          setError("No se pudieron cargar las carreras.");
        }
      };
      fetchCareers();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/students/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fullName: studentName,
          expedient: studentExp,
          semester: Number(semester),
          idCareer: careerId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al añadir el alumno");
      }

      onStudentAdded();
      resetForm();
      setIsOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setStudentName("");
    setStudentExp("");
    setSemester("");
    setCareerId("");
    setError(null);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-10 bg-[#083C6E] text-slate-50 flex items-center gap-2"
        >
          <>
            <PlusIcon className="h-4 w-4" />
            <span>Añadir alumno</span>
          </>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full grid items-center gap-8 md:gap-12 max-w-[40vw] p-10 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center font-medium text-2xl">
            Añadir Alumno
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Usamos tu estructura de grid original */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <TextInput
              label="Nombre Completo:"
              placeholder="Nombre del alumno..."
              value={studentName}
              onChange={setStudentName}
              className="col-span-2"
            />
            <TextInput
              label="Expediente:"
              placeholder="123456"
              value={studentExp}
              onChange={setStudentExp}
              className="col-span-1"
            />
            <SelectForm
              label="Semestre:"
              placeholder="Seleccione un semestre"
              value={semester}
              onValueChange={setSemester}
              options={Array.from({ length: 9 }, (_, i) => ({
                value: String(i + 1),
                label: `${i + 1}° Semestre`,
              }))}
              className="col-span-1"
            />
            <SelectForm
              label="Carrera:"
              placeholder="Seleccione una carrera"
              value={careerId}
              onValueChange={setCareerId}
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
              Añadir Alumno
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
