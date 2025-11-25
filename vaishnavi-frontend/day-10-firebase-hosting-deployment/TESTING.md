# Testing Guide: Firebase Hosting Deployment

This guide provides comprehensive testing procedures to verify your deployed Next.js application works correctly.

---

## Test 1: Verify Deployment Success

### Steps

```bash
# Check deployment status
firebase hosting:channel:list

# Should show your live channel with URL
```

### Expected Result

```
Channel ID: live
URL: https://mentor-ai-prod.web.app
Status: ACTIVE
Last Deploy: 2024-01-15 10:30:00
```

### If It Fails

- **Check**: Firebase CLI is authenticated (`firebase login:list`)
- **Check**: Correct project selected (`firebase use`)
- **Fix**: Run `firebase deploy --only hosting` again

---

## Test 2: Homepage Loads

### Steps

```bash
# Test homepage with curl
curl -I https://mentor-ai-prod.web.app

# Open in browser
open https://mentor-ai-prod.web.app
```

### Expected Result

```
HTTP/2 200
content-type: text/html; charset=utf-8
cache-control: public, max-age=3600, must-revalidate
```

Browser should display:
- Mentor AI homepage
- Logo and branding
- Navigation menu
- Call-to-action buttons
- No console errors

### If It Fails

- **Check**: Build completed successfully
- **Check**: `out/index.html` exists
- **Check**: Firebase deployment succeeded
- **Fix**: Rebuild and redeploy

---

## Test 3: Authentication Pages Accessible

### Steps

```bash
# Test login page
curl -I https://mentor-ai-prod.web.app/login

# Test register page
curl -I https://mentor-ai-prod.web.app/register

# Open in browser
open https://mentor-ai-prod.web.app/login
```

### Expected Result

Both pages should return:
```
HTTP/2 200
```

Browser should display:
- Login form with email/password fields
- Google Sign-In button
- Phone authentication option
- "Register" link
- No console errors

### If It Fails

- **Check**: `firebase.json` has rewrite rules for client-side routing
- **Check**: Build includes all pages
- **Fix**: Update `firebase.json` rewrites section

---

## Test 4: Client-Side Routing Works

### Steps

```bash
# Navigate to different routes in browser
# 1. Go to homepage
# 2. Click "Login" link
# 3. Click "Register" link
# 4. Use browser back button
# 5. Refresh page on /login route
```

### Expected Result

- All navigation works without page reload
- URLs update in address bar
- Refresh on any route loads correct page
- No 404 errors
- Browser back/forward buttons work

### If It Fails

- **Check**: `firebase.json` has rewrite rule: `"source": "**", "destination": "/index.html"`
- **Check**: `next.config.js` has `trailingSlash: false`
- **Fix**: Update firebase.json and redeploy

---

## Test 5: Firebase Authentication Works

### Steps

```bash
# In browser, go to login page
# 1. Click "Sign in with Google"
# 2. Complete Google authentication
# 3. Verify redirect to dashboard
```

### Expected Result

- Google Sign-In popup opens
- After authentication, redirects to dashboard
- User profile displayed
- Firebase Auth token stored in browser
- No console errors

### If It Fails

- **Check**: Firebase Auth is enabled in Firebase Console
- **Check**: Authorized domains include your hosting domain
- **Check**: `.env.production` has correct Firebase config
- **Fix**: Add domain to Firebase Console → Authentication → Settings → Authorized domains

---

## Test 6: API Connectivity to Backend

### Steps

```bash
# Open browser console on your site
# Run this JavaScript:
fetch('https://your-backend.run.app/health')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))
```

### Expected Result

Console should show:
```json
{
  "status": "healthy"
}
```

No CORS errors.

### If It Fails

- **Check**: Backend is deployed and running
- **Check**: Backend CORS allows your frontend domain
- **Check**: `.env.production` has correct `NEXT_PUBLIC_API_URL`
- **Fix**: Update backend CORS settings and redeploy backend

---

## Test 7: Static Assets Load Correctly

### Steps

```bash
# Test CSS loads
curl -I https://mentor-ai-prod.web.app/_next/static/css/[hash].css

# Test JavaScript loads
curl -I https://mentor-ai-prod.web.app/_next/static/chunks/[hash].js

# Test images load
curl -I https://mentor-ai-prod.web.app/images/logo.png
```

