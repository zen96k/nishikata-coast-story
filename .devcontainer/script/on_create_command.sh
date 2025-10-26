#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive

apt update && apt full-upgrade -y

apt update && apt install -y zsh
chsh -s $(which zsh)
sh -c "$(curl -fsSL https://install.ohmyz.sh)" "" --unattended
cp -rfv .zshrc ${HOME}
npm completion >> ${HOME}/.zshrc

curl -sfS https://dotenvx.sh | sh

apt update && apt install -y curl wget \
                             git \
                             netcat-traditional \
                             zip unzip \
                             rsync \
                             tzdata
ln -snf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

npm install -g @aikidosec/safe-chain
safe-chain setup
