// lib/chart/colorUtils.ts

import { ChartConfig } from "@/components/ui/chart";

// 1️⃣ Función para generar una paleta de colores azules
export function generateBluePalette(
    startColor: string = "#93C5FD",
    endColor: string = "#1D4ED8",
    steps: number = 5
): string[] {
    const hexToRgb = (hex: string) =>
        hex.match(/\w\w/g)?.map((x) => parseInt(x, 16)) as [number, number, number];

    const rgbToHex = (r: number, g: number, b: number) =>
        `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;

    const startRgb = hexToRgb(startColor);
    const endRgb = hexToRgb(endColor);

    const palette: string[] = [];

    for (let i = 0; i < steps; i++) {
        const r = Math.round(startRgb[0] + ((endRgb[0] - startRgb[0]) / (steps - 1)) * i);
        const g = Math.round(startRgb[1] + ((endRgb[1] - startRgb[1]) / (steps - 1)) * i);
        const b = Math.round(startRgb[2] + ((endRgb[2] - startRgb[2]) / (steps - 1)) * i);
        palette.push(rgbToHex(r, g, b));
    }

    return palette;
}

// 2️⃣ Función unificada para asignar colores a data y chartConfig usando el `id`
export function unifyBlueColorsById<T extends { id?: string; fill?: string }, C extends ChartConfig>(
    data: T[],
    config: C,
    palette: string[]
): { newData: T[]; newConfig: C } {
    const newConfig = { ...config } as Record<string, any>; // <-- aquí decimos que es indexable
    const newData = data.map((item) => ({ ...item }));

    newData.forEach((item, index) => {
        const color = palette[index % palette.length];
        item.fill = color;

        if (item.id && newConfig[item.id]) {
            newConfig[item.id] = {
                ...newConfig[item.id],
                color,
            };
        }
    });

    return { newData, newConfig: newConfig as C }; // <-- cast de vuelta a C
}

