#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive

docker container exec ncs-ollama ollama pull qwen3-coder
cp -rfv config.yaml ${HOME}/.continue

bash script/encrypt_value.sh

apt update && apt full-upgrade -y

fastfetch
