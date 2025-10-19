#! /usr/bin/env bash

set -euxo pipefail

SCRIPT_DIRNAME=$(cd $(dirname ${0}) && pwd)
PROJECT_DIRNAME=$(cd ${SCRIPT_DIRNAME}/.. && pwd)

cd ${PROJECT_DIRNAME}

npm install && npm prune
dotenvx run -f compose.${NCS_ENV}.env -- docker compose -f compose.migrate.yml up -d --pull always --force-recreate -V --wait
dotenvx run -f compose.${NCS_ENV}.env -- PRISMA_DATABASE_URL=mysql://${MARIADB_USER}:${MARIADB_PASSWORD}@localhost:5307/${MARIADB_DATABASE} npm run prisma:migrate:deploy && npm run prisma:db:seed
