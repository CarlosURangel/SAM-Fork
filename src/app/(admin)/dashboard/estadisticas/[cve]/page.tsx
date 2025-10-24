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
  ChartContainer,
} from "@/components/ui/chart"
import { useParams } from "next/navigation"
import { getStatisticsByTeacher } from "@/lib/dataStatistics"
import { useEffect, useState } from "react"
import { Advisory, AdvisoryChar, Statistics } from "@/types/statisctics"
import { DataChartTutoringPerSubject } from "@/types/chart"
import { ordenarYColorearPorCantidad } from "@/lib/colorUtils"
import { Label } from "@/components/ui/label"

type ChartConfig = {
  [key: string]: {
    label: string;
    color?: string;
  };
};

export default function page() {
  const params = useParams()
  const cve = params.cve?.toString()
  const [statistics, setStatistics] = useState<Statistics>()
  const [advisories, setAdvisories] = useState<AdvisoryChar[]>()
  const [config, setConfig] = useState<ChartConfig>()

  useEffect(() => {
    document.title = 'Estadísticas';

    if (cve) {
      const fetch = async () => {
        const data: Statistics = await getStatisticsByTeacher(cve)
        setStatistics(data)
        const dataA: AdvisoryChar[] = data?.advisories.map((advisory: Advisory) => ({
          subject: advisory.name,
          count: advisory.total,
          fill: '#8884d8'
        }))
        const chartData: DataChartTutoringPerSubject[] = ordenarYColorearPorCantidad(dataA);
        setAdvisories(chartData)
        const chartConfig = chartData.reduce(
          (config, item) => {
            config[item.subject] = {
              label: item.subject,
              color: item.fill,
            };
            return config;
          },
          {
            count: {
              label: "count",
            },
          } as ChartConfig
        );
        setConfig(chartConfig)
      }
      fetch()

    }

  }, []);

  console.log(statistics);
  

  return (
    <section className='mx-16 mt-28 flex-1'>
      <h1 className='text-3xl mb-10'>Estadísticas</h1>
      <Card className="flex flex-col gap-4 mb-4">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-xl lg:text-2xl">{statistics?.name}</CardTitle>
          <CardDescription className="text-base lg:text-lg">Desgloce de {statistics?.totalAdvisories} asesorías</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 grid grid-cols-2 pb-0">
          {config && advisories && advisories.length > 0 ? (
            <>
              < ChartContainer
                config={config}
                className="aspect-square max-h-[60vh]"
              >
                <PieChart className="w-full">
                  <Pie data={advisories} dataKey="count" />
                </PieChart>
              </ChartContainer>
              <div className="flex flex-col justify-center gap-6">
                {advisories?.map((subject, indx) => (
                  <div key={indx} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 lg:w-10 lg:h-10"
                      style={{ backgroundColor: subject.fill }}
                    ></div>
                    <Label htmlFor="terms" className="text-lg lg:text-xl">{subject.subject}</Label>
                  </div>
                ))}
              </div>
            </>
          ):(
            <div className="w-full flex justify-center items-center text-xl lg:text-3xl font-semibold col-span-2 h-[60vh]">No hay datos para mostrar</div>
          )
          }

        </CardContent>
      </Card>
    </section >
  )
}
