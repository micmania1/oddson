#!/bin/bash
set -e

# Pre-deploy hook
./pre_deploy.sh

# Run terraform
terraform apply

# Post-deploy hook
./post_deploy.sh
