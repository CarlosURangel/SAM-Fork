"use client";
import React from 'react'
import { TableBase } from '@/components/tables/TableBase';
import { columnsHistoryAdmin, dataHistoryAdmin } from '@/const/History';
import { HistoryAdmin } from '@/types/table';


const page = () => {
    return (
        <section className='mx-16 mt-28 flex-1'>
            <h1 className='text-3xl mb-5'>Historial</h1>
            <TableBase<HistoryAdmin> data={dataHistoryAdmin} columns={columnsHistoryAdmin} searchBy='nameTeacher' />
        </section>
    )
}

export default page;
