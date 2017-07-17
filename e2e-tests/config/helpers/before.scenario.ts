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
            if (scenario.scenario.name.toUpperCase().indexOf(pn.toUpperCase()) > 0) {
                personas.push(pn);
            }
        });

        if (scenario.scenario.name.toUpperCase().indexOf('booking created'.toUpperCase()) > 0) {
            Heroku.createSingleBooking();
        }

        for (let pn of personas) {
            let currentlyLoggedInUser = User.returnTypeAndUser(pn).user;
            Heroku.addVerifiedUser(currentlyLoggedInUser, pn);
        }
    });
});
