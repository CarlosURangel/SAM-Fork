import { ChartConfig } from "@/components/ui/chart";
import { generateBluePalette } from "./chartColors";

export function ordenarYColorearPorCantidad<T extends { id?: string; count: number; fill?: string }, C extends ChartConfig>(
    data: T[],
    config: C,
    startColor: string = "#0069c0", 
    endColor: string = "#93C5FD"    
): { newData: T[]; newConfig: C } {
    // 1️⃣ Ordenamos de mayor a menor count
    const sortedData = data.slice().sort((a, b) => b.count - a.count);

    // 2️⃣ Generamos la paleta con tantos pasos como elementos
    const palette = generateBluePalette(startColor, endColor, sortedData.length);

    // 3️⃣ Asignamos colores a cada elemento según el orden
    const newConfig = { ...config } as Record<string, any>;
    const newData = sortedData.map((item, index) => {
        const color = palette[index]; // azul más oscuro primero
        const newItem = { ...item, fill: color };

        if (item.id && newConfig[item.id]) {
            newConfig[item.id] = { ...newConfig[item.id], color };
        }

        return newItem;
    });

    return { newData, newConfig: newConfig as C };
}

