import { PageHelper } from './app.po';
import {} from 'jasmine';

describe('Auslan Booking System', function() {
  let page = new PageHelper();

  beforeEach(() => {

  });

  it('should go to authenticate by default', () => {
    page.navigateTo('/');
    expect(page.currentPath()).toContain('authenticate');
  });
});
