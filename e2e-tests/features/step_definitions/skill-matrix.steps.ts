import {defineSupportCode} from 'cucumber';
import {SkillMatrixPage} from '../../po/skill-matrix.po';

defineSupportCode(({Given, Then, When}) => {
    let skillMatrixPO = new SkillMatrixPage();
    Then(/^I should be on the skill matrix page$/, skillMatrixPO.verify);
});
