import { browser, element, by } from 'protractor';

export class PageHelper {
  navigateTo(path: string ) {
    return browser.get(path);
  }

  getElementByCss(css: string) {
    return element(by.css(css));
  }

  getText(ele) {
    return ele.getText();
  }

  currentPath() {
    return browser.getCurrentUrl();
  }
}
