/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {UserService} from '../api/user.service';
import { Observable } from 'rxjs/Observable';
import { FormsModule }   from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { EnumValPipe } from '../shared/pipe/enum-val.pipe';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import {authService} from '../shared/global';
import {  Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AdminComponent } from './admin.component';
import { NotificationComponent } from '../notification/notification.component';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';
import {User} from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';

describe('AdminComponent', () => {
    let component: AdminComponent;
    let fixture: ComponentFixture<AdminComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdminComponent, EnumValPipe, NotificationComponent],
            providers: [UserService, {
                provide: AuthHttp,
                useFactory: authService,
                deps: [Http, RequestOptions]
            }],
            imports: [CustomFormsModule, HttpModule, FormsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach((done) => {
        fixture = TestBed.createComponent(AdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        done();
    });

    it('should create', (done) => {
        expect(component).toBeTruthy();
        done();
    });

    describe('Testing Add User', () => {
        beforeEach((done) => {
            spyOn(component, 'addUser').and.callThrough();

            fixture.debugElement.query(By.css('input[name=first_name]')).nativeElement.value = 'dummy';
            fixture.debugElement.query(By.css('input[name=last_name]')).nativeElement.value = 'dummy';
            fixture.debugElement.query(By.css('input[name=password]')).nativeElement.value = 'dummy@admin.com';
            fixture.debugElement.query(By.css('input[name=certainPassword]')).nativeElement.value = 'dummy@admin.com';
            fixture.debugElement.query(By.css('input[name=email]')).nativeElement.value = 'dummy@admin.com';

            let select = fixture.debugElement.query(By.css('select[name=role]')).nativeElement;


            select.value = 'Accountant';
            dispatchEvent(select, 'change');
            fixture.detectChanges();
            fixture.debugElement.query(By.css('button[name=add_user]')).nativeElement.click();

            done();
        });
        it('should call the add User Api', (done) => {
            fixture.whenStable().then(() => {
                let expected = 1;
                expect(component.addUser).toHaveBeenCalledTimes(expected);
                done();
            });

        });

    });


    describe('Testing Edit User', () => {
        beforeEach((done) => {
            spyOn(component, 'editUser').and.callThrough();

            component.users = [new User({
                id: 2, email: 'admin1@aus.au', name: 'Joe Doe 2',
                password: 'secure_password', role: ROLE.Accountant
            })];
            fixture.detectChanges();

            let select = fixture.debugElement.query(By.css('section[name=list_user]')).nativeElement;

            select.value = 'Accountant';
            dispatchEvent(select, 'change');
            fixture.detectChanges();
            fixture.debugElement.query(By.css('button[name=edit_user]')).nativeElement.click();
            done();
        });
        it('should call the edit User Api', (done) => {
            fixture.whenStable().then(() => {
                let expected = 1;
                expect(component.editUser).toHaveBeenCalledTimes(expected);
                done();
            });

        });

    });


    describe('Testing removeUser ', () => {
        beforeEach((done) => {
            spyOn(component, 'removeUser').and.callThrough();

            component.users = [new User({
                id: 2, email: 'admin1@aus.au', name: 'Joe Doe 2',
                password: 'secure_password', role: ROLE.Accountant
            })];
            fixture.detectChanges();

            let select = fixture.debugElement.query(By.css('section[name=list_user]')).nativeElement;

            select.value = 'Accountant';
            dispatchEvent(select, 'change');
            fixture.detectChanges();
            fixture.debugElement.query(By.css('button[name=del_user]')).nativeElement.click();
            done();

        });
        it('should call the remove User Api', (done) => {
            fixture.whenStable().then(() => {
                let expected = 1;
                expect(component.removeUser).toHaveBeenCalledTimes(expected);
                done();
            });

        });

    });
});
