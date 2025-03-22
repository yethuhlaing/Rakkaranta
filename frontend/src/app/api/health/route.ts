// app/api/health/route.ts
import { NextResponse } from 'next/server';

// Define interfaces for better type safety
interface HealthStatus {
    status: 'ok' | 'error';
    uptime: number;
    timestamp: string;
    version: string;
    database?: DatabaseStatus;
    externalApi?: ExternalApiStatus;
    memory: MemoryUsage;
}

interface DatabaseStatus {
    status: 'connected' | 'error';
    message?: string;
}

interface ExternalApiStatus {
    status: 'available' | 'error';
    message?: string;
}

interface MemoryUsage {
    rss: string;
    heapTotal: string;
    heapUsed: string;
}

/**
 * Health check endpoint to verify the API is running
 * @returns {NextResponse} JSON response with status information
 */
export async function GET(): Promise<NextResponse> {
    try {
        // Basic health status
        const healthStatus: HealthStatus = {
            status: 'ok',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            version: process.env.APP_VERSION || '1.0.0',
            memory: {
                rss: '0 MB',
                heapTotal: '0 MB',
                heapUsed: '0 MB',
            }
        };

        // // Check database connection if applicable
        // try {
        //     // Example: Add your database health check here
        //     // const dbConnection = await checkDatabaseConnection();
        //     healthStatus.database = { status: 'connected' };
        // } catch (dbError) {
        //     healthStatus.database = { 
        //         status: 'error', 
        //         message: dbError instanceof Error ? dbError.message : 'Unknown database error' 
        //     };
        // }

        // // Check any external services your app depends on
        // try {
        //     // Example: Add external API health check
        //     // const externalApi = await checkExternalApi();
        //     healthStatus.externalApi = { status: 'available' };
        // } catch (apiError) {
        //     healthStatus.externalApi = { 
        //         status: 'error', 
        //         message: apiError instanceof Error ? apiError.message : 'Unknown API error'
        //     };
        // }

        // Check memory usage
        const memoryUsage = process.memoryUsage();
        healthStatus.memory = {
            rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
            heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
            heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
        };

        return NextResponse.json(healthStatus, { status: 200 });
    } catch (error) {
        return NextResponse.json(
        { 
            status: 'error', 
            message: error instanceof Error ? error.message : 'Unknown error' 
        }, 
        { status: 500 }
        );
    }
}

// utils/health-checks.ts
// Optional: Enhanced database connection check example with TypeScript

// export async function checkDatabaseConnection(): Promise<boolean> {
//   // Example for MongoDB with mongoose
//   if (mongoose.connection.readyState === 1) {
//     return true;
//   }
//   throw new Error('Database connection not established');
  
//   Example for PostgreSQL with Prisma
//   try {
//     await prisma.$queryRaw`SELECT 1`;
//     return true;
//   } catch (error) {
//     throw new Error(`Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
//   }
  
//   return true; // Placeholder return
// }

// export async function checkExternalApi(): Promise<boolean> {
//   // Example implementation
//   try {
//     const response = await fetch('https://api.example.com/status');
//     if (!response.ok) {
//       throw new Error(`API responded with status: ${response.status}`);
//     }
//     return true;
//   } catch (error) {
//     throw new Error(`External API check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
//   }
  
//   return true; // Placeholder return
// }