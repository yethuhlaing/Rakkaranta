# Rakkaranta

<p align="center">
  <a href="https://www.youtube.com/watch?v=o8TD4SVxuME" target="_blank">
    <img src="https://img.youtube.com/vi/o8TD4SVxuME/0.jpg" alt="Watch the video" width="640" />
  </a>
</p>


## Overview

The Rakkaranta Resort Dashboard provides real-time weather data, IoT sensor pipeline, activity recommendations, and resort management tools specifically designed for the unique needs of a Finnish wilderness resort. This system helps staff provide exceptional guest experiences by offering accurate, location-specific information and resource management capabilities.

## Project Scope and Goals

![image](https://github.com/user-attachments/assets/d3bc3906-7e49-41bf-90a2-a94b39acca21)


- **Objective**: Develop a secure IoT system for external and internal environmental monitoring.  
- **Deliverables**:  
  - Functional sensor network.  
  - Real-time weather report.
  - Data analysis dashboard.  
  - Security protocol implementation.  

---

## Architecture Overview

The Rakkaranta Resort system employs a modern, cloud-based architecture designed for real-time data processing, visualization, and resort management. The architecture follows a distributed approach with specialized components handling different aspects of data collection, processing, storage, and presentation.


## Key Features

#### Date-Based Weather Display

- **Multiple Time Periods**: View weather data for today, tomorrow, or the upcoming week
- **Dynamic Data Fetching**: Weather data is fetched and updated based on the selected date tab

#### Weather Visualizations

- **24-Hour Forecast**: Hourly temperature and condition forecasts
- **Weekly Overview**: Extended forecast for planning activities in advance
- **Current Conditions**: Real-time temperature, feels-like temperature, and weather conditions
- **Wind & Precipitation**: Detailed wind speed, direction, and precipitation probability
- **Temperature Trends**: Current temperatures compared to historical averages

#### Northern Lights Forecasting

- **Aurora Prediction**: Probability of northern lights visibility based on current conditions
- **Kp-Index Monitoring**: Real-time geomagnetic activity tracking
- **Visibility Factors**: Cloud cover, light pollution, and other aurora visibility factors
- **Viewing Time Recommendations**: Optimal times for aurora viewing with reminder functionality


#### Activity Recommendations

- **Weather-Based Recommendations**: Activities are recommended based on current or forecasted weather
- **Date-Specific Suggestions**: Different recommendations for today, tomorrow, or the week ahead
- **Suitability Ratings**: Each activity includes a suitability score based on current conditions
- **Contextual Reasoning**: Clear explanations of why activities are recommended or not

#### Resort Management Tools

- **Trail Conditions**: Real-time status of resort trails with weather impact assessment
- **Resource Monitoring**: Track sauna temperatures, firewood storage, and hot tub status
- **Maintenance Tracking**: Log and monitor maintenance activities across the resort
- **Item Management**: Add, edit, and track resort items including accommodations, facilities, and amenities

#### IoT Sensor Integration

- **Sensor Network**: Integration with temperature, humidity, occupancy, and energy consumption sensors throughout the resort
- **Real-Time Data Collection**: Continuous collection of sensor data from cabins, saunas, and common areas
- **Data Processing Pipeline**: Automated processing and analysis of incoming sensor data


#### Real-Time Visualization

- **Live Graphs**: Real-time graphical representation of sensor data with automatic updates
- **Historical Trends**: View historical data alongside current readings to identify patterns
- **Multi-Sensor Dashboards**: Customizable dashboards showing data from multiple sensors simultaneously
- **Alert Visualization**: Visual indicators when readings exceed normal thresholds

## Practical Applications

The IoT and visualization features enable:

- **Energy Optimization**: Monitor and optimize energy usage across the resort
- **Comfort Management**: Ensure optimal temperature and humidity in guest accommodations
- **Preventive Maintenance**: Identify potential issues before they affect guest experience
- **Resource Planning**: Better planning for wood, water, and other resources based on actual usage patterns
- **Occupancy Insights**: Understand usage patterns of different resort areas throughout the day

## Data Pipeline Architecture

### MQTT Server (Message Broker)

- Serves as the central nervous system of the IoT infrastructure
- Facilitates publish-subscribe communication between sensors and data processors
- Enables lightweight, low-latency message exchange using the MQTT protocol
- Handles message queuing to ensure data reliability even during network interruptions
- Supports quality of service levels for different types of sensor data


### Telegraf (Data Collection Agent)

- Deployed across the resort to collect data from various sensors
- Processes and formats raw sensor data from temperature, humidity, occupancy, and energy consumption sensors
- Buffers data locally when needed to handle connectivity issues
- Applies initial filtering and aggregation to optimize data transmission


### InfluxDB (Time-Series Database)

- Specialized database optimized for time-series data from IoT sensors
- Stores high-volume sensor readings with timestamp information
- Provides efficient querying capabilities for time-based analytics
- Implements data retention policies to manage storage requirements
- Supports downsampling for historical data to maintain performance


### Supabase (User Data Storage)

- Manages persistent resort data including accommodation information, guest profiles, and booking details
- Provides relational database capabilities for structured business data
- Offers real-time database functionality for collaborative features
- Includes built-in APIs for seamless data access from frontend and backend services
- Handles data relationships between different resort entities


### Kinde (Authentication Service)

- Provides secure authentication and authorization services
- Manages user identity, roles, and permissions across the system
- Supports single sign-on capabilities for staff and administrators
- Implements OAuth flows for secure authentication
- Handles token management and session security


## Backend Architecture

### Node.js Server

- Acts as the application server processing business logic
- Interfaces with multiple data sources (InfluxDB, Supabase) to aggregate information
- Processes incoming sensor data for analysis and alerting
- Implements WebSocket communication for real-time updates to clients
- Handles API requests from the frontend application
- Performs data transformation and enrichment before sending to clients
- Implements business rules for activity recommendations based on weather and sensor data
- Manages scheduled tasks for data maintenance and report generation


## Frontend Architecture

### Next.js React Application

- Provides the user interface for resort staff and administrators
- Implements responsive design for access across different devices
- Features real-time data visualization dashboards using WebSocket connections
- Includes interactive components for resort management
- Implements client-side caching for improved performance
- Uses server-side rendering for optimal initial page loads
- Provides role-based interface components based on user permissions
- Implements progressive web app capabilities for offline functionality


## Cloud Infrastructure & DevOps

### Azure App Service

- Hosts the Node.js backend application in a managed environment
- Provides automatic scaling based on demand
- Ensures high availability through redundancy
- Manages SSL certificates for secure communication
- Offers integrated monitoring and logging capabilities
- Provides geographic distribution for low-latency access


### GitHub Actions

- Implements continuous integration and deployment pipelines
- Automates testing before deployment to ensure quality
- Manages environment-specific configurations
- Provides automated rollback capabilities in case of deployment issues
- Implements infrastructure-as-code principles for consistency
- Automates dependency updates and security scanning


## Data Flow Architecture

1. **Data Collection**: IoT sensors throughout the resort continuously collect environmental and operational data
2. **Data Transmission**: Telegraf agents process and forward this data to the MQTT server
3. **Message Brokering**: The MQTT server routes messages to appropriate subscribers
4. **Data Storage**: InfluxDB stores time-series sensor data while Supabase manages relational business data
5. **Data Processing**: The Node.js backend processes incoming data, applying business logic and generating insights
6. **Real-time Communication**: WebSockets enable immediate updates to connected clients
7. **Visualization**: The Next.js frontend presents data through intuitive dashboards and interfaces
8. **User Interaction**: Staff interact with the system through the frontend, triggering actions in the backend
9. **Authentication Flow**: Kinde manages secure user authentication across all system components


## Scalability Considerations

- Horizontal or Vertical scaling capabilities for all components
- Database sharding strategies for growing data volumes
- Caching layers to reduce database load
- Message queue buffering to handle traffic spikes
- Stateless application design enabling easy scaling
- Content delivery network integration for static assets

---

## Roles and Responsibilities

- **Project Manager**: Oversees project plan, integrate system desgin, and ensures deadlines are met.  
- **Frontend Developer**: Implements the core system design and integrates UI Dashboard.  
- **Embedded Engineer**: Conducts research on sensor technologies, security protocols and implementation.  
- **Scram master**: Make a smoother streamline for the product development.  

---
## Setup Instructions

### 1. Clone the Repository

```shellscript
git clone https://github.com/yethuhlaing/Rakkaranta.git
cd rakkaranta-system
```

### 2. Configure Environment Variables

You need to set up environment variables for each component of the system:

#### Backend Configuration

```shellscript
cd backend
cp .env.example .env
```

#### Frontend Configuration

```shellscript
cd ../frontend
cp .env.example .env
```

#### Mosquitto MQTT Broker Configuration

```shellscript
cd ../mosquitto
cp .env.example .env
```

#### Publisher Configuration

```shellscript
cd ../publisher
cp .env.example .env
```

#### Telegraf Configuration

```shellscript
cd ../telegraf
cp .env.example .env
```
### 3. InfluxDB cloud Configuration

Instead of using a local InfluxDB instance, the Rakkaranta Resort system can be configured to use InfluxDB Cloud for time-series data storage. Follow these steps to set up your InfluxDB Cloud account and integrate it with the system.

#### 1. Create an InfluxDB Cloud Account

1. Visit [InfluxDB Cloud](https://cloud2.influxdata.com/signup) and sign up for an account
2. Choose the appropriate plan for your needs:

1. **Free Plan**: Good for development and testing (limited retention)
2. **Usage-Based Plan**: Pay for what you use (recommended for production)
3. **Platform Plan**: For enterprise-level deployments



3. Select your preferred cloud provider region (choose one closest to your deployment location)


#### 2. Create a Bucket

After signing in to your InfluxDB Cloud account:

1. Navigate to "Load Data" > "Buckets" in the left sidebar
2. Click the "Create Bucket" button
3. Enter a name for your bucket (e.g., `rakkaranta`)
4. Set an appropriate data retention period:

1. For development: 7 days (free tier limitation)
2. For production: Based on your data analysis needs (30-90 days recommended)



5. Click "Create" to create the bucket


#### 3. Generate API Token

To allow your system to write and read data from InfluxDB Cloud:

1. Navigate to "Load Data" > "API Tokens" in the left sidebar
2. Click "Generate API Token" > "Custom API Token"
3. Provide a description (e.g., "Rakkaranta")
4. Set appropriate permissions:

1. Read access to the bucket you created
2. Write access to the bucket you created



5. Click "Generate" to create the token
6. **IMPORTANT**: Copy and securely store the generated token. It will only be displayed once.


### 4. Collect Required Information

Gather the following information from your InfluxDB Cloud account:

1. **Organization ID**:

    1. Navigate to "Settings" > "Profile"
    2. Copy your Organization ID



2. **Bucket Name**:

    1. The name of the bucket you created earlier



3. **InfluxDB Cloud URL**:

    1. This is your region-specific InfluxDB Cloud URL (e.g., `https://us-west-2-1.aws.cloud2.influxdata.com`)
    2. Found in the URL of your browser when logged in or in documentation



4. **API Token**:

    1. The token you generated in the previous step

### 4. Start the System

Return to the root directory and start all services using Docker Compose:

```shellscript
cd ..
docker-compose up
```

This command will:

1. Build all necessary Docker images
2. Create and configure required networks
3. Start all services in the correct order
4. Set up volume mounts for data persistence


To run the system in the background (detached mode):

```shellscript
docker-compose up -d
```

### 5. Verify the Setup

Once all services are running, you can verify the setup by:

1. Accessing the frontend at [http://localhost:3000](http://localhost:3000)
2. Checking the MQTT broker status at [http://localhost:9001](http://localhost:9001)
3. Verifying data flow in the InfluxDB interface at [http://localhost:8086](http://localhost:8086)
4. Monitoring logs with:

```shellscript
docker-compose logs -f
```




### 6. Component-Specific Verification

#### Backend API

Verify the backend API is operational:

```shellscript
curl http://localhost:8080/api/health
```

#### MQTT Messaging

Test MQTT messaging using the mosquitto client:

```shellscript
docker exec -it rakkaranta-mosquitto mosquitto_pub -h localhost -t "test/topic" -m "Hello Rakkaranta"
docker exec -it rakkaranta-mosquitto mosquitto_sub -h localhost -t "test/topic"
```

#### Telegraf Data Collection

Check Telegraf logs to ensure data is being collected:

```shellscript
docker-compose logs telegraf
```

### 7. Common Issues and Troubleshooting

- **Port Conflicts**: If services fail to start due to port conflicts, modify the port mappings in `docker-compose.yml`
- **Database Connection Issues**: Ensure database credentials are correctly set in environment files
- **MQTT Connection Problems**: Verify MQTT broker is running and credentials are correct
- **Volume Permissions**: If experiencing permission issues with Docker volumes, check folder permissions


### 8. Development Workflow

For development:

1. Stop specific services to work on them locally:

```shellscript
docker-compose stop frontend
```


2. Run the service locally with your development environment
3. When finished, restart the service in Docker:

```shellscript
docker-compose start frontend
```




## Advanced Configuration

### Scaling Services

To scale specific services:

```shellscript
docker-compose up -d --scale publisher=3
```

### Persistent Data

Data is stored in Docker volumes. To list volumes:

```shellscript
docker volume ls | grep rakkaranta
```

### System Maintenance

To update and rebuild all services:

```shellscript
git pull
docker-compose down
docker-compose build
docker-compose up -d
```

## Security Considerations

- All default passwords in example files should be changed
- Restrict network access to the MQTT broker and databases
- Enable TLS for production deployments
- Regularly update Docker images for security patches

## Project Documentation

- **Project Plan**: Documented in the `docs/project_plan.md` file.  
- **Requirements**: Stored in the `docs/requirements.md` file.  
- **Research Findings**: Recorded in the `docs/research.md` file.
  
---
