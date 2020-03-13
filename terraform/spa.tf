provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

module "s3-bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "1.6.0"
  # insert the 6 required variables here
  website = {
    index_document = "index.html"
    error_document = "index.html"
  }
  acl           = "public-read"
  attach_policy = true
  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Id": "WebsiteBucketPolicy",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": ["s3:GetObject"],
            "Resource": ["arn:aws:s3:::terraform-20200312231639136000000001/*"]
        }
    ]
}
POLICY
}
