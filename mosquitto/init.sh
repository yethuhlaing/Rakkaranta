#!/bin/sh

# Check if the password file exists
if [ ! -f /mosquitto/config/passwd/passwd.txt ]; then
  echo 'Creating Mosquitto password file...'
  
  # Create directory if it doesn't exist
  mkdir -p /mosquitto/config/passwd
  
  # Set permissions
  chmod 0700 /mosquitto/config/passwd
  
  # Create the password file with the username and password from environment variables
  mosquitto_passwd -b -c /mosquitto/config/passwd/passwd.txt $MOSQUITTO_USERNAME $MOSQUITTO_PASSWORD
  
  # Set proper ownership
  chown mosquitto:mosquitto /mosquitto/config/passwd/passwd.txt
fi

# Start Mosquitto
exec mosquitto -c /mosquitto/config/mosquitto.conf