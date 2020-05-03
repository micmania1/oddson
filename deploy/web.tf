resource "aws_s3_bucket" "web" {
  bucket        = "${var.application_id}-${var.environment_type}"
  acl           = "private"
  force_destroy = true
}

locals {
  s3_origin_id = "${var.application_id}_${var.environment_type}_web_origin_id"
}

resource "aws_cloudfront_origin_access_identity" "web" {
  comment = "${var.application_title} ${var.environment_type} web origin access identity"
}

resource "aws_cloudfront_distribution" "web" {
  origin {
    domain_name = aws_s3_bucket.web.bucket_regional_domain_name
    origin_id   = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = "origin-access-identity/cloudfront/${aws_cloudfront_origin_access_identity.web.id}"
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = [
    var.domain,
    "www.${var.domain}"
  ]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.domain_cert.arn
    ssl_support_method = "sni-only"
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
    s3_bucket : aws_s3_bucket.web.bucket,
    cloudfront_oai_arn : aws_cloudfront_origin_access_identity.web.iam_arn
  })
}

# Domains
resource "aws_route53_record" "web_domain" {
    name = var.domain
    type = "A"
    zone_id = aws_route53_zone.domain.zone_id

    alias {
        name = aws_cloudfront_distribution.web.domain_name
        zone_id = aws_cloudfront_distribution.web.hosted_zone_id
        evaluate_target_health = true
    }
}

resource "aws_route53_record" "web_domain_www" {
    name = "www.${var.domain}"
    type = "A"
    zone_id = aws_route53_zone.domain.zone_id

    alias {
        name = aws_cloudfront_distribution.web.domain_name
        zone_id = aws_cloudfront_distribution.web.hosted_zone_id
        evaluate_target_health = true
    }
}


output "website_bucket_name" {
  value = aws_s3_bucket.web.bucket
}

output "website_url" {
  value = "https://${aws_cloudfront_distribution.web.domain_name}"
}
