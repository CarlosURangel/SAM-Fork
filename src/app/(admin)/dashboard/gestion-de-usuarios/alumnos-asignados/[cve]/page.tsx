"use client";
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TableBase } from '@/components/tables/TableBase';
import { StudentAssigned } from '@/types/table';
import { createStudentsColumns } from '@/const/StudentAssigned';
import { useParams, useRouter } from 'next/navigation';
import { studentsApi } from '@/types/apis';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { FullStudentData } from '@/const/StudentAssignedTable';
import { StudentDialog } from '@/components/forms/StudentDialog';


const page = () => {

    const router = useRouter();
    const params = useParams();

    const [allStudents, setAllStudents] = useState<FullStudentData[]>([]);
    const [teacher, setTeacher] = useState<string>('');
    console.log(allStudents);

    // Estados para el modal de Alumno
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [studentToEdit, setStudentToEdit] = useState<FullStudentData | null>(
        null
    );

    const colums2Search = ['expedient', 'fullName', 'career.name', 'semester'];

    const rute = `/api/teachers/${params.cve}`

    const fetchMyStudents = useCallback(async () => {
        try {
            const response = await fetch(rute, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error("Error al cargar alumnos");
            const data = await response.json();
            setAllStudents(data.students);
            setTeacher(data.fullName);
        } catch (error) {
            console.error(error);
            setAllStudents([]);
        }
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

    const handleStudentActionComplete = () => {
        setIsStudentModalOpen(false);
        fetchMyStudents();
    };

    const handleViewHistory = (student: FullStudentData) => {
        router.push(
            `/dashboard/historial/${encodeURIComponent(student.fullName)}`
        );
    };

    useEffect(() => {
        document.title = 'Alumnos Asignados';

        fetchMyStudents();
    }, []);

    const columns = useMemo(
        () =>
            createStudentsColumns(
                handleEditStudent,
                handleViewHistory,
            ),
        []
    );

    return (
        <section className='mx-16 mt-28 flex-1'>
            <div className="flex flex-row w-full justify-between items-center mb-5">
                <div className='flex flex-col gap-5'>
                    <h1 className='text-3xl font-semibold'>Alumnos Asignados</h1>
                    <p className='text-2xl'>Profesor: {teacher}</p>
                </div>
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
                cveMaestro={params.cve?.toString()}
            />

            <TableBase<FullStudentData> data={allStudents} columns={columns} searchBy={colums2Search} />
        </section>
    )
}

export default page;
