# Day 10: Firebase Hosting Deployment (Frontend)

## What You're Building

You're deploying your Next.js frontend to Firebase Hosting, a fast and secure web hosting service powered by Google's global CDN. You'll configure the production build, set up environment variables, and deploy your application to make it publicly accessible.

## Why This Matters

**Production Deployment**: Moving from local development to a live, publicly accessible website that users can access from anywhere.

**Global CDN**: Firebase Hosting uses Google's Content Delivery Network to serve your site from the closest location to your users, ensuring fast load times worldwide.

**Professional Hosting**: Learn industry-standard deployment practices for React/Next.js applications with automatic SSL certificates, custom domains, and instant rollbacks.

**Real-World Experience**: Understand how to deploy modern web applications to production with proper configuration, caching, and performance optimization.

## How It Works

### Next.js Production Build

Next.js optimizes your application for production:

```
Development Code → Build Process → Optimized Static Files
```

**Build process**:
- Compiles TypeScript to JavaScript
- Bundles and minifies code
- Optimizes images
- Generates static HTML pages
- Creates service worker for caching

### Firebase Hosting

Firebase Hosting is a production-grade web hosting service:

1. **Upload**: Deploy your built files to Firebase
2. **CDN**: Files are distributed to edge servers worldwide
3. **SSL**: Automatic HTTPS with free SSL certificates
4. **Serve**: Users access your site from the nearest server

### Deployment Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                     Developer Workflow                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. Code Changes → Git Push                                  │
│                      ↓                                        │
│  2. Run Build: npm run build                                 │
│                      ↓                                        │
│  3. Deploy: firebase deploy                                  │
│                      ↓                                        │
│  4. Live Site at https://your-app.web.app                    │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Production Architecture                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  User Browser → Firebase CDN (Nearest Edge Server)           │
│                      ↓                                        │
│             Static Files (HTML, CSS, JS)                     │
│                      ↓                                        │
│             Your Next.js Application                         │
│                      ↓                                        │
│  Backend API (Cloud Run), Firebase Auth, Firestore          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Learning Objectives

By completing this task, you will:

- **Build** a production-optimized Next.js application
- **Deploy** to Firebase Hosting with global CDN
- **Configure** environment variables for production
- **Set up** custom domains and SSL certificates
- **Implement** caching strategies for performance
- **Monitor** deployment status and analytics
- **Rollback** deployments if issues occur

## Time Estimate

- **LLM Code Generation**: 30 minutes (build config, deployment scripts)
- **Configuration**: 45 minutes (Firebase setup, environment variables, custom domain)
- **Testing**: 30 minutes (Deploy and test live site)
- **Total**: 1.5-2 hours

## Prerequisites

### Completed Tasks
- All Day 1-9 frontend tasks (complete working Next.js application)
- Firebase project created (from Day 2)
- Backend API deployed to Cloud Run (Day 10 Backend)

### Required Accounts
- Firebase project with Hosting enabled
- Domain name (optional, for custom domain)

### Required Software
- Node.js 18+ installed
- Firebase CLI installed
- Git configured

### Required Knowledge
- Basic understanding of build processes
- Familiarity with command-line tools
- Understanding of environment variables

## Files You'll Create

### Build Configuration
- `next.config.js` - Production build configuration
- `.env.production` - Production environment variables
- `public/_redirects` - URL redirects and rewrites

### Firebase Configuration
- `firebase.json` - Firebase Hosting configuration
- `.firebaserc` - Firebase project configuration

### Deployment Scripts
- `scripts/build-production.sh` - Production build script
- `scripts/deploy.sh` - Deployment script
- `scripts/test-deployment.sh` - Post-deployment testing

### Documentation
- `DEPLOYMENT.md` - Deployment guide and commands

## What You'll Have After This Task

✅ **Production Build**: Optimized Next.js application ready for deployment

✅ **Live Website**: Publicly accessible site at `https://your-app.web.app`

✅ **Custom Domain**: (Optional) Your site at `https://www.mentorai.com`

✅ **SSL Certificate**: Automatic HTTPS with free SSL

✅ **Global CDN**: Fast loading from anywhere in the world

✅ **Deployment Pipeline**: Simple command to deploy updates

## Key Concepts

### Next.js Build Modes

**Development Mode** (`npm run dev`):
- Hot reload for instant updates
- Detailed error messages
- Source maps for debugging
- Not optimized for performance

**Production Mode** (`npm run build`):
- Optimized and minified code
- Static HTML generation
- Image optimization
- Code splitting for faster loads

### Firebase Hosting Features

**CDN**: Content Delivery Network serves files from edge servers worldwide

**SSL**: Automatic HTTPS with free SSL certificates

**Caching**: Intelligent caching for fast repeat visits

**Rollback**: Instantly revert to previous deployment

**Custom Domains**: Use your own domain name

**Preview Channels**: Test deployments before going live

### Environment Variables

**Development** (`.env.local`):
- Local API endpoints
- Test API keys
- Debug settings

**Production** (`.env.production`):
- Production API URLs
- Production API keys
- Analytics IDs

### Caching Strategy

**Static Assets** (images, fonts):
- Cache for 1 year
- Immutable (never changes)

**HTML Files**:
- Cache for 1 hour
- Revalidate on each request

**JavaScript/CSS**:
- Cache based on content hash
- Automatic invalidation on updates

## Common Challenges

### Challenge 1: Environment Variables Not Working
**Problem**: API calls fail in production
**Solution**: Ensure `.env.production` is properly configured and variables are prefixed with `NEXT_PUBLIC_`

### Challenge 2: 404 Errors on Refresh
**Problem**: Direct URL access returns 404
**Solution**: Configure rewrites in `firebase.json` to handle client-side routing

### Challenge 3: Slow Initial Load
**Problem**: First page load is slow
**Solution**: Optimize images, enable code splitting, use lazy loading

### Challenge 4: API CORS Errors
**Problem**: Frontend can't connect to backend
**Solution**: Update backend CORS settings to allow production domain

## Next Steps

After completing this task:

1. **Test thoroughly**: Verify all features work in production
2. **Set up monitoring**: Configure Firebase Analytics and Performance Monitoring
3. **Custom domain**: (Optional) Configure custom domain for your site
4. **Integration testing**: Test complete user flows from frontend to backend
5. **Performance optimization**: Analyze and improve load times

## Production Checklist

Before going live:

- [ ] All environment variables configured for production
- [ ] Backend API URL updated to production Cloud Run URL
- [ ] Firebase Authentication configured for production domain
- [ ] All features tested in production
- [ ] Error tracking configured
- [ ] Analytics set up
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Performance optimized (Lighthouse score > 90)

## Resources

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Web Performance Best Practices](https://web.dev/performance/)

---

**Ready to deploy?** Let's get your application live and accessible to users worldwide! 🚀
