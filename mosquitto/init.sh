#!/bin/sh

# Get username/password from environment variables
MQTT_USERNAME=${MQTT_USERNAME:-"yethuhlaing"}
MQTT_PASSWORD=${MQTT_PASSWORD:-"yethuhlaing"}

echo "Setting up Mosquitto password file for user: $MQTT_USERNAME"

# Ensure password file exists and has proper permissions
touch /mosquitto/config/passwd
chmod 700 /mosquitto/config/passwd

# Set wide permissions to ensure we can write
chmod -R 777 /mosquitto
chmod 777 /mosquitto/log/mosquitto.log
chmod 777 /mosquitto/config/passwd
chmod 700 /mosquitto/data/mosquitto.db

# Create/update the user credentials
mosquitto_passwd -b /mosquitto/config/passwd "$MQTT_USERNAME" "$MQTT_PASSWORD"


echo "File permissions:"
ls -la /mosquitto/config/passwd
ls -la /mosquitto/log/mosquitto.log

exec /usr/sbin/mosquitto -c /mosquitto/config/mosquitto.conf

echo "Password file created successfully. Starting Mosquitto..."