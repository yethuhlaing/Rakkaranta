"use server"

import { WEATHER_CACHE_DURATION , DEFAULT_LAT, DEFAULT_LON} from "@/config/weather";
import { fetchWeatherData } from "@/lib/open-weather";
import { unstable_cache } from "next/cache"
// Cache configuration
/**
 * Create a cached version of the API fetch function using unstable_cache
 */
export const fetchCachedWeatherData = unstable_cache(
    async (lat = DEFAULT_LAT, lon = DEFAULT_LON) => {
        console.log(`Fetching fresh weather data for ${lat},${lon}`);
        return fetchWeatherData(lat, lon);
    },
    // Corrected: Make the key static
    ['weather-data'],  
    {
        revalidate: WEATHER_CACHE_DURATION, // Cache duration in seconds
        tags: ['weather-data'], // Tag for manual revalidation
    }
);