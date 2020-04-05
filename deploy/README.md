# Deployments

You can use this to define and configure new infrastructure and deployments. Deployments may be split out from infrastructure setup in the future.

## Terraform

All infrastructure is built using [Terraform](https://www.terraform.io/).

## Configure AWS credentials

If you want to deploy from your local dev environment you will need to [configure your AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) for your own AWS account to be able to deploy any services.

These will be created in your own account and will be charged to your account, although charges for creating static website + API Gateway are usually non-existent or a few cents.

## Deploying a test environment

If you want to deploy a feature to real infrastructure you can run `terraform plan` to see what services will be created or updated and you can use `terraform apply` to apply those changes.

All terraform commands must be run from inside of this `deploy` directory.
