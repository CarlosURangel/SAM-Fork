"use client";
import React, { useEffect, useState } from 'react'
import { TableBase } from '@/components/tables/TableBase';
import { StudentAssigned } from '@/types/table';
import { columnsStudentAssigned } from '@/const/StudentAssigned';
import { useParams } from 'next/navigation';
import { studentsApi } from '@/types/apis';


const page = () => {

    const params = useParams();

    const [dataStudentAssigned, setDataStudentAssigned] = useState<StudentAssigned[]>([]);
    const [teacher, setTeacher] = useState<string>('');

    useEffect(() => {
        document.title = 'Alumnos Asignados';

        const rute = `/api/teachers/${params.cve}`

        const fetchStudents = async () => {
            try {
                const response = await fetch(rute, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });
                const data:studentsApi = await response.json();
                const newData: StudentAssigned[] = data.students.map((student) => ({
                    exp: student.expediente,
                    nameStudent: student.fullName,
                    career: student.career,
                    semester: student.semester,
                }));
                setDataStudentAssigned(newData)
                setTeacher(data.fullName);

            } catch (error) {
                console.error('Error al obtener los profesores:', error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <section className='mx-16 mt-28 flex-1'>
            <div className='flex flex-col gap-5'>
                <h1 className='text-3xl font-semibold'>Alumnos Asignados</h1>
                <p className='text-2xl'>Profesor: {teacher}</p>
            </div>
            <TableBase<StudentAssigned> data={dataStudentAssigned} columns={columnsStudentAssigned} searchBy='exp' />
        </section>
    )
}

export default page;
