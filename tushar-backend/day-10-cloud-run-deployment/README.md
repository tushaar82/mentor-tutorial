# Day 10: Cloud Run Deployment (Backend)

## What You're Building

You're deploying your FastAPI backend to Google Cloud Run, a fully managed serverless platform that automatically scales your application based on traffic. You'll containerize your application using Docker, set up continuous deployment with Cloud Build, and configure production environment variables.

## Why This Matters

**Production Deployment**: Moving from local development to a live, publicly accessible API that your frontend can connect to.

**Serverless Benefits**: Cloud Run automatically handles scaling, load balancing, and infrastructure management, so you only pay for actual usage.

**Professional DevOps**: Learn industry-standard deployment practices using Docker containers and CI/CD pipelines.

**Real-World Experience**: Understand how to deploy Python applications to production with proper configuration, monitoring, and security.

## How It Works

### Docker Containerization

Docker packages your application and all its dependencies into a container that runs consistently across any environment:

```
Your Code + Python + Dependencies → Docker Image → Runs Anywhere
```

**Dockerfile** defines:
- Base Python image
- Application dependencies
- Environment setup
- Startup command

### Google Cloud Run

Cloud Run is a serverless container platform:

1. **Upload**: Push your Docker image to Google Container Registry
2. **Deploy**: Cloud Run creates instances from your image
3. **Scale**: Automatically scales from 0 to N instances based on traffic
4. **Pay**: Only charged when requests are being processed

### CI/CD with Cloud Build

Cloud Build automates the deployment process:

```
Git Push → Cloud Build Triggered → Build Docker Image → Deploy to Cloud Run
```

**cloudbuild.yaml** defines:
- Build steps
- Image tagging
- Deployment configuration

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Developer Workflow                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. Code Changes → Git Push                                  │
│                      ↓                                        │
│  2. Cloud Build Triggered                                    │
│                      ↓                                        │
│  3. Build Docker Image                                       │
│                      ↓                                        │
│  4. Push to Container Registry                               │
│                      ↓                                        │
│  5. Deploy to Cloud Run                                      │
│                      ↓                                        │
│  6. Live API at https://your-service.run.app                 │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Production Architecture                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Internet → Cloud Run Load Balancer                          │
│                      ↓                                        │
│             Container Instance 1 ┐                           │
│             Container Instance 2 ├─ Auto-scaled              │
│             Container Instance N ┘                           │
│                      ↓                                        │
│             Your FastAPI App                                 │
│                      ↓                                        │
│  Firebase, Vertex AI, Gemini, Firestore                     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Learning Objectives

By completing this task, you will:

- **Containerize** a Python FastAPI application with Docker
- **Deploy** to Google Cloud Run serverless platform
- **Configure** production environment variables and secrets
- **Set up** CI/CD pipeline with Cloud Build
- **Monitor** application logs and performance
- **Secure** your API with proper authentication and CORS
- **Optimize** container images for faster deployments

## Time Estimate

- **LLM Code Generation**: 45 minutes (Dockerfile, cloudbuild.yaml, deployment scripts)
- **Configuration**: 45 minutes (GCP project setup, Cloud Run service, environment variables)
- **Testing**: 30 minutes (Deploy and test live API)
- **Total**: 2 hours

## Prerequisites

### Completed Tasks
- All Day 1-9 backend tasks (complete working FastAPI application)
- Firebase Admin SDK configured
- Vertex AI and Gemini APIs enabled
- Razorpay integration working

### Required Accounts
- Google Cloud Platform account with billing enabled
- Firebase project (already created in Day 2)
- Domain name (optional, for custom domain)

### Required Software
- Docker Desktop installed and running
- Google Cloud SDK (gcloud CLI) installed
- Git configured

### Required Knowledge
- Basic understanding of Docker concepts
- Familiarity with command-line tools
- Understanding of environment variables

## Files You'll Create

### Docker Configuration
- `Dockerfile` - Container image definition
- `.dockerignore` - Files to exclude from Docker build
- `docker-compose.yml` - Local Docker testing (optional)

### Cloud Build Configuration
- `cloudbuild.yaml` - CI/CD pipeline definition
- `.gcloudignore` - Files to exclude from Cloud Build

### Deployment Scripts
- `scripts/deploy.sh` - Manual deployment script
- `scripts/setup-secrets.sh` - Environment variable setup
- `scripts/test-deployment.sh` - Post-deployment testing

### Documentation
- `DEPLOYMENT.md` - Deployment guide and commands
- `MONITORING.md` - How to monitor and debug production

## What You'll Have After This Task

✅ **Containerized Application**: Docker image that runs your FastAPI app

✅ **Live Production API**: Publicly accessible API at `https://your-service-xxxxx.run.app`

✅ **Automated Deployments**: Push to Git → Automatic deployment to Cloud Run

✅ **Production Configuration**: Environment variables, secrets, and security properly configured

✅ **Monitoring Setup**: Access to logs, metrics, and error tracking

✅ **Scalable Infrastructure**: Automatically handles traffic spikes

## Key Concepts

### Docker Basics

**Image**: A snapshot of your application and its environment
**Container**: A running instance of an image
**Dockerfile**: Instructions to build an image
**Layer**: Each instruction in Dockerfile creates a layer (cached for faster builds)

### Cloud Run Concepts

**Service**: Your deployed application
**Revision**: A specific version of your service
**Instance**: A running container serving requests
**Cold Start**: Time to start a new instance (optimized with min instances)

### Environment Variables vs Secrets

**Environment Variables**: Non-sensitive configuration (API URLs, feature flags)
**Secrets**: Sensitive data (API keys, database passwords) - stored in Secret Manager

## Common Challenges

### Challenge 1: Large Docker Images
**Problem**: Slow builds and deployments
**Solution**: Use multi-stage builds, minimize layers, use .dockerignore

### Challenge 2: Cold Starts
**Problem**: First request after idle period is slow
**Solution**: Set minimum instances, optimize container startup time

### Challenge 3: Environment Variables
**Problem**: Managing different configs for dev/staging/prod
**Solution**: Use Secret Manager, separate .env files per environment

### Challenge 4: Database Connections
**Problem**: Firestore/Firebase connection issues in production
**Solution**: Proper service account configuration, connection pooling

## Next Steps

After completing this task:

1. **Test thoroughly**: Verify all endpoints work in production
2. **Set up monitoring**: Configure alerts for errors and performance
3. **Custom domain**: (Optional) Configure custom domain for your API
4. **Frontend integration**: Update frontend to use production API URL
5. **Day 10 Frontend**: Deploy frontend to Firebase Hosting

## Production Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Firebase service account properly set up
- [ ] CORS configured for production frontend domain
- [ ] API rate limiting enabled
- [ ] Error logging and monitoring configured
- [ ] Health check endpoint working
- [ ] All tests passing
- [ ] Documentation updated with production URLs

## Resources

- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [FastAPI Deployment Guide](https://fastapi.tiangolo.com/deployment/)
- [Cloud Build Documentation](https://cloud.google.com/build/docs)

---

**Ready to deploy?** Let's containerize your application and get it running in production! 🚀
