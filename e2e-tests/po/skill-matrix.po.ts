import {PageObject} from './app.po';
import {browser, by, element, $, $$, protractor} from 'protractor';
import {expect} from '../config/helpers/chai-imports';

export class SkillMatrixPage extends PageObject {
    verify = () => {
        return this.currentPath().then((currentPath) => {
            expect(currentPath).to.contain('user-management');
            expect(currentPath).to.contain('skills');
        });
    }
}
