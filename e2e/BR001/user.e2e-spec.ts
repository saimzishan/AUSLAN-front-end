import { PageHelper } from '../app.po';
import {} from 'jasmine';

describe('BR001 => Create, read, update and delete a User \
	In order to access the booking system \
	A valid user needs to created', function() {
        let page = new PageHelper();

        describe('Scenario: Administrator should be able to add a new administrator', () => {
            describe('Given I exist as an administrator', () => {
                beforeEach(() => { });
                describe('And I sign in with valid credentials', () => {
                    it(' .. ', () => {
                      });
                    it('then I am on my home screen', () => {
                    });
                });
                describe('When I click on the \'User Management\' page', () => {
                    it(' .. ', () => {
                      });
                    it('And I go to the \'User Management\' list page', () => {
                    });
                });
                describe('When I click on \'Create New User\'', () => {
                    it(' .. ', () => {
                      });
                    it('And I add a valid Administrator', () => {
                    });
                    it('And I click on \'Create\'', () => {
                    });
                    it('Then I am on the \'User Management\' list page', () => {
                    });
                    it('And the valid administrator should be in the list', () => {
                    });
                });
            });
        });
    });
