#! /usr/bin/env bash

set -euxo pipefail

SCRIPT_DIRNAME=$(cd $(dirname ${0}) && pwd)
PROJECT_DIRNAME=$(cd ${SCRIPT_DIRNAME}/.. && pwd)

FRONTEND_DIRNAME=$(cd ${PROJECT_DIRNAME}/frontend && pwd)
BACKEND_DIRNAME=$(cd ${PROJECT_DIRNAME}/backend && pwd)

cd ${BACKEND_DIRNAME}
bash -E script/deploy.sh
