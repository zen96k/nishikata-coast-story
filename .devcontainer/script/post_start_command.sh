#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive

SCRIPT_DIRNAME=$(cd $(dirname ${0}) && pwd)
PROJECT_DIRNAME=$(cd ${SCRIPT_DIRNAME}/../.. && pwd)

cd ${PROJECT_DIRNAME}

rm -rf ${HOME}/.gitconfig
git config --global init.defaultBranch ${GIT_DEFAULT_BRANCH}
git config --global user.name ${GIT_USER_NAME}
git config --global user.email ${GIT_USER_EMAIL}

docker compose up -d --pull always --force-recreate -V

npm install
npm run prisma:generate --workspaces --if-present
npm run mariadb:up -w backend/db
npm run prisma:migrate:deploy -w backend/db
npm run prisma:db:seed -w backend/db

docker system prune -af --volumes
