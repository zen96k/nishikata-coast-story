#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive

SCRIPT_DIRNAME=$(cd $(dirname ${0}) && pwd)
PROJECT_DIRNAME=$(cd ${SCRIPT_DIRNAME}/../.. && pwd)

cd ${PROJECT_DIRNAME}

apt update && apt full-upgrade -y

apt update && apt install -y curl wget \
                             git \
                             netcat-traditional \
                             zip unzip \
                             rsync \
                             tzdata
ln -snf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

apt update && apt install -y zsh
chsh -s $(which zsh)
sh -c "$(curl -fsSL https://install.ohmyz.sh)" "" --unattended
cp -rfv .zshrc ${HOME}
npm completion >> ${HOME}/.zshrc

LAZYGIT_VERSION=$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | \grep -Po '"tag_name": *"v\K[^"]*')
curl -Lo lazygit.tar.gz "https://github.com/jesseduffield/lazygit/releases/download/v${LAZYGIT_VERSION}/lazygit_${LAZYGIT_VERSION}_Linux_x86_64.tar.gz"
tar xf lazygit.tar.gz lazygit
install lazygit -D -t /usr/local/bin/
rm -rf lazygit.tar.gz lazygit

wget https://github.com/fastfetch-cli/fastfetch/releases/latest/download/fastfetch-linux-amd64.deb
apt install -y ./fastfetch-linux-amd64.deb
rm -rf fastfetch-linux-amd64.deb

npm install -g @aikidosec/safe-chain \
               @dotenvx/dotenvx
safe-chain setup
