import { PageHelper } from '../app.po';
import {} from 'jasmine';
import {browser, $, $$} from 'protractor';

describe('BR001 => Create, read, update and delete a User \
	In order to access the booking system \
	A valid user needs to created', function() {
        let page = new PageHelper();
        // let tempPage = page;
        let cnt = 0;
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
                        let newUserBtn = page.getElementByCss('.button.active');
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
                        });
                        browser.driver.sleep(2000);
                        console.log(cnt);
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
                            console.log(d-1);
                            expect(d-1).toBeGreaterThan(cnt);
                        });
                        console.log(cnt);
                      // let userList = page.getAll('user-list.li');
                      // userList.count().then(d => expect(d).toBeGreaterThan(cnt));
                      // browser.driver.sleep(2000);
                    });
                });
            });
        });

        // describe('Administrator should not be able to add a new Organisational Representative' +
        //     'with invalid information and should receive a visible warning', () => {
        //     describe('Given I exist as an administrator', () => {
        //         beforeEach(() => { });
        //         describe('And I sign in with valid credentials', () => {
        //             it(' .. ', () => {
        //
        //                 page.navigateTo('/');
        //                 expect(page.getElementByCss('loginForm')).toBeDefined();
        //                 // let el = page.getElementByModel('model.email');
        //                 // let ps = page.getElementByModel('model.password');
        //
        //                 let el = page.getElementByName('email');
        //                 let ps = page.getElementByName('pass');
        //
        //                 page.setValue(el, 'nauman+support@curvetomorrow.com.au');
        //                 page.setValue(ps, 'Abcd#1234');
        //
        //                 page.getElementByName('login_user').click();
        //
        //             });
        //             it('then I am on my home (dashboard) screen', () => {
        //                 expect(page.currentPath()).toContain('dashboard');
        //             });
        //         });
        //         describe('When I click on the \'User Management\' page', () => {
        //             it(' .. ', () => {
        //                 expect(page.getElementByID('lnkAdminCenter')).toBeDefined();
        //                 page.getElementByID('lnkAdminCenter').click();
        //             });
        //             it('And I go to the \'User Management\' list page', () => {
        //                 expect(page.currentPath()).toContain('admin-center');
        //             });
        //         });
        //         describe('When I click on \'Create New User\'', () => {
        //             it(' .. ', () => {
        //             });
        //             it('invalid Organisational Representative', () => {
        //                 let el = page.getElementByModel('newUser.email');
        //                 let ps = page.getElementByModel('newUser.password');
        //                 let cps = page.getElementByModel('newUser.confirm_password');
        //                 let fn = page.getElementByModel('newUser.first_name');
        //                 let ln = page.getElementByModel('newUser.last_name');
        //                 let role = page.getElementByModel('newUser.role');
        //
        //                 page.setValue(el, 'default_admin@curvetomorrow.com.au');
        //                 page.setValue(ps, 'pass_pass');
        //                 page.setValue(cps, 'pass_pass');
        //                 page.setValue(fn, 'PAPA');
        //                 page.setValue(ln, 'JONES');
        //                 page.setValue(role, 'Administrator');
        //
        //
        //             });
        //             it('And I click on \'Create\'', () => {
        //
        //                 let userList = page.getAll('user-list.li');
        //                 userList.count().then(d => cnt = d);
        //                 let btn = page.getElementByName('add_user');
        //                 btn.click();
        //
        //             });
        //             it('Then I am on the \'User Management\' list page', () => {
        //                 expect(page.currentPath()).toContain('admin-center');
        //             });
        //             it('And the valid administrator should be in the list', () => {
        //                 let userList = page.getAll('user-list.li');
        //                 userList.count().then(d => expect(d).toBeGreaterThan(d));
        //             });
        //         });
        //     });
        // });
    });
