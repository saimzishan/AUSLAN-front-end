/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {BookingService} from '../api/booking.service';
import {Booking} from '../shared/model/booking.entity';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {DummyComponent, MockBookingService} from '../shared/test/Mock';
import { RouterTestingModule } from '@angular/router/testing';
import { BookingComponent } from './booking.component';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule }   from '@angular/forms';
import {SpinnerService} from '../spinner/spinner.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { RolePermission } from '../shared/role-permission/role-permission';
import {HttpModule} from '@angular/http';

describe('BookingComponent', () => {
    let component: BookingComponent;
    let fixture: ComponentFixture<BookingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BookingComponent],
            imports: [FormsModule, HttpModule, RouterTestingModule, CustomFormsModule],
            providers: [RolePermission, { provide: BookingService, useClass: MockBookingService },
                SpinnerService, { provide: AuthHttp, useClass: MockBackend }]
        });
    }));

    beforeEach((done) => {
        fixture = TestBed.overrideComponent(BookingComponent, {
            set: {
                template: ''
            }
        }).createComponent(BookingComponent);
        TestBed.compileComponents();
        component = fixture.componentInstance;
        fixture.detectChanges();
        done();
    });

    it('should create', (done) => {
        expect(component).toBeTruthy();
        done();
    });

});
