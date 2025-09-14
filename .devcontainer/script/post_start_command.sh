#! /usr/bin/env bash

set -euxo pipefail

# FRONTEND_DIRNAME=$(pwd)/frontend
# BACKEND_DIRNAME=$(pwd)/backend

docker system prune -af --volumes
docker compose up -d

rm -rf ${HOME}/.gitconfig
git config --global init.defaultBranch ${GIT_INIT_DEFAULT_BRANCH}
git config --global user.name ${GIT_USER_NAME}
git config --global user.email ${GIT_USER_EMAIL}

npm install -g npm-check-updates
