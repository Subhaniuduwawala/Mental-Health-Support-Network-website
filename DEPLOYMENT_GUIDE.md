# 🚀 Deployment Guide

Complete guide for deploying the Mental Health Support Network platform to production.

---

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Database Deployment (MongoDB Atlas)](#database-deployment-mongodb-atlas)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Environment Configuration](#environment-configuration)
- [SSL/TLS Configuration](#ssltls-configuration)
- [Monitoring & Logging](#monitoring--logging)
- [Backup Strategy](#backup-strategy)
- [Troubleshooting](#troubleshooting)

---

## Overview

This guide covers deploying the platform using:
- **Database**: MongoDB Atlas (Cloud)
- **Backend**: Railway / Render / Heroku
- **Frontend**: Vercel / Netlify

Alternative deployment options are also discussed.

---

## Prerequisites

Before deploying, ensure you have:

- [ ] Production-ready code (tested locally)
- [ ] Git repository (GitHub, GitLab, or Bitbucket)
- [ ] Accounts on chosen deployment platforms
- [ ] Domain name (optional but recommended)
- [ ] Updated `.env` files with production values
- [ ] Admin credentials changed from defaults

---

## Database Deployment (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Verify your email

### Step 2: Create a Cluster

1. Click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region close to your users
5. Name your cluster (e.g., `mental-health-cluster`)
6. Click "Create"

### Step 3: Configure Database Access

1. Go to **Database Access**
2. Click "Add New Database User"
3. Choose authentication method: **Password**
4. Create username and strong password
5. Under "Database User Privileges", select **Read and write to any database**
6. Click "Add User"

### Step 4: Configure Network Access

1. Go to **Network Access**
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add specific IP addresses of your backend servers
5. Click "Confirm"

### Step 5: Get Connection String

1. Go to **Database** → **Connect**
2. Choose "Connect your application"
3. Select Driver: **Node.js** and Version: **4.1 or later**
4. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` and `<password>` with your credentials
6. Add database name: `employee`
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/employee?retryWrites=true&w=majority
   ```

### Step 6: Test Connection

```javascript
// In backend/index.js, update MongoDB connection:
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
```

---

## Backend Deployment

### Option 1: Railway (Recommended)

#### Step 1: Prepare Repository

1. Ensure `backend/package.json` has start script:
   ```json
   {
     "scripts": {
       "start": "node index.js"
     }
   }
   ```

2. Create `backend/railway.json` (optional):
   ```json
   {
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "npm start",
       "restartPolicyType": "ON_FAILURE"
     }
   }
   ```

#### Step 2: Deploy to Railway

1. Go to [Railway.app](https://railway.app/)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Select root path: `backend`
7. Railway will auto-detect Node.js

#### Step 3: Configure Environment Variables

In Railway dashboard:

1. Go to your project → **Variables**
2. Add the following:
   ```
   JWT_SECRET=your-production-secret-key-at-least-32-chars
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employee
   PORT=3001
   NODE_ENV=production
   ```

#### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Railway will provide a URL (e.g., `https://mental-health-backend.up.railway.app`)
4. Test the API: `https://your-app.up.railway.app/counselors`

---

### Option 2: Render

#### Step 1: Prepare Repository

Same as Railway preparation.

#### Step 2: Create Web Service

1. Go to [Render.com](https://render.com/)
2. Sign up and connect GitHub
3. Click "New +" → "Web Service"
4. Select your repository
5. Configure:
   - **Name**: mental-health-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

#### Step 3: Add Environment Variables

In "Environment" tab, add:
```
JWT_SECRET=your-production-secret
MONGODB_URI=your-mongodb-atlas-connection-string
PORT=3001
NODE_ENV=production
```

#### Step 4: Deploy

1. Click "Create Web Service"
2. Render will build and deploy
3. Your API will be available at: `https://mental-health-backend.onrender.com`

---

### Option 3: Heroku

#### Step 1: Install Heroku CLI

```bash
npm install -g heroku
heroku login
```

#### Step 2: Create Heroku App

```bash
cd backend
heroku create mental-health-backend
```

#### Step 3: Set Environment Variables

```bash
heroku config:set JWT_SECRET=your-production-secret
heroku config:set MONGODB_URI=your-mongodb-atlas-uri
heroku config:set NODE_ENV=production
```

#### Step 4: Deploy

```bash
git add .
git commit -m "Prepare for Heroku deployment"
git push heroku main
```

#### Step 5: Open App

```bash
heroku open
```

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

#### Step 1: Prepare for Production

1. Update API base URL in frontend code

Create `frontend/src/config.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
export default API_BASE_URL;
```

2. Update all axios calls:
```javascript
import API_BASE_URL from './config';
import axios from 'axios';

axios.get(`${API_BASE_URL}/counselors`)
```

3. Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend-url.up.railway.app
```

#### Step 2: Deploy to Vercel

1. Go to [Vercel.com](https://vercel.com/)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Configure:
   - **Root Directory**: frontend
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.up.railway.app
   ```

7. Click "Deploy"

8. Vercel will provide URL: `https://mental-health-network.vercel.app`

---

### Option 2: Netlify

#### Step 1: Build Configuration

Create `frontend/netlify.toml`:
```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  VITE_API_URL = "https://your-backend-url.up.railway.app"
```

#### Step 2: Deploy to Netlify

1. Go to [Netlify.com](https://netlify.com/)
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose your repository
5. Configure:
   - **Base directory**: frontend
   - **Build command**: `npm run build`
   - **Publish directory**: frontend/dist

6. Add Environment Variables in Netlify dashboard:
   ```
   VITE_API_URL=https://your-backend-url.up.railway.app
   ```

7. Click "Deploy"

---

## Environment Configuration

### Production Environment Variables

#### Backend `.env`
```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/employee?retryWrites=true&w=majority

# Authentication
JWT_SECRET=super-secure-random-string-min-32-characters-long

# Server
PORT=3001
NODE_ENV=production

# CORS (if needed)
FRONTEND_URL=https://mental-health-network.vercel.app

# Optional: Logging
LOG_LEVEL=info
```

#### Frontend `.env.production`
```env
VITE_API_URL=https://mental-health-backend.up.railway.app
```

### Security Best Practices

1. **Never commit `.env` files to Git**
   
   Add to `.gitignore`:
   ```
   .env
   .env.local
   .env.production
   .env.development
   ```

2. **Use strong JWT secrets** (minimum 32 characters)
   
   Generate secure secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Rotate secrets regularly** (every 90 days)

4. **Use environment-specific configurations**

---

## SSL/TLS Configuration

### Automatic SSL (Recommended)

Most modern platforms (Vercel, Netlify, Railway, Render) provide automatic SSL certificates via Let's Encrypt.

### Custom Domain SSL

1. **Add Custom Domain** in your deployment platform
2. **Update DNS records**:
   - Type: A or CNAME
   - Name: @ (or subdomain)
   - Value: Platform's IP or domain

3. **Wait for SSL provisioning** (5-30 minutes)

### Force HTTPS

In backend `index.js`, add middleware:
```javascript
// Force HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```

---

## CORS Configuration

Update backend CORS for production:

```javascript
import cors from 'cors';

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

---

## Monitoring & Logging

### 1. Application Monitoring

#### Option A: PM2 (if using VPS)

```bash
npm install -g pm2

# Start with PM2
pm2 start index.js --name mental-health-api

# Monitor
pm2 monit

# Logs
pm2 logs mental-health-api

# Auto-restart on crash
pm2 startup
pm2 save
```

#### Option B: Winston Logger

Install:
```bash
npm install winston
```

Create `backend/logger.js`:
```javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

export default logger;
```

Use in code:
```javascript
import logger from './logger.js';

logger.info('User logged in', { userId, email });
logger.error('Database connection failed', { error: err.message });
```

### 2. Error Tracking

#### Sentry Integration

1. Sign up at [Sentry.io](https://sentry.io/)
2. Create new project
3. Install SDK:
   ```bash
   npm install @sentry/node
   ```

4. Initialize in `index.js`:
   ```javascript
   import * as Sentry from '@sentry/node';

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
     tracesSampleRate: 1.0,
   });

   // Error handling middleware
   app.use(Sentry.Handlers.errorHandler());
   ```

### 3. Uptime Monitoring

Use services like:
- [UptimeRobot](https://uptimerobot.com/) (Free)
- [Pingdom](https://www.pingdom.com/)
- [StatusCake](https://www.statuscake.com/)

Configure to ping your API every 5 minutes:
```
GET https://your-api.com/health
```

Add health endpoint:
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});
```

---

## Backup Strategy

### 1. MongoDB Atlas Automated Backups

1. Go to MongoDB Atlas dashboard
2. Navigate to "Backup" tab
3. Enable Cloud Backups (available on M10+ clusters)
4. Configure backup schedule

### 2. Manual Backups

```bash
# Export database
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/employee" --out=./backup-$(date +%Y%m%d)

# Restore database
mongorestore --uri="mongodb+srv://user:pass@cluster.mongodb.net/employee" ./backup-20260306
```

### 3. Automated Backup Script

Create `scripts/backup.sh`:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="./backups/$DATE"

mongodump --uri="$MONGODB_URI" --out="$BACKUP_DIR"

# Upload to cloud storage (optional)
# aws s3 cp $BACKUP_DIR s3://your-bucket/backups/ --recursive
```

Schedule with cron:
```bash
# Daily backup at 2 AM
0 2 * * * /path/to/backup.sh
```

---

## Performance Optimization

### 1. Enable Compression

```javascript
import compression from 'compression';
app.use(compression());
```

### 2. Database Indexing

```javascript
// In models
AppointmentSchema.index({ email: 1, startAt: -1 });
CounselorSchema.index({ category: 1, rating: -1 });
```

### 3. Caching

Install Redis:
```bash
npm install redis
```

Implement caching:
```javascript
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.connect();

// Cache counselors list
app.get('/counselors', async (req, res) => {
  const cached = await redisClient.get('counselors');
  
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  const counselors = await CounselorModel.find();
  await redisClient.setEx('counselors', 3600, JSON.stringify(counselors));
  
  res.json(counselors);
});
```

### 4. Frontend Optimization

```bash
cd frontend

# Analyze bundle size
npm run build -- --stats

# Use production build
npm run build
```

---

## Troubleshooting

### Common Issues

#### 1. CORS Errors
**Problem**: Frontend can't reach backend

**Solution**:
```javascript
// backend/index.js
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

#### 2. MongoDB Connection Timeout
**Problem**: Can't connect to MongoDB Atlas

**Solutions**:
- Check IP whitelist in MongoDB Atlas
- Verify connection string format
- Ensure network access is configured

#### 3. Environment Variables Not Loading
**Problem**: App can't find env vars

**Solutions**:
- Verify variables are set in deployment platform
- Check variable names match exactly
- Restart application after adding variables

#### 4. Build Fails on Deployment
**Problem**: `npm run build` fails

**Solutions**:
- Test build locally first
- Check Node.js version compatibility
- Review error logs in deployment platform
- Ensure all dependencies are in `package.json`

#### 5. API Returns 502 Bad Gateway
**Problem**: Backend not responding

**Solutions**:
- Check application logs
- Verify backend is running
- Check database connection
- Ensure port is correctly configured

---

## Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Verify database connections
- [ ] Test user registration and login
- [ ] Book a test appointment
- [ ] Upload test music file
- [ ] Check admin dashboard functionality
- [ ] Verify email notifications (if implemented)
- [ ] Test on mobile devices
- [ ] Check SSL certificate is valid
- [ ] Set up monitoring and alerts
- [ ] Configure automated backups
- [ ] Update default admin password
- [ ] Document all environment variables
- [ ] Set up custom domain (if applicable)
- [ ] Configure CDN (optional)
- [ ] Enable rate limiting
- [ ] Test error handling
- [ ] Verify CORS configuration

---

## Scaling Strategies

### Horizontal Scaling

1. **Load Balancer**: Distribute traffic across multiple backend instances
2. **Database Replicas**: MongoDB Atlas auto-scales with higher tiers
3. **CDN**: Use Cloudflare or AWS CloudFront for static assets

### Vertical Scaling

1. **Upgrade server resources** (RAM, CPU)
2. **Optimize queries** with proper indexing
3. **Implement caching** (Redis, Memcached)

---

## Security Hardening

### 1. Rate Limiting

```bash
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 2. Helmet for Security Headers

```bash
npm install helmet
```

```javascript
import helmet from 'helmet';
app.use(helmet());
```

### 3. Input Validation

```bash
npm install express-validator
```

```javascript
import { body, validationResult } from 'express-validator';

app.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process registration
  }
);
```

---

## Rollback Strategy

### Quick Rollback

Most platforms support instant rollback:

**Vercel/Netlify**: Click previous deployment → "Promote to Production"

**Railway/Render**: Redeploy previous commit

### Manual Rollback

```bash
# Git rollback
git revert <commit-hash>
git push

# Platform will auto-deploy previous version
```

---

## Support

For deployment issues:
- Check platform status pages
- Review deployment logs
- Contact platform support
- Open GitHub issue for app-specific problems

---

**Last Updated**: March 6, 2026
**Maintained by**: Mental Health Support Network Team
