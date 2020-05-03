# Create the hosted zone within AWS
resource "aws_route53_zone" "domain" {
  name         = "${var.domain}."
}

# SSL certificates
resource "aws_route53_record" "cert_validation" {
  count           = var.environment_type == "prod" ? 3 : 0 # number of domains added to cert
  name            = aws_acm_certificate.domain_cert.domain_validation_options[count.index].resource_record_name
  type            = aws_acm_certificate.domain_cert.domain_validation_options[count.index].resource_record_type
  zone_id         = aws_route53_zone.domain.zone_id
  records         = [aws_acm_certificate.domain_cert.domain_validation_options[count.index].resource_record_value]
  ttl             = 60
  allow_overwrite = true
}

resource "aws_acm_certificate" "domain_cert" {
  domain_name       = var.domain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  subject_alternative_names = [
    "www.${var.domain}",
    "api.${var.domain}"
  ]
}

resource "aws_acm_certificate_validation" "domain_cert_validation" {
  certificate_arn         = aws_acm_certificate.domain_cert.arn
}
