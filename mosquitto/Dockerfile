FROM eclipse-mosquitto:2.0

# Create directories if they don't exist in the base image
RUN mkdir -p /mosquitto/config /mosquitto/data /mosquitto/log

# Copy configuration
COPY ./config/mosquitto.conf /mosquitto/config/mosquitto.conf
COPY ./init.sh /init.sh

# Make the initialization script executable
RUN chmod +x /init.sh

# Set proper ownership for all Mosquitto directories and files
RUN chown -R root:root /mosquitto && \
    touch /mosquitto/config/passwd && \
    chown root:root /mosquitto/config/passwd && \
    chmod 700 /mosquitto/config/passwd

# Expose MQTT and WebSocket ports
EXPOSE 1883 9001 8883

# Run as root (note: this is not recommended for production)
USER root

# Command to run Mosquitto
ENTRYPOINT ["/init.sh"]