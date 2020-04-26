resource "aws_api_gateway_rest_api" "api" {
  name        = "${var.application_id} HTTP API"
  description = "${var.application_title} HTPT API"
  body = templatefile("../services/api/openapi.yml", { api_function: aws_lambda_function.api_function.invoke_arn })
}

resource "aws_api_gateway_deployment" "api" {
    depends_on = [aws_api_gateway_rest_api.api]
    rest_api_id = aws_api_gateway_rest_api.api.id
    stage_name = "dev"
}

resource "aws_iam_role" "api_function_role" {
    name = "${var.application_id}_api_function_role"
    assume_role_policy = file("./assets/policies/api.json")
}

resource "aws_iam_role_policy" "db_role" {
    name = "${var.application_id}_db_read_policy"
    role = aws_iam_role.api_function_role.id
    policy = templatefile("./assets/policies/db_role.json", { db_resource: aws_dynamodb_table.table.arn })
}

resource "aws_iam_role_policy" "api_logs" {
    name = "${var.application_id}_api_logs_policy"
    role = aws_iam_role.api_function_role.id
    policy = templatefile("./assets/policies/api_logs.json", { cloudwatch_resource: aws_cloudwatch_log_group.logs.arn })
}

resource "aws_lambda_function" "api_function" {
    function_name = "${var.application_id}_api"
    filename = "../services/api/build/app.zip"
    runtime = "nodejs12.x"
    role = aws_iam_role.api_function_role.arn
    handler = "app.handler"
    publish = true
    source_code_hash = filebase64sha256("../services/api/build/app.zip")
}

resource "aws_lambda_permission" "api_function_permission" {
    statement_id = "${var.application_id}_api_gateway_lambda"
    action = "lambda:InvokeFunction"
    function_name = "${var.application_id}_api"
    principal = "apigateway.amazonaws.com"
    source_arn = "${aws_api_gateway_rest_api.api.execution_arn}/*/*/*"
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
