#!/usr/bin/env bash
set -x #echo on
set -eo pipefail
export CHROME_BIN=$(which google-chrome)
service postgresql restart
gem install bundler
git clone  --verbose git@bitbucket.org:curvetomorrow/booking-system-api.git ../booking-system-api
cd ../booking-system-api
git checkout 4b969fd7e0fe9906a3d9b522e02e2ee790315ccc
bundle install --path vendor/cache
bundle exec rake db:migrate
nohup bundle exec rails s -b 0.0.0.0 > rails_server.log 2>&1 &
sleep 5
ps -ef | grep "puma"
cd ../booking-system-frontend
