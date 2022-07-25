# Single View Frontend

This is the frontend for Single View 2.0, a monorepo comprising micro
frontends taken from the @mtfh scope and repurposed for Single View.

## Installing dependencies:
### Install Node Version Manager (nvm)
- https://github.com/nvm-sh/nvm

### Install Node Version 16 and Node Package Manager (npm)
- Restart terminal then run:
`nvm install 16`

### Update npm to the latest version
- Run in terminal:
`npm install -g npm`

### Install Yarn Package Manager Globally
- Run in terminal:
`npm install --global yarn`

If any command fails, try closing and reopening the terminal, then try again.

## Setting up
### Update your hosts file:
To allow the Google authentication to work locally, you need to alias local.hackney.gov.uk to 127.0.0.1 in your local hosts file. This allows the Google authentication token to be accepted as you're on a subdomain of hackney.gov.uk.
- Open your hosts file, which on **Linux** and **MacOS** can be done by running:
`sudo open /etc/hosts`

On Windows the hosts file can be found at **c:\Windows\System32\Drivers\etc\hosts**

- From the root directory in the terminal, run:
`yarn install-apps`
This may take some time to run the first time.

### Add environment variables:
- Create a `.env` file in the `apps/single-view` directory
- Populate it like so:
```
MMH_PROFILE_URL=https://manage-my-home-staging.hackney.gov.uk/person
RSA_PUBLIC_KEY={Public key for RSA}
MMH_URL=https://manage-my-home-staging.hackney.gov.uk
SV_API_V1={URL of the Singe View API (staging or development)}

```

## Running it locally

- Run the application with `yarn start`
- Load `http://local.hackney.gov.uk:9000` in your browser
- NB the FE is currently pointing at the Staging API

## Running Cypress tests

Add the following group `cypress-users` to `apps/common/.env`

Run `yarn start` and in a separate terminal run `yarn cypress:open`

### Resources

- [Hackney Design System](https://design-system.hackney.gov.uk/developing/installing-from-npm/)
- [Single SPA Framework](https://single-spa.js.org/docs/getting-started-overview)
