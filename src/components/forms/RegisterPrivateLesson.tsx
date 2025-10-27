"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { TextInput } from "./TextInput";
import { SelectForm } from "./SelectForm";
import { DateTimeInput } from "./DateTimeInput";
import { HistoryAdmin } from "@/types/table";
import { FullStudentData } from "@/types/advisory";

export type FullAdvisoryData = {
  idAdvisory: string;
  advisoryDate: string | null;
  cveMaestro?: string;
  topic: string | null;
  status: string;
  student: FullStudentData;
  subject: { idSubject: string; name: string };
};

type Subject = { idSubject: string; name: string };

export const AdvisoryDialog = ({
  studentForNew,
  advisoryToEdit,
  open,
  onOpenChange,
  onActionComplete,
}: {
  studentForNew?: FullStudentData | null;
  advisoryToEdit?: FullAdvisoryData | HistoryAdmin | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActionComplete: () => void;
}) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [idSubject, setIdSubject] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [advisoryDateTime, setAdvisoryDateTime] = useState("");
  const [topic, setTopic] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isEditMode = advisoryToEdit != null;
  const student = isEditMode ? advisoryToEdit.student : studentForNew;
  const cveMaestro = advisoryToEdit?.cveMaestro || "";
  console.log(cveMaestro);

  useEffect(() => {
    if (open && student) {
      if (isEditMode && advisoryToEdit) {
        setTopic(advisoryToEdit.topic || "");
        setIdSubject(advisoryToEdit.subject.idSubject);
        setSubjectName(advisoryToEdit.subject.name);
        if (advisoryToEdit.advisoryDate) {
          const date = new Date(advisoryToEdit.advisoryDate);
          const localDate = new Date(
            date.getTime() - date.getTimezoneOffset() * 60000
          );
          setAdvisoryDateTime(localDate.toISOString().slice(0, 16));
        }
      } else {
        resetForm();
      }

      const fetchSubjects = async () => {
        try {
          const response = await fetch("/api/subjects/filter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idCareer: student.idCareer,
              semester: student.semester,
            }),
          });

          const data = await response.json();

          console.log("Datos enviados a la API:", {
            idCareer: student.idCareer,
            semester: student.semester,
          });
          console.log("Respuesta completa de la API:", data);
          if (!response.ok) {
            if (response.status === 404) {
              setSubjects([]);
              return;
            }
            throw new Error("No se pudieron cargar las materias");
          }
          setSubjects(data);
        } catch (err) {
          setError("Error al cargar materias del alumno.");
          console.log("Error", err);
        }
      };
      fetchSubjects();
    }
  }, [open, student, advisoryToEdit, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;
    setError(null);
    const url = isEditMode
      ? "/api/advisories/update"
      : "/api/advisories/register";
    const method = isEditMode ? "PUT" : "POST";
    const advisoryDateOnly = advisoryDateTime.split("T")[0];
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          idAdvisory: isEditMode ? advisoryToEdit.idAdvisory : undefined,
          expStudent: student.expedient,
          idSubject,
          advisoryDate: advisoryDateOnly,
          topic,
          cveMaestroBody: cveMaestro ?? "",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            `Error al ${isEditMode ? "actualizar" : "registrar"} la asesoría.`
        );
      }
      console.log(await response.json());

      toast.success(
        isEditMode
          ? "Asesoría actualizada exitosamente"
          : "Asesoría registrada exitosamente",
        {
          description: `La asesoría para ${student.fullName} ha sido guardada.`,
        }
      );

      onActionComplete();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message);
      toast.error(
        `Error al ${isEditMode ? "actualizar" : "registrar"} la asesoría`,
        {
          description: err.message,
        }
      );
    }
  };

  const handleSubjectChange = (name: string) => {
    setSubjectName(name);
    const selected = subjects.find((s) => s.name === name);
    if (selected) setIdSubject(selected.idSubject);
  };

  const resetForm = () => {
    setIdSubject("");
    setSubjectName("");
    setAdvisoryDateTime("");
    setTopic("");
    setError(null);
    setSubjects([]);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) resetForm();
      }}
    >
      {/* El DialogContent responsivo se mantiene */}
      <DialogContent className="w-full grid items-center gap-8 md:gap-12 max-w-[90vw] md:max-w-3xl p-6 md:p-10 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center font-medium text-2xl">
            {isEditMode ? "Editar Asesoría" : "Registro de Asesoría"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Este grid ya está perfecto: 1 columna en móvil, 6 en desktop */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-7">
            <TextInput
              label="Alumno:"
              value={student?.fullName || ""}
              onChange={() => {}}
              className="col-span-6" // 100% en ambas vistas
              disabled
            />

            {/* --- 1. AQUÍ EL CAMBIO --- */}
            {/*
              - col-span-1: (Móvil) Ocupa 1/1 (toda la línea)
              - md:col-span-3: (Desktop) Ocupa 3/6 (50%)
            */}
            <DateTimeInput
              label="Fecha de la asesoría:"
              value={advisoryDateTime}
              onChange={setAdvisoryDateTime}
              className="col-span-1 md:col-span-3"
            />

            {/* --- 2. AQUÍ EL CAMBIO --- */}
            {/*
              - col-span-1: (Móvil) Ocupa 1/1 (toda la línea)
              - md:col-span-3: (Desktop) Ocupa 3/6 (50%)
            */}
            <SelectForm
              label="Materia:"
              selectLabel="Materias"
              placeholder="Seleccione una materia..."
              value={subjectName}
              onChange={handleSubjectChange}
              options={subjects.map((s) => s.name)}
              className="col-span-1 md:col-span-3"
            />

            {/* --- 3. AQUÍ EL CAMBIO --- */}
            {/*
              - col-span-1: (Móvil) Ocupa 1/1 (toda la línea)
              - md:col-span-6: (Desktop) Ocupa 6/6 (100%)
            */}
            <div className="grid w-full gap-2 col-span-1 md:col-span-6">
              <Label htmlFor="tema">Tema visto:</Label>
              <Textarea
                id="tema"
                placeholder="Escriba el tema principal..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full resize-y"
                maxLength={255}
              />
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center -mt-4">{error}</p>
          )}

          {/* El botón responsivo se mantiene */}
          <DialogFooter className="h-11 justify-center">
            <Button
              type="submit"
              className="h-full w-full md:w-80 bg-[#083C6E]"
            >
              {isEditMode ? "Guardar Cambios" : "Registrar Asesoría"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
