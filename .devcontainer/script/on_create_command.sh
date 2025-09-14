#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive

apt update && apt install -y zsh
chsh -s $(which zsh)
sh -c "$(curl -fsSL https://install.ohmyz.sh)" "" --unattended
cp -rfv .zshrc ${HOME}

apt update && apt install -y curl wget \
                             git \
                             zip unzip \
                             rsync \
                             tzdata

wget https://github.com/fastfetch-cli/fastfetch/releases/download/2.52.0/fastfetch-linux-amd64.deb
apt install -y ./fastfetch-linux-amd64.deb
rm -rf ./fastfetch-linux-amd64.deb
