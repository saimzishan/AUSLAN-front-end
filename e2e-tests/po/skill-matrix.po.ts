import {PageObject} from './app.po';
import {expect} from '../config/helpers/chai-imports';

export class SkillMatrixPage extends PageObject {
    verify = () => {
        return this.currentPath().then((currentPath) => {
            expect(currentPath).to.contain('user-management');
            expect(currentPath).to.contain('skills');
        });
    }
    clickOnNavItem = (itemName: string) => {
        return super.getElementByCSSandText('aside > nav > a', itemName).then((el) => {
            return el.click();
        });
    }
    getActiveNavItem = () => {
        return super.getElementByCss('aside > nav > a.active');
    }
    clickOnInactiveNavItem = () => {
        return this.getActiveNavItem().then((el) => {
            return super.getNextSibling(el, 'a').then((sibling) => sibling.click());
        });
    }
    expectSaveBtn = (result: string) => {
        let attrValue = result === 'enabled';
        let btn = super.getButtonByText('Save');
        return btn.isEnabled().then((enabled) => expect(enabled).to.equal(attrValue));
    }
    changeSkillLevel = () => {
        let skill = super.getAll('table > tbody > tr').get(2);
        let checkboxes = super.getAllByTagNameInElement(skill, 'md-checkbox');
        let clickable = checkboxes.filter((checkbox) => {
            return checkbox.isSelected().then((selected) => {
                return !selected;
            });
        }).first();
        return super.getElementInsideByTag(clickable, 'label').click();
    }
}
