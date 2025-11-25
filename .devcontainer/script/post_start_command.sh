#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive

SCRIPT_DIRNAME=$(cd $(dirname ${0}) && pwd)
PROJECT_DIRNAME=$(cd ${SCRIPT_DIRNAME}/../.. && pwd)

FRONTEND_DIRNAME=${PROJECT_DIRNAME}/frontend
BACKEND_DIRNAME=${PROJECT_DIRNAME}/backend

cd ${PROJECT_DIRNAME}

rm -rf ${HOME}/.gitconfig
git config --global init.defaultBranch ${GIT_DEFAULT_BRANCH}
git config --global user.name ${GIT_USER_NAME}
git config --global user.email ${GIT_USER_EMAIL}

docker compose up -d --pull always --force-recreate -V --wait

npm install
cd ${FRONTEND_DIRNAME}/web
rm -rf .output .data .nuxt .nitro .cache dist
rm -rf type
npm install && npm run prisma:generate
cd ${BACKEND_DIRNAME}/api
rm -rf type
npm install && npm run prisma:generate
cd ${BACKEND_DIRNAME}/batch
rm -rf type
npm install && npm run json2ts:qiita && npm run prisma:generate
cd ${BACKEND_DIRNAME}/db
rm -rf type
npm install && npm run prisma:generate
npm run ncs:dev && npm run prisma:migrate:deploy

docker system prune -af --volumes
