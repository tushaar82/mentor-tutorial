# Configuration Guide for Vector Search Setup

## Overview

This guide walks you through setting up Google Cloud Vertex AI for vector search, including enabling APIs, creating service accounts, generating embeddings, and deploying a vector search index.

**Total Time**: 45 minutes

---

## Prerequisites

Before starting, ensure you have:
- ✅ Google Cloud Project created
- ✅ Billing enabled on the project
- ✅ gcloud CLI installed and authenticated
- ✅ Project ID noted (you'll need this)

---

## Step 1: Install and Authenticate gcloud CLI

### What You're Doing
Installing Google Cloud CLI and authenticating with your Google account.

### Commands

**Install gcloud CLI** (if not already installed):

**On Ubuntu/Debian:**
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

**On macOS:**
```bash
brew install google-cloud-sdk
```

**Authenticate:**
```bash
gcloud auth login
gcloud auth application-default login
```

### Verification
```bash
gcloud auth list
# Should show your authenticated account
```

### Why This Matters
Application Default Credentials (ADC) allow your backend to authenticate with Google Cloud services without hardcoding credentials.

---

## Step 2: Set Google Cloud Project

### What You're Doing
Setting your active Google Cloud project for all subsequent commands.

### Commands

```bash
# Replace YOUR_PROJECT_ID with your actual project ID
export PROJECT_ID="your-project-id"
gcloud config set project $PROJECT_ID
```

### Verification
```bash
gcloud config get-value project
# Should show your project ID
```

### Add to Environment Variables

Add to your `.env` file:
```bash
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1
```

---


## Step 3: Enable Required Google Cloud APIs

### What You're Doing
Enabling Vertex AI API, Cloud Storage API, and other required services.

### Commands

```bash
# Enable Vertex AI API
gcloud services enable aiplatform.googleapis.com

# Enable Cloud Storage API
gcloud services enable storage.googleapis.com

# Enable Compute Engine API (required for Vector Search)
gcloud services enable compute.googleapis.com
```

### Verification
```bash
gcloud services list --enabled | grep -E "aiplatform|storage|compute"
# Should show all three services enabled
```

### Why This Matters
These APIs are required for:
- **Vertex AI**: Embedding generation and vector search
- **Cloud Storage**: Storing syllabus data and embeddings
- **Compute Engine**: Running vector search index infrastructure

**Note**: API enablement may take 1-2 minutes.

---

## Step 4: Create Cloud Storage Bucket

### What You're Doing
Creating a bucket to store syllabus data and embeddings for vector search.

### Commands

```bash
# Create bucket (replace with unique name)
export BUCKET_NAME="${PROJECT_ID}-mentor-ai-syllabus"
gsutil mb -l us-central1 gs://${BUCKET_NAME}
```

### Verification
```bash
gsutil ls
# Should show your bucket: gs://your-project-id-mentor-ai-syllabus/
```

### Add to Environment Variables

Add to your `.env` file:
```bash
GOOGLE_CLOUD_STORAGE_BUCKET=your-project-id-mentor-ai-syllabus
```

---

## Step 5: Upload Syllabus Data to Cloud Storage

### What You're Doing
Uploading the syllabus JSON files to Cloud Storage for processing.

### Commands

```bash
# Upload syllabus files
gsutil cp tushar-backend/data/syllabus/*.json gs://${BUCKET_NAME}/syllabus/

# Verify upload
gsutil ls gs://${BUCKET_NAME}/syllabus/
```

### Expected Output
```
gs://your-bucket/syllabus/jee_math.json
gs://your-bucket/syllabus/jee_physics.json
gs://your-bucket/syllabus/jee_chemistry.json
gs://your-bucket/syllabus/neet_biology.json
```

---

## Step 6: Generate Embeddings for Syllabus

### What You're Doing
Running a script to generate embeddings for all syllabus topics using Vertex AI.

### Commands

**First, start your backend server:**
```bash
cd tushar-backend
source venv/bin/activate
uvicorn main:app --reload
```

**In a new terminal, generate embeddings:**
```bash
# Generate embeddings for JEE Math
curl -X POST http://localhost:8000/api/vector-search/embeddings/batch \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEST_TOKEN" \
  -d @- << EOF
{
  "texts": [
    "Limits and Continuity in Calculus",
    "Differentiation techniques and applications",
    "Integration methods and definite integrals"
  ]
}
EOF
```

### Expected Output
```json
{
  "embeddings": [
    {
      "embedding": [0.123, -0.456, ...],
      "dimensions": 768,
      "model": "textembedding-gecko@003"
    }
  ],
  "total_count": 3
}
```

### Why This Matters
Embeddings convert text into numerical vectors that capture semantic meaning, enabling similarity search.

**Note**: This step may take 5-10 minutes for all syllabus topics.

---


## Step 7: Create Vector Search Index

### What You're Doing
Creating a Vertex AI Vector Search index to enable fast similarity search.

### Commands

**Create index configuration file** `index-config.json`:
```json
{
  "displayName": "mentor-ai-syllabus-index",
  "description": "Vector search index for JEE/NEET syllabus topics",
  "metadata": {
    "contentsDeltaUri": "gs://your-bucket/embeddings/",
    "config": {
      "dimensions": 768,
      "approximateNeighborsCount": 150,
      "distanceMeasureType": "DOT_PRODUCT_DISTANCE",
      "algorithmConfig": {
        "treeAhConfig": {
          "leafNodeEmbeddingCount": 1000,
          "leafNodesToSearchPercent": 10
        }
      }
    }
  }
}
```

**Create the index:**
```bash
gcloud ai indexes create \
  --display-name=mentor-ai-syllabus-index \
  --description="Vector search index for syllabus topics" \
  --metadata-file=index-config.json \
  --region=us-central1
```

### Expected Output
```
Create request issued for: [mentor-ai-syllabus-index]
Waiting for operation [projects/xxx/locations/us-central1/operations/xxx] to complete...
Created index: projects/xxx/locations/us-central1/indexes/xxx
```

### Save Index ID

Copy the index ID from the output and add to `.env`:
```bash
VERTEX_AI_INDEX_ID=your-index-id
```

### Why This Matters
The vector search index enables fast approximate nearest neighbor (ANN) search across thousands of embeddings.

**Note**: Index creation takes 15-30 minutes. You can proceed to the next step while it's creating.

---

## Step 8: Create Index Endpoint

### What You're Doing
Creating an endpoint to serve the vector search index for queries.

### Commands

```bash
gcloud ai index-endpoints create \
  --display-name=mentor-ai-syllabus-endpoint \
  --description="Endpoint for syllabus vector search" \
  --region=us-central1 \
  --network=projects/${PROJECT_ID}/global/networks/default
```

### Expected Output
```
Created index endpoint: projects/xxx/locations/us-central1/indexEndpoints/xxx
```

### Save Endpoint ID

Copy the endpoint ID and add to `.env`:
```bash
VERTEX_AI_INDEX_ENDPOINT_ID=your-endpoint-id
```

---

## Step 9: Deploy Index to Endpoint

### What You're Doing
Deploying the vector search index to the endpoint so it can serve queries.

### Commands

**Wait for index creation to complete:**
```bash
gcloud ai indexes describe YOUR_INDEX_ID \
  --region=us-central1
# Check that state is "READY"
```

**Deploy index to endpoint:**
```bash
gcloud ai index-endpoints deploy-index YOUR_ENDPOINT_ID \
  --deployed-index-id=mentor-ai-syllabus-deployed \
  --display-name=mentor-ai-syllabus-deployed \
  --index=YOUR_INDEX_ID \
  --region=us-central1
```

### Expected Output
```
Deploying index to endpoint...
Deployment complete.
```

### Verification
```bash
gcloud ai index-endpoints describe YOUR_ENDPOINT_ID \
  --region=us-central1
# Should show deployed index
```

### Why This Matters
Deploying the index makes it available for real-time queries from your backend API.

**Note**: Deployment takes 10-15 minutes.

---


## Step 10: Verify Complete Configuration

### What You're Doing
Checking that all configuration is complete and services are ready.

### Checklist

Verify your `.env` file has all required variables:

```bash
# Google Cloud Configuration
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_CLOUD_STORAGE_BUCKET=your-project-id-mentor-ai-syllabus

# Vertex AI Configuration
VERTEX_AI_INDEX_ID=your-index-id
VERTEX_AI_INDEX_ENDPOINT_ID=your-endpoint-id
VERTEX_AI_DEPLOYED_INDEX_ID=mentor-ai-syllabus-deployed

# Embedding Model Configuration
VERTEX_AI_EMBEDDING_MODEL=textembedding-gecko@003
VERTEX_AI_EMBEDDING_DIMENSIONS=768
```

### Verification Commands

**Check APIs are enabled:**
```bash
gcloud services list --enabled | grep -E "aiplatform|storage"
```

**Check bucket exists:**
```bash
gsutil ls gs://${BUCKET_NAME}/
```

**Check index is ready:**
```bash
gcloud ai indexes describe ${VERTEX_AI_INDEX_ID} --region=us-central1
# State should be "READY"
```

**Check endpoint has deployed index:**
```bash
gcloud ai index-endpoints describe ${VERTEX_AI_INDEX_ENDPOINT_ID} --region=us-central1
# Should show deployed index
```

### All Green?

If all checks pass, you're ready to test vector search! Proceed to **TESTING.md**.

---

## Configuration Summary

You've completed:
- ✅ Installed and authenticated gcloud CLI
- ✅ Set Google Cloud project
- ✅ Enabled Vertex AI, Cloud Storage, and Compute APIs
- ✅ Created Cloud Storage bucket
- ✅ Uploaded syllabus data
- ✅ Generated embeddings for syllabus topics
- ✅ Created vector search index
- ✅ Created index endpoint
- ✅ Deployed index to endpoint
- ✅ Configured environment variables

**Next Step**: Open **TESTING.md** to test vector search functionality.

---

## Cost Considerations

**Vertex AI Vector Search Pricing** (as of 2024):
- Index storage: ~$0.30 per GB per month
- Query requests: ~$0.50 per 1000 queries
- Embedding generation: ~$0.025 per 1000 characters

**Estimated Monthly Cost** (for development):
- Index storage (1 GB): $0.30
- Queries (10,000): $5.00
- Embeddings (100,000 chars): $2.50
- **Total**: ~$8/month

**Tip**: Delete unused indexes and endpoints to save costs during development.

---

## Troubleshooting Configuration

### Issue: "Permission denied" errors

**Solution**:
```bash
# Ensure you're authenticated
gcloud auth application-default login

# Check your account has necessary roles
gcloud projects get-iam-policy $PROJECT_ID
```

### Issue: "API not enabled" errors

**Solution**:
```bash
# Re-enable the API
gcloud services enable aiplatform.googleapis.com
```

### Issue: Index creation fails

**Solution**:
- Check billing is enabled
- Verify bucket exists and has embeddings
- Check embeddings are in correct format (JSON lines)

### Issue: Endpoint deployment takes too long

**Solution**:
- Deployment can take 15-30 minutes, this is normal
- Check status: `gcloud ai index-endpoints describe YOUR_ENDPOINT_ID --region=us-central1`
- If stuck for >1 hour, contact Google Cloud support

---

## Next Steps

Configuration complete! Move to **TESTING.md** to verify vector search works correctly.
