import React from 'react'
import { DataTable } from '../ui/dataTable'
import { Alumno, columnasAlumnos } from '../ui/columns/AlumnosColumns'
import { TableBase } from '../tables/TableBase';
import { columnsUserManagement, dataUserManagement } from '@/const/UserManagement';

export const ClientDashboard = () => {
    return (
        <section className='mx-16 mt-28 flex-1'>
            <h1 className='text-3xl'>Historial</h1>
            <TableBase data={dataUserManagement} columns={columnsUserManagement} searchBy='nameTeacher'/>
        </section>
    )
}
