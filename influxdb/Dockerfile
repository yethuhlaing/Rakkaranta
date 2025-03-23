FROM influxdb:2.6-alpine


# Copy configuration files if needed
COPY ./config/config.yml /etc/influxdb2/config.yml

# Expose InfluxDB port
EXPOSE 8086

# Command to run InfluxDB with the configuration file
CMD ["influxd"]