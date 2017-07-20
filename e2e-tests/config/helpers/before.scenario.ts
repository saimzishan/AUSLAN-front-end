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

defineSupportCode(({Before}) => {
    Before(function (scenario: HookScenarioResult) {

        let all_personas = ['Booking Officer', 'Administrator', 'Interpreter', 'Individual Client', 'Organisational Representative'];
        let personas = [];
        all_personas.forEach((pn) => {
            if (scenario.scenario.name.toUpperCase().indexOf(pn.toUpperCase()) >= 0) {
                // if (scenario.scenario.name.toUpperCase().indexOf('unverified'.toUpperCase()) >= 0 ) {
                // console.log(pn);
                /*
                if (pn === 'Interpreter') {
                    // console.log('unverified');
                } else {
                    personas.push(pn);
                }
            } else {*/
                personas.push(pn);
                // }
            }
        });

        /*         if (!(personas.indexOf('Administrator') >= 0)) {
                    personas.unshift('Administrator');
                }

            */
        for (let pn of personas) {
            console.log(pn)
            let currentlyLoggedInUser = User.returnTypeAndUser(pn).user;
            Heroku.addVerifiedUser(currentlyLoggedInUser, pn);

        }

        if (scenario.scenario.name.toUpperCase().indexOf('a booking is created'.toUpperCase()) > 0) {
            Heroku.createSingleBooking();
        }

        if (scenario.scenario.name.toUpperCase().indexOf('INTERPRETER Invited'.toUpperCase()) > 0) {
            Heroku.inviteInterpreter();
        }
        /*
                if (scenario.scenario.name.toUpperCase().indexOf('unverified'.toUpperCase()) > 0 ) {
                    let currentlyLoggedInUser = User.returnTypeAndUser('Interpreter').user;
                    Heroku.createUser(currentlyLoggedInUser, 'Interpreter');
                }
        */
    });
});
