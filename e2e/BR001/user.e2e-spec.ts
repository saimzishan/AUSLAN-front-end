import { PageHelper } from '../app.po';
import { Administrator } from '../app.admin';
import { Organisation } from '../app.org';
import {} from 'jasmine';
import {browser, $, $$} from 'protractor';

describe('BR001 => Create, read, update and delete a User \
	In order to access the booking system \
	A valid user needs to created', function() {
        let page = new PageHelper();
        // let tempPage = page;
        let cnt = 0;
        let nauman_admin = new Administrator('nauman+support@curvetomorrow.com.au', 'Abcd#1234');
        let valid_admin = new Administrator('default_admin_2_' + Math.round(Math.random() * 1000) + '@curvetomorrow.com.au',
                                            'pass_pass2', 'PAPAPAPA', 'JONEJONE', '0917257725');
        let valid_org = new Administrator('default_admin_2_' + Math.round(Math.random() * 1000) + '@curvetomorrow.com.au',
                                            'pass_pass2', 'PAPAPAPA', 'JONEJONE', '0917257725');
        let invalid_org = new Organisation('default_admin_2_' + Math.round(Math.random() * 1000) + 'curvetomorrow.com.au',
                                            'pass_pass2', 'PAPAPAPA', 'JONEJONE', '0917257725');
        beforeEach(() => {
            // console.log(page.currentPath());
            // nauman_admin = new Administrator('nauman+support@curvetomorrow.com.au', 'Abcd#1234');
            browser.waitForAngular();
            browser.manage().timeouts().pageLoadTimeout(10000);  // 10 seconds
        });
    /*
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

                        // page.setValue(el, 'nauman+support@curvetomorrow.com.au');
                        // page.setValue(ps, 'Abcd#1234');
                        page.setValue(el, nauman_admin.email);
                        page.setValue(ps, nauman_admin.pass);

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

                        page.setValue(el, valid_admin.email);
                        page.setValue(ps, valid_admin.pass);
                        page.setValue(cps, valid_admin.pass);
                        page.setValue(mb, valid_admin.mobile_num);
                        page.setValue(fn, valid_admin.first_name);
                        page.setValue(ln, valid_admin.last_name);

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
                            console.log(' Updated list: ' + (d - 1) + ' is larger than before: ' + cnt);
                        });
                        // console.log(cnt);
                      // let userList = page.getAll('user-list.li');
                      // userList.count().then(d => expect(d).toBeGreaterThan(cnt));
                      // browser.driver.sleep(2000);
                    });
                });
            });
        });
*/

        // Add Client
        describe('Scenario: Administrator should be able to add a new Client', () => {
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

                        // page.setValue(el, 'nauman+support@curvetomorrow.com.au');
                        // page.setValue(ps, 'Abcd#1234');
                        page.setValue(el, nauman_admin.email);
                        page.setValue(ps, nauman_admin.pass);

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
                        let role = page.getButtonByTextInsideElement(dlg, 'Client');
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

                        page.setValue(el, valid_admin.email);
                        page.setValue(ps, valid_admin.pass);
                        page.setValue(cps, valid_admin.pass);
                        page.setValue(mb, valid_admin.mobile_num);
                        page.setValue(fn, valid_admin.first_name);
                        page.setValue(ln, valid_admin.last_name);

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
                            console.log(' Updated list: ' + (d - 1) + ' is larger than before: ' + cnt);
                        });
                        // console.log(cnt);
                        // let userList = page.getAll('user-list.li');
                        // userList.count().then(d => expect(d).toBeGreaterThan(cnt));
                        // browser.driver.sleep(2000);
                    });
                });
            });
        });


        // Update Client
        describe('Administrator should be able to update an Organisational Representative', () => {
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

                        page.setValue(el, nauman_admin.email);
                        page.setValue(ps, nauman_admin.pass);

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
                describe('When I click on edit for an existing Client', () => {
                    it(' I hover over action button and click on edit', () => {
                        // find the list of OR
                        // get the first one
                        // get the parent of that element
                        // find the button of that row
                        let list_of_ORs = page.getAllByCSSandText('.truncated-text', 'Client');
                        let first_OR = list_of_ORs.get(0);
                        let userRow = page.getParent(first_OR);
                        let action_button = page.getElementInsideByCSS(userRow, '.icon-actions');
                        // hover over that button
                        browser.actions().mouseMove(action_button).perform();
                        browser.driver.sleep(2000);
                        let edit = page.getElementInsideByCSS(userRow, '.icon-edit');
                        edit.click();
                        browser.driver.sleep(2000);
                    });
                    it(' And i update some fields', () => {
                        let dlg = page.getElementByCss('.md-dialog');
                        let fn = page.getElementInside(dlg, 'first_name');
                        let ln = page.getElementInside(dlg, 'last_name');
                        let el = page.getElementInside(dlg, 'email');
                        let mb = page.getElementInside(dlg, 'mobile');
                        // role.click();

                        // page.setValue(el, invalid_org.email);
                        page.setValue(mb, invalid_org.mobile_num);
                        // page.setValue(fn, invalid_org.first_name);
                        page.setValue(ln, invalid_org.last_name);
                        browser.driver.sleep(2000);
                    });
                    it('And I click on \'SAVE\'', () => {
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
                    it('And the updated Organisational Representative should be in the list', () => {
                        let tr = $$('table.custom tr');
                        tr.count().then((d) => {
                            expect(d - 1).toBe(cnt);
                            console.log(' Updated list: ' + (d - 1) + ' is equal: ' + cnt);
                        });
                    });
                });
            });
        });


        // Delete / Disable Client
        describe('Administrator should be able to delete/disable an Organisational Representative', () => {
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

                        page.setValue(el, nauman_admin.email);
                        page.setValue(ps, nauman_admin.pass);

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
                describe('When I click on edit for an existing Client', () => {
                    it(' I hover over action button and click on edit', () => {
                        // find the list of OR
                        // get the first one
                        // get the parent of that element
                        // find the button of that row
                        // var selectedRow;
                        let list_of_ORs = page.getAllByCSSandText('.truncated-text', 'Client');
                        list_of_ORs.count().then((count) => {
                            console.log('The number of OR is: '+ count);
                        })
                        list_of_ORs.then(function (list_of_ORs) {
                            for (var i = 0; i < list_of_ORs.length; i++) {
                                let parentRow = page.getParent(list_of_ORs[i]);
                                let active = page.getElementInsideByCSS(parentRow, '.active');
                                // let action_button = page.getElementInsideByCSS(parentRow, '.icon-actions');
                                // // hover over that button
                                // browser.actions().mouseMove(action_button).perform();
                                // browser.driver.sleep(2000);
                                // console.log(page.getText(active));
                                let activeText = page.getText(active);
                                if (expect(page.getText(active)).toEqual('Active')) {
                                    let selectedRow = parentRow;
                                    let action_button = page.getElementInsideByCSS(selectedRow, '.icon-actions');
                                    // hover over that button
                                    browser.actions().mouseMove(action_button).perform();
                                    browser.driver.sleep(2000);
                                    let edit = page.getElementInsideByCSS(selectedRow, '.icon-edit');
                                    edit.click();
                                    browser.driver.sleep(2000);
                                    break;
                                }
                            }
                        });
                        // let first_OR = list_of_ORs.get(0);
                        // let userRow = page.getParent(first_OR);
                        // let action_button = page.getElementInsideByCSS(selectedRow, '.icon-actions');
                        // // hover over that button
                        // browser.actions().mouseMove(action_button).perform();
                        // browser.driver.sleep(2000);
                        // let edit = page.getElementInsideByCSS(userRow, '.icon-edit');
                        // edit.click();
                        // browser.driver.sleep(2000);
                    });
                    it(' And i update available field', () => {
                        let dlg = page.getElementByCss('.md-dialog');
                        let trigger = page.getElementInsideByCSS(dlg, '.mat-select-trigger');
                        trigger.click();
                        browser.driver.sleep(2000);
                        // page.setValue(el, invalid_org.email);
                        let disable = page.getElementByCSSandText('.mat-option', 'Disabled');
                        expect(disable.getText()).toBe('Disabled');
                        disable.click();
                        browser.driver.sleep(2000);
                    });
                    it('And I click on \'SAVE\'', () => {
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
                    it('And the updated Organisational Representative should be in the list', () => {
                        let tr = $$('table.custom tr');
                        tr.count().then((d) => {
                            expect(d - 1).toBe(cnt);
                            console.log(' Updated list: ' + (d - 1) + ' is equal: ' + cnt);
                        });
                    });
                });
            });
        });


        // Add invalid Client
        describe('Scenario: Administrator should not be able to add a new Client' +
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

                        page.setValue(el, nauman_admin.email);
                        page.setValue(ps, nauman_admin.pass);

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
                        let role = page.getButtonByTextInsideElement(dlg, 'Client');
                        role.click();
                        browser.driver.sleep(2000);
                    })
                    it('And I add an invalid Client', () => {
                        let dlg = page.getElementByCss('.md-dialog');
                        let fn = page.getElementInside(dlg, 'first_name');
                        let ln = page.getElementInside(dlg, 'last_name');
                        let el = page.getElementInside(dlg, 'email');
                        let mb = page.getElementInside(dlg, 'mobile');
                        let ps = page.getElementInside(dlg, 'password');
                        let cps = page.getElementInside(dlg, 'certainPassword');

                        page.setValue(el, invalid_org.email);
                        page.setValue(ps, invalid_org.pass);
                        page.setValue(cps, invalid_org.pass);
                        page.setValue(mb, invalid_org.mobile_num);
                        page.setValue(fn, invalid_org.first_name);
                        page.setValue(ln, invalid_org.last_name);

                        browser.driver.sleep(2000);

                    });
                    it('Then I am shown a validation error', () => {
                        let errs = page.getAll('.inline-icon.error');
                        let btn = page.getElementByName('add_user');
                        errs.count().then((count) => {
                            expect(count).toBeGreaterThan(0);
                            expect(btn.getAttribute('disabled')).toEqual('true');
                        });
                        browser.driver.sleep(2000);
                    });
                    it('And I update the invalid information', () => {
                        let dlg = page.getElementByCss('.md-dialog');
                        let el = page.getElementInside(dlg, 'email');
                        el.clear();
                        browser.driver.sleep(2000);
                        invalid_org.email = 'default_admin_2_' + Math.round(Math.random() * 1000) + '@curvetomorrow.com.au'
                        page.setValue(el, invalid_org.email);
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
                            console.log(' Updated list: ' + (d - 1) + ' is larger than before: ' + cnt);
                        });
                    });
                });
            });
        });

        // Add new ORG REP
        describe('Scenario: Administrator should be able to add a new Organisational Representative', () => {
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

                        // page.setValue(el, 'nauman+support@curvetomorrow.com.au');
                        // page.setValue(ps, 'Abcd#1234');
                        page.setValue(el, nauman_admin.email);
                        page.setValue(ps, nauman_admin.pass);

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
                        let role = page.getButtonByTextInsideElement(dlg, 'Organisation');
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

                        page.setValue(el, valid_org.email);
                        page.setValue(ps, valid_org.pass);
                        page.setValue(cps, valid_org.pass);
                        page.setValue(mb, valid_org.mobile_num);
                        page.setValue(fn, valid_org.first_name);
                        page.setValue(ln, valid_org.last_name);

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
                            console.log(' Updated list: ' + (d - 1) + ' is larger than before: ' + cnt);
                        });
                        // console.log(cnt);
                        // let userList = page.getAll('user-list.li');
                        // userList.count().then(d => expect(d).toBeGreaterThan(cnt));
                        // browser.driver.sleep(2000);
                    });
                });
            });
        });

        // Update ORG REP
        describe('Administrator should be able to update an Organisational Representative', () => {
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

                        page.setValue(el, nauman_admin.email);
                        page.setValue(ps, nauman_admin.pass);

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
                describe('When I click on edit for an existing Organisational Representative', () => {
                    it(' I hover over action button and click on edit', () => {
                        // find the list of OR
                        // get the first one
                        // get the parent of that element
                        // find the button of that row
                        let list_of_ORs = page.getAllByCSSandText('.truncated-text', 'Organisational Representative');
                        let first_OR = list_of_ORs.get(0);
                        let userRow = page.getParent(first_OR);
                        let action_button = page.getElementInsideByCSS(userRow, '.icon-actions');
                        // hover over that button
                        browser.actions().mouseMove(action_button).perform();
                        browser.driver.sleep(2000);
                        let edit = page.getElementInsideByCSS(userRow, '.icon-edit');
                        edit.click();
                        browser.driver.sleep(2000);
                    });
                    it(' And i update some fields', () => {
                        let dlg = page.getElementByCss('.md-dialog');
                        let fn = page.getElementInside(dlg, 'first_name');
                        let ln = page.getElementInside(dlg, 'last_name');
                        let el = page.getElementInside(dlg, 'email');
                        let mb = page.getElementInside(dlg, 'mobile');
                        // role.click();

                        // page.setValue(el, invalid_org.email);
                        page.setValue(mb, invalid_org.mobile_num);
                        // page.setValue(fn, invalid_org.first_name);
                        page.setValue(ln, invalid_org.last_name);
                        browser.driver.sleep(2000);
                    });
                    it('And I click on \'SAVE\'', () => {
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
                    it('And the updated Organisational Representative should be in the list', () => {
                        let tr = $$('table.custom tr');
                        tr.count().then((d) => {
                            expect(d - 1).toBe(cnt);
                            console.log(' Updated list: ' + (d - 1) + ' is equal: ' + cnt);
                        });
                    });
                });
            });
        });


        // Delete / Disable ORG REP
        describe('Administrator should be able to delete/disable an Organisational Representative', () => {
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

                        page.setValue(el, nauman_admin.email);
                        page.setValue(ps, nauman_admin.pass);

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
                describe('When I click on edit for an existing Organisational Representative', () => {
                    it(' I hover over action button and click on edit', () => {
                        // find the list of OR
                        // get the first one
                        // get the parent of that element
                        // find the button of that row
                        // var selectedRow;
                        let list_of_ORs = page.getAllByCSSandText('.truncated-text', 'Organisational Representative');
                        list_of_ORs.count().then((count) => {
                            console.log('The number of OR is: '+ count);
                        })
                        list_of_ORs.then(function (list_of_ORs) {
                            for (var i = 0; i < list_of_ORs.length; i++) {
                                let parentRow = page.getParent(list_of_ORs[i]);
                                let active = page.getElementInsideByCSS(parentRow, '.active');
                                // let action_button = page.getElementInsideByCSS(parentRow, '.icon-actions');
                                // // hover over that button
                                // browser.actions().mouseMove(action_button).perform();
                                // browser.driver.sleep(2000);
                                // console.log(page.getText(active));
                                let activeText = page.getText(active);
                                if (expect(page.getText(active)).toEqual('Active')) {
                                    let selectedRow = parentRow;
                                    let action_button = page.getElementInsideByCSS(selectedRow, '.icon-actions');
                                    // hover over that button
                                    browser.actions().mouseMove(action_button).perform();
                                    browser.driver.sleep(2000);
                                    let edit = page.getElementInsideByCSS(selectedRow, '.icon-edit');
                                    edit.click();
                                    browser.driver.sleep(2000);
                                    break;
                                }
                            }
                        });
                        // let first_OR = list_of_ORs.get(0);
                        // let userRow = page.getParent(first_OR);
                        // let action_button = page.getElementInsideByCSS(selectedRow, '.icon-actions');
                        // // hover over that button
                        // browser.actions().mouseMove(action_button).perform();
                        // browser.driver.sleep(2000);
                        // let edit = page.getElementInsideByCSS(userRow, '.icon-edit');
                        // edit.click();
                        // browser.driver.sleep(2000);
                    });
                    it(' And i update available field', () => {
                        let dlg = page.getElementByCss('.md-dialog');
                        let trigger = page.getElementInsideByCSS(dlg, '.mat-select-trigger');
                        trigger.click();
                        browser.driver.sleep(2000);
                        // page.setValue(el, invalid_org.email);
                        let disable = page.getElementByCSSandText('.mat-option', 'Disabled');
                        expect(disable.getText()).toBe('Disabled');
                        disable.click();
                        browser.driver.sleep(2000);
                    });
                    it('And I click on \'SAVE\'', () => {
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
                    it('And the updated Organisational Representative should be in the list', () => {
                        let tr = $$('table.custom tr');
                        tr.count().then((d) => {
                            expect(d - 1).toBe(cnt);
                            console.log(' Updated list: ' + (d - 1) + ' is equal: ' + cnt);
                        });
                    });
                });
            });
        });


        // Add invalid ORG REP
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

                        page.setValue(el, nauman_admin.email);
                        page.setValue(ps, nauman_admin.pass);

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

                        page.setValue(el, invalid_org.email);
                        page.setValue(ps, invalid_org.pass);
                        page.setValue(cps, invalid_org.pass);
                        page.setValue(mb, invalid_org.mobile_num);
                        page.setValue(fn, invalid_org.first_name);
                        page.setValue(ln, invalid_org.last_name);

                        browser.driver.sleep(2000);

                    });
                    it('Then I am shown a validation error', () => {
                        let errs = page.getAll('.inline-icon.error');
                        let btn = page.getElementByName('add_user');
                        errs.count().then((count) => {
                            expect(count).toBeGreaterThan(0);
                            expect(btn.getAttribute('disabled')).toEqual('true');
                        });
                        browser.driver.sleep(2000);
                    });
                    it('And I update the invalid information', () => {
                        let dlg = page.getElementByCss('.md-dialog');
                        let el = page.getElementInside(dlg, 'email');
                        el.clear();
                        browser.driver.sleep(2000);
                        invalid_org.email = 'default_admin_2_' + Math.round(Math.random() * 1000) + '@curvetomorrow.com.au'
                        page.setValue(el, invalid_org.email);
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
                            console.log(' Updated list: ' + (d - 1) + ' is larger than before: ' + cnt);
                        });
                    });
                });
            });
        });
    });
