# Docker Deployment Guide

This guide explains how to deploy your portfolio application using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed
- Your environment variables ready (MongoDB credentials, email configuration)

## Quick Start

### 1. Configure Environment Variables

Copy the Docker environment template and fill in your values:

```bash
cp .env.docker .env
```

Edit `.env` and update:
- `MONGO_USERNAME` - MongoDB admin username
- `MONGO_PASSWORD` - Strong password for MongoDB
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - Your Gmail App Password (not regular password!)

### 2. Build and Run

```bash
docker-compose up --build
```

This will:
- Build the portfolio application (frontend + backend)
- Start MongoDB database
- Start your application on port 5000

### 3. Access Your Application

- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/ should return "Portfolio Backend is running"
- **MongoDB**: localhost:27017 (accessible only to the application)

## Architecture

The Docker setup uses a multi-stage build process:

1. **Frontend Build Stage**: Compiles React/Vite application to static files
2. **Backend Build Stage**: Compiles TypeScript server code to JavaScript
3. **Production Stage**: Combines both builds into a lightweight Node.js runtime

## File Structure

```
Dockerfile           # Multi-stage build configuration
docker-compose.yml   # Service orchestration (app + database)
.dockerignore        # Files to exclude from build
.env.docker          # Environment template
.env                 # Your actual environment (git-ignored)
```

## Common Commands

### Start Services
```bash
docker-compose up
```

### Start in Background
```bash
docker-compose up -d
```

### View Logs
```bash
docker-compose logs -f
```

### Stop Services
```bash
docker-compose down
```

### Stop and Remove All Data
```bash
docker-compose down -v
```

### Rebuild After Code Changes
```bash
docker-compose up --build
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `docker-compose ps`
- Check logs: `docker-compose logs mongodb`
- Verify credentials in `.env` match the connection string

### Email Not Sending
- Use Gmail App Password, not your regular password
- Enable 2-factor authentication on Gmail
- Generate App Password at: https://myaccount.google.com/apppasswords

### Build Failures
- Clear Docker cache: `docker-compose build --no-cache`
- Check Docker disk space: `docker system df`
- Prune unused resources: `docker system prune`

## Production Deployment

For production deployment to platforms like Railway, Render, or AWS:

1. The platform will auto-detect the `Dockerfile`
2. Set environment variables in the platform's dashboard:
   - `MONGODB_URI` - Connection string to your hosted MongoDB (e.g., MongoDB Atlas)
   - `EMAIL_USER` - Your email address
   - `EMAIL_PASS` - Your email app password
   - `PORT` - Usually auto-set by the platform
   - `NODE_ENV=production`

3. Update `.env.production` with your deployed backend URL:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

## Data Persistence

- **MongoDB Data**: Stored in Docker volume `mongodb_data`
- **Uploaded Files**: Mapped to `./uploads` directory on host

Even if you stop containers, your data persists. Use `docker-compose down -v` only if you want to delete all data.

## Security Notes

⚠️ **Important Security Considerations:**

1. Never commit `.env` to version control
2. Use strong passwords for MongoDB
3. Use Gmail App Passwords, not account passwords
4. In production, use environment variables instead of `.env` files
5. Consider using secrets management for sensitive data

## Need Help?

- Check application logs: `docker-compose logs app`
- Check database logs: `docker-compose logs mongodb`
- Verify network connectivity: `docker network ls`
- Inspect containers: `docker-compose ps`
