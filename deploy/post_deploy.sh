#!/bin/bash
set -e

## Deploy the web service code

# Prepare terrform outputs for use
echo "+ Obtaining api_url from terraform outputs..."
REACT_APP_API_BASE_URL=$(terraform output api_url)

echo "+ Obtaining website_bucket_name from terraform outputs..."
S3_BUCKET=$(terraform output website_bucket_name)

# Build the application. We export the api url for yarn build
echo "+ Building web package..."
export REACT_APP_API_BASE_URL
cd ../services/web
yarn build

# Deploy to our S3 bucket
echo "+ Deploying to S3..."
aws s3 sync ./build "s3://${S3_BUCKET}" --delete
echo "+ Deployment complete..."$'\360\237\215\273'
