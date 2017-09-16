#!/usr/bin/env bash
set -x #echo on
set -eo pipefail
export CHROME_BIN=$(which google-chrome)
service postgresql restart
gem install bundler
#ssh-agent bash -c 'ssh-add ~/.ssh/id_rsa.pub; git clone git@bitbucket.org:curvetomorrow/booking-system-api.git ../booking-system-api'
git clone  --verbose git@bitbucket.org:curvetomorrow/booking-system-api.git ../booking-system-api
cd ../booking-system-api
bundle install --path vendor/cache
bundle exec rake db:migrate
nohup bundle exec rails s -b 0.0.0.0 > rails_server.log 2>&1 &
sleep 5
ps -ef | grep "puma"
cd ../booking-system-frontend
sleep 1
npm install codeclimate-test-reporter -g
sleep 1
npm install