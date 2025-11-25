# Troubleshooting Guide: Firebase Hosting Deployment

This guide helps you diagnose and fix common issues when deploying Next.js to Firebase Hosting.

---

## Build Issues

### Issue 1: Build Fails with TypeScript Errors

**Symptoms**:
```
Type error: Property 'X' does not exist on type 'Y'
npm ERR! code 1
```

**Possible Causes**:
1. TypeScript type errors in code
2. Missing type definitions
3. Incorrect type annotations

**Solutions**:

```bash
# Check TypeScript errors
npx tsc --noEmit

# Fix type errors in code
# Add proper type annotations

# Install missing type definitions
npm install --save-dev @types/react @types/node

# If urgent, skip type checking (not recommended)
# In next.config.js:
typescript: {
  ignoreBuildErrors: true
}
```

**Prevention**:
- Run `npm run type-check` before building
- Use TypeScript strict mode
- Add types for all props and functions

---

### Issue 2: Build Fails with "Out of Memory"

**Symptoms**:
```
FATAL ERROR: Ineffective mark-compacts near heap limit
Allocation failed - JavaScript heap out of memory
```

**Possible Causes**:
1. Large application with many dependencies
2. Insufficient Node.js memory
3. Memory leak in build process

**Solutions**:

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Or add to package.json scripts:
"build": "NODE_OPTIONS='--max-old-space-size=4096' next build"

# Clean cache and rebuild
rm -rf .next node_modules
npm install
npm run build

# Optimize dependencies
npm prune
npm dedupe
```

**Prevention**:
- Keep dependencies minimal
- Use dynamic imports for large components
- Optimize images before importing

---

### Issue 3: Environment Variables Not Working

**Symptoms**:
```
API_URL is undefined
Cannot read property 'NEXT_PUBLIC_API_URL' of undefined
```

**Possible Causes**:
1. Variables not prefixed with `NEXT_PUBLIC_`
2. `.env.production` not loaded
3. Variables not defined in build environment

**Solutions**:

```bash
# Check environment file exists
ls -la .env.production

# Verify variable names
cat .env.production | grep NEXT_PUBLIC

# Ensure all client-side variables have NEXT_PUBLIC_ prefix
# Wrong:
API_URL=https://api.example.com

# Correct:
NEXT_PUBLIC_API_URL=https://api.example.com

# Rebuild with environment variables
npm run build

# For CI/CD, add variables to GitHub Secrets or CI environment
```

**Prevention**:
- Always prefix client-side variables with `NEXT_PUBLIC_`
- Document all required environment variables
- Validate environment variables at build time

---

### Issue 4: Image Optimization Fails

**Symptoms**:
```
Error: Image optimization failed
Invalid image format
```

**Possible Causes**:
1. Unsupported image format
2. Image too large
3. Image optimization not configured for static export

**Solutions**:

```javascript
// In next.config.js, disable image optimization for static export
module.exports = {
  output: 'export',
  images: {
    unoptimized: true
  }
}

// Or use next/image with proper configuration
images: {
  domains: ['firebasestorage.googleapis.com'],
  unoptimized: true
}

// Optimize images manually before importing
// Use tools like: imagemin, sharp, or online tools
```

**Prevention**:
- Use supported formats (JPEG, PNG, WebP)
- Optimize images before adding to project
- Keep images under 1MB

---

## Deployment Issues

### Issue 5: Firebase CLI Not Authenticated

**Symptoms**:
```
Error: Authentication Error: Your credentials are no longer valid
HTTP Error: 401, Request had invalid authentication credentials
```

**Possible Causes**:
1. Not logged in to Firebase
2. Authentication token expired
3. Wrong Google account

**Solutions**:

```bash
# Logout and login again
firebase logout
firebase login

# Check current user
firebase login:list

# For CI/CD, regenerate token
firebase login:ci

