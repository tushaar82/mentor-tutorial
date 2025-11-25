# Backend Mock Data and Testing Infrastructure

This directory contains mock data and automated testing scripts for standalone backend testing without requiring the frontend.

## Contents

- **sample-requests.json** - Example API requests for all backend endpoints
- **test-scripts.py** - Automated Python script to test all API endpoints
- **README.md** - This file

## Purpose

These tools allow Tushar (backend developer) to:
- Test API endpoints independently without frontend
- Verify API responses match expected format
- Automate testing during development
- Debug issues quickly with sample data

## Prerequisites

```bash
# Install required Python packages
pip install requests colorama
```

## Using sample-requests.json

### What It Contains

The file contains example requests for all API endpoints organized by feature:
- **authentication** - Parent registration, login, email verification
- **onboarding** - Preferences, child profile, exam selection
- **diagnostic_test** - Test generation, questions, submission
- **analytics** - AI-generated performance analytics
- **schedule** - Study schedule generation and management
- **practice** - Practice question generation and submission
- **payment** - Razorpay payment integration
- **parent_dashboard** - Parent monitoring and teaching resources

### Structure

Each endpoint has:
```json
{
  "endpoint": "POST /api/auth/register/parent",
  "description": "Register a new parent account with email",
  "request": { /* sample request body */ },
  "expected_response": { /* expected response format */ }
}
```

### Manual Testing with curl

You can use the sample requests with curl:

```bash
# Example: Register a parent
curl -X POST http://localhost:8000/api/auth/register/parent \
  -H "Content-Type: application/json" \
  -d '{
    "email": "parent@example.com",
    "password": "SecurePass123!",
    "language": "en",
    "phone": "+919876543210"
  }'
```

### Manual Testing with Postman

1. Import `sample-requests.json` into Postman
2. Create a new collection
3. Add requests from the JSON file
4. Set base URL to `http://localhost:8000`
5. Run requests individually or as a collection

## Using test-scripts.py

### Basic Usage

```bash
# Run all tests
python test-scripts.py

# Test specific endpoint group
python test-scripts.py --endpoint authentication
python test-scripts.py --endpoint onboarding
python test-scripts.py --endpoint diagnostic_test

# Show detailed output
python test-scripts.py --verbose

# List available endpoint groups
python test-scripts.py --list

# Test against different server
python test-scripts.py --base-url http://localhost:5000
```

### What It Does

The script:
1. Checks if API server is running (health check)
2. Tests each endpoint with sample data
3. Verifies response status codes
4. Reports passed/failed tests
5. Shows detailed error messages
6. Calculates success rate

### Example Output

```
======================================================================
                    Mentor AI Backend API Tests
======================================================================

✓ Health Check
  Server is running at http://localhost:8000

======================================================================
                  Testing AUTHENTICATION Endpoints
======================================================================

✓ authentication.register_parent_email
✓ authentication.register_parent_google
✓ authentication.login_parent
✓ authentication.verify_email

======================================================================
                        Test Summary
======================================================================

Total Tests: 25
Passed: 23
Failed: 2

Success Rate: 92.0%

⚠️  Most tests passed, but some endpoints need attention.
```

### Interpreting Results

- **✓ Green checkmark** - Test passed (status 200/201)
- **✗ Red X** - Test failed (error or unexpected status)
- **⚠ Yellow warning** - Server not running or connection issue

### Common Issues

#### Server Not Running
```
✗ Health Check
  Cannot connect to http://localhost:8000
```
**Solution**: Start the server with `uvicorn main:app --reload`

#### Endpoint Not Implemented
```
✗ authentication.register_parent_email
  Status: 404 - Not Found
```
**Solution**: Implement the missing endpoint

#### Invalid Request Data
```
✗ onboarding.create_child_profile
  Status: 422 - Validation Error
```
**Solution**: Check request data format matches Pydantic models

#### Database/Firebase Not Configured
```
✗ authentication.register_parent_email
  Status: 500 - Internal Server Error
```
**Solution**: Check Firebase credentials and database connection

## Workflow for Standalone Testing

### Step 1: Start Your Backend Server

