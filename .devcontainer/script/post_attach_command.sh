#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive

docker container exec -it ollama ollama pull qwen3-coder
cp -rfv config.yaml ${HOME}/.continue

wget https://github.com/fastfetch-cli/fastfetch/releases/download/2.52.0/fastfetch-linux-amd64.deb
apt install -y ./fastfetch-linux-amd64.deb
rm -rf ./fastfetch-linux-amd64.deb

fastfetch
