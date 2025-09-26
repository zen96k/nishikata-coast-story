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
docker container exec -it ollama ollama pull qwen3-coder
cp -rfv config.yaml ${HOME}/.continue

npm install -g @aikidosec/safe-chain npm-check-updates
safe-chain setup

cd ${FRONTEND_DIRNAME}/web
npm install
cd ${BACKEND_DIRNAME}/db
npm install && npm run generate
cd ${BACKEND_DIRNAME}/batch
npm install

wget https://github.com/fastfetch-cli/fastfetch/releases/download/2.52.0/fastfetch-linux-amd64.deb
apt install -y ./fastfetch-linux-amd64.deb
rm -rf ./fastfetch-linux-amd64.deb

fastfetch
