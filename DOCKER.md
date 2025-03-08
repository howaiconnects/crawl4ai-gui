# Docker Setup for Crawl4AI

This project uses Docker to create a consistent development environment. This guide will help you get up and running with Docker.

## Prerequisites

- Docker installed on your machine
- Docker Compose installed on your machine

## Quick Start

1. **Start all containers:**
   ```bash
   npm run dev
   ```

2. **Start with rebuilding containers:**
   ```bash
   npm run dev:build
   ```

3. **Stop all containers:**
   ```bash
   npm run dev:down
   ```

## Docker Architecture

Our Docker setup consists of three main services:

1. **mongodb** - MongoDB database
2. **backend** - Node.js Express API
3. **frontend** - React application

Each service runs in its own container and they communicate over a Docker network.

## Development Workflow

1. Start the Docker environment: `npm run dev`
2. Access the frontend at: http://localhost:3000
3. Access the API at: http://localhost:8000
4. Changes to the code are automatically reflected (hot reloading)

## Accessing Containers

To access a specific container's shell:

```bash
# For MongoDB
docker exec -it crawl4ai-mongodb bash

# For backend
docker exec -it crawl4ai-backend sh

# For frontend
docker exec -it crawl4ai-frontend sh
```

## Logs

To view logs:

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# Follow logs
docker-compose logs -f
```

## Data Persistence

MongoDB data is stored in a Docker volume named `mongodb_data`. This ensures your data persists between container restarts.

## Troubleshooting

1. **Port conflicts:**
   - If ports 3000, 8000, or 27017 are already in use, modify the port mappings in docker-compose.yml

2. **Container not starting:**
   - Check logs: `docker-compose logs [service_name]`
   - Try rebuilding: `npm run dev:build`

3. **Changes not reflecting:**
   - Some changes might require a container restart: `docker-compose restart [service_name]`