# Verify authentication
firebase projects:list
```

**Prevention**:
- Keep Firebase CLI updated
- Re-authenticate periodically
- Use service accounts for CI/CD

---

### Issue 6: Wrong Firebase Project Selected

**Symptoms**:
```
Error: HTTP Error: 404, Project not found
Deploying to wrong project
```

**Possible Causes**:
1. Wrong project selected
2. `.firebaserc` has incorrect project ID
3. Project doesn't exist

**Solutions**:

```bash
# List available projects
firebase projects:list

# Select correct project
firebase use mentor-ai-prod

# Verify selected project
firebase projects:list | grep "(current)"

# Update .firebaserc manually
cat .firebaserc
# Should show:
{
  "projects": {
    "default": "mentor-ai-prod"
  }
}

# If project doesn't exist, create it
firebase projects:create mentor-ai-prod
```

**Prevention**:
- Always verify project before deploying
- Use aliases for different environments
- Document project IDs

---

### Issue 7: Deployment Fails with "Permission Denied"

**Symptoms**:
```
Error: HTTP Error: 403, Permission denied
You do not have permission to deploy to this project
```

**Possible Causes**:
1. Insufficient permissions
2. Not a project member
3. Hosting not enabled

**Solutions**:

```bash
# Check your permissions
# Go to: https://console.firebase.google.com
# Select project → Settings → Users and permissions
# Ensure you have "Editor" or "Owner" role

# Enable Firebase Hosting
firebase init hosting

# Or enable in Firebase Console
# Go to: Hosting → Get started

# Verify you're logged in with correct account
firebase login:list
```

**Prevention**:
- Ensure proper project permissions
- Use service accounts for CI/CD
- Enable required Firebase services

---

### Issue 8: Deployment Hangs or Times Out

**Symptoms**:
```
Uploading files...
(hangs indefinitely)
```

**Possible Causes**:
1. Network issues
2. Too many files
3. Large file sizes
4. Firewall blocking

**Solutions**:

```bash
# Cancel and retry
Ctrl+C
firebase deploy --only hosting

# Check network connection
ping firebase.google.com

# Reduce file count with .firebaseignore
echo "node_modules/" >> .firebaseignore
echo ".git/" >> .firebaseignore

# Deploy with debug mode
firebase deploy --only hosting --debug

