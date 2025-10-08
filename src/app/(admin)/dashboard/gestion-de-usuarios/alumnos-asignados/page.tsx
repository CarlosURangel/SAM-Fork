"use client";
import React from 'react'
import { TableBase } from '@/components/tables/TableBase';
import { StudentAssigned } from '@/types/table';
import { columnsStudentAssigned, dataStudentAssigned } from '@/const/StudentAssigned';


const page = () => {
    return (
        <section className='mx-16 mt-28 flex-1'>
            <h1 className='text-3xl'>Gestión de Usuarios</h1>
            <TableBase<StudentAssigned> data={dataStudentAssigned} columns={columnsStudentAssigned} searchBy='exp' />
        </section>
    )
}

export default page;
