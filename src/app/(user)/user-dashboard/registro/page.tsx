"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { StudentDialog } from "@/components/forms/StudentDialog";
import { AdvisoryDialog } from "@/components/forms/RegisterPrivateLesson";
import { TableBase } from "@/components/tables/TableBase";
import {
  createStudentColumns
} from "@/const/StudentAssignedTable";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FullStudentData } from "@/types/advisory";
import { getStudents } from "@/lib/dataStudent";

const Page = () => {
  const router = useRouter();
  const [allStudents, setAllStudents] = useState<FullStudentData[]>([]);

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<FullStudentData | null>(
    null
  );

  const colums2Search = ['expedient', 'fullName', 'career.name', 'semester'];

  const [isAdvisoryModalOpen, setIsAdvisoryModalOpen] = useState(false);
  const [studentForNewAdvisory, setStudentForNewAdvisory] =
    useState<FullStudentData | null>(null);

  const fetchMyStudents = useCallback(async () => {
    const data = await getStudents()
    setAllStudents(data)
  }, []);

  useEffect(() => {
    document.title = "Mis Alumnos";
    fetchMyStudents();
  }, [fetchMyStudents]);

  const handleEditStudent = (student: FullStudentData) => {
    setStudentToEdit(student);
    setIsStudentModalOpen(true);
  };

  const handleAddStudent = () => {
    setStudentToEdit(null);
    setIsStudentModalOpen(true);
  };

  const handleRegisterAdvisory = (student: FullStudentData) => {
    setStudentForNewAdvisory(student);
    setIsAdvisoryModalOpen(true);
  };

  const handleViewHistory = (student: FullStudentData) => {
    router.push(
      `/user-dashboard/historialAsesorias/${encodeURIComponent(student.fullName)}`
    );
  };

  const handleStudentActionComplete = () => {
    setIsStudentModalOpen(false);
    fetchMyStudents();
  };

  const handleAdvisoryActionComplete = () => {
    setIsAdvisoryModalOpen(false);
  };

  const columns = useMemo(() =>
    createStudentColumns(handleEditStudent, handleRegisterAdvisory, handleViewHistory)
    , []);

  return (
    <section className="mx-16 mt-28 flex-1">
      <div className="flex flex-row w-full justify-between items-center mb-5">
        <h1 className="text-3xl font-semibold">Mis Alumnos</h1>
        <Button
          onClick={handleAddStudent}
          className="h-10 bg-[#083C6E] text-slate-50 ..."
        >
          <PlusIcon className="h-4 w-4" />
          <span>Añadir alumno</span>
        </Button>
      </div>

      <StudentDialog
        studentToEdit={studentToEdit}
        onActionComplete={handleStudentActionComplete}
        open={isStudentModalOpen}
        onOpenChange={setIsStudentModalOpen}
      />

      <AdvisoryDialog
        studentForNew={studentForNewAdvisory}
        onActionComplete={handleAdvisoryActionComplete}
        open={isAdvisoryModalOpen}
        onOpenChange={setIsAdvisoryModalOpen}
      />

      <TableBase<FullStudentData>
        data={allStudents}
        columns={columns}
        searchBy={colums2Search}
      />
    </section>
  );
};

export default Page;
