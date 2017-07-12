import { expect } from '../config/helpers/chai-imports';
import { defineSupportCode } from 'cucumber';
import { browser, by, element, $, $$ } from 'protractor';
import { PageHelper } from '../app.po';

defineSupportCode(({Given, Then, When }) => {

    let page = new PageHelper();

    Then(/^I will be taken to the 'Choose Profile' page$/, showChooseProfilePage);
    async function showChooseProfilePage(): Promise<void> {
        let currentPath = await page.currentPath();
        expect(currentPath).to.contain('register');
    }

    Then(/^I will be taken to the '(.*) Signup' page$/, showSignupPage);
    async function showSignupPage(signupType: string): Promise<void> {
        let currentPath = await page.currentPath();
        expect(currentPath).to.contain('selectedRole=' + signupType);
    }

//    Correctly fill in
    When(/^I fill the field '(.*)' (.*)ly/, fillCorrectlyField);
    async function fillCorrectlyField(lblString: string, correnctNess: string): Promise<void> {
        // let selected_label = await page.getElementByCSSandExactText('label', lblString);
        let select_labels = await page.getAllByCSSandText('label', lblString);
        let selected_label = select_labels[0];
        const div = page.getParent(selected_label);
        let input = page.getElementInsideByTag(div, 'input');
        const isText = await input.getAttribute('type');
        if (correnctNess === 'correct') {
            await page.setValue(input, isText ? 'Abcde' : '123');
        } else {
            await page.setValue(input, isText ? 'A' : '1');
        }
    }

    Then(/^I will get a (.*) notification$/, getNotification);
    async function getNotification(validType: string): Promise<void> {
        await browser.waitForAngular();
        // let validNotification = await page.getElementByCss('span.' + validType);
        expect(page.getElementByCss('span.' + validType)).to.be.exist;
    }
});
