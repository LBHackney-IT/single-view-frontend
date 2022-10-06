FROM circleci/node:14.17.0-browsers

USER root

RUN git clone https://www.github.com/LBHackney-IT/single-view-frontend.git/

WORKDIR "/single-view-frontend"

RUN yarn install

RUN yarn install-ci

RUN echo "AUTH_ALLOWED_GROUPS=cypress-users" >> apps/common/.env

RUN cp apps/single-view/.env.sample apps/single-view/.env