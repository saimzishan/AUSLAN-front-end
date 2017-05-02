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

  getElementByID(id: string) {
      return element(by.id(id));
  }

  getAll(css: string) {
    return element.all(by.css(css));
  }

  getElementByModel(model: string) {
    return element(by.model(model));
  }

  getElementByName(name: string) {
    return element(by.name(name));
  }


  getElementInside(ele, name: string) {
    return ele.element(by.name(name));
  }

  getButtonByTextInsideElement(ele, text: string) {
    return ele.element(by.buttonText(text));
  }

  getAllByTagNameInElement(ele, tag: string){
    return ele.all(by.tagName(tag));
  }

  getButtonByText(text: string){
    return element(by.buttonText(text));
  }

  setValue(ele, value: string) {
    ele.sendKeys(value);
  }

  currentPath() {
    return browser.getCurrentUrl();
  }
}
