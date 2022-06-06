# Single View Frontend

This is the frontend for Single View 2.0, a monorepo comprising micro
frontends taken from the @mtfh scope and repurposed for Single View.

## Running it locally

> To allow the Google authentication to work locally, you need to alias local.hackney.gov.uk to 127.0.0.1 in your local hosts file. This allows the Google authentication token to be accepted as you're on a subdomain of hackney.gov.uk.

- Install all dependencies by running `yarn` in each `/apps` subdirectory
- Run the application with `yarn start`
- Load `http://local.hackney.gov.uk:9000` in your browser
- NB the FE is currently pointing at the Staging API

## Running Cypress tests

Add the following group `cypress-users` to `apps/common/.env`

Run `yarn start` and in a separate terminal run `yarn cypress:open`

### Resources

- [Hackney Design System](https://design-system.hackney.gov.uk/developing/installing-from-npm/)
- [Single SPA Framework](https://single-spa.js.org/docs/getting-started-overview)
