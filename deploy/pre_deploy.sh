#!/bin/bash
set -e

ROOT_DIR="../"

# Build the API lambda function
cd "${ROOT_DIR}services/api"
yarn build
