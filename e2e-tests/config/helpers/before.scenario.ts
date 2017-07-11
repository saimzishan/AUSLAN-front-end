import { defineSupportCode, HookScenarioResult, } from 'cucumber';
import * as path from 'path';
import { browser } from 'protractor';
import { WriteStream, ensureDirSync, createWriteStream } from 'fs-extra';
import {log} from "util";
import {exec} from 'child_process';


interface World {
    'attach': ((arg1: string | Buffer, arg2: string) => void);
}

defineSupportCode(({Before}) => {
    Before(function (scenarioResult: HookScenarioResult) {

  });

    function preloadUser(type: string, email: string, password: string, firstname: string, lastname: string, mobile, verified: boolean) {
        let return_command = '';
        let userType = user_type(type);
        return_command += 'a = ' + userType + '.create({email: "' + email + '", password: "' + password + '", ' +
                        'first_name: "' + firstname + '", last_name: "' + lastname + '", ' +
                        'mobile: "' + mobile + '"});';
        if (verified) {
            return_command += ' a.verified = true;';
        }

        return_command += ' a.save';

        return return_command;
    }

    function user_type(type: string) {
        let chosen_type = '';
        switch (type) {
            case 'Administrator':
                chosen_type = 'Administrator';
                break;
            case 'Booking Officer':
                chosen_type = 'BookingOfficer';
                break;
            case 'Interpreter':
                chosen_type = 'Interpreter';
                break;
            case 'Client':
                chosen_type = 'IndividualClient';
                break;
            case 'Organisational Representative':
                chosen_type = 'OrganisationalRepresentative';
                break;
        }
        return chosen_type;
    }
});
