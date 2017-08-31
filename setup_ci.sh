gem install bundler
git clone git@bitbucket.org:curvetomorrow/booking-system-api.git ../booking-system-api
cd ../booking-system-api 
bundle install
service postgresql restart
nohup rails s > rails_server.log 2>&1 &
sleep 10
ps -ef | grep "puma"
cd ../booking-system-frontend
npm install codeclimate-test-reporter -g
npm install
sh run-unit-test.sh
sh run-e2e-test.sh

