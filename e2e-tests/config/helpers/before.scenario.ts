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
            Heroku.sendCommandToHeroku('Assignment.destroy_all;Booking.destroy_all;User.destroy_all;Delayed::Job.destroy_all');
        }

        let all_personas = ['Booking Officer', 'Administrator', 'Accountant', 'Interpreter',
            'Interpreter1', 'Interpreter2', 'Individual Client', 'Organisational Representative'];
        const personas = [];
        const herokuCommandsToRun = [];
        const herokuMethodsethodsToRun = [];
        all_personas.forEach((pn) => {
            if (scenario.scenario.name.toUpperCase().indexOf(pn.toUpperCase()) >= 0) {
                if (scenario.scenario.name.toUpperCase().indexOf(('unverified ' + pn).toUpperCase()) < 0) {
                    personas.push(pn);
                }
            }
        });

        for (let pn of personas) {
            const currentlyLoggedInUser = User.returnTypeAndUser(pn).user;
            herokuCommandsToRun.push(Heroku.getCommandForVerifiedUser(pn, currentlyLoggedInUser));
        }


        if (scenario.scenario.name.toUpperCase().indexOf('booking is created'.toUpperCase()) >= 0) {
            const currentlyLoggedInUser = User.returnTypeAndUser('Individual Client').user;
            herokuCommandsToRun.push(Heroku.getCommandForVerifiedUser('Individual Client', currentlyLoggedInUser));
            herokuMethodsethodsToRun.push('createSingleBooking');
        }

        if (scenario.scenario.name.toUpperCase().indexOf('a booking with two Interpreters is created'.toUpperCase()) >= 0) {
            const currentlyLoggedInUser = User.returnTypeAndUser('Individual Client').user;
            herokuCommandsToRun.push(Heroku.getCommandForVerifiedUser('Individual Client', currentlyLoggedInUser));
            herokuMethodsethodsToRun.push('createSingleBookingWithMoreInterpreter');
        }

        if (scenario.scenario.name.toUpperCase().indexOf('Interpreter Invited'.toUpperCase()) >= 0) {
            herokuMethodsethodsToRun.push('inviteInterpreter');
        }

        if (scenario.scenario.name.toUpperCase().indexOf('Interpreter_ALL Invited'.toUpperCase()) >= 0) {
            herokuMethodsethodsToRun.push('inviteAllInterpreter');
        }

        if (scenario.scenario.name.toUpperCase().indexOf('Special'.toUpperCase()) >= 0) {
            herokuMethodsethodsToRun.push('specialOrgRepSetup');
        }
        if (scenario.scenario.name.toUpperCase().indexOf(('unverified').toUpperCase()) > -1) {
            console.log('Adding UnVerified Interpreter');
            const currentlyLoggedInUser = User.returnTypeAndUser('Interpreter').user;
            const data_to_send = User.returnJSONForUser('Interpreter', 1, currentlyLoggedInUser);
            herokuCommandsToRun.push(Heroku.createSingleUser(data_to_send));
        }

        Heroku.sendCommandToHeroku(herokuCommandsToRun.join(';'));
        for (const callMethod of herokuMethodsethodsToRun) {
            Heroku[callMethod].call(Heroku);
        }

        first_run = true;
    });
});
