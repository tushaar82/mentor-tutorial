# Frontend Mock Data and Testing Infrastructure

This directory contains mock API responses and a mock server for standalone frontend testing without requiring the actual backend.

## Contents

- **mock-api-responses.json** - Example API responses for all backend endpoints
- **mock-api-server.js** - Express server that provides mock API endpoints
- **README.md** - This file

## Purpose

These tools allow Vaishnavi (frontend developer) to:
- Develop and test UI components independently without backend
- Simulate API responses with realistic data
- Test loading states, error handling, and edge cases
- Work on different schedule than backend developer

## Prerequisites

```bash
# Install required Node.js packages
npm install express cors body-parser

# Or if using the project's package.json
npm install
```

## Using mock-api-server.js

### Starting the Mock Server

```bash
# Start on default port (3001)
node mock-data/mock-api-server.js

# Start on custom port
node mock-data/mock-api-server.js --port=4000

# Make it executable (Linux/Mac)
chmod +x mock-data/mock-api-server.js
./mock-data/mock-api-server.js
```

### What You'll See

```
======================================================================
              Mock API Server for Mentor AI Frontend
======================================================================

✓ Server running at: http://localhost:3001
✓ Health check: http://localhost:3001/health

📝 Available endpoints:
   - Authentication: /api/auth/*
   - Onboarding: /api/onboarding/*
   - Diagnostic Test: /api/diagnostic/*
   - Analytics: /api/analytics/*
   - Schedule: /api/schedule/*
   - Practice: /api/practice/*
   - Payment: /api/payment/*
   - Parent Dashboard: /api/parent/*

💡 Tips:
   - All responses include simulated network delay (200-700ms)
   - Test error scenarios with specific inputs (see README.md)
   - Check console for request logs

🛑 Press Ctrl+C to stop the server
======================================================================
```

### Available Endpoints

The mock server provides all backend endpoints:

#### Authentication
- `POST /api/auth/register/parent` - Register with email
- `POST /api/auth/register/parent/google` - Register with Google
- `POST /api/auth/login/parent` - Login
- `POST /api/auth/verify-email` - Verify email

#### Onboarding
- `POST /api/onboarding/preferences` - Save preferences
- `POST /api/onboarding/child-profile` - Create child profile
- `POST /api/onboarding/exam-selection` - Select exam

#### Diagnostic Test
- `POST /api/diagnostic/generate` - Generate test
- `GET /api/diagnostic/test/:testId` - Get test details
- `GET /api/diagnostic/test/:testId/questions` - Get questions
- `POST /api/diagnostic/test/:testId/submit` - Submit test

#### Analytics
- `GET /api/analytics/:analyticsId` - Get analytics

#### Schedule
- `POST /api/schedule/generate` - Generate schedule
- `GET /api/schedule/:scheduleId` - Get schedule
- `GET /api/schedule/:scheduleId/progress` - Get progress
- `POST /api/schedule/task/:taskId/complete` - Mark task complete

#### Practice
- `POST /api/practice/generate` - Generate practice questions
- `POST /api/practice/:sessionId/submit` - Submit practice answers

#### Payment
- `POST /api/payment/create-order` - Create payment order
- `POST /api/payment/verify` - Verify payment
- `GET /api/payment/subscription/:subscriptionId` - Get subscription

#### Parent Dashboard
- `GET /api/parent/child/:childId/progress` - Get child progress
- `GET /api/parent/teaching-resources` - Get teaching resources
- `GET /api/parent/child/:childId/insights` - Get insights

## Using mock-api-responses.json

### What It Contains

The file contains realistic mock responses for all API endpoints organized by feature:
- **authentication** - Registration, login, verification responses
- **onboarding** - Preferences, child profile, exam selection
- **diagnostic_test** - Test details, questions, submission results
- **analytics** - Detailed performance analytics with subject breakdown
- **schedule** - Generated schedules, daily tasks, progress tracking
- **practice** - Practice sessions, questions, results
- **payment** - Payment orders, verification, subscription details
- **parent_dashboard** - Child progress, teaching resources, insights

### Using in React Components

#### Option 1: Import Directly

