#! /usr/bin/env bash

set -euxo pipefail

docker container exec -it ollama ollama pull deepseek-coder-v2
cp -rfv config.yaml ${HOME}/.continue

fastfetch
