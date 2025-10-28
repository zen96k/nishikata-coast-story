#! /usr/bin/env bash

set -euxo pipefail

mariadb -u root -p${MARIADB_ROOT_PASSWORD} \
        -e "GRANT ALL PRIVILEGES ON *.* TO ${MARIADB_USER};"
