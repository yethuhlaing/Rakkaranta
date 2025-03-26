FROM influxdb:latest

# For Azure App Service compatibility
ENV PORT=8086

# Expose InfluxDB API port
EXPOSE 8086

# Start InfluxDB with the startup script
ENTRYPOINT [ "influxd" ]