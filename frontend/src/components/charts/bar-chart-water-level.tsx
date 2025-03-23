"use client";

import React, { useEffect } from 'react'
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

import TimeRangeSelector from "../dashboard/time-range-selector";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"
import { format } from "date-fns";


const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function BarChartWaterLevel() {
    const { sensorData, connectionStatus, subscribe, updateTimeRange } = useWebSocketData();
    useEffect(() => {
        subscribe(['water-level'], {
            "water-level": '5m',
        });
    }, []);
    // const { 
    //     field, minimum, maximum, average
    // } = formatChartData(chartData) as FormattedAggregateData  

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between w-full items-center">
                <div className="flex flex-col space-y-2">
                    <CardTitle>Lake & Well Water Levels</CardTitle>
                    <CardDescription>Current water levels in resort's natural swimming areas and drinking water reserves</CardDescription>
                </div>
                <TimeRangeSelector field={'water-level'} defaultTimeRange='5m' />
            </CardHeader>
            <CardContent>
            <ChartContainer config={chartConfig} className="aspect-auto h-[350px]">
                <BarChart accessibilityLayer data={sensorData['water-level'] || []}>
                    <CartesianGrid vertical={false} />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel hideIndicator />}
                    />
                    <XAxis
                        dataKey="_time"
                        tickLine={true}
                        axisLine={false}
                        tickMargin={12}
                        tickFormatter={(value) => {
                            // Check if the value is a valid date
                            const date = new Date(value);
                            if (!isNaN(date.getTime())) {
                              // Format only if the value is a valid date
                              return format(date, 'HH:mm');
                            }
                            // Return the value as is if it's not a date
                            return value;
                          }}                      
                    />
                    <YAxis />
                    <Bar dataKey="_value">
                    { Array.isArray(sensorData['water-level']) && sensorData['water-level']?.map((item) => (
                        <Cell
                        key={item._field}
                        fill={
                            item._value > 0
                            ? "hsl(var(--chart-1))"
                            : "hsl(var(--chart-2))"
                        }
                        />
                    ))}
                    </Bar>
                </BarChart>
                </ChartContainer>

            </CardContent>
            {/* <CardFooter className="flex-col gap-2 text-pretty text-center text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    {maximum}{" "}
                </div>
                <div className="flex items-center gap-2 font-medium leading-none">
                    {minimum}{" "}
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total {field} for today
                </div>
            </CardFooter> */}
        </Card>
    );
}
