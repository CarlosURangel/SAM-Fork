"use client";
import React, { useEffect, useState } from 'react'
import { TableBase } from '@/components/tables/TableBase';
import { columnsHistoryAdmin } from '@/const/History';
import { HistoryAdmin } from '@/types/table';
import { advisoriesApi } from '@/types/apis';


const page = () => {

    const [dataHistoryAdmin, setDataHistoryAdmin] = useState<HistoryAdmin[]>([]);

    useEffect(() => {

        document.title = 'Historial';

        const fetchStudents = async () => {
            try {
                const response = await fetch('/api/advisories', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });
                const data: advisoriesApi[] = await response.json();
                const newData: HistoryAdmin[] = data.map((advisory) => ({
                    date: advisory.advisoryDate.split('T')[0],
                    nameTeacher: advisory.teacher.fullName,
                    students: advisory.student.fullName,
                    semester: advisory.student.semester.toString(),
                    subject: advisory.subject.name,
                }));
                setDataHistoryAdmin(newData)
            } catch (error) {
                console.error('Error al obtener los profesores:', error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <section className='mx-16 mt-28 flex-1'>
            <h1 className='text-3xl mb-5 font-semibold'>Historial</h1>
            <TableBase<HistoryAdmin> data={dataHistoryAdmin} columns={columnsHistoryAdmin} searchBy='nameTeacher' />
        </section>
    )
}

export default page;
