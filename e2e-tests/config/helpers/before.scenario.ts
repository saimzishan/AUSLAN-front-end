import {defineSupportCode, HookScenarioResult} from 'cucumber';
import {Heroku, User} from '../../helper';


interface World {
    'attach': ((arg1: string | Buffer, arg2: string) => void);
}

let first_run = false;
defineSupportCode(({Before}) => {
    Before(function (scenario: HookScenarioResult) {
        console.log('Inside Before Scenario');

        if (!first_run) {
            Heroku.sendCommandToHeroku('Assignment.destroy_all;Booking.destroy_all;MessageThread.destroy_all;User.destroy_all;Delayed::Job.destroy_all');
        }

        let all_personas = ['Booking Officer', 'Administrator', 'Accountant', 'Interpreter',
            'Interpreter1', 'Interpreter2', 'Individual Client', 'Organisational Representative'];
        let personas = [];
        all_personas.forEach((pn) => {
            if (scenario.scenario.name.toUpperCase().indexOf(pn.toUpperCase()) >= 0) {
                if (scenario.scenario.name.toUpperCase().indexOf(('unverified ' + pn).toUpperCase()) < 0) {
                    personas.push(pn);
                }
            }
        });

        for (let pn of personas) {
            console.log('Adding Verified User', pn);
            let currentlyLoggedInUser = User.returnTypeAndUser(pn).user;
            Heroku.addVerifiedUser(currentlyLoggedInUser, pn);
        }

        if (scenario.scenario.name.toUpperCase().indexOf('booking is created'.toUpperCase()) >= 0) {
            let currentlyLoggedInUser = User.returnTypeAndUser('Individual Client').user;
            Heroku.addVerifiedUser(currentlyLoggedInUser, 'Individual Client');
            Heroku.createSingleBooking();
        }

        if (scenario.scenario.name.toUpperCase().indexOf('a booking with two Interpreters is created'.toUpperCase()) >= 0) {
            let currentlyLoggedInUser = User.returnTypeAndUser('Individual Client').user;
            Heroku.addVerifiedUser(currentlyLoggedInUser, 'Individual Client');
            Heroku.createSingleBookingWithMoreInterpreter();
        }

        if (scenario.scenario.name.toUpperCase().indexOf('Interpreter Invited'.toUpperCase()) >= 0) {
            Heroku.inviteInterpreter();
        }

        if (scenario.scenario.name.toUpperCase().indexOf('Interpreter_ALL Invited'.toUpperCase()) >= 0) {
            Heroku.inviteAllInterpreter();
        }

        if (scenario.scenario.name.toUpperCase().indexOf('Special'.toUpperCase()) >= 0) {
            Heroku.specialOrgRepSetup();
        }

        const createUnverifiedUser = scenario.scenario.name.match(/unverified\s(Interpreter|Organisational Representative)/);

        if (createUnverifiedUser) {
            console.log(`Adding UnVerified ${createUnverifiedUser[1]}`);
            let currentlyLoggedInUser = User.returnTypeAndUser(createUnverifiedUser[1]).user;
            Heroku.createUser(currentlyLoggedInUser, createUnverifiedUser[1]);
        }
        first_run = true;
    });
});
