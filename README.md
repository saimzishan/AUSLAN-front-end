# AUSLAN BOOKING SYSTEM - FRONTEND

[![CircleCI](https://circleci.com/bb/curvetomorrow/booking-system-frontend/tree/master.svg?style=svg)](https://circleci.com/bb/curvetomorrow/booking-system-frontend/tree/master)
[![Code Climate](https://codeclimate.com/repos/5858b42d43c09c72c3000c29/badges/c9005dc4d8c9a34aaa8d/gpa.svg)](https://codeclimate.com/repos/5858b42d43c09c72c3000c29/feed)
[![Test Coverage](https://codeclimate.com/repos/5858b42d43c09c72c3000c29/badges/c9005dc4d8c9a34aaa8d/coverage.svg)](https://codeclimate.com/repos/5858b42d43c09c72c3000c29/coverage)
[![Issue Count](https://codeclimate.com/repos/5858b42d43c09c72c3000c29/badges/c9005dc4d8c9a34aaa8d/issue_count.svg)](https://codeclimate.com/repos/5858b42d43c09c72c3000c29/feed)

##LAZYLOADING && ANGULAR_CLI VERSION DEPENDENCY
The project is migrated to @angular/cli release 1.
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
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
