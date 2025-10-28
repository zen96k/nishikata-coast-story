#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive

SCRIPT_DIRNAME=$(cd $(dirname ${0}) && pwd)
PROJECT_DIRNAME=$(cd ${SCRIPT_DIRNAME}/.. && pwd)

FRONTEND_DIRNAME=${PROJECT_DIRNAME}/frontend
BACKEND_DIRNAME=${PROJECT_DIRNAME}/backend
COMMON_DIRNAME=${PROJECT_DIRNAME}/common

cd ${COMMON_DIRNAME}
dotenvx encrypt -fk .env.keys \
                -f ${FRONTEND_DIRNAME}/web/*.env \
                -f ${BACKEND_DIRNAME}/api/*.env \
                -f ${BACKEND_DIRNAME}/batch/*.env \
                -f ${BACKEND_DIRNAME}/db/*.env
