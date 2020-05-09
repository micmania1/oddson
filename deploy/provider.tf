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