```javascript
import mockResponses from '../mock-data/mock-api-responses.json';

function AnalyticsComponent() {
  const [analytics, setAnalytics] = useState(null);
  
  useEffect(() => {
    // Use mock data instead of API call
    setAnalytics(mockResponses.analytics.detailed_analytics);
  }, []);
  
  return <div>{/* Render analytics */}</div>;
}
```

#### Option 2: Conditional API Calls

```javascript
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK === 'true';

async function fetchAnalytics(analyticsId) {
  if (USE_MOCK_DATA) {
    // Return mock data
    return mockResponses.analytics.detailed_analytics;
  } else {
    // Call real API
    const response = await fetch(`/api/analytics/${analyticsId}`);
    return response.json();
  }
}
```

#### Option 3: Use Mock Server

```javascript
// Configure API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

async function fetchAnalytics(analyticsId) {
  const response = await fetch(`${API_BASE_URL}/api/analytics/${analyticsId}`);
  return response.json();
}
```

## Workflow for Standalone Testing

### Step 1: Start Mock Server

```bash
# In one terminal
node mock-data/mock-api-server.js
```

### Step 2: Configure Frontend

Update your API configuration to use mock server:

```javascript
// config.js or .env
const API_BASE_URL = 'http://localhost:3001';
```

### Step 3: Start Frontend Dev Server

```bash
# In another terminal
npm run dev
```

### Step 4: Develop and Test

Your frontend will now use the mock server:
- All API calls work without real backend
- Realistic delays simulate network latency
- Error scenarios can be tested

### Step 5: Test Different Scenarios

The mock server supports error testing:

```javascript
// Test email already exists error
await fetch('http://localhost:3001/api/auth/register/parent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'existing@example.com', // Triggers error
    password: 'pass123',
    language: 'en'
  })
});
// Returns: { error: "Email already registered", code: "AUTH_002" }

// Test invalid credentials
await fetch('http://localhost:3001/api/auth/login/parent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'wrong@example.com', // Triggers error
    password: 'wrongpass'
  })
});
// Returns: { error: "Invalid email or password", code: "AUTH_001" }

// Test child limit error
await fetch('http://localhost:3001/api/onboarding/child-profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    parent_id: 'parent_free_plan', // Triggers error
    child_name: 'Test Child'
  })
});
// Returns: { error: "Maximum one child profile allowed in free plan", code: "ONBOARD_001" }
```

## Testing Without Backend

You don't need Tushar's backend to test your frontend:

### Option 1: Mock Server (Recommended)
```bash
node mock-data/mock-api-server.js
npm run dev
```
Your app works exactly as if backend was running!

### Option 2: Import Mock Data
```javascript
import mockData from '../mock-data/mock-api-responses.json';
// Use mockData directly in components
```

### Option 3: Mock Service Worker (MSW)
```javascript
// For more advanced mocking
import { rest } from 'msw';
import mockData from '../mock-data/mock-api-responses.json';

const handlers = [
  rest.get('/api/analytics/:id', (req, res, ctx) => {
    return res(ctx.json(mockData.analytics.detailed_analytics));
  })
];
```

## Features of Mock Server

### Realistic Network Delays
- Random delays between 200-700ms for most endpoints
- Longer delays for AI operations (1.5-3 seconds)
- Simulates real-world network conditions

### Request Logging
```
[2024-11-25T10:30:00.000Z] POST /api/auth/register/parent
[2024-11-25T10:30:01.000Z] POST /api/onboarding/preferences
[2024-11-25T10:30:02.000Z] GET /api/analytics/analytics_mock_001
```

### Error Simulation
Test error handling with specific inputs:
- `existing@example.com` - Email already exists
- `wrong@example.com` - Invalid credentials
- `parent_free_plan` - Child limit exceeded

### CORS Enabled
Works with frontend running on different port (e.g., localhost:3000)

## Integration with Real Backend

When Tushar's backend is ready:

### Step 1: Update API Configuration

```javascript
// Change from mock server
const API_BASE_URL = 'http://localhost:3001';

// To real backend
const API_BASE_URL = 'http://localhost:8000';
```

### Step 2: Test Integration

```bash
# Stop mock server (Ctrl+C)
# Start real backend
# Test your frontend with real API
```

### Step 3: Compare Responses

If integration fails:
1. Compare real API response with mock response
2. Update mock data if format changed
3. Fix frontend code if needed

