#!/usr/bin/env bash
set -x #echo on
gem install bundler
npm install
rm -rf dist
ng build --aot --env=canary
