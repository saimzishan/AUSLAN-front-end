import {defineSupportCode, HookScenarioResult} from 'cucumber';
import * as path from 'path';
import {browser} from 'protractor';
import {WriteStream, ensureDirSync, createWriteStream} from 'fs-extra';
import {log} from 'util';
import {exec} from 'child_process';
import {Heroku, User} from '../../helper';


interface World {
    'attach': ((arg1: string | Buffer, arg2: string) => void);
}
let first_run = false;
defineSupportCode(({Before}) => {
    Before(function (scenario: any) {
        console.log('Inside Before Scenario');
        if (!first_run) {
            Heroku.sendCommandToHeroku('Assignment.destroy_all');
            Heroku.sendCommandToHeroku('Booking.destroy_all');
            Heroku.sendCommandToHeroku('User.destroy_all');
        }

        let all_personas = ['Booking Officer', 'Administrator', 'Accountant', 'Interpreter',
            'Interpreter1', 'Interpreter2', 'Individual Client', 'Organisational Representative'];
        let personas = [];
        all_personas.forEach((pn) => {
            if (scenario.pickle.name.toUpperCase().indexOf(pn.toUpperCase()) >= 0) {
                if (scenario.pickle.name.toUpperCase().indexOf(('unverified ' + pn).toUpperCase()) < 0) {
                        personas.push(pn);
                }
            }
        });

        for (let pn of personas) {
            console.log('Adding Verified User', pn);
            let currentlyLoggedInUser = User.returnTypeAndUser(pn).user;
            Heroku.addVerifiedUser(currentlyLoggedInUser, pn);
        }

        if (scenario.pickle.name.toUpperCase().indexOf('booking is created'.toUpperCase()) >= 0) {
            let currentlyLoggedInUser = User.returnTypeAndUser('Individual Client').user;
            Heroku.addVerifiedUser(currentlyLoggedInUser, 'Individual Client');
            Heroku.createSingleBooking();
        }

        if (scenario.pickle.name.toUpperCase().indexOf('a booking with two Interpreters is created'.toUpperCase()) >= 0) {
            let currentlyLoggedInUser = User.returnTypeAndUser('Individual Client').user;
            Heroku.addVerifiedUser(currentlyLoggedInUser, 'Individual Client');
            Heroku.createSingleBookingWithMoreInterpreter();
        }

        if (scenario.pickle.name.toUpperCase().indexOf('Interpreter Invited'.toUpperCase()) >= 0) {
            Heroku.inviteInterpreter();
        }

        if (scenario.pickle.name.toUpperCase().indexOf('Interpreter_ALL Invited'.toUpperCase()) >= 0) {
            Heroku.inviteAllInterpreter();
        }

        if (scenario.pickle.name.toUpperCase().indexOf('Special'.toUpperCase()) >= 0) {
            Heroku.specialOrgRepSetup();
        }
        if (false === scenario.pickle.name.toUpperCase().indexOf(('unverified').toUpperCase()) < 0) {
            console.log('Adding UnVerified Interpreter');
            let currentlyLoggedInUser = User.returnTypeAndUser('Interpreter').user;
            Heroku.createUser(currentlyLoggedInUser, 'Interpreter');
        }
        first_run = true;
    });
});
