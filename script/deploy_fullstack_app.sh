#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive

SCRIPT_DIRNAME=$(cd $(dirname ${0}) && pwd)
PROJECT_DIRNAME=$(cd ${SCRIPT_DIRNAME}/.. && pwd)

FRONTEND_DIRNAME=${PROJECT_DIRNAME}/frontend
BACKEND_DIRNAME=${PROJECT_DIRNAME}/backend
COMMON_DIRNAME=${PROJECT_DIRNAME}/common

cd ${FRONTEND_DIRNAME}/web
dotenvx run -f compose.prod.env -- docker compose -f compose.prod.yml up -d --pull always --force-recreate -V --wait