## Tips for Effective Testing

### Test Loading States
Mock server includes delays, so test:
- Loading spinners
- Skeleton screens
- Disabled buttons during API calls

### Test Error States
Use error scenarios to test:
- Error messages display
- Form validation
- Retry mechanisms
- Fallback UI

### Test Edge Cases
Modify mock data to test:
- Empty arrays
- Null values
- Very long text
- Large numbers

### Test Responsive Design
Mock data includes realistic content lengths:
- Long names
- Multiple items
- Various data sizes

## Customizing Mock Data

### Adding New Responses

Edit `mock-api-responses.json`:

```json
{
  "new_feature": {
    "new_response": {
      "field1": "value1",
      "field2": "value2"
    }
  }
}
```

### Adding New Endpoints

Edit `mock-api-server.js`:

```javascript
app.post('/api/new/endpoint', async (req, res) => {
  await randomDelay();
  res.json(mockResponses.new_feature.new_response);
});
```

### Modifying Delays

```javascript
// Change random delay range
const randomDelay = () => delay(Math.random() * 1000 + 500); // 500-1500ms

// Change specific endpoint delay
app.post('/api/slow/endpoint', async (req, res) => {
  await delay(5000); // 5 second delay
  res.json(mockResponses.slow_feature.response);
});
```

## Troubleshooting

### Mock Server Won't Start

**Problem**: Port already in use
```
Error: listen EADDRINUSE: address already in use :::3001
```
**Solution**:
```bash
# Use different port
node mock-api-server.js --port=4000

# Or kill process using port 3001
lsof -ti:3001 | xargs kill -9
```

### Frontend Can't Connect

**Problem**: CORS error or connection refused
**Solution**:
```bash
# Check mock server is running
curl http://localhost:3001/health

# Check API_BASE_URL in frontend config
# Should be: http://localhost:3001
```

### Responses Don't Match

**Problem**: Mock data format different from real API
**Solution**:
1. Get real API response from Tushar
2. Update `mock-api-responses.json`
3. Restart mock server

### Mock Data Not Loading

**Problem**: JSON parse error
**Solution**:
```bash
# Validate JSON
node -e "console.log(JSON.parse(require('fs').readFileSync('mock-data/mock-api-responses.json')))"

# Fix JSON syntax errors
# Common issues: trailing commas, missing quotes
```

## Development Workflow

### Daily Workflow

1. **Morning**: Start mock server
   ```bash
   node mock-data/mock-api-server.js
   ```

2. **Develop**: Build UI components
   ```bash
   npm run dev
   ```

3. **Test**: Verify with mock data
   - Test happy paths
   - Test error scenarios
   - Test loading states

4. **End of Day**: Commit code
   ```bash
   git add .
   git commit -m "Implemented feature X with mock data"
   ```

### When Backend is Ready

1. **Coordinate**: Confirm backend endpoints are ready
2. **Switch**: Update API_BASE_URL to real backend
3. **Test**: Verify integration works
4. **Fix**: Update code if responses differ
5. **Update**: Sync mock data with real responses

## Advanced Usage

### Environment-Based Configuration

```javascript
// .env.development
REACT_APP_API_URL=http://localhost:3001
REACT_APP_USE_MOCK=true

// .env.production
REACT_APP_API_URL=https://api.mentorai.com
REACT_APP_USE_MOCK=false
```

### Automated Testing

```javascript
// Use mock server in tests
beforeAll(async () => {
  mockServer = spawn('node', ['mock-data/mock-api-server.js']);
  await delay(1000); // Wait for server to start
});

afterAll(() => {
  mockServer.kill();
});
```

### Mock Data Versioning

```bash
# Keep mock data in sync with backend
git add mock-data/
git commit -m "Update mock data to match backend v2.0"
```

## Questions?

If you encounter issues:
1. Check this README
2. Check TROUBLESHOOTING.md in each day's folder
3. Check frontend APPENDIX-frontend.md
4. Verify mock server is running: `curl http://localhost:3001/health`
5. Check console logs for errors

## Next Steps

After testing frontend standalone:
1. Complete all UI components with mock data
2. Test all user flows
3. Coordinate with Tushar for integration
4. Switch to real backend
5. Run end-to-end tests
