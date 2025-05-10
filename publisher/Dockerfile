FROM node:18-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

# Create a non-root user
RUN addgroup -S -g 1001 appgroup && \
    adduser -S -u 1001 -G appgroup appuser

# Set permissions for the application files
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

CMD ["node", "seed.js"]