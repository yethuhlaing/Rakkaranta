#!/bin/bash

# Ensure data directories exist with proper permissions
mkdir -p /home/influxdb2/data
mkdir -p /home/influxdb2/config
chown -R influxdb:influxdb /home/influxdb2

# Check if InfluxDB is already initialized
if [ ! -f "/home/influxdb2/INITIALIZED" ]; then
    echo "First time initialization..."
    
    # Start InfluxDB with setup parameters
    influxd &
    
    # Wait for InfluxDB to start
    echo "Waiting for InfluxDB to start..."
    until curl -s http://localhost:8086/ping > /dev/null; do
        echo "InfluxDB not ready - waiting..."
        sleep 5
    done
    
    echo "InfluxDB is running. Creating additional buckets..."
    
    
    # Create buckets
    echo "Creating bucket: ${DOCKER_INFLUXDB_INIT_BUCKET}"
    curl -XPOST "http://localhost:8086/api/v2/buckets" \
        -H "Authorization: Token ${DOCKER_INFLUXDB_INIT_ADMIN_TOKEN}" \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        --data "{
        \"name\": \"${DOCKER_INFLUXDB_INIT_BUCKET}\",
        \"orgID\": \"${DOCKER_INFLUXDB_INIT_ORG_ID}\",
        \"retentionRules\": [{\"type\": \"expire\", \"everySeconds\": 604800}]
        }"

    # Create a marker file to indicate initialization is complete
    touch /home/influxdb2/INITIALIZED
    # Stop InfluxDB to restart it properly
    sleep 5
fi

# Start InfluxDB with normal parameters
echo "Starting InfluxDB..."
exec influxd