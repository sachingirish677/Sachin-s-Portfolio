# Multi-stage Dockerfile for Portfolio Application
# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copy frontend package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY eslint.config.js ./
COPY index.html ./

# Install frontend dependencies
RUN npm ci --legacy-peer-deps

# Copy frontend source code
COPY src ./src
COPY public ./public

# Build frontend
RUN npm run build

# Stage 2: Build Server
FROM node:20-alpine AS server-builder

WORKDIR /app/server

# Copy server package files
COPY server/package*.json ./

# Install all dependencies (including devDependencies for TypeScript compilation)
RUN npm ci

# Copy server source code and tsconfig
COPY server/src ./src
COPY server/tsconfig.json ./

# Compile TypeScript to JavaScript
RUN npx tsc

# Stage 3: Production Image
FROM node:20-alpine AS production

WORKDIR /app

# Install production dependencies for server
COPY server/package*.json ./
RUN npm ci --only=production

# Copy compiled server code from server-builder
COPY --from=server-builder /app/server/dist ./dist

# Copy frontend build from frontend-builder
COPY --from=frontend-builder /app/dist ./public

# Create uploads directory
RUN mkdir -p uploads

# Expose the port the app runs on
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production

# Start the compiled server
CMD ["node", "dist/index.js"]
