# MongoDB Setup Guide for Crawl4AI

## Development Environment with Docker

For local development, we use Docker to run MongoDB. This approach ensures a consistent development environment regardless of your operating system.

### Prerequisites

- Docker installed on your machine
- Docker Compose installed on your machine

### Starting the Development Environment

1. **Start the entire application stack including MongoDB:**
   ```bash
   npm run dev
   ```

2. **Or start just MongoDB:**
   ```bash
   docker-compose up mongodb
   ```

3. **Connect to MongoDB container (if needed):**
   ```bash
   docker exec -it crawl4ai-mongodb mongosh
   ```

### MongoDB Data

The MongoDB data is persisted in a Docker volume named `mongodb_data`. This ensures your data is preserved even when containers are stopped or removed.

## Production Environment on Railway

For production, we use Railway's MongoDB plugin, which provides a managed MongoDB instance.

### Setting Up MongoDB on Railway

1. In your Railway project, click "New"
2. Select "Database" → "MongoDB"
3. Railway will automatically provision a MongoDB instance
4. Railway will automatically set the `MONGODB_URL` environment variable

Our application is configured to detect the Railway environment and use the correct MongoDB connection string automatically.

## Manual MongoDB Connection

If you need to connect to MongoDB manually:

### Local Development
- **Connection String:** `mongodb://localhost:27017/crawl4ai`
- **Username/Password:** None (default configuration)

### Railway Production
- **Connection String:** Provided by Railway (check your Railway dashboard)
- **Database Name:** Usually set to `railway`

## Troubleshooting

### Common Issues

1. **Cannot connect to MongoDB:**
   - Ensure Docker is running
   - Check if MongoDB container is running: `docker ps`
   - Restart MongoDB: `docker-compose restart mongodb`

2. **Data persistence issues:**
   - Check if the volume is properly mounted: `docker volume ls`
   - If needed, backup data: `docker exec crawl4ai-mongodb mongodump --out /dump`
