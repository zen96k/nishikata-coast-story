#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive

docker container exec ncs-ollama ollama pull qwen3-coder
cp -rfv config.yaml ${HOME}/.continue

wget https://github.com/fastfetch-cli/fastfetch/releases/latest/download/fastfetch-linux-amd64.deb
apt install -y ./fastfetch-linux-amd64.deb
rm -rf fastfetch-linux-amd64.deb

apt update && apt full-upgrade -y

fastfetch
