#! /usr/bin/env bash

set -euxo pipefail

mariadb -u root -p${MARIADB_ROOT_PASSWORD} \
        -e "GRANT CREATE, ALTER, DROP, REFERENCES, INDEX ON *.* TO ${MARIADB_USER};"
