import { PageHelper } from '../app.po';
import {} from 'jasmine';

describe('BR001 => Create, read, update and delete a User \
	In order to access the booking system \
	A valid user needs to created', function() {
        let page = new PageHelper();

        describe('Scenario: Administrator should be able to add a new administrator', () => {
            beforeEach(() => {

            });

            it('should go to authenticate by default', () => {
                page.navigateTo('/');
                expect(page.currentPath()).toContain('authenticate');
            });
        });
    });
