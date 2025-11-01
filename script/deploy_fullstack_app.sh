#! /usr/bin/env bash

set -euxo pipefail
source ${HOME}/.bashrc

export DEBIAN_FRONTEND=noninteractive

SCRIPT_DIRNAME=$(cd $(dirname ${0}) && pwd)
PROJECT_DIRNAME=$(cd ${SCRIPT_DIRNAME}/.. && pwd)

FRONTEND_DIRNAME=${PROJECT_DIRNAME}/frontend
BACKEND_DIRNAME=${PROJECT_DIRNAME}/backend
COMMON_DIRNAME=${PROJECT_DIRNAME}/common

cd ${PROJECT_DIRNAME}
git pull
nvm install
npm install -g @dotenvx/dotenvx

cd ${BACKEND_DIRNAME}/db
nvm install
npm install && npm run prisma:generate
npm run ncs:migrate
