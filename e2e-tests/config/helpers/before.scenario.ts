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
        // if (scenario.scenario.name === 'As Booking Officer, I can login/logout') {
            Heroku.createSingleBooking();
            let type = 'Booking Officer';
            let currentlyLoggedInUser = User.returnTypeAndUser(type).user;
            Heroku.addValidLoginUser(currentlyLoggedInUser, type);
        // }
    });
});