# Check firewall settings
# Ensure ports 443 and 80 are open
```

**Prevention**:
- Keep build output minimal
- Use `.firebaseignore` to exclude unnecessary files
- Ensure stable internet connection

---

## Runtime Issues

### Issue 9: 404 Errors on Page Refresh

**Symptoms**:
```
User navigates to /dashboard
Refreshes page
Gets 404 error
```

**Possible Causes**:
1. Missing rewrite rules in `firebase.json`
2. Client-side routing not configured
3. Static export not configured correctly

**Solutions**:

```json
// In firebase.json, add rewrites
{
  "hosting": {
    "public": "out",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}

// Redeploy
firebase deploy --only hosting
```

**Prevention**:
- Always configure rewrites for SPAs
- Test direct URL access before going live
- Document routing configuration

---

### Issue 10: CORS Errors When Calling Backend

**Symptoms**:
```
Access to fetch at 'https://backend.run.app/api/...' from origin 'https://your-app.web.app' has been blocked by CORS policy
```

**Possible Causes**:
1. Backend doesn't allow frontend domain
2. CORS headers not configured
3. Preflight request failing

**Solutions**:

```python
# In backend main.py, add frontend domain to CORS
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://mentor-ai-prod.web.app",
        "https://mentor-ai-prod.firebaseapp.com",
        "https://www.mentorai.com"  # Custom domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Redeploy backend
./scripts/deploy.sh production

# Test CORS
curl -H "Origin: https://mentor-ai-prod.web.app" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     https://backend.run.app/api/health
```

**Prevention**:
- Add all frontend domains to backend CORS
- Test CORS before deploying
- Document CORS configuration

---

### Issue 11: Firebase Authentication Not Working

**Symptoms**:
```
Firebase: Error (auth/unauthorized-domain)
This domain is not authorized for OAuth operations
```

**Possible Causes**:
1. Domain not added to authorized domains
2. Firebase Auth not configured
3. API keys incorrect

**Solutions**:

```bash
# Add domain to authorized domains
# Go to: https://console.firebase.google.com
# Select project → Authentication → Settings
# Scroll to "Authorized domains"
# Click "Add domain"
# Add: mentor-ai-prod.web.app

# Verify Firebase config in .env.production
cat .env.production | grep FIREBASE

# Ensure all Firebase config values are correct
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...

# Rebuild and redeploy
npm run build
firebase deploy --only hosting
```

**Prevention**:
- Add all domains (including custom domains) to authorized domains
- Test authentication on each domain
- Document Firebase configuration

---

### Issue 12: Static Assets Not Loading

**Symptoms**:
```
Failed to load resource: 404 Not Found
/_next/static/css/[hash].css
```

**Possible Causes**:
1. Assets not included in build
2. Incorrect asset paths
3. Caching issues

**Solutions**:

```bash
# Verify assets exist in build
ls -la out/_next/static/

# Check firebase.json public directory
cat firebase.json | grep public
# Should be: "public": "out"

# Clear cache and rebuild
rm -rf .next out
npm run build

# Check asset paths in HTML
cat out/index.html | grep "_next/static"

# Redeploy
firebase deploy --only hosting

# Clear browser cache
# Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
```

**Prevention**:
- Verify build output before deploying
- Test in incognito mode
- Use cache busting for assets

---

### Issue 13: Slow Page Load Times

**Symptoms**:
```
Page takes > 5 seconds to load
Lighthouse performance score < 50
```

**Possible Causes**:
1. Large bundle sizes
2. Unoptimized images
3. No caching configured
4. Too many API calls

**Solutions**:

```javascript
// Optimize bundle size
// Use dynamic imports
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
})

// Optimize images
// Use next/image with proper sizing
<Image 
  src="/image.jpg" 
  width={800} 
  height={600}
  alt="Description"
/>

// Configure caching in firebase.json
{
  "hosting": {
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|webp)",
        "headers": [{
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }]
      }
    ]
  }
}

// Lazy load components
import { lazy, Suspense } from 'react';
const LazyComponent = lazy(() => import('./Component'));

// Reduce API calls
// Use caching, pagination, or data prefetching
```

**Prevention**:
- Run Lighthouse audits regularly
- Optimize images before adding
- Implement code splitting
- Use caching strategies

---

### Issue 14: Custom Domain Not Working

**Symptoms**:
```
Domain doesn't resolve
SSL certificate not provisioned
ERR_NAME_NOT_RESOLVED
```

**Possible Causes**:
1. DNS records not configured
2. DNS propagation not complete
3. Domain verification failed
4. SSL certificate pending

**Solutions**:

```bash
# Verify DNS records
nslookup www.mentorai.com

# Check DNS propagation
# Use: https://www.whatsmydns.net/

# Verify domain in Firebase Console
# Go to: Hosting → Add custom domain
# Follow verification steps

# Check SSL certificate status
# Go to: Hosting → Custom domains
# Status should be "Connected"

# Wait for SSL provisioning (24-48 hours)

# Test domain
curl -I https://www.mentorai.com
```

**Prevention**:
- Configure DNS records correctly
- Wait for DNS propagation (up to 48 hours)
- Verify domain ownership
- Be patient with SSL provisioning

---

### Issue 15: Environment-Specific Issues

**Symptoms**:
```
Works locally but fails in production
Different behavior on deployed site
```

**Possible Causes**:
1. Environment variables different
2. API endpoints different
3. Build configuration different

**Solutions**:

```bash
# Compare environment files
diff .env.local .env.production

# Verify production environment variables
cat .env.production