### Expected Result

All should return:
```
HTTP/2 200
cache-control: public, max-age=31536000, immutable
```

Browser Network tab should show:
- All assets load successfully (200 status)
- Assets served from cache on repeat visits
- No 404 errors

### If It Fails

- **Check**: Build includes all assets
- **Check**: `firebase.json` has correct caching headers
- **Check**: Asset paths are correct
- **Fix**: Rebuild and redeploy

---

## Test 8: Security Headers Present

### Steps

```bash
# Check security headers
curl -I https://mentor-ai-prod.web.app | grep -E "(X-Frame-Options|X-Content-Type-Options|Referrer-Policy)"
```

### Expected Result

```
x-frame-options: DENY
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
```

### If It Fails

- **Check**: `firebase.json` has headers configuration
- **Check**: Headers section includes security headers
- **Fix**: Update firebase.json and redeploy

---

## Test 9: SSL Certificate Active

### Steps

```bash
# Check SSL certificate
openssl s_client -connect mentor-ai-prod.web.app:443 -servername mentor-ai-prod.web.app < /dev/null 2>/dev/null | openssl x509 -noout -dates

# Or use online tool: https://www.ssllabs.com/ssltest/
```

### Expected Result

```
notBefore=Jan 15 00:00:00 2024 GMT
notAfter=Apr 15 23:59:59 2024 GMT
```

Certificate should be:
- Valid (not expired)
- Issued by Google Trust Services
- Grade A on SSL Labs

### If It Fails

- **Check**: Domain is correctly configured
- **Check**: DNS records are correct
- **Wait**: SSL provisioning can take 24-48 hours for custom domains
- **Fix**: Verify domain ownership in Firebase Console

---

## Test 10: Mobile Responsiveness

### Steps

```bash
# Open site in browser
# 1. Open DevTools (F12)
# 2. Toggle device toolbar (Ctrl+Shift+M)
# 3. Test different screen sizes:
#    - iPhone SE (375px)
#    - iPhone 12 Pro (390px)
#    - iPad (768px)
#    - Desktop (1920px)
```

### Expected Result

- Layout adapts to screen size
- No horizontal scrolling
- Touch targets are large enough (44x44px minimum)
- Text is readable without zooming
- Images scale appropriately
- Navigation menu works on mobile

### If It Fails

- **Check**: CSS media queries are working
- **Check**: Viewport meta tag is present
- **Fix**: Update responsive styles and redeploy

---

## Test 11: Performance Metrics

### Steps

```bash
# Install Lighthouse CLI (if not installed)
npm install -g lighthouse

# Run Lighthouse audit
lighthouse https://mentor-ai-prod.web.app --view --output html --output-path ./lighthouse-report.html

# Or use online tool: https://pagespeed.web.dev/
```

### Expected Result

Lighthouse scores should be:
- **Performance**: > 90
- **Accessibility**: > 90
- **Best Practices**: > 90
- **SEO**: > 90

Key metrics:
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Cumulative Layout Shift (CLS): < 0.1

### If It Fails

- **Check**: Images are optimized
- **Check**: Code splitting is enabled
- **Check**: Caching headers are correct
- **Fix**: Optimize images, enable lazy loading, minimize JavaScript

---

## Test 12: Dashboard Access (Authenticated)

### Steps

```bash
# In browser:
# 1. Login with test account
# 2. Navigate to dashboard
# 3. Verify all dashboard features work
```

### Expected Result

- Dashboard loads after authentication
- User profile displayed
- Child profiles visible
- Schedule displayed
- Analytics charts render
- Practice module accessible
- No console errors

### If It Fails

- **Check**: Authentication token is valid
- **Check**: API calls to backend succeed
- **Check**: Protected routes redirect to login if not authenticated
- **Fix**: Check authentication logic and API connectivity

---

## Test 13: Payment Flow (If Implemented)

### Steps

```bash
# In browser:
# 1. Login as parent
# 2. Navigate to upgrade/payment page
# 3. Click "Upgrade to Premium"
# 4. Verify Razorpay checkout opens
# 5. Use test card (if in test mode)
```

### Expected Result

