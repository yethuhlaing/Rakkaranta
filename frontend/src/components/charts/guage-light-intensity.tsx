"use client";

import { Sun } from 'lucide-react';
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

export function GuageLightIntensity() {
    const { sensorData, connectionStatus, subscribe, updateTimeRange } = useWebSocketData();

    useEffect(() => {
        subscribe(['light-intensity'], {
            "light-intensity": 'last',
        });
    }, []);
    const latestReading = sensorData?.['light-intensity']?.[sensorData['light-intensity']?.length - 1] as SensorData;
    const formatIntensityValue = (value: any): string => {
        if (value !== undefined && value !== null) {
            return value.toFixed(1) + ' lux';
        }
        return '0'; // Default to an empty string or another fallback string
    };
    
    return (
        <Card className="flex flex-col">
            <CardHeader className="flex flex-col space-y-2">
                <CardTitle>Light Intensity Indicator</CardTitle>
                <CardDescription>Real time light intensity inside warehouse</CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                        config={chartConfig}
                        className="mx-auto max-h-[450px] 2xl:max-h-[350px] "
                        >
                    <GaugeComponent
                        arc={{
                            nbSubArcs: 150,
                            colorArray: [
                            'hsl(213, 58%, 95%)',  // Lightest blue - replaces #F2E2FB
                            'hsl(213, 58%, 90%)',  // Light blue - replaces #DEC2F7
                            'hsl(213, 58%, 80%)',  // Your exact light blue - replaces #C7A6F3
                            'hsl(213, 48%, 70%)',  // Medium blue - replaces #B486ED
                            'hsl(210, 18%, 40%)'   // Darker blue-gray - replaces #9F5FE1
                            ],                            
                            width: 0.3,
                            padding: 0.003
                        }}
                        labels={{
                            valueLabel: {
                                style: {fontSize: 40},
                                formatTextValue: formatIntensityValue
                            },
                            tickLabels: {
                            type: "outer",
                            ticks: [
                                { value: 100 },
                                { value: 200 },
                                { value: 300 },
                                { value: 400 },
                                { value: 500 },
                                { value: 600 },
                                { value: 700 },
                                { value: 800 },
                                { value: 900 },
                                { value: 1000 },
                            ],
                            defaultTickValueConfig: {
                                formatTextValue: formatIntensityValue
                            }
                            }
                        }}
                        value={latestReading?.['light-intensity']} // Fallback to 0 if lightIntensity is undefined or null
                        maxValue={1000}
                    />
                </ChartContainer>

            </CardContent>
            <CardFooter className="flex-col gap-2 text-pretty text-center text-sm mt-6">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Measured in lux (lumens per square meter{" "}
                    <Sun size={18}/>
                </div>
                <div className="leading-none text-muted-foreground">
                    Optimal Range: 300-800 lux
                </div>
            </CardFooter>
        </Card>
    );
}
