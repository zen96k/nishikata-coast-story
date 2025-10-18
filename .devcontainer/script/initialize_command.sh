#! /usr/bin/env bash

set -euxo pipefail

mkdir -p volume/devcontainer/root/.vscode-server/extensions
rm -rf volume/devcontainer/root/.vscode-server/extensions/extensions.json
