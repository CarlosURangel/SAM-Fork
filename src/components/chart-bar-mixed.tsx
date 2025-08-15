"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "#93c5fd" },
  { browser: "safari", visitors: 200, fill: "#60a5fa" },
  { browser: "firefox", visitors: 187, fill: "#3b82f6" },
  { browser: "edge", visitors: 173, fill: "#2563eb" },
  { browser: "other", visitors: 90, fill: "#1d4ed8" },
  { browser: "edge", visitors: 173, fill: "#2563eb" },
  { browser: "chrome", visitors: 275, fill: "#93c5fd" },
  { browser: "safari", visitors: 200, fill: "#60a5fa" },
  { browser: "firefox", visitors: 187, fill: "#3b82f6" },
  { browser: "edge", visitors: 173, fill: "#2563eb" },
  { browser: "other", visitors: 90, fill: "#1d4ed8" },
  { browser: "edge", visitors: 173, fill: "#2563eb" },
  { browser: "chrome", visitors: 275, fill: "#93c5fd" },
  { browser: "safari", visitors: 200, fill: "#60a5fa" },
  { browser: "firefox", visitors: 187, fill: "#3b82f6" },
  { browser: "edge", visitors: 173, fill: "#2563eb" },
  { browser: "other", visitors: 90, fill: "#1d4ed8" },
  { browser: "edge", visitors: 173, fill: "#2563eb" },
  { browser: "chrome", visitors: 275, fill: "#93c5fd" },
  { browser: "safari", visitors: 200, fill: "#60a5fa" },
  { browser: "firefox", visitors: 187, fill: "#3b82f6" },
  { browser: "edge", visitors: 173, fill: "#2563eb" },
  { browser: "other", visitors: 90, fill: "#1d4ed8" },
  { browser: "edge", visitors: 173, fill: "#2563eb" },
  { browser: "chrome", visitors: 275, fill: "#93c5fd" },
  { browser: "safari", visitors: 200, fill: "#60a5fa" },
  { browser: "firefox", visitors: 187, fill: "#3b82f6" },
  { browser: "edge", visitors: 173, fill: "#2563eb" },
  { browser: "other", visitors: 90, fill: "#1d4ed8" },
  { browser: "edge", visitors: 173, fill: "#2563eb" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Viviana Michell... ",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Mixed</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
              right: 30,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              layout="vertical"
              fill="var(--color-visitors)"
              radius={4}
            >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="visitors"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
