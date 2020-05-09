# API

The API is built using [expressjs](https://expressjs.com/) and wrapped with [aws-labs/aws-serverless-express](https://github.com/awslabs/aws-serverless-express) to provide serverless capabilities.

## Database

The express application connects to the [DynamoDB](https://aws.amazon.com/dynamodb/) database.

## Local Development

You can start the API locally using `yarn start`.

You can run a local DynamoDB instance using `yarn db:start`.
