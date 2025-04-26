FROM node:18-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

# Create a non-root user
RUN addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 --gid 1001 appuser

# Set permissions for the application files
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

CMD ["node", "seed.js"]