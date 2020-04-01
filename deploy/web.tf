resource "aws_s3_bucket" "web" {
  bucket = "oddson"
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = aws_s3_bucket.web.bucket

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
      "Resource": ["arn:aws:s3:::${aws_s3_bucket.web.bucket}/*"]
    }
  ]
}
POLICY
}

output "website_url" {
  value = "https://${aws_s3_bucket.web.website_endpoint}"
}
