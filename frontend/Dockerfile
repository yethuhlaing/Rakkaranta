# Frontend Dockerfile (./frontend/Dockerfile)
FROM node:18-slim AS base

# Install system dependencies - do this early as it rarely changes
RUN apt-get update && apt-get install -y openssl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# First copy only package files and prisma - this creates a layer that only changes when dependencies change
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies and generate Prisma client
RUN npm ci --legacy-peer-deps && npx prisma generate

# Now copy the rest of the code - this layer will change frequently
COPY . .

# Set environment variables, expose ports, and set command - these don't create new layers
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm", "run", "dev"]