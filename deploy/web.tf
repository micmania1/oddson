resource "aws_s3_bucket" "web" {
  bucket = "oddson"
  acl = "private"
}

locals {
  s3_origin_id = "oddson_web_origin_id"
}

resource "aws_cloudfront_origin_access_identity" "web" {
    comment = "Oddson web origin access identity"
}

resource "aws_cloudfront_distribution" "web" {
    origin {
        domain_name = aws_s3_bucket.web.bucket_regional_domain_name
        origin_id   = local.s3_origin_id

        s3_origin_config {
            origin_access_identity = "origin-access-identity/cloudfront/${aws_cloudfront_origin_access_identity.web.id}"
        }
    }

    enabled = true
    is_ipv6_enabled = true
    default_root_object = "index.html"

    default_cache_behavior {
        allowed_methods = ["GET", "HEAD"]
        cached_methods = ["GET", "HEAD"]
        target_origin_id = local.s3_origin_id

        forwarded_values {
            query_string = false

            cookies {
                forward = "none"
            }
        }

        viewer_protocol_policy = "allow-all"
        min_ttl = 0
        default_ttl = 3600
        max_ttl = 86400
    }

    viewer_certificate {
        cloudfront_default_certificate = true
    }

    restrictions {
        geo_restriction {
            restriction_type = "none"
        }
     }
}

resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = aws_s3_bucket.web.bucket
  policy = templatefile("./assets/policies/web.json", {
      s3_bucket: aws_s3_bucket.web.bucket,
      cloudfront_oai_arn: aws_cloudfront_origin_access_identity.web.iam_arn
  })
}

output "website_bucket_name" {
    value = aws_s3_bucket.web.bucket
}

output "website_url" {
  value = "https://${aws_cloudfront_distribution.web.domain_name}"
}
