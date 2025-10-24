#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive
FRONTEND_DIRNAME=$(pwd)/frontend
BACKEND_DIRNAME=$(pwd)/backend

rm -rf ${HOME}/.gitconfig
git config --global init.defaultBranch ${GIT_DEFAULT_BRANCH}
git config --global user.name ${GIT_USER_NAME}
git config --global user.email ${GIT_USER_EMAIL}

docker compose up -d --pull always --force-recreate -V

cd ${FRONTEND_DIRNAME}/web
rm -rf .output .data .nuxt .nitro .cache dist
npm install && npm run prisma:generate

cd ${BACKEND_DIRNAME}/api
npm install && npm run prisma:generate
cd ${BACKEND_DIRNAME}/batch
npm install && npm run prisma:generate
cd ${BACKEND_DIRNAME}/db
npm install && npm run prisma:generate && npm run mariadb:up

docker system prune -af --volumes
