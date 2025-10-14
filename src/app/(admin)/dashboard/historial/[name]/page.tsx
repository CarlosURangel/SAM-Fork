"use client";
import React, { useEffect, useState } from 'react'
import { TableBase } from '@/components/tables/TableBase';
import { columnsHistoryAdmin } from '@/const/History';
import { HistoryAdmin } from '@/types/table';
import { useParams } from 'next/navigation';
import { historyAdminApi, studentsApi } from '@/types/apis';


const page = () => {

    const params = useParams();

    const [dataHistoryAdmin, setDataHistoryAdmin] = useState<HistoryAdmin[]>([]);
    const [teacher, setTeacher] = useState<string>('');

    useEffect(() => {
        document.title = 'Alumnos Asignados';

        const fetchStudents = async () => {
            try {
                const response = await fetch('/api/advisories', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });
                const data: historyAdminApi = await response.json();
                // const newData: StudentAssigned[] = data.students.map((student) => ({
                //     exp: student.expedient,
                //     nameStudent: student.fullName,
                //     career: student.career.name,
                //     semester: student.semester,
                // }));
                // setDataStudentAssigned(newData)
                console.log(data);
                
            } catch (error) {
                console.error('Error al obtener los profesores:', error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <section className='mx-16 mt-28 flex-1'>
            <h1 className='text-3xl mb-5'>Historial</h1>
            <TableBase<HistoryAdmin> data={dataHistoryAdmin} columns={columnsHistoryAdmin} searchBy='nameTeacher' />
        </section>
    )
}

export default page;
