# Deployment Guide

This guide covers deploying the WellWave Frontend to various platforms.

## Prerequisites

- Backend deployed and accessible (Oficial repository)
- Supabase project configured
- Environment variables configured

## Environment Variables

Required environment variables for deployment:

```env
# Backend API URL (production)
NEXT_PUBLIC_API_URL=https://your-backend-domain.com

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Vercel (Recommended)

### 1. Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select the `OficialFrontend` repository

### 2. Configure Project

- **Framework Preset**: Next.js
- **Root Directory**: `./` (root)
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`

### 3. Environment Variables

Add the following environment variables in the Vercel dashboard:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Make sure to set these for all environments (Production, Preview, Development).

### 4. Deploy

Click "Deploy" and Vercel will:
1. Install dependencies
2. Run build
3. Deploy your application

Your frontend will be available at `https://your-project.vercel.app`

## Netlify

### 1. Connect Repository

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select `OficialFrontend`

### 2. Build Settings

- **Build command**: `pnpm build`
- **Publish directory**: `.next`
- **Base directory**: (leave empty)

### 3. Environment Variables

In Site Settings → Environment Variables, add:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Deploy

Click "Deploy site" and Netlify will build and deploy your application.

## Docker

### 1. Create Dockerfile

```dockerfile
FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Dependencies stage
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Builder stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

# Runner stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3001

ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### 2. Update next.config.js

Add output configuration:

```javascript
const nextConfig = {
  output: 'standalone',
  // ... rest of config
}
```

### 3. Build and Run

```bash
# Build image
docker build -t wellwave-frontend .

# Run container
docker run -p 3001:3001 \
  -e NEXT_PUBLIC_API_URL=https://your-backend.com \
  -e NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  wellwave-frontend
```

### 4. Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NEXT_PUBLIC_API_URL=https://your-backend.com
      - NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
    restart: unless-stopped
```

## AWS Amplify

### 1. Connect Repository

1. Go to AWS Amplify Console
2. Click "New app" → "Host web app"
3. Connect to GitHub and select repository

### 2. Build Settings

Create `amplify.yml`:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install -g pnpm
        - pnpm install
    build:
      commands:
        - pnpm build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### 3. Environment Variables

Add environment variables in Amplify Console → App settings → Environment variables.

## Custom Server (VPS/EC2)

### 1. Prerequisites

```bash
# Install Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm
```

### 2. Clone and Build

```bash
# Clone repository
git clone https://github.com/Wesley-codeDr/OficialFrontend.git
cd OficialFrontend

# Install dependencies
pnpm install

# Build
pnpm build
```

### 3. Configure Environment

```bash
# Create .env.production
cat > .env.production << EOF
NEXT_PUBLIC_API_URL=https://your-backend.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
EOF
```

### 4. Run with PM2

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "wellwave-frontend" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 5. Configure Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Post-Deployment Checklist

- [ ] Verify environment variables are set correctly
- [ ] Test API connectivity to backend
- [ ] Verify Supabase authentication works
- [ ] Check all pages load correctly
- [ ] Test responsive design on mobile
- [ ] Run Playwright E2E tests
- [ ] Configure custom domain (if applicable)
- [ ] Set up SSL certificate
- [ ] Configure monitoring (Sentry, etc.)
- [ ] Set up analytics (if needed)

## Troubleshooting

### Build Fails

1. Check Node.js version (should be 18+)
2. Verify all environment variables are set
3. Clear build cache: `rm -rf .next node_modules && pnpm install`

### API Connection Issues

1. Verify `NEXT_PUBLIC_API_URL` is correct
2. Check CORS settings on backend
3. Verify backend is accessible from deployment platform

### Authentication Issues

1. Verify Supabase credentials
2. Check Supabase project URL
3. Ensure Supabase project is active

## Monitoring

### Vercel Analytics

Enable Vercel Analytics in your dashboard for:
- Web Vitals monitoring
- Real User Monitoring (RUM)
- Performance insights

### Custom Monitoring

Add Sentry or similar:

```bash
pnpm add @sentry/nextjs
```

Configure in `sentry.config.js`.

## Scaling

### Vercel

Vercel auto-scales based on traffic. No configuration needed.

### Docker/Kubernetes

Use horizontal pod autoscaling:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: wellwave-frontend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: wellwave-frontend
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## Rollback

### Vercel

Use the Vercel dashboard to rollback to a previous deployment.

### Docker

```bash
# List previous images
docker images wellwave-frontend

# Run previous version
docker run -p 3001:3001 wellwave-frontend:previous-tag
```

### PM2

```bash
# View logs for errors
pm2 logs wellwave-frontend

# Restart
pm2 restart wellwave-frontend

# If needed, redeploy previous version
git checkout previous-commit
pnpm install && pnpm build
pm2 restart wellwave-frontend
```
