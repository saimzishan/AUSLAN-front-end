gem install bundler
git clone git@bitbucket.org:curvetomorrow/booking-system-api.git ../booking-system-api
cd ../booking-system-api 
bundle install
service postgresql restart
nohup rails s > rails_server.log 2>&1 &
sleep 10
ps -ef | grep "puma"
cd ../booking-system-frontend
npm install
sh run-test.sh
