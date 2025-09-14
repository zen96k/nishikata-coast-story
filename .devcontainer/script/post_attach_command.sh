#! /usr/bin/env bash

set -euxo pipefail

docker container exec -it ollama ollama pull qwen2.5-coder
cp -rfv config.yaml ${HOME}/.continue

fastfetch
