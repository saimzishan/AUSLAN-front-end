 # AUSLAN BOOKING SYSTEM - FRONTEND

[![CircleCI](https://circleci.com/bb/curvetomorrow/booking-system-frontend/tree/master.svg?style=svg)](https://circleci.com/bb/curvetomorrow/booking-system-frontend/tree/master)
[![Code Climate](https://codeclimate.com/repos/5858b42d43c09c72c3000c29/badges/c9005dc4d8c9a34aaa8d/gpa.svg)](https://codeclimate.com/repos/5858b42d43c09c72c3000c29/feed)
[![Test Coverage](https://codeclimate.com/repos/5858b42d43c09c72c3000c29/badges/c9005dc4d8c9a34aaa8d/coverage.svg)](https://codeclimate.com/repos/5858b42d43c09c72c3000c29/coverage)
[![Issue Count](https://codeclimate.com/repos/5858b42d43c09c72c3000c29/badges/c9005dc4d8c9a34aaa8d/issue_count.svg)](https://codeclimate.com/repos/5858b42d43c09c72c3000c29/feed)

##LAZYLOADING && ANGULAR_CLI VERSION DEPENDENCY
The project is migrated to @angular/cli release 1.git
#DEPRECIATED
angular-cli@1.0.0-beta.24 has been used due to following issue https://github.com/angular/angular-cli/issues/3662
 `npm install -g angular-cli@1.0.0-beta.24`

 as well as 2.4.0 @angular\compiler version

##PACK DEPENDENCY
Install pack-mock-service by
bower install pact-consumer-js-dsl --save-dev

Start pack-mock-service
bundle exec pact-mock-service -p 1234 --pact-specification-version 2.0.0 -l log/pact.logs --pact-dir tmp/pacts

Stop pack-mock-service
bundle exec pact-mock-service stop -p 1234

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.22-1.

## Development server

   1. `ng serve --env=localhost`
       * Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
   1. `ng serve --env=stage` - Uses the canary environment (nightly build). Note: it doesn't point to stage.

## Running unit tests

   1. `ng test`

## Running end-to-end tests

Check docker instructions. Just run them locally in your terminal


## Use Docker to run server

   1. Install docker
        * Unix - (https://runnable.com/docker/install-docker-on-linux)
        * Mac - Install Docker for Mac
   1. Login with your dockerhub account
        * Create account
        * Ask team member to add you to CurveTomorrow dockerhub group to get access to image
   1. Run docker and get a bash terminal
        * `docker run -i -t --rm -p 4200:4200 -v path/to/booking-system-frontend:/usr/src/app curvetomorrow/auslan-dev-image:v7.8 /bin/bash -l`
   1. Install gems
        * `bundle install`
   1. NPM install
        * `npm install`
   1. Run server for access to localhost
        * `ng serve --env=localhost --host=0.0.0.0`
        * the port is required if you want server to be accessible to the host
   1. Follow the README.md on the booking-system-api to launch the localhost API server in another terminal window

## Use Docker to run Unit tests

   1. Run docker and get a bash terminal
        * `docker run -i -t --rm -v path/to/booking-system-frontend:/usr/src/app curvetomorrow/auslan-dev-image:v7.8 /bin/bash -l`
   1. Install gems
        * `bundle install`
   1. Download and run the latest rails server
        * `./setup_ci.sh`
   1. Create the input file with all files to test
        * `ls -d -1 e2e-tests/features/* > test_features_for_split_container.txt`
   1. Run the ui tests
        * `ng test --browser Chrome_without_security`

## Use Docker to run E2E tests

Change into the project directory and run the following commands
   1. Run docker and get a bash terminal
        * `docker run -i -t --rm -v "$PWD":/usr/src/booking-system-frontend curvetomorrow/auslan-dev-image:v7.8 /bin/bash -l`
   2. Install gems
        * `bundle install`
   3. Download and run the latest rails server
        * `./setup_ci.sh`
   4. Create the input file with all files to test
        * `ls -d -1 e2e-tests/features/* > test_features_for_split_container.txt`
   5. Run the e2e tests
        * `./run-e2e-test.sh`

## Deploy to prod
   1. `ng build --aot --env=prod`
   2. `aws s3 sync dist/  s3://auslan.deafservicesqld.org.au/ --delete --cache-control max-age=60 --acl public-read`
