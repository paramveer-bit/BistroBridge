"use client"

import * as React from "react"
import { Area, AreaChart, Bar,  BarChart,CartesianGrid, XAxis } from "recharts"
import { TrendingUp } from "lucide-react"

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios"


const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  canceledCount: {
    label: "Cancelled",
    color: "hsl(var(--chart-1))",
  },
  completedCount: {
    label: "Completed",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function Component() {
  const [timeRange, setTimeRange] = React.useState("90d")
  const [chartData,setChartData] = React.useState([])

  React.useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const res = await axios.get("/api/order/order-chart")
        console.log(res.data.data)
        setChartData(res.data.data)
      } catch (error) {
        
      }
    }
    fetchData()
  },[])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    else if(timeRange==="178d"){
      daysToSubtract = 178
    }
    now.setDate(now.getDate() - daysToSubtract)
    // item.completedCount = 1000
    return date >= now
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Orders</CardTitle>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
          <SelectItem value="178d" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig}>
          <BarChart 
            accessibilityLayer data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
            // height= {10}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip content={
              <ChartTooltipContent 
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                }}
              />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="completedCount"
              stackId="a"
              fill="var(--color-completedCount)"
              radius={[0, 0, 4, 4]}
              height={200}
            />
            <Bar
              dataKey="canceledCount"
              stackId="a"
              fill="var(--color-canceledCount)"
              radius={[4, 4, 0, 0]}
              height={200}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
