import {PageObject} from './app.po';
import {expect} from '../config/helpers/chai-imports';
import {browser, ElementFinder} from 'protractor';

export class SkillMatrixPage extends PageObject {
    updatedSkillLevel = 1;
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
    getChangeableSkill = () => {
        return super.getAll('table > tbody > tr').get(2);
    }
    // TODO: Naming of this function can be improved upon
    firstSelectedCheckboxIn = (skill: ElementFinder, selected: boolean) => {
        let checkboxes = super.getAllByTagNameInElement(skill, 'md-checkbox');
        return checkboxes.filter((checkbox) => {
            return checkbox.isSelected().then((slc) => {
                return selected === slc;
            });
        }).first();
    }
    changeSkillLevel = () => {
        let skill = this.getChangeableSkill();
        let clickable = this.firstSelectedCheckboxIn(skill, false);
        let inputCheckbox = super.getElementInsideByCSS(clickable, 'input[type=checkbox]');
        this.updatedSkillLevel = inputCheckbox.getAttribute('name').then((name) => {
            return name.split('_')[-1];
        });
        console.log(this.updatedSkillLevel);
        return super.getElementInsideByTag(clickable, 'label').click();
    }
    checkUpdatedSkill = () => {
        let skill = this.getChangeableSkill();
        let checkbox = this.firstSelectedCheckboxIn(skill, true);
        let inputCheckbox = super.getElementInsideByCSS(checkbox, 'input[type=checkbox]');
        let selectedSkillLevel = inputCheckbox.getAttribute('name').then((name) => name.split('_')[-1]);
        console.log(this.updatedSkillLevel);
        return expect(selectedSkillLevel).to.equal(this.updatedSkillLevel);
    }
}
