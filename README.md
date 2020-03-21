# Odds on?

A monorepo for the odds on web, api and whatever comes after it.

## [Web](services/web)

`services/web` is the front-end web application written in react and typescript.


## [API](services/api)

`services/api` is the API written in typescript and defined by the API spec `services/api/openapi.yml`


## [Deployments](deploy)

The infrastructure is built using terraform which can be found in the `deploy` directory. This is currently all built at the same time but may be split out to their individual services at some point.
