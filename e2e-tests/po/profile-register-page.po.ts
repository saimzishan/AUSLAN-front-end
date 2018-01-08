import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {User} from '../helper';
import {NotificationObject} from './notification';

export class ProfileRegisterPage extends PageObject {
    /*
     * The Syntax below is mandatory, for TS to recognize the method from base class
     * All statements are promises in protractor
     * Either wait for them in async method or if method returns the promise
     * use them in expect with eventually
     * The jasmine and cuccumberjs does not work, so use chai.expect with chai-as-promised
     * Look at chai-import.ts for further details
     * */

    showSignupPage = (signupType: string) => {
        return this.currentPath().then((currentPath) => {
            expect(currentPath).to.contain('selectedRole=' + signupType);
        });
    }

    fillAllDataForAdmin = (type: string) => {
        this.fillAllDataForRegister(type, '');
    }
    fillBasicData  = (type: string) => {
        this.getElementByName('first_name').sendKeys('George');
        this.getElementByName('last_name').sendKeys('Charalambous');
        this.getElementByName('password').sendKeys('Abcd#1234');
        this.getElementByName('certainPassword').sendKeys('Abcd#1234');
        this.getElementByName('email').sendKeys(type === 'INDIVIDUALCLIENT' ? 'ted@auslan.com.au' :
            type === 'INTERPRETER' ? 'dragana@auslan.com.au' :
                type === 'ORGANISATIONALREPRESENTATIVE' ? 'alana@auslan.com.au' :
                    'strangeTypeOfUser@auslan.com.au'
        );
        this.getElementByName('mobile').sendKeys('0490394517');
    }

    fillDuplicateBasicData  = (type: string) => {
        this.getElementByName('first_name').sendKeys('George');
        this.getElementByName('last_name').sendKeys('Charalambous');
        this.getElementByName('password').sendKeys('Abcd#1234');
        this.getElementByName('certainPassword').sendKeys('Abcd#1234');
        this.getElementByName('email').sendKeys(type === 'INDIVIDUALCLIENT' ? 'ted+clt1@auslan.com.au' :
            type === 'INTERPRETER' ? 'dragana+int1@auslan.com.au' :
                type === 'ORGANISATIONALREPRESENTATIVE' ? 'alana+org1@auslan.com.au' :
                    'strangeTypeOfUser@auslan.com.au'
        );
        this.getElementByName('mobile').sendKeys('0490394517');
        this.getElementByName('location_pref').sendKeys('VIC');
    }

