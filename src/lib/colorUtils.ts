// `colorUtils.ts`

// Tipo de dato para los elementos del gráfico
export interface DataChartTutoringPerSubject {
  id?: string;
  subject: string;
  count: number;
  fill?: string;
}

/**
 * Genera una paleta de colores azules a partir de un gradiente.
 * @param startColor Color inicial del gradiente.
 * @param endColor Color final del gradiente.
 * @param steps Número de colores que se generarán.
 * @returns Un array de strings con los códigos de color hexadecimales.
 */
export function generateBluePalette(
  startColor: string,
  endColor: string,
  steps: number
): string[] {
  const hexToRgb = (hex: string) =>
    hex.match(/\w\w/g)?.map((x) => parseInt(x, 16)) as [number, number, number];
  const rgbToHex = (r: number, g: number, b: number) =>
    `#${[r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("")}`;

  if (steps <= 0) return [];
  if (steps === 1) return [startColor];

  const startRgb = hexToRgb(startColor);
  const endRgb = hexToRgb(endColor);
  const palette: string[] = [];

  for (let i = 0; i < steps; i++) {
    const factor = i / (steps - 1);
    const r = startRgb[0] + (endRgb[0] - startRgb[0]) * factor;
    const g = startRgb[1] + (endRgb[1] - startRgb[1]) * factor;
    const b = startRgb[2] + (endRgb[2] - startRgb[2]) * factor;
    palette.push(rgbToHex(r, g, b));
  }

  return palette;
}

/**
 * Ordena un array de objetos por la propiedad 'count' de mayor a menor y asigna
 * colores de una paleta a la propiedad 'fill' de cada objeto.
 * @param data Array de objetos a procesar.
 * @param startColor Color inicial para el gradiente.
 * @param endColor Color final para el gradiente.
 * @returns Un nuevo array de objetos ordenado y con la propiedad 'fill' asignada.
 */
export function ordenarYColorearPorCantidad<T extends { count: number; fill?: string }>(
  data: T[],
  startColor: string = "#0069c0",
  endColor: string = "#93C5FD"
): T[] {
  if (!data || data.length === 0) {
    return [];
  }

  // 1. Clonar y ordenar de mayor a menor por 'count'
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  // 2. Generar la paleta de colores en base al número de elementos
  const palette = generateBluePalette(startColor, endColor, sortedData.length);

  // 3. Asignar los colores a cada elemento y devolver el nuevo array
  return sortedData.map((item, index) => ({
    ...item,
    fill: palette[index],
  }));
}
