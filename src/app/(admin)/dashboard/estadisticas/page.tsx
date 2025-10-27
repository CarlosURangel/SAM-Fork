"use client";
import React, { useEffect, useState } from 'react'
import { AsesoriasChart } from "@/components/Asesorias-chart";
import { chartConfig } from '@/const/ChartTutoringPerSubject';
import ChartTutoringPerSubject from '@/components/chars/ChartTutoringPerSubject';
import { DataChartTutoringPerSubject } from '@/types/chart';
import { subjectsApi } from '@/types/apis';
import { ordenarYColorearPorCantidad } from '@/lib/colorUtils';

const page = () => {

    const [dataChartTutoringPerSubject, setDataChartTutoringPerSubject] = useState<DataChartTutoringPerSubject[]>([]);

    useEffect(() => {
        document.title = 'Estadísticas';

        const fetchTeachers = async () => {
            try {
                const response = await fetch('/api/statistics/subject', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });
                const data: subjectsApi[] = await response.json();
                const newData: DataChartTutoringPerSubject[] = data.map((subject: subjectsApi) => ({
                    id: subject.name.toLowerCase().replace(/\s+/g, ''),
                    subject: subject.name,
                    count: subject.total,
                    fill: '#8884d8'
                }));
                setDataChartTutoringPerSubject(ordenarYColorearPorCantidad(newData));
                
            } catch (error) {
                console.error('Error al obtener los profesores:', error);
            }
        };

        fetchTeachers();
    }, []);

    return (
        <section className='mx-16 mt-28 flex-1'>
            <h1 className='text-3xl mb-10'>Estadísticas</h1>
            <ChartTutoringPerSubject description='Enero - Junio 2025' chartConfig={chartConfig} data={dataChartTutoringPerSubject} />
            <div className="mt-8">
                <AsesoriasChart />
            </div>
        </section>
    )
}

export default page;
