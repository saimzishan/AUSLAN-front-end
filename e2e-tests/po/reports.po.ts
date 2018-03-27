import {PageObject} from './app.po';

const page = new PageObject();

export const url = '/reports';

export const dateFromFeild = page.getElementByCss('input[name="startDate"]');
export const dateToField = page.getElementByCss('input[name="endDate"]');
