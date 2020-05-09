#!/bin/bash
set -e

# Pre-deploy hook
./pre_deploy.sh

# Run terraform
terraform apply -auto-approve -lock=true -input=false

# Post-deploy hook
./post_deploy.sh
