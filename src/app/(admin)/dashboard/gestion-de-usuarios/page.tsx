"use client";
import React from 'react'
import { columnsUserManagement, dataUserManagement } from '@/const/UserManagement';
import { TableBase } from '@/components/tables/TableBase';
import { UserManagement } from '@/types/table';


const page = () => {
    return (
        <section className='mx-16 mt-28 flex-1'>
            <h1 className='text-3xl mb-5'>Gestión de Usuarios</h1>
            <TableBase<UserManagement> data={dataUserManagement} columns={columnsUserManagement} searchBy='nameTeacher' />
        </section>
    )
}

export default page;
