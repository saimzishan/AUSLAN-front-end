#!/usr/bin/env bash
set -x #echo on
export CHROME_BIN=$(which google-chrome)
gem install bundler
git clone git@bitbucket.org:curvetomorrow/booking-system-api.git ../booking-system-api
cd ../booking-system-api
bundle install --path vendor/cache
bundle exec rake db:migrate
spring stop
service postgresql restart
nohup rails s -b 0.0.0.0 > rails_server.log 2>&1 &
sleep 5
ps -ef | grep "puma"
cd ../booking-system-frontend
npm install codeclimate-test-reporter -g
npm install
set -eo pipefail
./run-e2e-test.sh
./run-unit-test.sh
#mv test-results /usr/src/tmp/
