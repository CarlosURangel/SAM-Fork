"use client";
import React from 'react'
import { AsesoriasChart } from "@/components/Asesorias-chart";
import ChartTutoringPerSubject from '@/components/chars/ChartTutoringPerSubject';
import { chartConfig, combinedAsesoriasData } from '@/const/ChartTutoringPerSubject';
import { generateBluePalette, unifyBlueColorsById } from "@/lib/chartColors";
import { ordenarYColorearPorCantidad } from '@/lib/chartSort';

const page = () => {

    const { newData, newConfig } = ordenarYColorearPorCantidad(combinedAsesoriasData, chartConfig);

    return (
        <section className='mx-16 mt-28 flex-1'>
            <h1 className='text-3xl mb-10'>Estadísticas</h1>
            <ChartTutoringPerSubject description='Enero - Junio 2025' chartConfig={newConfig} data={newData} />
            <div className="mt-8">
                <AsesoriasChart />
            </div>
        </section>
    )
}

export default page;
