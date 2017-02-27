import { PageHelper } from '../app.po';
import {} from 'jasmine';

describe('BR001 => Create, read, update and delete a User \
	In order to access the booking system \
	A valid user needs to created', function() {
        let page = new PageHelper();
        let cnt = 0;
        describe('Scenario: Administrator should be able to add a new administrator', () => {
            describe('Given I exist as an administrator', () => {
                beforeEach(() => { });
                describe('And I sign in with valid credentials', () => {
                    it(' .. ', () => {

                        page.navigateTo('/');
                        expect(page.getElementByCss('loginForm')).toBeDefined();
                        let el = page.getElementByModel('model.email');
                        let ps = page.getElementByModel('model.password');

                        page.setValue(el, 'default_admin@curvetomorrow.com.au');
                        page.setValue(ps, 'pass_pass');

                    });
                    it('then I am on my home (dashboard) screen', () => {
                        expect(page.currentPath()).toContain('dashboard');
                    });
                });
                describe('When I click on the \'User Management\' page', () => {
                    it(' .. ', () => {
                        expect(page.getElementByID('lnkAdminCenter')).toBeDefined();
                        page.getElementByID('lnkAdminCenter').click();
                    });
                    it('And I go to the \'User Management\' list page', () => {
                        expect(page.currentPath()).toContain('admin-center');
                    });
                });
                describe('When I click on \'Create New User\'', () => {
                    it(' .. ', () => {
                    });
                    it('And I add a valid Administrator', () => {
                      let el = page.getElementByModel('newUser.email');
                      let ps = page.getElementByModel('newUser.password');
                      let cps = page.getElementByModel('newUser.confirm_password');
                      let fn = page.getElementByModel('newUser.first_name');
                      let ln = page.getElementByModel('newUser.last_name');
                      let role = page.getElementByModel('newUser.role');

                      page.setValue(el, 'default_admin@curvetomorrow.com.au');
                      page.setValue(ps, 'pass_pass');
                      page.setValue(cps, 'pass_pass');
                      page.setValue(fn, 'PAPA');
                      page.setValue(ln, 'JONES');
                      page.setValue(role, 'Administrator');


                    });
                    it('And I click on \'Create\'', () => {

                        let userList = page.getAll('user-list.li');
                        userList.count().then(d => cnt = d);
                        let btn = page.getElementByName('add_user');
                        btn.click();

                    });
                    it('Then I am on the \'User Management\' list page', () => {
                      expect(page.currentPath()).toContain('admin-center');
                    });
                    it('And the valid administrator should be in the list', () => {
                      let userList = page.getAll('user-list.li');
                      userList.count().then(d => expect(d).toBeGreaterThan(d));
                    });
                });
            });
        });
    });