```bash
cd backend
uvicorn main:app --reload
```

### Step 2: Run Health Check

```bash
python mock-data/test-scripts.py --endpoint health
```

### Step 3: Test Individual Features

As you implement each feature, test it:

```bash
# After implementing authentication
python mock-data/test-scripts.py --endpoint authentication

# After implementing onboarding
python mock-data/test-scripts.py --endpoint onboarding

# After implementing diagnostic test
python mock-data/test-scripts.py --endpoint diagnostic_test
```

### Step 4: Run Full Test Suite

After completing all endpoints:

```bash
python mock-data/test-scripts.py
```

### Step 5: Debug Failures

Use verbose mode to see detailed request/response:

```bash
python mock-data/test-scripts.py --endpoint authentication --verbose
```

## Testing Without Frontend

You don't need Vaishnavi's frontend to test your backend:

### Option 1: Automated Tests (Recommended)
```bash
python mock-data/test-scripts.py
```

### Option 2: Manual curl Commands
```bash
# Copy commands from sample-requests.json
curl -X POST http://localhost:8000/api/auth/register/parent \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "pass123", "language": "en"}'
```

### Option 3: Python Requests
```python
import requests

response = requests.post(
    "http://localhost:8000/api/auth/register/parent",
    json={
        "email": "test@example.com",
        "password": "pass123",
        "language": "en"
    }
)
print(response.json())
```

### Option 4: Postman Collection
Import `sample-requests.json` into Postman and run as collection.

## Integration with Frontend

When Vaishnavi is ready to integrate:

1. Share the `sample-requests.json` file with her
2. She can use the expected responses to create mock data
3. She can test her frontend with the mock API server
4. When both are ready, connect frontend to real backend

## Tips for Effective Testing

### Test Early and Often
- Test each endpoint immediately after implementing it
- Don't wait until all endpoints are done
- Fix issues as they arise

### Use Verbose Mode for Debugging
```bash
python test-scripts.py --endpoint authentication --verbose
```

### Check Logs
```bash
# Backend logs show detailed errors
tail -f logs/app.log
```

### Test Edge Cases
Modify `sample-requests.json` to test:
- Invalid data
- Missing required fields
- Duplicate entries
- Unauthorized access

### Automate Testing
Add to your development workflow:
```bash
# After making changes
git add .
python mock-data/test-scripts.py
git commit -m "Implemented feature X"
```

## Customizing Tests

### Adding New Endpoints

Edit `sample-requests.json`:

```json
{
  "new_feature": {
    "new_endpoint": {
      "endpoint": "POST /api/new/endpoint",
      "description": "Description of what it does",
      "request": {
        "field1": "value1",
        "field2": "value2"
      },
      "expected_response": {
        "result": "success"
      }
    }
  }
}
```

The test script will automatically pick up new endpoints.

### Modifying Test Behavior

Edit `test-scripts.py` to:
- Add authentication headers
- Test response data structure
- Validate specific fields
- Add custom assertions

## Troubleshooting

### Tests Fail with Connection Error
**Problem**: Cannot connect to server
**Solution**: 
```bash
# Check if server is running
curl http://localhost:8000/health

# Start server if not running
uvicorn main:app --reload
```

### Tests Fail with 500 Error
**Problem**: Server error
**Solution**:
```bash
# Check server logs
tail -f logs/app.log

# Common causes:
# - Firebase not initialized
# - Database connection failed
# - Missing environment variables
```

### Tests Pass but Frontend Fails
**Problem**: Response format mismatch
**Solution**:
- Compare actual response with expected response
- Update `sample-requests.json` with correct format
- Share updated file with frontend developer

### Script Won't Run
**Problem**: Missing dependencies
**Solution**:
```bash
pip install requests colorama
```

## Next Steps

After testing backend standalone:
1. Share `sample-requests.json` with Vaishnavi
2. She creates mock responses for frontend testing
3. Both work independently
4. Integrate when both are ready
5. Run end-to-end tests

## Questions?

If you encounter issues:
1. Check this README
2. Check TROUBLESHOOTING.md in each day's folder
3. Check backend APPENDIX-backend.md
4. Ask for help with specific error messages
