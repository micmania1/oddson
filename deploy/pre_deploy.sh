#!/bin/bash
set -e

# Build the API lambda function
cd ../services/api
yarn build
