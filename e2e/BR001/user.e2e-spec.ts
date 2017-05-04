import { PageHelper } from '../app.po';
import {} from 'jasmine';
import {browser, $, $$} from 'protractor';

describe('BR001 => Create, read, update and delete a User \
	In order to access the booking system \
	A valid user needs to created', function() {
        let page = new PageHelper();
        // let tempPage = page;
        let cnt = 0;
        beforeEach(() => {
            // console.log(page.currentPath());
            browser.waitForAngular();
            browser.manage().timeouts().pageLoadTimeout(10000);  // 10 seconds
        });
        describe('Scenario: Administrator should be able to add a new administrator', () => {
            describe('Given I exist as an administrator', () => {
                describe('And I sign in with valid credentials', () => {
                    beforeEach(() => {
                        // console.log(page.currentPath());
                        browser.waitForAngular();
                        browser.manage().timeouts().pageLoadTimeout(10000);  // 10 seconds

                    });

                    it(' .. ', (done) => {
                        page.navigateTo('/');
                        expect(page.getElementByCss('loginForm')).toBeDefined();

                        let el = page.getElementByName('email');
                        let ps = page.getElementByName('pass');
                        let lu = page.getElementByName('login_user');

                        page.setValue(el, 'nauman+support@curvetomorrow.com.au');
                        page.setValue(ps, 'Abcd#1234');

                        lu.click().then( () => {

                         expect(page.currentPath()).toContain('dashboard');
                         done();
                        });
                    });

                    it('then I am on my home (booking-management) screen', (done) => {
                        expect(page.currentPath()).toContain('booking-management');
                        done();
                    });
                });
                describe('When I hover on the \' Profile\' page', () => {
                    it(' hover over lnkProfile ', () => {
                        let el = page.getElementByID('lnkProfile');

                        browser.actions().mouseMove(el).perform();
                        browser.driver.sleep(2000);
                        expect(page.getElementByID('lnkSettings')).toBeDefined();
                        page.getElementByID('lnkSettings').click();
                    });
                    it('And I go to the \'User Management\' list page', () => {
                        expect(page.currentPath()).toContain('user-management');
                    });
                });
                describe('When I click on \'Create New User\'', () => {
                    it(' .. ', () => {
                        // get the new user button
                        // click on it
                        // wait
                        // let newUserBtn = page.getElementByCss('.button.active');
                        let newUserBtn = page.getButtonByText('+ New User');
                        newUserBtn.click();
                        browser.driver.sleep(2000);
                    });
                    it(' And i click on the Administrator role', () => {
                        let dlg = page.getElementByCss('.md-dialog');
                        let role = page.getButtonByTextInsideElement(dlg, 'Administrator');
                        role.click();
                        browser.driver.sleep(2000);
                    })
                    it('And I add a valid Administrator', () => {
                        let dlg = page.getElementByCss('.md-dialog');
                        let fn = page.getElementInside(dlg, 'first_name');
                        let ln = page.getElementInside(dlg, 'last_name');
                        let el = page.getElementInside(dlg, 'email');
                        let mb = page.getElementInside(dlg, 'mobile');
                        let ps = page.getElementInside(dlg, 'password');
                        let cps = page.getElementInside(dlg, 'certainPassword');

                        page.setValue(el, 'default_admin_2_' + Math.round(Math.random() * 1000) + '@curvetomorrow.com.au');
                        page.setValue(ps, 'pass_pass2');
                        page.setValue(cps, 'pass_pass2');
                        page.setValue(mb, '0917257725');
                        page.setValue(fn, 'PAPAPAPA');
                        page.setValue(ln, 'JONESJONES');

                        browser.driver.sleep(2000);

                    });
                    it('And I click on \'Create\'', () => {

                        // let userList = page.getAll('user-list.li');
                        // let tb = page.getElementByCss('table.custom');
                        // let tr = page.getAllByTagNameInElement(tb, 'tr');
                        // let tr = page.getAllRepeater('let user of userList');
                        // let all_count = 0;
                        // tr.map(() => {
                        //     all_count = all_count + 1;
                        // });
                        // cnt = all_count;
                        // console.log(all_count)
                        // var tr = $$('.custom tr');
                        // let tr = page.getAll('tr');
                        let tr = $$('table.custom tr');
                        tr.count().then((count) => {
                            // console.log(count);
                            cnt = count - 1;
                            console.log('The count of list before clicking is: ' + cnt);
                        });
                        browser.driver.sleep(2000);
                        // console.log(cnt);
                        // browser.debugger();
                        browser.driver.sleep(2000);
                        let btn = page.getElementByName('add_user');
                        btn.click();
                        browser.driver.sleep(2000);
                    });
                    it('Then I am on the \'User Management\' list page', () => {
                      expect(page.currentPath()).toContain('user-management');
                    });
                    it('And the valid administrator should be in the list', () => {
                        let tr = $$('table.custom tr');
                        tr.count().then((d) => {
                            // console.log(d-1);
                            expect(d - 1).toBeGreaterThan(cnt);
                            console.log(' Updated list: ' + (d - 1) + 'is larger than before: ' + cnt);
                        });
                        // console.log(cnt);
                      // let userList = page.getAll('user-list.li');
                      // userList.count().then(d => expect(d).toBeGreaterThan(cnt));
                      // browser.driver.sleep(2000);
                    });
                });
            });
        });

        describe('Scenario: Administrator should not be able to add a new Organisational Representative' +
            ' with invalid information and should receive a visible warning', () => {
            describe('Given I exist as an administrator', () => {
                describe('And I sign in with valid credentials', () => {
                    beforeEach(() => {
                        browser.waitForAngular();
                        browser.manage().timeouts().pageLoadTimeout(10000);  // 10 seconds
                    });

                    it(' .. ', (done) => {
                        page.navigateTo('/');
                        expect(page.getElementByCss('loginForm')).toBeDefined();

                        let el = page.getElementByName('email');
                        let ps = page.getElementByName('pass');
                        let lu = page.getElementByName('login_user');

                        page.setValue(el, 'nauman+support@curvetomorrow.com.au');
                        page.setValue(ps, 'Abcd#1234');

                        lu.click().then( () => {

                            expect(page.currentPath()).toContain('dashboard');
                            done();
                        });
                    });

                    it('then I am on my home (booking-management) screen', (done) => {
                        expect(page.currentPath()).toContain('booking-management');
                        done();
                    });
                });
                describe('When I hover on the \' Profile\' page', () => {
                    it(' hover over lnkProfile ', () => {
                        let el = page.getElementByID('lnkProfile');

                        browser.actions().mouseMove(el).perform();
                        browser.driver.sleep(2000);
                        expect(page.getElementByID('lnkSettings')).toBeDefined();
                        page.getElementByID('lnkSettings').click();
                    });
                    it('And I go to the \'User Management\' list page', () => {
                        expect(page.currentPath()).toContain('user-management');
                    });
                });
                describe('When I click on \'Create New User\'', () => {
                    it(' .. ', () => {
                        // get the new user button
                        // click on it
                        // wait
                        let newUserBtn = page.getButtonByText('+ New User');
                        newUserBtn.click();
                        browser.driver.sleep(2000);
                    });
                    it(' And i click on the Organisational Representative role', () => {
                        let dlg = page.getElementByCss('.md-dialog');
                        let role = page.getButtonByTextInsideElement(dlg, 'Organisation');
                        role.click();
                        browser.driver.sleep(2000);
                    })
                    it('And I add an invalid Organisational Representative', () => {
                        let dlg = page.getElementByCss('.md-dialog');
                        let fn = page.getElementInside(dlg, 'first_name');
                        let ln = page.getElementInside(dlg, 'last_name');
                        let el = page.getElementInside(dlg, 'email');
                        let mb = page.getElementInside(dlg, 'mobile');
                        let ps = page.getElementInside(dlg, 'password');
                        let cps = page.getElementInside(dlg, 'certainPassword');

                        page.setValue(el, 'default_admin_2_' + Math.round(Math.random() * 1000) + 'curvetomorrow.com.au');
                        page.setValue(ps, 'pass_pass2');
                        page.setValue(cps, 'pass_pass2');
                        page.setValue(mb, '0917257725');
                        page.setValue(fn, 'PAPAPAPA');
                        page.setValue(ln, 'JONESJONES');

                        browser.driver.sleep(2000);

                    });
                    it('Then I am shown a validation error', () => {
                        let errs = page.getAll('.inline-icon.error')
                        errs.count().then((count) => {
                            expect(count).toBeGreaterThan(0);
                        });
                        browser.driver.sleep(2000);
                    });
                    it('And I update the invalid information', () => {
                        let dlg = page.getElementByCss('.md-dialog');
                        let el = page.getElementInside(dlg, 'email');
                        el.clear();
                        browser.driver.sleep(2000);
                        page.setValue(el, 'default_admin_2_' + Math.round(Math.random() * 1000) + '@curvetomorrow.com.au');
                    });
                    it('And I click on \'Create\'', () => {
                        let tr = $$('table.custom tr');
                        tr.count().then((count) => {
                            cnt = count - 1;
                            console.log('The count of list before clicking is: ' + cnt);
                        });
                        browser.driver.sleep(2000);
                        let btn = page.getElementByName('add_user');
                        btn.click();
                        browser.driver.sleep(10000);
                    });
                    it('Then I am on the \'User Management\' list page', () => {
                        expect(page.currentPath()).toContain('user-management');
                    });
                    it('And the valid Organisational Representative should be in the list', () => {
                        let tr = $$('table.custom tr');
                        tr.count().then((d) => {
                            expect(d - 1).toBeGreaterThan(cnt);
                            console.log(' Updated list: ' + (d - 1) + 'is larger than before: ' + cnt);
                        });
                    });
                });
            });
        });
    });
