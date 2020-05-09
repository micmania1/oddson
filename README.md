# Odds on

A monorepo for the odds application.

## [Web](services/web)

`services/web` is the front-end web application written in react and typescript.


## [API](services/api)

`services/api` is the API written in typescript and defined by the API spec `services/api/openapi.yml`


## Database

We're using DynamoDB as the database. For local development you should be able to run `yarn db:start` from within the [services/api](services/api) directory.


## [Deployments & Environment Management](deploy)

The infrastructure is built using terraform which can be found in the `deploy` directory.
