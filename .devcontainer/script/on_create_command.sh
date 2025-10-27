#! /usr/bin/env bash

set -euxo pipefail

export DEBIAN_FRONTEND=noninteractive

SCRIPT_DIRNAME=$(cd $(dirname ${0}) && pwd)
PROJECT_DIRNAME=$(cd ${SCRIPT_DIRNAME}/../.. && pwd)

cd ${PROJECT_DIRNAME}

apt update && apt full-upgrade -y

apt update && apt install -y zsh
chsh -s $(which zsh)
sh -c "$(curl -fsSL https://install.ohmyz.sh)" "" --unattended
cp -rfv .zshrc ${HOME}

curl -sfS https://dotenvx.sh | sh

apt update && apt install -y curl wget \
                             git \
                             netcat-traditional \
                             zip unzip \
                             rsync \
                             tzdata
ln -snf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

wget https://github.com/fastfetch-cli/fastfetch/releases/latest/download/fastfetch-linux-amd64.deb
apt install -y ./fastfetch-linux-amd64.deb
rm -rf fastfetch-linux-amd64.deb

npm install -g @aikidosec/safe-chain
safe-chain setup

git clone https://github.com/gitleaks/gitleaks.git
cd gitleaks
make build
mv gitleaks /usr/local/bin
cd ${PROJECT_DIRNAME}
rm -rf gitleaks
