#!/usr/bin/env node

/**
 * Mock API Server for Mentor AI Frontend Development
 * 
 * This Express server provides mock API responses for frontend testing
 * without requiring the actual backend to be running.
 * 
 * Usage:
 *   node mock-api-server.js
 *   node mock-api-server.js --port 3001
 * 
 * Requirements:
 *   npm install express cors body-parser
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const portArg = args.find(arg => arg.startsWith('--port='));
const PORT = portArg ? parseInt(portArg.split('=')[1]) : 3001;

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load mock responses
const mockDataPath = path.join(__dirname, 'mock-api-responses.json');
let mockResponses;

try {
  const data = fs.readFileSync(mockDataPath, 'utf8');
  mockResponses = JSON.parse(data);
  console.log('✓ Mock data loaded successfully');
} catch (error) {
  console.error('✗ Error loading mock data:', error.message);
  process.exit(1);
}

// Helper function to add delay (simulate network latency)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to simulate random delays
const randomDelay = () => delay(Math.random() * 500 + 200); // 200-700ms

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ============================================================================
// AUTHENTICATION ENDPOINTS
// ============================================================================

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', message: 'Mock API server is running' });
});

// Register parent with email
app.post('/api/auth/register/parent', async (req, res) => {
  await randomDelay();
  
  const { email } = req.body;
  
  // Simulate email already exists error
  if (email === 'existing@example.com') {
    return res.status(400).json(mockResponses.authentication.error_email_exists);
  }
  
  res.status(201).json(mockResponses.authentication.register_parent_success);
});

// Register parent with Google
app.post('/api/auth/register/parent/google', async (req, res) => {
  await randomDelay();
  res.status(201).json(mockResponses.authentication.register_parent_google_success);
});

// Login parent
app.post('/api/auth/login/parent', async (req, res) => {
  await randomDelay();
  
  const { email, password } = req.body;
  
  // Simulate invalid credentials
  if (email === 'wrong@example.com' || password === 'wrongpass') {
    return res.status(401).json(mockResponses.authentication.error_invalid_credentials);
  }
  
  res.json(mockResponses.authentication.login_success);
});

// Verify email
app.post('/api/auth/verify-email', async (req, res) => {
  await randomDelay();
  res.json(mockResponses.authentication.verify_email_success);
});

// ============================================================================
// ONBOARDING ENDPOINTS
// ============================================================================

// Save preferences
app.post('/api/onboarding/preferences', async (req, res) => {
  await randomDelay();
  res.json(mockResponses.onboarding.save_preferences_success);
});

// Create child profile
app.post('/api/onboarding/child-profile', async (req, res) => {
  await randomDelay();
  
  // Simulate child limit error for free plan
  const { parent_id } = req.body;
  if (parent_id === 'parent_free_plan') {
    return res.status(400).json(mockResponses.onboarding.error_child_limit);
  }
  
  res.status(201).json(mockResponses.onboarding.create_child_profile_success);
});

// Select exam
app.post('/api/onboarding/exam-selection', async (req, res) => {
  await randomDelay();
  res.json(mockResponses.onboarding.select_exam_success);
});

// ============================================================================
// DIAGNOSTIC TEST ENDPOINTS
// ============================================================================

// Generate diagnostic test
app.post('/api/diagnostic/generate', async (req, res) => {
  await delay(2000); // Longer delay for test generation
  res.status(201).json(mockResponses.diagnostic_test.test_details);
});

// Get test details
app.get('/api/diagnostic/test/:testId', async (req, res) => {
  await randomDelay();
  res.json(mockResponses.diagnostic_test.test_details);
});

// Get test questions
app.get('/api/diagnostic/test/:testId/questions', async (req, res) => {
  await randomDelay();
  res.json(mockResponses.diagnostic_test.test_questions);
});

// Submit test
app.post('/api/diagnostic/test/:testId/submit', async (req, res) => {
  await delay(3000); // Longer delay for test submission and analytics
  res.json(mockResponses.diagnostic_test.submit_test_success);
});

// ============================================================================
// ANALYTICS ENDPOINTS
// ============================================================================

// Get analytics
app.get('/api/analytics/:analyticsId', async (req, res) => {
  await delay(1500); // Delay for AI analytics generation
  res.json(mockResponses.analytics.detailed_analytics);
});

// ============================================================================
// SCHEDULE ENDPOINTS
// ============================================================================

// Generate schedule
app.post('/api/schedule/generate', async (req, res) => {
  await delay(2500); // Longer delay for AI schedule generation
  res.status(201).json(mockResponses.schedule.generated_schedule);
});

// Get schedule
app.get('/api/schedule/:scheduleId', async (req, res) => {
  await randomDelay();
  res.json({
    ...mockResponses.schedule.generated_schedule,
    daily_schedule: mockResponses.schedule.daily_schedule
  });
});

// Get schedule progress
app.get('/api/schedule/:scheduleId/progress', async (req, res) => {
  await randomDelay();
  res.json(mockResponses.schedule.schedule_progress);
});

// Mark task complete
app.post('/api/schedule/task/:taskId/complete', async (req, res) => {
  await randomDelay();
  res.json(mockResponses.schedule.mark_task_complete_success);
});

// ============================================================================
// PRACTICE ENDPOINTS
// ============================================================================

// Generate practice questions
app.post('/api/practice/generate', async (req, res) => {
  await delay(1500); // Delay for question generation
  res.status(201).json(mockResponses.practice.practice_session);
});

// Submit practice answers
app.post('/api/practice/:sessionId/submit', async (req, res) => {
  await randomDelay();
  res.json(mockResponses.practice.submit_practice_success);
});

// ============================================================================
// PAYMENT ENDPOINTS
// ============================================================================

// Create payment order
app.post('/api/payment/create-order', async (req, res) => {
  await randomDelay();
  res.status(201).json(mockResponses.payment.create_order_success);
});

// Verify payment
app.post('/api/payment/verify', async (req, res) => {
  await randomDelay();
  res.json(mockResponses.payment.verify_payment_success);
});

// Get subscription details
app.get('/api/payment/subscription/:subscriptionId', async (req, res) => {
  await randomDelay();
  res.json(mockResponses.payment.subscription_details);
});

// ============================================================================
// PARENT DASHBOARD ENDPOINTS
// ============================================================================

// Get child progress
app.get('/api/parent/child/:childId/progress', async (req, res) => {
  await randomDelay();
  res.json(mockResponses.parent_dashboard.child_progress);
});

// Get teaching resources
app.get('/api/parent/teaching-resources', async (req, res) => {
  await randomDelay();
  res.json(mockResponses.parent_dashboard.teaching_resources);
});

// Get parent insights
app.get('/api/parent/child/:childId/insights', async (req, res) => {
  await randomDelay();
  res.json(mockResponses.parent_dashboard.parent_insights);
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `${req.method} ${req.path} is not implemented in mock server`,
    available_endpoints: [
      'POST /api/auth/register/parent',
      'POST /api/auth/login/parent',
      'POST /api/onboarding/preferences',
      'POST /api/onboarding/child-profile',
      'POST /api/onboarding/exam-selection',
      'POST /api/diagnostic/generate',
      'GET /api/diagnostic/test/:testId/questions',
      'POST /api/diagnostic/test/:testId/submit',
      'GET /api/analytics/:analyticsId',
      'POST /api/schedule/generate',
      'GET /api/schedule/:scheduleId',
      'POST /api/schedule/task/:taskId/complete',
      'POST /api/practice/generate',
      'POST /api/practice/:sessionId/submit',
      'POST /api/payment/create-order',
      'POST /api/payment/verify',
      'GET /api/parent/child/:childId/progress',
      'GET /api/parent/teaching-resources'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(70));
  console.log('  Mock API Server for Mentor AI Frontend'.padStart(50));
  console.log('='.repeat(70));
  console.log(`\n✓ Server running at: http://localhost:${PORT}`);
  console.log(`✓ Health check: http://localhost:${PORT}/health`);
  console.log('\n📝 Available endpoints:');
  console.log('   - Authentication: /api/auth/*');
  console.log('   - Onboarding: /api/onboarding/*');
  console.log('   - Diagnostic Test: /api/diagnostic/*');
  console.log('   - Analytics: /api/analytics/*');
  console.log('   - Schedule: /api/schedule/*');
  console.log('   - Practice: /api/practice/*');
  console.log('   - Payment: /api/payment/*');
  console.log('   - Parent Dashboard: /api/parent/*');
  console.log('\n💡 Tips:');
  console.log('   - All responses include simulated network delay (200-700ms)');
  console.log('   - Test error scenarios with specific inputs (see README.md)');
  console.log('   - Check console for request logs');
  console.log('\n🛑 Press Ctrl+C to stop the server\n');
  console.log('='.repeat(70) + '\n');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n✓ Mock API server stopped gracefully');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n✓ Mock API server stopped gracefully');
  process.exit(0);
});
