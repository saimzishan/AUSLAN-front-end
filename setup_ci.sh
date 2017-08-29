gem install bundler
git clone git@bitbucket.org:curvetomorrow/booking-system-api.git ../booking-system-api
cd ../booking-system-api 
bundle install
service postgresql restart
bundle exec rake -T
nohup rails s > rails_server.log 2>&1 &
sleep 10
ps -ef | grep "puma"
