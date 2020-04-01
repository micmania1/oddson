resource "aws_api_gateway_rest_api" "api" {
  name        = "Oddson HTTP API"
  description = "Oddson HTPT API"
  body = templatefile("../services/api/openapi.yml", { oddson_api_function: aws_lambda_function.oddson_api.invoke_arn })
}

resource "aws_api_gateway_deployment" "api" {
    depends_on = [aws_api_gateway_rest_api.api]
    rest_api_id = aws_api_gateway_rest_api.api.id
    stage_name = "dev"
}

resource "aws_iam_role" "api_function_role" {
    name = "oddson_api_function_role"

    assume_role_policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Effect": "Allow",
            "Sid": ""
        }
    ]
}
POLICY
}

resource "aws_lambda_function" "oddson_api" {
    function_name = "oddson_api"
    filename = "../services/api/build.zip"
    runtime = "nodejs12.x"
    role = aws_iam_role.api_function_role.arn
    handler = "lambda.handler"
    publish = true
    source_code_hash = filebase64sha256("../services/api/build.zip")
}

resource "aws_lambda_permission" "oddson_api_lambda_permission" {
    statement_id = "allow_oddons_api_gateway_lambda"
    action = "lambda:InvokeFunction"
    function_name = "oddson_api"
    principal = "apigateway.amazonaws.com"
    source_arn = "${aws_api_gateway_rest_api.api.execution_arn}/*/*/*"
}

output "api_arn" {
    value = aws_api_gateway_rest_api.api.arn
}

output "lambda_arn" {
    value = aws_lambda_function.oddson_api.arn
}

output "api_url" {
    value = aws_api_gateway_deployment.api.invoke_url
}
