"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { useParams } from "next/navigation"
import { getStatisticsByTeacher } from "@/lib/dataStatistics"
import { useEffect, useState } from "react"
import { Advisory, Statistics } from "@/types/statisctics"

export const description = "A pie chart with a legend"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export default function page() {
  const params = useParams()
  const cve = params.cve?.toString()
  const [statistics, setStatistics] = useState<Statistics>()
  const [advisories, setAdvisories] = useState<Advisory[]>()
  console.log(statistics);

  useEffect(() => {
    document.title = 'Estadísticas';

    if (cve) {
      const fetch = async () => {
        const data:Statistics = await getStatisticsByTeacher(cve)
        setStatistics(data)
        const dataA = data?.advisories.map((advisory) => ({
          subject: advisory.name,
          total: advisory.total,
          fill: '#8884d8'
        }))
        setAdvisories(dataA)
      }
      fetch()

    }

  }, []);

  useEffect(() => {
    const data = advisories?.advisories.map((advisory) => ({
      subject: advisory.name,
      total: advisory.total,
      fill: '#8884d8'
    }))

    console.log(data);
  }, [advisories])

  return (
    <section className='mx-16 mt-28 flex-1'>
      <h1 className='text-3xl mb-10'>Estadísticas</h1>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>{statistics?.name}</CardTitle>
          <CardDescription>Desgloce de {statistics?.totalAdvisories} asesorías</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <Pie data={chartData} dataKey="visitors" />
              <ChartLegend
                content={<ChartLegendContent nameKey="browser" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </section>
  )
}
