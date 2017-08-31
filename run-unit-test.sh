#!/usr/bin/env bash
export CHROME_BIN=$(which google-chrome)
bundle install
ng lint
rm -rf tmp
bundle exec pact-mock-service start -p 1233 -l tmp/booking/pact-booking.log --pact-dir tmp/booking/pacts
bundle exec pact-mock-service start -p 1234 -l tmp/user/pact-user.log --pact-dir tmp/user/pacts
npm run circle-test
npm run pact
bundle exec pact-mock-service stop -p 1233
bundle exec pact-mock-service stop -p 1234
