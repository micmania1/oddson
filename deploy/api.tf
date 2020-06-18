resource "aws_api_gateway_rest_api" "api" {
  name        = "${var.application_id} HTTP API"
  description = "${var.application_title} HTPT API"
  body        = templatefile("../services/api/openapi.yml", { api_function : aws_lambda_function.api_function.invoke_arn })
}

resource "aws_api_gateway_deployment" "api" {
  depends_on  = [aws_api_gateway_rest_api.api]
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = var.environment_type
}

resource "aws_iam_role" "api_function_role" {
  name               = "${var.application_id}_${var.environment_type}_api_function_role"
  assume_role_policy = file("./assets/policies/api.json")
}

resource "aws_iam_role_policy" "db_policy" {
  name   = "${var.application_id}_db_policy"
  role   = aws_iam_role.api_function_role.id
  policy = templatefile("./assets/policies/db_role.json", { db_resource : aws_dynamodb_table.table.arn })
}

resource "aws_iam_role_policy" "api_logs_policy" {
  name   = "${var.application_id}_${var.environment_type}_api_logs_policy"
  role   = aws_iam_role.api_function_role.id
  policy = templatefile("./assets/policies/api_logs.json", { cloudwatch_resource : aws_cloudwatch_log_group.logs.arn })
}

resource "aws_lambda_function" "api_function" {
  function_name    = "${var.application_id}_${var.environment_type}_api"
  filename         = "../services/api/build/app.zip"
  runtime          = "nodejs12.x"
  role             = aws_iam_role.api_function_role.arn
  handler          = "app.handler"
  publish          = true
  source_code_hash = filebase64sha256("../services/api/build/app.zip")

  environment {
    variables = {
      AWS_DYNAMODB_TABLE = var.db_table_name
    }
  }
}

resource "aws_lambda_permission" "api_function_permission" {
  function_name = aws_lambda_function.api_function.function_name
  statement_id  = "${var.application_id}_${var.environment_type}_api_gateway_lambda"
  action        = "lambda:InvokeFunction"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*/*"
}

# Domains
resource "aws_route53_record" "api_domain" {
  count   = local.include_domains ? length(var.api_domains) : 0
  name    = aws_api_gateway_domain_name.api_domain[count.index].domain_name
  type    = "A"
  zone_id = aws_route53_zone.domain[0].id

  alias {
    name                   = aws_api_gateway_domain_name.api_domain[count.index].cloudfront_domain_name
    zone_id                = aws_api_gateway_domain_name.api_domain[count.index].cloudfront_zone_id
    evaluate_target_health = true
  }
}

resource "aws_api_gateway_domain_name" "api_domain" {
  count = local.include_domains ? length(var.api_domains) : 0
  depends_on = [
    aws_acm_certificate_validation.domain_cert_validation
  ]

  domain_name     = var.api_domains[count.index]
  certificate_arn = aws_acm_certificate.domain_cert[0].arn
}

output "api_arn" {
  value = aws_api_gateway_rest_api.api.arn
}

output "lambda_arn" {
  value = aws_lambda_function.api_function.arn
}

output "api_url" {
  value = aws_api_gateway_deployment.api.invoke_url
}
