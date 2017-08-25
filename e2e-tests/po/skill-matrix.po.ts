import {PageObject} from './app.po';
import {expect} from '../config/helpers/chai-imports';
import {browser, ElementFinder} from 'protractor';

export class SkillMatrixPage extends PageObject {
    static initialSkillLevel = 0;
    static updatedSkillLevel = 1;
    static skillsChanged = 1;
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
    getChangeableSkill = (n) => {
        return super.getAll('table > tbody > tr').get(n);
    }

    firstCheckboxBySelectionIn = (skill: ElementFinder, givenSelection: boolean) => {
        let checkboxes = super.getAllByCSSInElement(skill, 'md-checkbox input[type=checkbox]');
        return checkboxes.filter((checkbox) => {
            return checkbox.isSelected().then((selected) => {
                return selected === givenSelection;
            });
        }).first();
    }
    changeSkillLevel = (n: number) => {
        SkillMatrixPage.skillsChanged = n;
        while (n > 0) {
            let skill = this.getChangeableSkill(n);
            let clickable = this.firstCheckboxBySelectionIn(skill, false);
            clickable.getAttribute('name').then((name) => {
                SkillMatrixPage.updatedSkillLevel = Number(name.split('_')[2]);
            });
            super.getParent(super.getParent(clickable)).click();
            n--;
        }
    }
    checkUpdatedSkill = (negate: string) => {
        for (let i = 1; i <= SkillMatrixPage.skillsChanged; i++) {
            let skill = this.getChangeableSkill(i);
            let checkbox = this.firstCheckboxBySelectionIn(skill, true);
            let selectedSkillLevel: number = checkbox.getAttribute('name').then((name) => {
                return Number(name.split('_')[2]) || 0;
            });
            if (negate) {
                expect(selectedSkillLevel).to.eventually.equal(SkillMatrixPage.initialSkillLevel);
            } else {
                expect(selectedSkillLevel).to.eventually.equal(SkillMatrixPage.updatedSkillLevel);
            }
        }
    }
}
