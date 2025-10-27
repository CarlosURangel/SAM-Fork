import { ChartConfig } from "@/components/ui/chart";

export interface ChartTutoringPerSubjectProps {
  description: string;
  chartConfig: ChartConfig;
  data: DataChartTutoringPerSubject[];
}

export interface ChartDataItem {
  subject: string;
  count: number;
}

export interface DataChartTutoringPerSubject {
  id?: string;
  subject: string;
  count: number;
  fill: string;
}