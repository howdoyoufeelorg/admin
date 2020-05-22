#!/usr/bin/env ash
#
# Activate the dev server
cd /app
yarn build
yarn prestart
yarn start
