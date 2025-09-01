"use client";
import React from 'react'
import { columnsUserManagement, dataUserManagement } from '@/const/UserManagement';
import { TableBase } from '@/components/tables/TableBase';


const page = () => {
    return (
        <section className='mx-16 mt-28 flex-1'>
            <h1 className='text-3xl'>Historial</h1>
            <TableBase data={dataUserManagement} columns={columnsUserManagement} searchBy='nameTeacher' />
        </section>
    )
}

export default page;
