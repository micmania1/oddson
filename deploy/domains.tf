# Create the hosted zone within AWS
resource "aws_route53_zone" "domain" {
  count = local.include_domains ? 1 : 0
  name  = var.domain
}

# SSL certificates
resource "aws_route53_record" "cert_validation" {
  count           = local.include_domains ? length(local.all_domains) : 0
  name            = aws_acm_certificate.domain_cert[0].domain_validation_options[count.index].resource_record_name
  type            = aws_acm_certificate.domain_cert[0].domain_validation_options[count.index].resource_record_type
  zone_id         = aws_route53_zone.domain[0].zone_id
  records         = [aws_acm_certificate.domain_cert[0].domain_validation_options[count.index].resource_record_value]
  ttl             = 60
  allow_overwrite = true
}

resource "aws_acm_certificate" "domain_cert" {
  count             = local.include_domains ? 1 : 0
  domain_name       = var.domain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  subject_alternative_names = setsubtract(local.all_domains, [var.domain])
}

resource "aws_acm_certificate_validation" "domain_cert_validation" {
  count           = local.include_domains ? 1 : 0
  certificate_arn = aws_acm_certificate.domain_cert[count.index].arn
}
