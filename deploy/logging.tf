resource "aws_cloudwatch_log_group" "logs" {
    name = "/aws/lambda/${aws_lambda_function.oddson_api.function_name}"
}
