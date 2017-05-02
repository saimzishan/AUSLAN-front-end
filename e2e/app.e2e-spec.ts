import { PageHelper } from './app.po';
import {} from 'jasmine';

describe('Auslan Booking System', function() {
  let page = new PageHelper();

  beforeEach(() => {

  });

  it('should go to authenticate by default', () => {
    page.navigateTo('/');
    expect(page.currentPath()).toContain('authenticate');
    // page.navigateTo('/');
    // expect(page.getElementByCss('loginForm')).toBeDefined();
    // // let el = page.getElementByModel('model.email');
    // // let ps = page.getElementByModel('model.password');
    //
    // let el = page.getElementByName('email');
    // let ps = page.getElementByName('pass');
    // let lu = page.getElementByName('login_user');
    //
    // page.setValue(el, 'nauman+support@curvetomorrow.com.au');
    // page.setValue(ps, 'Abcd#1234');
    //
    // lu.click();
  });
});
