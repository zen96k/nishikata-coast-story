#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive

SCRIPT_DIRNAME=$(cd $(dirname ${0}) && pwd)
PROJECT_DIRNAME=$(cd ${SCRIPT_DIRNAME}/../.. && pwd)

cd ${PROJECT_DIRNAME}

bash script/encrypt_environment_variables.sh

docker container exec ncs-ollama ollama pull gemma3
cp -rfv config.yaml ${HOME}/.continue

npx lefthook install

apt update && apt full-upgrade -y

fastfetch
