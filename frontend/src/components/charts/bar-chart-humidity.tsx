"use client";

import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useWebSocketData } from "@/hooks/use-websocket-data";
import { useEffect } from "react";
import { SensorData } from "@/types";


const chartConfig = {
    Reception: {
        label: "Reception",
        color: "hsl(var(--chart-3))",
    },
    Sauna: {
        label: "Sauna",
        color: "hsl(var(--chart-1))",
    },
    Woodshed: {
        label: "Woodshed",
        color: "hsl(var(--chart-1))",
    },
    Restaurant: {
        label: "Restaurant",
        color: "hsl(var(--chart-2))",
    },
    Office: {
        label: "Office",
        color: "hsl(var(--chart-3))",
    },
    Lakeside: {
        label: "Lakeside",
        color: "hsl(var(--chart-4))",
    },
    Cottage: {
        label: "Cottage",
        color: "hsl(var(--chart-5))",
    },    
    Firepit: {
        label: "Firepit",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function BarChartHumidity() {
    const { sensorData, connectionStatus, subscribe, updateTimeRange } = useWebSocketData();
    
    useEffect(() => {
        subscribe(['humidity']);
    }, []);
    
     
    const latestReading = sensorData?.humidity?.[sensorData?.humidity?.length - 1] as SensorData;


        // Transform the raw data for Recharts
    const chartData = latestReading ? [
        { category: "Reception", value: latestReading.reception },
        { category: "Sauna", value: latestReading.sauna },
        { category: "Woodshed", value: latestReading.woodshed },
        { category: "Restaurant", value: latestReading.restaurant },
        { category: "Office", value: latestReading.office },
        { category: "Lakeside", value: latestReading.lakeside },
        { category: "Cottage", value: latestReading.cottage },
        { category: "Firepit", value: latestReading.firepit }
    ] : [];
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>Sauna Humidity</CardTitle>
                <CardDescription>Real-time humidity monitoring across traditional Finnish saunas and steam rooms</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData || []}
                        layout="vertical"
                        margin={{
                            left: 32,
                        }}
                    >
                        <YAxis
                            dataKey="category"
                            type="category"
                            tickLine={false}
                            tickMargin={12}
                            axisLine={false}
                            
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]
                                    ?.label
                            }
                        />
                        <XAxis dataKey="value" type="number" />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="value" layout="vertical" radius={5} >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={chartConfig[entry.category].color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col gap-2 text-pretty text-center text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month{" "}
                    <TrendingUp className="size-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Results for the top 5 browsers
                </div>
            </CardFooter> */}
        </Card>
    );
}
