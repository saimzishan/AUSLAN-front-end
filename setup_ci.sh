#!/usr/bin/env bash
set -x #echo on
set -eo pipefail
apt-get update
apt-get --only-upgrade install google-chrome-stable
export CHROME_BIN=$(which google-chrome)
service postgresql restart
gem install bundler
git clone  --depth 1 --branch md-add-service-type-booking --verbose git@bitbucket.org:curvetomorrow/booking-system-api.git ../booking-system-api
cd ../booking-system-api
bundle install --path vendor/cache
bundle exec rake db:drop
bundle exec rake db:create
bundle exec rake db:migrate
nohup bundle exec rails s -b 0.0.0.0 > rails_server.log 2>&1 &
nohup bundle exec rake jobs:work > worker.log 2>&1 &
sleep 5
ps -ef | grep "puma"
cd ../booking-system-frontend
