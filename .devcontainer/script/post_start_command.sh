#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive
FRONTEND_DIRNAME=$(pwd)/frontend
COMMON_DIRNAME=$(pwd)/common
BACKEND_DIRNAME=$(pwd)/backend

apt update && apt install -y curl wget \
                             git \
                             zip unzip \
                             rsync \
                             tzdata

rm -rf ${HOME}/.gitconfig
git config --global init.defaultBranch ${GIT_DEFAULT_BRANCH}
git config --global user.name ${GIT_USER_NAME}
git config --global user.email ${GIT_USER_EMAIL}

docker system prune -af --volumes
docker compose up -d --pull always

npm install && npm prune

cd ${FRONTEND_DIRNAME}/web
rm -rf .output .data .nuxt .nitro .cache dist
npm run ncu:upgrade && npm prune

cd ${COMMON_DIRNAME}
npm install && npm prune

cd ${BACKEND_DIRNAME}/batch
npm install && npm prune
cd ${BACKEND_DIRNAME}/db
npm install && npm prune && npm run mariadb:up
