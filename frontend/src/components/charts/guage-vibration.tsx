"use client";

import { AudioWaveform, DoorOpen } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useWebSocketData } from '@/hooks/use-websocket-data';
import { useState, useEffect } from 'react';
import GaugeComponent from 'react-gauge-component';
import { SensorData } from '@/types';

const chartConfig = {

    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function GuageVibration() {
    const { sensorData, connectionStatus, subscribe, updateTimeRange } = useWebSocketData();

    useEffect(() => {
        subscribe(['vibration'], {
            "vibration": 'last',
        });
    }, []);
    const latestReading = sensorData?.['vibration']?.[sensorData?.['vibration']?.length - 1] as SensorData;
    const formatVibrationValue = (value: any): string => {
        if (value !== undefined && value !== null) {
            return value.toFixed(1) + ' opens';
        }
        return '0'; // Default to an empty string or another fallback string
    };
    return (
        <Card className="flex flex-col">
            <CardHeader className="flex flex-col space-y-2">
                <CardTitle>Sauna Usage Monitor</CardTitle>
                <CardDescription>Real-time tracking of sauna door activity (opens/hour)</CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto max-h-[450px] 2xl:max-h-[350px] "
                    >
                        <GaugeComponent
                            arc={{
                                subArcs: [
                                    {
                                        limit: 1.6,
                                        color: 'hsl(213, 58%, 95%)',  // Lightest blue - replaces #F2E2FB
                                        showTick: true
                                    },
                                    {
                                        limit: 3.2,
                                        color: 'hsl(213, 58%, 90%)',  // Light blue - replaces #DEC2F7
                                        showTick: true
                                    },
                                    {
                                        limit: 4.8,
                                        color: 'hsl(213, 58%, 80%)',  // Your exact light blue - replaces #C7A6F3
                                        showTick: true
                                    },
                                    {
                                        limit: 6.4,
                                        color: 'hsl(213, 48%, 70%)',  // Medium blue - replaces #B486ED
                                        showTick: true
                                    },
                                    {
                                        limit: 8,
                                        color: 'hsl(210, 18%, 40%)',  // Darker blue-gray - replaces #9F5FE1
                                        showTick: true
                                    },
                                ]
                            }}
                            value={latestReading?.vibration ?? 0} // Fallback to 0 if lightIntensity is undefined or null
                            minValue={0}
                            maxValue={8}
                            labels={{
                                valueLabel: {
                                    formatTextValue: formatVibrationValue,
                                style: { fontSize: '45px' }
                                },
                                tickLabels: {
                                type: 'outer',
                                ticks: [
                                    { value: 0 },
                                    { value: 2 },
                                    { value: 4 },
                                    { value: 6 },
                                    { value: 8 }
                                ]
                                }
                            }}
                    />
                </ChartContainer>

            </CardContent>
            <CardFooter className="flex-col gap-2 text-pretty text-center text-sm mt-6">
                <div className="flex items-center gap-2 font-medium leading-none">
                Measured in Door Events per Hour{" "}
                <DoorOpen size={18}/>
                </div>
                <div className="leading-none text-muted-foreground">
                Optimal Range between 2 and 6 openings per hour
                </div>
            </CardFooter>
        </Card>
    );
}
