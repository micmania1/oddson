# API

The API is built using [expressjs](https://expressjs.com/) and wrapped with [aws-labs/aws-serverless-express](https://github.com/awslabs/aws-serverless-express) to provide serverless capabilities.

## Database

The express application connects to the [DynamoDB](https://aws.amazon.com/dynamodb/) database. 

## Local Development

You can start the API locally using `yarn start`.

You can run a local DynaomDB instance using `yarn db:start`.

## Deployments

To create the production build run `yarn install --production && yarn build`.

### The rest is TBC

This needs to be improved but storing the manual process here for the time being.

* Zip up entire directory (including node_modules)
* Store zip at dist/build.zip
* Go into the root deploy directory `../../deploy`
* Run `terraform plan` to see the changes
* Run `terraform apply` to deploy the changes
* The API URL will be output to the console

In future we may be able to add the zip functionality to webpack and `yarn build`.

We also need to figure out how to feed the API url into the static website build.
