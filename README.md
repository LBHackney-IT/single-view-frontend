# Single View Frontend

This is the frontend for Single View 2.0, a monorepo comprising micro
frontends taken from the @mtfh scope and repurposed for Single View.

<hr>

## Installing dependencies:
If any command fails, try closing and reopening the terminal, then try again.

### Install Node Version Manager (nvm)
https://github.com/nvm-sh/nvm

### Install Node Version 16

`nvm install 16`

### Use Node version 16 by default:

`nvm alias default 16`

### Update npm to the latest version

`npm install -g npm`

### Install Yarn package manager globally

`npm install --global yarn`

<hr>

## Setting up
### Update your hosts file:
To allow the Google authentication to work locally, you need to alias local.hackney.gov.uk to 127.0.0.1 in your local hosts file. This allows the Google authentication token to be accepted as you're on a subdomain of hackney.gov.uk.


Open your hosts file, which on **Linux** and **MacOS** can be done by running:

`sudo open /etc/hosts`

On **Windows** the hosts file can be found at **c:\Windows\System32\Drivers\etc\hosts**

In the hosts file, add the line: 

`127.0.0.1 local.hackney.gov.uk`

<hr>

### Install Dependencies 

From the root directory in the terminal, run:

`yarn install-apps`

This may take some time to run the first time.

You will also need the concurrently package:
`yarn install concurrently`

### Add environment variables:
Create a `.env` file in the `apps/single-view` directory

Ask a code owner to get the correct .env file contents in order to run the frontend.

To give the cypress tests the necessary permissions to run:
Create a `.env` file in the `apps/common` directory
Populate it like so:
```
AUTH_ALLOWED_GROUPS=single-view-uat-access,cypress-users
```

## Running it locally

Run the application with `yarn start`

Load `http://local.hackney.gov.uk:9000` in your browser

NB the FE is currently pointing at the Staging API

## Running Cypress tests

Run `yarn start` and in a separate terminal run `yarn cypress:open`

## Setting environment variables

If a new variable needs to be introduced ensure that you store it in AWS param store using this naming convention `/single-view/{env}/{env-name}`,
Also the variable needs to be declared in the following files:
- [apps/single-view/.env.sample](https://github.com/LBHackney-IT/single-view-frontend/blob/main/apps/single-view/.env.sample)
- [.circleci/config.yaml](https://github.com/LBHackney-IT/single-view-frontend/blob/main/.circleci/config.yml#L233)
- [apps/single-view/webpack.config.js](https://github.com/LBHackney-IT/single-view-frontend/blob/main/apps/single-view/webpack.config.js#L35)

## Committing to GitHub
### Linting
By default, Husky will run a lint check before each commit and prevent the commit if this fails.

These failures can often be resolved automatically by opening a terminal, `cd`-ing into the /app/single-view directory, then running `yarn lint:fix`

After each commit, [CircleCI](https://app.circleci.com/pipelines/github/LBHackney-IT/single-view-frontend) will run the cypress tests and lint checks.

## Resources

[Hackney Design System](https://design-system.hackney.gov.uk/developing/installing-from-npm/)
[Single SPA Framework](https://single-spa.js.org/docs/getting-started-overview)
