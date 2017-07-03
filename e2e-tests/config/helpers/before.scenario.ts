import { defineSupportCode, HookScenarioResult, } from 'cucumber';
import * as path from 'path';
import { browser } from 'protractor';
import { WriteStream, ensureDirSync, createWriteStream } from 'fs-extra';
import {log} from "util";


interface World {
    'attach': ((arg1: string | Buffer, arg2: string) => void);
}

defineSupportCode(({Before}) => {
    Before(function (scenarioResult: HookScenarioResult) {

        // const exec = require('child_process').execSync;
        // function puts(error, stdout, stderr) { console.log(stdout); }
        // const preloadAdmin = preloadUser('Booking Officer', 'mohjay_officer@auslan.com.au', 'Abcd#1234', 'MOH', 'JAY', '123123123', true);
        // console.log(preloadAdmin);
        // exec('echo \'' + preloadAdmin + '; exit\' | heroku run console --app auslan-e2e-testing', puts);
        // exec('echo \'a = Administrator.create({email: "heuism@auslan.com.au", password: "Abcd#1234", first_name: "MOH", last_name: "JAY", mobile: "123123123"}); a.verified = true; a.save; exit\' | heroku run console --app auslan-e2e-testing', puts);
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
