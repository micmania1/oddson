#!/bin/bash
set -e

# Pre-deploy hook
# ./pre_deploy.sh

# Run terraform
# CircleCI uses the TF_WORKSPACE env variable
TF_VARS_FILE=$($TF_WORKSPACE || terraform workspace show)

echo "WORKSPACE = ${TF_VARS_FILE}"

if [ -f "${TF_VARS_FILE}.tfvars" ]
then
  echo "Using var file: ${TF_VARS_FILE}.tfvars"
  # terraform apply -auto-approve -lock=true -input=false -var-file="${TF_VARS_FILE}.tfvars"
else
  echo "NO VAR FILE FOUND"
  # terraform apply -auto-approve -lock=true -input=false
fi


# Post-deploy hook
# ./post_deploy.sh
