FROM influxdb:latest

# For Azure App Service compatibility
ENV PORT=8086

# Add startup script
COPY init.sh /init.sh
RUN chmod +x /init.sh

# Expose InfluxDB API port
EXPOSE 8086

# Start InfluxDB with the startup script
ENTRYPOINT [ "/init.sh" ]