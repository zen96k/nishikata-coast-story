#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive

docker container exec -it ollama ollama pull qwen3
cp -rfv config.yaml ${HOME}/.continue

fastfetch
