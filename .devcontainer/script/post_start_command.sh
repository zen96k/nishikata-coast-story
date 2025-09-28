#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive
FRONTEND_DIRNAME=$(pwd)/frontend
BACKEND_DIRNAME=$(pwd)/backend

apt update && apt install -y curl wget \
                             git \
                             zip unzip \
                             rsync \
                             tzdata

rm -rf ${HOME}/.gitconfig
git config --global init.defaultBranch ${GIT_INIT_DEFAULT_BRANCH}
git config --global user.name ${GIT_USER_NAME}
git config --global user.email ${GIT_USER_EMAIL}

docker system prune -af --volumes
docker compose up -d

cd ${FRONTEND_DIRNAME}/web
rm -rf .output .data .nuxt .nitro .cache dist
npm install
cd ${BACKEND_DIRNAME}/api
npm install
cd ${BACKEND_DIRNAME}/batch
npm install
cd ${BACKEND_DIRNAME}/db
rm -rf type
npm install && npm run dev
