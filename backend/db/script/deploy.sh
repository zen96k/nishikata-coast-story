#! /usr/bin/env bash

set -euxo pipefail

SCRIPT_DIRNAME=$(cd $(dirname ${0}) && pwd)
PROJECT_DIRNAME=$(cd ${SCRIPT_DIRNAME}/.. && pwd)

cd ${PROJECT_DIRNAME}

dotenvx run -f compose.${NCS_ENV}.env -- docker compose -f compose.migrate.yml up --pull always --force-recreate -V --wait --wait-timeout 120
