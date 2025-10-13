"use client";
import React, { useEffect, useState } from 'react'
import { TableBase } from '@/components/tables/TableBase';
import { StudentAssigned } from '@/types/table';
import { columnsStudentAssigned, dataStudentAssigned } from '@/const/StudentAssigned';
import { useParams } from 'next/navigation';


const page = () => {

    const params = useParams();

    const [dataStudentAssigned, setDataStudentAssigned] = useState<StudentAssigned[]>([]);

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
                const data = await response.json();
                // const newData: UserManagement[] = data.map((teacher: teachersApi) => ({
                //     nameTeacher: teacher.fullName,
                //     students: 'ver',
                //     stadistics: 'ver',
                //     total: teacher.TotalAdvisories,
                //     cveTeacher: teacher.cveMaestro
                // }));
                // console.log(newData);
                // setDataUserManagement(newData)
                console.log(data);

            } catch (error) {
                console.error('Error al obtener los profesores:', error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <section className='mx-16 mt-28 flex-1'>
            <h1 className='text-3xl'>Gestión de Usuarios</h1>
            <TableBase<StudentAssigned> data={dataStudentAssigned} columns={columnsStudentAssigned} searchBy='exp' />
        </section>
    )
}

export default page;
