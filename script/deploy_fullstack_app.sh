#! /usr/bin/env bash

set -euxo pipefail
source ${HOME}/.nvm/nvm.sh

export DEBIAN_FRONTEND=noninteractive

SCRIPT_DIRNAME=$(cd $(dirname ${0}) && pwd)
PROJECT_DIRNAME=$(cd ${SCRIPT_DIRNAME}/.. && pwd)

FRONTEND_DIRNAME=${PROJECT_DIRNAME}/frontend
BACKEND_DIRNAME=${PROJECT_DIRNAME}/backend
COMMON_DIRNAME=${PROJECT_DIRNAME}/common

cd ${PROJECT_DIRNAME}
nvm install
rm -rf node_modules
npm install -g @dotenvx/dotenvx

cd ${COMMON_DIRNAME}
nvm install
rm -rf node_modules

cd ${FRONTEND_DIRNAME}/web
nvm install
rm -rf node_modules

cd ${BACKEND_DIRNAME}/api
nvm install
rm -rf node_modules
npm run ncs:down

cd ${BACKEND_DIRNAME}/batch
nvm install
rm -rf node_modules
npm run ncs:down

cd ${BACKEND_DIRNAME}/db
nvm install
rm -rf node_modules
npm clean-install
npm run prisma:generate
npm run ncs:down
npm run ncs:migrate
npm run ncs:up

cd ${BACKEND_DIRNAME}/batch
npm run ncs:up

cd ${BACKEND_DIRNAME}/api
npm run ncs:up
