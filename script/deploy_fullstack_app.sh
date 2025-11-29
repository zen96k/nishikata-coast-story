#! /usr/bin/env bash

set -euxo pipefail
source ${HOME}/.nvm/nvm.sh

export DEBIAN_FRONTEND=noninteractive

SCRIPT_DIRNAME=$(cd $(dirname ${0}) && pwd)
PROJECT_DIRNAME=$(cd ${SCRIPT_DIRNAME}/.. && pwd)

FRONTEND_DIRNAME=${PROJECT_DIRNAME}/frontend
BACKEND_DIRNAME=${PROJECT_DIRNAME}/backend

cd ${PROJECT_DIRNAME}
nvm install
rm -rf node_modules
npm install -g @dotenvx/dotenvx

cd ${FRONTEND_DIRNAME}/web
npm run ncs:down

cd ${BACKEND_DIRNAME}/api
npm run ncs:down

cd ${BACKEND_DIRNAME}/batch
npm run ncs:down

cd ${BACKEND_DIRNAME}/db
npm run ncs:down
rm -rf node_modules type
npm clean-install
npm run prisma:generate
npm run ncs:migrate
npm run ncs:up

cd ${BACKEND_DIRNAME}/batch
rm -rf node_modules type
npm run ncs:up

cd ${BACKEND_DIRNAME}/api
rm -rf node_modules type
npm run ncs:up

cd ${FRONTEND_DIRNAME}/web
rm -rf .output .data .nuxt .nitro .cache dist
rm -rf node_modules type
# npm clean-install
# npm run nuxt:build
# npm run ncs:up

docker system prune -af --volumes
