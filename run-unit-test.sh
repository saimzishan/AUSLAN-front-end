#!/usr/bin/env bash
set -x #echo on
set -eo pipefail
bundle install
ng lint
rm -rf tmp
rm -rf .tmp
mkdir -p .tmp/junit
mkdir -p .tmp/cucumber
npm run circle-test
#codeclimate-test-reporter .tmp/junit/lcov.info
