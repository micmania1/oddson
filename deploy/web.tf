resource "aws_s3_bucket" "web" {
  bucket = "oddson"
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = aws_s3_bucket.web.bucket
  policy = templatefile("./assets/policies/web.json", { s3_bucket: aws_s3_bucket.web.bucket })
}

output "website_url" {
  value = "https://${aws_s3_bucket.web.website_endpoint}"
}
