import {defineSupportCode} from 'cucumber';
import {SkillMatrixPage} from '../../po/skill-matrix.po';

defineSupportCode(({Given, Then, When}) => {
    let skillMatrixPO = new SkillMatrixPage();
    When(/^I change one of the skills$/, skillMatrixPO.changeSkillLevel);
    Then(/^I should be on the skill matrix page$/, skillMatrixPO.verify);
    Then(/^I should see the updated skill$/, skillMatrixPO.checkUpdatedSkill);
});
