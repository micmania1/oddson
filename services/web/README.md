# Web

The web application is built using the `create-react-app` package with typescript. 

## Running the app locally

`yarn start` will run the app locally in your dev environment.

### API Mocking

The web application depends on there being an API for it to call. You can point this towards a real API if you have one available and CORS are correctly configured, or you can use a mock API.

We're using [prism](https://github.com/stoplightio/prism) which consumes our [OpenAPI Spec](../api/openapi.yml) to generate a mock API, either using the examples provided in the spec or automatically generated data.

* `yarn api:mock` will use example data
* `yarn api:mock:dynamic` will use automatically generated data based on the API spec

## API Client Library

We're using [OpenApi Generator](https://openapi-generator.tech/) to generate the client library for executing API calls.

Running `yarn api:generate` will regenerate the client library in typescript and will publish it to `packages/api`. This is currently stored in the git repo so it'll need to be generated and committed for the time being, but this could be generated as part of deployments in the future and not stored in git.
