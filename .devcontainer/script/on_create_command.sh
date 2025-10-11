#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive

apt update && apt install -y zsh
chsh -s $(which zsh)
sh -c "$(curl -fsSL https://install.ohmyz.sh)" "" --unattended
cp -rfv .zshrc ${HOME}
npm completion >> ${HOME}/.zshrc

npm install -g @aikidosec/safe-chain
safe-chain setup