- Payment page loads
- Razorpay checkout opens
- Test payment succeeds
- User upgraded to premium
- Premium features unlocked
- No console errors

### If It Fails

- **Check**: Razorpay key is correct in `.env.production`
- **Check**: Backend payment endpoints work
- **Check**: Razorpay is in correct mode (test/live)
- **Fix**: Verify Razorpay configuration

---

## Test 14: Error Handling

### Steps

```bash
# Test various error scenarios:
# 1. Navigate to non-existent route: /nonexistent
# 2. Trigger API error (disconnect internet, then try API call)
# 3. Try to access protected route without authentication
```

### Expected Result

- 404 page displays for non-existent routes
- API errors show user-friendly error messages
- Protected routes redirect to login
- Error boundaries catch React errors
- No white screen of death

### If It Fails

- **Check**: Error boundaries are implemented
- **Check**: 404 page exists
- **Check**: API error handling is implemented
- **Fix**: Add error handling and error pages

---

## Test 15: Browser Compatibility

### Steps

```bash
# Test in multiple browsers:
# - Chrome (latest)
# - Firefox (latest)
# - Safari (latest)
# - Edge (latest)
# - Mobile Safari (iOS)
# - Chrome Mobile (Android)
```

### Expected Result

- Site works in all browsers
- No layout issues
- All features functional
- No browser-specific errors

### If It Fails

- **Check**: Browser console for errors
- **Check**: CSS compatibility
- **Check**: JavaScript features are supported
- **Fix**: Add polyfills or update code for compatibility

---

## Test 16: Rollback Capability

### Steps

```bash
# Test rollback to previous version
firebase hosting:rollback

# Verify site reverted to previous version
open https://mentor-ai-prod.web.app
```

### Expected Result

- Rollback completes successfully
- Site displays previous version
- Can rollback again if needed

### If It Fails

- **Check**: Previous deployments exist
- **Check**: Firebase CLI is authenticated
- **Fix**: Redeploy current version

---

## Automated Testing Script

### Run All Tests

```bash
# Make test script executable
chmod +x scripts/test-deployment.sh

# Run all tests
./scripts/test-deployment.sh https://mentor-ai-prod.web.app

# View results
cat test-results.txt
```

### Expected Output

```
Testing deployment: https://mentor-ai-prod.web.app

✓ Homepage loads (200 OK)
✓ Login page accessible (200 OK)
✓ Register page accessible (200 OK)
✓ Static assets load (200 OK)
✓ Security headers present
✓ SSL certificate valid
✓ API connectivity works
✓ Performance score: 95/100

Tests passed: 8/8
Tests failed: 0/8

All tests passed! ✓
```

---

## Performance Monitoring

### Set Up Continuous Monitoring

```bash
# Enable Firebase Performance Monitoring
# Go to: https://console.firebase.google.com
# Select project → Performance
# Click "Get started"

# Add Performance Monitoring SDK to your app
npm install firebase

# Initialize in your app
import { getPerformance } from 'firebase/performance';
const perf = getPerformance(app);
```

### View Performance Data

```bash
# Go to Firebase Console → Performance
# View metrics:
# - Page load times
# - Network requests
# - Custom traces
```

---

## Testing Complete! ✅

Your deployment has been thoroughly tested and verified:

- ✅ All pages load correctly
- ✅ Authentication works
- ✅ API connectivity established
- ✅ Static assets load and cache properly
- ✅ Security headers configured
- ✅ SSL certificate active
- ✅ Mobile responsive
- ✅ Performance optimized
- ✅ Error handling works
- ✅ Browser compatible

**Next Step**: Move to EXPECTED-OUTCOME.md to verify you have everything!

---

## Troubleshooting Quick Reference

| Issue | Check | Fix |
|-------|-------|-----|
| 404 on refresh | firebase.json rewrites | Add `"source": "**", "destination": "/index.html"` |
| CORS errors | Backend CORS settings | Add frontend domain to backend CORS |
| Auth not working | Authorized domains | Add domain in Firebase Console |
| Slow loading | Performance metrics | Optimize images, enable caching |
| Assets not loading | Build output | Check `out/` directory has all files |
| Environment variables not working | Variable names | Ensure prefixed with `NEXT_PUBLIC_` |
