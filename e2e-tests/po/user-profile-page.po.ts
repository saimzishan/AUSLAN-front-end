import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';
import {User} from '../helper';
import {NotificationObject} from './notification';

export class UserProfilePage extends PageObject {
    /*
     * The Syntax below is mandatory, for TS to recognize the method from base class
     * All statements are promises in protractor
     * Either wait for them in async method or if method returns the promise
     * use them in expect with eventually
     * The jasmine and cuccumberjs does not work, so use chai.expect with chai-as-promised
     * Look at chai-import.ts for further details
     * */
    saveBtn;
    browse = () => {
        return this.currentPath().then((currentPath) => {
            this.didFinishedRendering();
            expect(currentPath).to.contain('profile');

        });
    }

    didFinishedRendering = () => {
        this.saveBtn = this.getButtonByText('SAVE');
        return browser.wait(protractor.ExpectedConditions.presenceOf(this.saveBtn), 30000).then(() => {
            expect(this.saveBtn).to.exist;
        });
    }

    updateTheField = (fields_string: string, updated_text: string) => {
        const selected_label = this.getElementByCSSandText('label', fields_string);
        const div = this.getParent(selected_label);
        let input_field = this.getElementInsideByTag(div, 'input');
        input_field.clear();
        return this.setValue(input_field, updated_text);
    }

    updateDropDownField = (fields_string: string, updated_text: string) => {
        const selected_label = this.getElementByCSSandText('label', fields_string);
        const div = this.getParent(selected_label);
        let input_field = this.getElementInsideByTag(div, 'select');
        return this.setValue(input_field, updated_text);
    }

    fieldWillBeUpdated = (fields_string: string, updated_text: string) => {
        const selected_label = this.getElementByCSSandText('label', fields_string);
        const div = this.getParent(selected_label);
        let input_field = this.getElementInsideByTag(div, 'input');
        return input_field.getAttribute('value').then( (value) => {
            expect(value).to.be.equal(updated_text);
        });
    }

    dropdownFieldWillBeUpdated = (fields_string: string, updated_text: string) => {
        const selected_label = this.getElementByCSSandText('label', fields_string);
        const div = this.getParent(selected_label);
        let input_field = this.getElementInsideByTag(div, 'select');
        return input_field.getAttribute('ng-reflect-model').then( (value) => {
            expect(value).to.be.equal(updated_text);
        });
    }
}

