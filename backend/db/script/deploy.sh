#! /usr/bin/env bash

set -euxo pipefail

SCRIPT_DIRNAME=$(cd $(dirname ${0}) && pwd)
PROJECT_DIRNAME=$(cd ${SCRIPT_DIRNAME}/.. && pwd)

cd ${PROJECT_DIRNAME}

docker container run -it \
                     --rm \
                     -v $(pwd):/app \
                     dotenv/dotenvx \
                     dotenvx run -f compose.${NCS_ENV}.env -- \
                     docker compose -f compose.migrate.yml up -d --pull always --force-recreate -V --wait
