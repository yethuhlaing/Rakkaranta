Rakkaranta
 IoT Integrated Platform

1. About the Project

 OBJECTIVES:
 Use ultrasonic sensors or other sensors to monitor the real time dynamics across cabins, saunas, swimming pools, and outdoor areas in a resort. 
 When the system detects potential
 dangers, it automatically triggers sound and LED lights to
 alarm.
 The system will continuously collect sensor data, use big
 data analysis, and use machine learning models to predict
 potential dangers, perform predictive maintenance or
 early warning.
 Provide managers with real-time data visualization, safety
 alarm prompts, and historical data analysis reports
 through the Web and App terminals

2. Sensors

 Temperature&humidity sensor
 Ultrasonic sensor
 Pressure sensor (Future iterations)

3. Architecture

Controller: Raspberry Pi Pico W
 (MicroPython).
 Reads sensor data via GPIO

Communication:
 Wi-Fi: HTTP/MQTT to send data to a
 cloud server 

Local Backup: SD card (if offline).
 Server/Cloud:
 Stores data in a database 
 Hosts a REST API for the web UI.

Web UI:
 Frontend: Nextjs/Nodejs for real-time
  graphs and alerts.
  User authentication via OAuth2/JWT.
 Protocols:
  GPIO for sensor communication.
  MQTT/HTTPS for cloud transmission.
  WebSocket for real-time UI updates.

4. Security Measures

 Data Encryption:
  TLS/SSL for HTTPS/MQTT 

 Authentication:
  API keys for device-to-cloud communication.

 Access Control: 
  Role-based permissions (admin/user/guest).

 Audit Logs: 
  Track sensor data access and user actions.

5. Energy Efficiency

Sensor Sleep Modes:
 Activate DHT22 only during sampling.

Pico Power Management: 
 Use low-power sleep states between readings.

Optimized Sampling Rate:
 Adjust based on criticality

6. Database Design
Schema:
 sensor_data:
  timestamp, temperature, humidity, distance, device_id.
 users:
  user_id, username, hashed_password, role.
 devices:
  device_id, location, sensor_config.




