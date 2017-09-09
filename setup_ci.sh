#!/usr/bin/env bash
set -x #echo on
set -eo pipefail
export CHROME_BIN=$(which google-chrome)
gem install bundler
mkdir ../bookin-system-api
#ssh-agent bash -c 'ssh-add ~/.ssh/id_rsa.pub; git clone git@bitbucket.org:curvetomorrow/booking-system-api.git ../booking-system-api'
git clone  --verbose git@bitbucket.org:curvetomorrow/booking-system-api.git ../bookin-system-api
cd ../booking-system-api
bundle install --path vendor/cache
service postgresql restart
nohup rails s > rails_server.log 2>&1 &
sleep 5
ps -ef | grep "puma"
cd ../booking-system-frontend
npm install codeclimate-test-reporter -g
npm install
./run-e2e-test.sh
./run-unit-test.sh
#mv test-results /usr/src/tmp/