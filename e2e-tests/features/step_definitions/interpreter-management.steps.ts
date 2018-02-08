import {defineSupportCode} from 'cucumber';
import {Heroku} from '../../helper';
import {InterpreterManagementPage} from '../../po/interpreter-management-page.po';

defineSupportCode(({Given, Then, When}) => {

    let intManagementPO = new InterpreterManagementPage();

    Given(/^The (.*) (\d+) interpreters have preference '(.*)'$/, Heroku.updateInterpretersPreference);
    Given(/^The (.*) (\d+) interpreters have skill level '(.*)'$/, Heroku.updateInterpretersSkillLevel);
    Given(/^The (.*) (\d+) interpreters have travel pay status '(.*)'$/, Heroku.updateInterpretersTravelPayStatus);

    // ---------------------------------   INDIVIDUAL BOOKING PAGE

    When(/^I hover on the (.*) dropdown on interpreter table header and select '(.*)'$/, intManagementPO.hoverOnInterpreterTableHeader);
    When(/^I query interpreter by form field (.*) and value '(.*)'$/, intManagementPO.queryInterpreterByFormField);

});
