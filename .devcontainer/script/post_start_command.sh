#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive

SCRIPT_DIRNAME=$(cd $(dirname ${0}) && pwd)
PROJECT_DIRNAME=$(cd ${SCRIPT_DIRNAME}/../.. && pwd)

FRONTEND_DIRNAME=${PROJECT_DIRNAME}/frontend
BACKEND_DIRNAME=${PROJECT_DIRNAME}/backend
COMMON_DIRNAME=${PROJECT_DIRNAME}/common

cd ${PROJECT_DIRNAME}

rm -rf ${HOME}/.gitconfig
git config --global init.defaultBranch ${GIT_DEFAULT_BRANCH}
git config --global user.name ${GIT_USER_NAME}
git config --global user.email ${GIT_USER_EMAIL}

docker compose up -d --pull always --force-recreate -V

npm install
cd ${COMMON_DIRNAME}
npm install
cd ${FRONTEND_DIRNAME}/web
rm -rf .output .data .nuxt .nitro .cache dist
npm install
cd ${BACKEND_DIRNAME}/api
npm install && npm run prisma:generate
cd ${BACKEND_DIRNAME}/batch
npm install && npm run prisma:generate
cd ${BACKEND_DIRNAME}/db
npm install && npm run prisma:generate
npm run ncs:dev && npm run prisma:migrate:deploy

docker system prune -af --volumes
