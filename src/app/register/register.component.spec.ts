/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {RegisterComponent} from './register.component';
import {NotificationComponent} from '../notification/notification.component';
import {RequestOptions} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {UserService} from '../api/user.service';
import {Observable} from 'rxjs/Observable';
import {FormsModule}   from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {HttpModule, Http, BaseRequestOptions} from '@angular/http';
import {ROLE} from '../shared/model/role.enum';
import {SpinnerComponent} from '../spinner/spinner.component';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {MockUserService, MockModule, DummyComponent} from '../shared/test/Mock';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationServiceBus} from '../notification/notification.service';
import {SimpleNotificationsModule} from 'angular2-notifications';

import {OrgRepComponent} from '../ui/org-rep/org-rep.component';
import {InterpreterComponent} from '../ui/interpreter/interpreter.component';
import {AddressComponent} from '../ui/address/address.component';
import {IndClientComponent} from '../ui/ind-client/ind-client.component';
import {BillingAccountComponent} from '../ui/billing-account/billing-account.component';
import {AccountantComponent} from '../ui/accountant/accountant.component';
import {MaterialModule} from '@angular/material';
import {IndividualClient, Interpreter, OrganisationalRepresentative, User} from '../shared/model/user.entity';


describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterComponent, NotificationComponent,
                OrgRepComponent, InterpreterComponent, AddressComponent,
                IndClientComponent, BillingAccountComponent, AccountantComponent],
            imports: [FormsModule, MaterialModule,
                CustomFormsModule, SimpleNotificationsModule.forRoot(),
                RouterTestingModule],
            providers: [NotificationServiceBus,
                {provide: UserService, useClass: MockUserService}, {provide: AuthHttp, useClass: MockBackend}]
        }).compileComponents();
    }));

    describe('RegisterComponent', () => {
        beforeEach((done) => {
            fixture = TestBed.createComponent(RegisterComponent);
            component = fixture.componentInstance;
            component.model = new User();
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
            it('should call adduser when OrganisationalRepresentative is selected', (done) => {
                component.selectedRole = 'ORGANISATIONAL';
                let org = new OrganisationalRepresentative();
                component.model = org;
                component.model.role = ROLE.Organisational;
                fixture.debugElement.query(By.css('button[name=register_user]')).nativeElement.click();

                fixture.whenStable().then(() => {
                    expect(component.addUser).toHaveBeenCalled();
                    expect(component.model.role).toEqual(ROLE.Organisational);
                    done();
                });

            });

        });


        describe('RegisterComponent for Client', () => {
            it('should call adduser when IndividualClient is selected', (done) => {
                component.selectedRole = 'INDIVIDUALCLIENT';
                let ic = new IndividualClient;
                component.model = ic;
                component.model.role = ROLE.IndividualClient;
                fixture.debugElement.query(By.css('button[name=register_user]')).nativeElement.click();

                fixture.whenStable().then(() => {
                    expect(component.addUser).toHaveBeenCalled();
                    expect(component.model.role).toEqual(ROLE.IndividualClient);
                    done();
                });

            });

        });

        describe('RegisterComponent for interpreter', () => {
            it('should call adduser when Interpreter is selected', (done) => {
                component.selectedRole = 'INTERPRETER';
                let int = new Interpreter();
                component.model = int;
                component.model.role = ROLE.Interpreter;
                fixture.debugElement.query(By.css('button[name=register_user]')).nativeElement.click();

                fixture.whenStable().then(() => {
                    expect(component.addUser).toHaveBeenCalled();
                    expect(component.model.role).toEqual(ROLE.Interpreter);
                    done();
                });

            });

        });
    });
});
