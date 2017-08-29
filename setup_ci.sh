export RAILS_ROOT=/var/www/app
mkdir -p $RAILS_ROOT/tmp/pids
gem install bundler
git clone git@bitbucket.org:curvetomorrow/booking-system-api.git ../booking-system-api
cd ../booking-system-api 
bundle install
service postgresql restart
nohup rails s > rails_server.log 2>ouput & sleep 1
ps -ef | grep "puma"
cd ../booking-system-frontend
npm install
sh run-test.sh

