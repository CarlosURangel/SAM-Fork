import { ChartConfig } from "@/components/ui/chart";

export interface ChartTutoringPerSubjectProps {
  description: string;
  chartConfig: ChartConfig;
  data: { subject: string; count: number; fill: string }[];
}