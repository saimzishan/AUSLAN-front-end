import {PageObject} from './app.po';
import {expect} from '../config/helpers/chai-imports';
import {browser, ElementFinder} from 'protractor';

export class SkillMatrixPage extends PageObject {
    static updatedSkillLevel: number = 1;
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

    firstCheckboxBySelectionIn = (skill: ElementFinder, givenSelection: boolean) => {
        let checkboxes = super.getAllByCSSInElement(skill, 'md-checkbox input[type=checkbox]');
        return checkboxes.filter((checkbox) => {
            return checkbox.isSelected().then((selected) => {
                return selected === givenSelection;
            });
        }).first();
    }
    changeSkillLevel = () => {
        let skill = this.getChangeableSkill();
        let clickable = this.firstCheckboxBySelectionIn(skill, false);
        clickable.getAttribute('name').then((name) => {
            SkillMatrixPage.updatedSkillLevel = Number(name.split('_')[2]);
        });
        return super.getParent(super.getParent(clickable)).click();
    }
    checkUpdatedSkill = () => {
        let skill = this.getChangeableSkill();
        let checkbox = this.firstCheckboxBySelectionIn(skill, true);
        let selectedSkillLevel: number = checkbox.getAttribute('name').then((name) => {
            return Number(name.split('_')[2]);
        });
        return expect(selectedSkillLevel).to.eventually.equal(SkillMatrixPage.updatedSkillLevel);
    }
}
