FROM telegraf:latest

# Copy our custom configuration file
COPY ./config/telegraf.conf /etc/telegraf/telegraf.conf

# Set the permissions
RUN chmod 644 /etc/telegraf/telegraf.conf

# Expose necessary ports
EXPOSE 5050

# Run Telegraf
CMD ["telegraf", "--config", "/etc/telegraf/telegraf.conf"]