    fillAllDataForRegister = (type: string, prefComm: string) => {
        this.fillBasicData(type);
        if (type === 'INDIVIDUALCLIENT') {
            this.getElementByName('phone').sendKeys('0490394517');
            this.getElementByName('ndis_id').sendKeys('311');
            this.getElementByName('ndis_budget_limit').sendKeys('10000');
            this.getElementByName('dpEventDateStart').sendKeys('01-30-2015');
            this.getElementByName('dpEventDateEnd').sendKeys('01-30-2015');
            this.getElementByName('email_receipt').click(); //  email on receipt
            this.getElementByName('email_confirmation').click(); //  email on receipt
            this.getElementByName('cn_first_name').sendKeys('George');
            this.getElementByName('cn_last_name').sendKeys('Charalambous');
            this.getElementByName('cn_email').sendKeys('george@curvetomorrow.com.au');
            this.getElementByName('cn_phone').sendKeys('0490394517');
        } else if (type === 'INTERPRETER') {
            this.getElementByName('naati_id').sendKeys('111');
            this.getElementByName('naati_validity_start_date').sendKeys('01-30-2015');
            this.getElementByName('naati_validity_end_date').sendKeys('01-30-2015');
            this.getElementByName('date_of_birth').sendKeys('01-30-2015');
            this.getElementByName('highest_level_edu').sendKeys('Bachelor Degree'.toUpperCase());
            this.getElementByName('location_pref').sendKeys('ACT');
            this.getElementByName('skill_level').sendKeys('ASL Certified'.toUpperCase());
            // this.getElementByName('comm_pref').sendKeys(prefComm);
        } else if (type === 'ORGANISATIONALREPRESENTATIVE') {
            this.getElementByName('phone').sendKeys('0490394517');
            this.getElementByName('business_abn').sendKeys('12312312311');
            this.getElementByName('business_name').sendKeys('Curve');
            this.getElementByName('business_branch_office').sendKeys('Melbourne');
            this.getElementByName('preferred_contact_method').sendKeys('Email'); // DROPDOWN
            this.getElementByName('email_receipt').click(); //  email on receipt
            this.getElementByName('email_confirmation').click(); //  email on receipt
            this.getElementByName('cn_first_name').sendKeys('George');
            this.getElementByName('cn_last_name').sendKeys('Charalambous');
            this.getElementByName('cn_email').sendKeys('george@curvetomorrow.com.au');
            this.getElementByName('cn_phone').sendKeys('0490394517');
            // this.getElementByName('preferred_contact_method').sendKeys(prefComm);
        }
        if (type !== 'ADMINISTRATOR' && type !== 'BOOKINGOFFICER' && type !== 'ACCOUNTANT' ) {

            this.getElementByName('comm_pref').sendKeys(prefComm);
            this.getElementByName('address_unit_num').sendKeys('22');
            this.getElementByName('address_street_number').sendKeys('62');
            this.getElementByName('address_street').sendKeys('Dave');
            this.getElementByName('address_post_code').sendKeys('3064');
            this.getElementByName('address_suburb').sendKeys('Crazy');
            this.getElementByName('address_state').sendKeys('VIC'); // dropdown
            this.getElementByName('location_pref').sendKeys('ACT');
        }
        return this.getElementByName('register_user').click();
    }

    acceptTC = () => {
        return this.getElementByName('tnc').click();
    }

    verifyInterpreterName = (index, expected_name) => {
        let elm = this.getAllElementByCSS('section[name="interpreters"]');

        return elm.get(index - 1).getText().then((txt) => {
            expect(txt).to.contain(expected_name);
        });
    }

    verifyInterpreterPhoto = (index) => {
        let elm = this.getAllElementByCSS('section[name="interpreters"]');
        return this.getElementInsideCSS(elm.get(index - 1), 'img').count().then((cnt) => {
            expect(cnt).to.be.eq(1);
        });
    }
    removeInterpreter = (index, preference) => {
        let elementName = `btnRemoveInterpreter_${preference}_${(+index - 1)}`;
        let elm = this.getElementByName(elementName);
        return elm.click().then( () => {
            browser.sleep(1500);
        });
    }
    countInterpreter = (count) => {
        return this.getAllElementByCSS('section[name="interpreters"]').count().then((cnt) => {
            expect(cnt).to.be.eq(+count);
        });
    }

    addInterpreter = (index) => {
        let elm = this.getAllElementByCSS('section[name="interpreters"]');
        return elm.get(index - 1).click();

    }
    validateAlphabeticalOrder = () => {
        let sorted = [], unSorted = [];
        let i = 0;
        $$('section[name="interpreters"]').each((elem, idx) => {
            elem.getText().then((name) => {
                unSorted[i++] = name;
            });
        }).then(function () {
            sorted = unSorted.slice();
            sorted.sort();
            expect(sorted.toString()).to.be.eq(unSorted.toString());
        });
    }
    userCreated = (type: string) => {
        return NotificationObject.getNotificationContent('Congratulations');
    }

    invalidNotification = (msg: string) => {
        return NotificationObject.getNotificationContent(msg);
    }

    getValidation = (validType: string) => {
        let elm = this.getElementByCss('span.' + validType);
        return browser.wait(protractor.ExpectedConditions.presenceOf(elm), 30000).then(() => {
            return expect(elm).to.exist;
        });
    }
}

