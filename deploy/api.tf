resource "aws_apigatewayv2_api" "api" {
    name = "oddson-api"
    protocol_type = "HTTP"
    description = "An API to change the lives of people for the better"
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

resource "aws_lambda_function" "create_oddson" {
    function_name = "oddson_create"
    filename = "../api/src/test.zip"
    runtime = "nodejs12.x"
    role = aws_iam_role.api_function_role.arn
    handler = "index.js"
}

output "api_url" {
    value = aws_apigatewayv2_api.api.api_endpoint
}