# Test production build locally
npm run build
npx serve out/ -p 3000

# Check for hardcoded values
grep -r "localhost" src/

# Ensure all URLs use environment variables
# Wrong:
const API_URL = "http://localhost:8000";

# Correct:
const API_URL = process.env.NEXT_PUBLIC_API_URL;

# Rebuild and redeploy
npm run build
firebase deploy --only hosting
```

**Prevention**:
- Use environment variables for all configuration
- Test production build locally
- Document environment differences
- Use feature flags for environment-specific features

---

## Debugging Tools

### Enable Debug Mode

```bash
# Deploy with debug output
firebase deploy --only hosting --debug

# View detailed logs
firebase hosting:logs

# Check deployment history
firebase hosting:releases:list
```

### Browser DevTools

```javascript
// Check console for errors
// Open DevTools: F12
// Console tab: Look for errors

// Check network requests
// Network tab: Look for failed requests

// Check application state
// Application tab: Check localStorage, cookies

// Check performance
// Performance tab: Record and analyze
```

### Firebase Console

```bash
# View hosting metrics
# Go to: https://console.firebase.google.com
# Select project → Hosting
# View: Requests, Bandwidth, Storage

# View analytics
# Go to: Analytics → Events
# Check: page_view, user_engagement

# View performance
# Go to: Performance
# Check: Page load times, Network requests
```

---

## Getting Help

### Check Documentation

- **Firebase Hosting**: https://firebase.google.com/docs/hosting
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Firebase CLI**: https://firebase.google.com/docs/cli

### Community Support

- **Stack Overflow**: Tag questions with `firebase-hosting` and `next.js`
- **Firebase Discord**: https://discord.gg/firebase
- **GitHub Issues**: Check Next.js and Firebase repos

### Contact Support

- **Firebase Support**: https://firebase.google.com/support
- **Priority Support**: Available with Blaze plan

---

## Quick Fixes Checklist

When deployment fails, check:

- [ ] Firebase CLI is authenticated
- [ ] Correct project selected
- [ ] Build completed successfully
- [ ] `out/` directory exists
- [ ] `firebase.json` configured correctly
- [ ] Environment variables set
- [ ] Network connection stable
- [ ] Sufficient permissions
- [ ] Firebase Hosting enabled
- [ ] No firewall blocking

When site doesn't work:

- [ ] Rewrites configured for client-side routing
- [ ] Backend CORS allows frontend domain
- [ ] Firebase Auth authorized domains updated
- [ ] Environment variables correct
- [ ] Static assets loading
- [ ] No console errors
- [ ] SSL certificate active
- [ ] DNS configured correctly

---

## Emergency Rollback

If deployment causes critical issues:

```bash
# Rollback to previous version immediately
firebase hosting:rollback

# Verify rollback
open https://mentor-ai-prod.web.app

# Investigate issue
# Fix problem
# Test locally
# Redeploy when ready
```

**Rollback time**: < 2 minutes

---

## Prevention Best Practices

1. **Test Locally First**
   ```bash
   npm run build
   npx serve out/
   # Test thoroughly before deploying
   ```

2. **Use Preview Channels**
   ```bash
   firebase hosting:channel:deploy preview
   # Test on preview URL before production
   ```

3. **Automate Testing**
   ```bash
   # Add to CI/CD pipeline
   npm run lint
   npm run type-check
   npm run build
   npm run test
   ```

4. **Monitor After Deployment**
   - Check Firebase Console for errors
   - Monitor analytics for unusual patterns
   - Set up alerts for critical issues

5. **Document Everything**
   - Keep deployment runbook updated
   - Document all configuration
   - Track known issues and solutions

---

## Conclusion

Most deployment issues can be resolved by:
1. Checking logs and error messages
2. Verifying configuration files
3. Testing locally before deploying
4. Using debug mode for detailed output
5. Consulting documentation

**Remember**: When in doubt, rollback and investigate! 🔄
