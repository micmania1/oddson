resource "aws_s3_bucket" "web" {
  bucket        = "${var.application_id}-${var.environment_type}"
  acl           = "private"
  force_destroy = true
}

locals {
  web_origin_id = "${var.application_id}_${var.environment_type}_web_origin_id"
}

resource "aws_cloudfront_origin_access_identity" "web" {
  comment = "${var.application_title} ${var.environment_type} web origin access identity"
}

resource "aws_cloudfront_distribution" "web" {
  depends_on = [
    aws_acm_certificate_validation.domain_cert_validation
  ]

  origin {
    domain_name = aws_s3_bucket.web.bucket_regional_domain_name
    origin_id   = local.web_origin_id

    s3_origin_config {
      origin_access_identity = "origin-access-identity/cloudfront/${aws_cloudfront_origin_access_identity.web.id}"
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.web_origin_id

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


  aliases = local.include_domains ? var.web_domains : []
  viewer_certificate {
    # When no domains are configured
    cloudfront_default_certificate = ! local.include_domains

    # When we need to configure domains
    acm_certificate_arn = local.include_domains ? aws_acm_certificate.domain_cert[0].arn : null
    ssl_support_method  = local.include_domains ? "sni-only" : null
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
resource "aws_route53_record" "web_domains" {
  count   = local.include_domains ? length(var.web_domains) : 0
  name    = var.web_domains[count.index]
  type    = "A"
  zone_id = aws_route53_zone.domain[0].zone_id

  alias {
    name                   = aws_cloudfront_distribution.web.domain_name
    zone_id                = aws_cloudfront_distribution.web.hosted_zone_id
    evaluate_target_health = true
  }
}

output "website_bucket_name" {
  value = aws_s3_bucket.web.bucket
}

output "website_url" {
  value = "https://${aws_cloudfront_distribution.web.domain_name}"
}
