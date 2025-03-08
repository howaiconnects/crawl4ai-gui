# Build frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Setup backend
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./
COPY --from=frontend-build /app/frontend/build ./public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8000

# Expose the port
EXPOSE 8000

# Start the application
CMD ["node", "index.js"]
