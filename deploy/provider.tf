provider "aws" {
  profile = var.aws_profile
  region  = var.aws_region
}

terraform {
  backend "remote" {
    hostname = "app.terraform.io"

    workspaces {
      prefix = "oddson_"
    }
  }
}

locals {
  environment_type = var.environment_type
  include_domains  = var.domain == "" ? false : true
  all_domains      = setunion([var.domain], var.web_domains, var.api_domains)
}
