import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {PreComponent} from './pre.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpModule} from '@angular/http';
import {Router, RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {Component} from '@angular/core';
import { Location } from '@angular/common';
import {RegisterComponent} from '../register.component';
import {CustomFormsModule} from 'ng2-validation';
import {MaterialModule} from '@angular/material';
import {FormsModule} from '@angular/forms';


describe('PreComponent', () => {
    let location;

    let component: PreComponent;
    let fixture: ComponentFixture<PreComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PreComponent],
            imports: [FormsModule, MaterialModule,
                CustomFormsModule, RouterTestingModule.withRoutes([
                { path: 'register', component: PreComponent }
            ])]
        });
    }));
    beforeEach(inject([Location], ( _location: Location) => {

        location = _location;
    }));
    /*

    describe('PreComponent for OrganisationalRepresentative', () =>  {
        it('The role Organization should be selected when btnOrganization is clicked', async(() => {
            fixture = TestBed.createComponent(PreComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            let de = fixture.debugElement.query(By.css('a[name=btnOrganization]')).nativeElement;
            de.click();
            setTimeout(function () {
                const url = location.urlChanges[0];
                let res = url.endsWith( '/register?selectedRole=ORGANISATIONAL');
                expect(res).toBe(true);
            }, 1000);

        }));

    });

    describe('PreComponent for Client', () => {
        it('The role client should be selected when btnClient is clicked', (done) => {
            fixture.debugElement.query(By.css('a[name=btnClient]')).nativeElement.click();
            let res = window.location.href.endsWith( '/register?selectedRole=INDIVIDUALCLIENT');
            expect(res).toEqual(true);
        });
    });

    describe('PreComponent for interpreter', () => {
        it('The role interpreter should be selected when btnInterpreter is clicked', (done) => {
            fixture.debugElement.query(By.css('a[name=lnkInterpreter]')).nativeElement.click();
            let res = window.location.href.endsWith( '/register?selectedRole=INTERPRETER');
            expect(res).toEqual(true);

        });

    });

    describe('PreComponent for OrganisationalRepresentative', () => {
        it('The role Organization should be selected when btnOrganization is clicked', (done) => {
            fixture.debugElement.query(By.css('a[name=lnkOrganization]')).nativeElement.click();
            let res = window.location.href.endsWith( '/register?selectedRole=ORGANISATIONAL');
            expect(res).toEqual(true);
        });

    });

    describe('PreComponent for Client', () => {
        it('The role client should be selected when btnClient is clicked', (done) => {
            fixture.debugElement.query(By.css('a[name=lnkClient]')).nativeElement.click();
            let res = window.location.href.endsWith( '/register?selectedRole=INDIVIDUALCLIENT');
            expect(res).toEqual(true);
        });
    });

    describe('PreComponent for interpreter', () => {
        it('The role interpreter should be selected when btnInterpreter is clicked', (done) => {
            fixture.debugElement.query(By.css('a[name=btnInterpreter]')).nativeElement.click();
            let res = window.location.href.endsWith( '/register?selectedRole=INTERPRETER');
            expect(res).toEqual(true);

        });

    });
    */
});
