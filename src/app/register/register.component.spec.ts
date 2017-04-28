/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RegisterComponent } from './register.component';
import { NotificationComponent } from '../notification/notification.component';
import { RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {UserService} from '../api/user.service';
import { Observable } from 'rxjs/Observable';
import { FormsModule }   from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { ROLE } from '../shared/model/role.enum';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {MockUserService, MockModule, DummyComponent} from '../shared/test/Mock';
import { RouterTestingModule } from '@angular/router/testing';
import {NotificationServiceBus} from '../notification/notification.service';
import {SimpleNotificationsModule} from 'angular2-notifications';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterComponent, NotificationComponent],
            imports: [FormsModule, CustomFormsModule, SimpleNotificationsModule.forRoot(),
              RouterTestingModule],
            providers: [NotificationServiceBus,
            { provide: UserService, useClass: MockUserService}, { provide: AuthHttp, useClass: MockBackend} ]
        }).compileComponents();
    }));

    describe('RegisterComponent', () => {
        beforeEach((done) => {
            fixture = TestBed.createComponent(RegisterComponent);
            component = fixture.componentInstance;
            spyOn(component, 'roleSelected').and.callThrough();
            spyOn(component, 'addUser').and.callThrough();

            fixture.debugElement.query(By.css('input[name=first_name]')).nativeElement.value = 'dummy';
            fixture.debugElement.query(By.css('input[name=last_name]')).nativeElement.value = 'dummy';
            fixture.debugElement.query(By.css('input[name=password]')).nativeElement.value = 'dummy@admin.com';
            fixture.debugElement.query(By.css('input[name=certainPassword]')).nativeElement.value = 'dummy@admin.com';
            fixture.debugElement.query(By.css('input[name=email]')).nativeElement.value = 'dummy@admin.com';
            fixture.debugElement.query(By.css('input[name=mobile]')).nativeElement.value = 'xxxxxxxxxx';

            fixture.detectChanges();


            done();
        });

        it('should create', (done) => {
            expect(component).toBeTruthy();
            done();
        });


        describe('RegisterComponent for OrganisationalRepresentative', () => {
            beforeEach((done) => {
              fixture.debugElement.query(By.css('button[name=btnOrganization]')).nativeElement.click();
              fixture.debugElement.query(By.css('button[name=register_user]')).nativeElement.click();
              done();
            });
            it('The role Organization should be selected when btnOrganization is clicked', (done) => {
                fixture.whenStable().then(() => {
                    expect(component.roleSelected).toHaveBeenCalled();
                    expect(component.selected).toEqual(true);
                    expect(component.selectedRole).toEqual('OrganisationalRepresentative'.toUpperCase());
                    done();
                });
            });
            it('should call adduser when Interpreter is selected', (done) => {
                fixture.whenStable().then(() => {
                    let expected = 1;
                    expect(component.addUser).toHaveBeenCalledTimes(expected);
                    expect(component.model.role).toEqual(ROLE.OrganisationalRepresentative);
                    done();
                });

            });

        });


        describe('RegisterComponent for Client', () => {
            beforeEach((done) => {
              fixture.debugElement.query(By.css('button[name=btnClient]')).nativeElement.click();
              fixture.debugElement.query(By.css('button[name=register_user]')).nativeElement.click();
              done();
            });
            it('The role client should be selected when btnClient is clicked', (done) => {

                fixture.whenStable().then(() => {
                    expect(component.roleSelected).toHaveBeenCalled();
                    expect(component.selected).toEqual(true);
                    expect(component.selectedRole).toEqual('IndividualClient'.toUpperCase());
                    done();
                });
            });
            it('should call adduser when Interpreter is selected', (done) => {
                fixture.whenStable().then(() => {
                    let expected = 1;
                    expect(component.addUser).toHaveBeenCalledTimes(expected);
                    expect(component.model.role).toEqual(ROLE.IndividualClient);
                    done();
                });

            });

        });

        describe('RegisterComponent for interpreter', () => {
            beforeEach((done) => {
              fixture.debugElement.query(By.css('button[name=btnInterpreter]')).nativeElement.click();
              fixture.debugElement.query(By.css('button[name=register_user]')).nativeElement.click();
              done();
            });
            it('The role interpreter should be selected when btnInterpreter is clicked', (done) => {
                fixture.whenStable().then(() => {
                    expect(component.roleSelected).toHaveBeenCalled();
                    expect(component.selected).toEqual(true);
                    expect(component.selectedRole).toEqual('Interpreter'.toUpperCase());
                    done();
                });

            });
            it('should call adduser when Interpreter is selected', (done) => {
                fixture.whenStable().then(() => {
                    let expected = 1;
                    expect(component.addUser).toHaveBeenCalledTimes(expected);
                    expect(component.model.role).toEqual(ROLE.Interpreter);
                    done();
                });

            });

        });
    });
});
