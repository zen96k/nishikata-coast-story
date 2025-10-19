#! /usr/bin/env bash

set -euxo pipefail

SCRIPT_DIRNAME=$(cd $(dirname ${0}) && pwd)
PROJECT_DIRNAME=$(cd ${SCRIPT_DIRNAME}/.. && pwd)

cd ${PROJECT_DIRNAME}

docker container run -it \
                     --rm \
                     -v $(pwd):/app \
                     -v $(pwd)/.env.keys:/app/.env.keys \
                     dotenv/dotenvx run -f compose.${NCS_ENV}.env -- \
                     docker --version
