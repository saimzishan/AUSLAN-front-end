/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, ViewContainerRef} from '@angular/core';
import { Md2Module }  from 'md2';
import {Booking} from '../../shared/model/booking.entity';
import {BookingService} from '../../api/booking.service';
import { BOOKING_NATURE } from '../../shared/model/booking-nature.enum';
import { PARKING } from '../../shared/model/parking.enum';
import { EnumValPipe } from '../../shared/pipe/enum-val.pipe';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {MaterialModule, MdDialog} from '@angular/material';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {DummyComponent, FakeOpMapsAPILoader, MockBookingService, MockUserService} from '../../shared/test/Mock';
import { RouterTestingModule } from '@angular/router/testing';
import { BookingComponent } from '../booking.component';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule }   from '@angular/forms';
import {SpinnerService} from '../../spinner/spinner.service';
import { BookingDetailComponent } from './booking-detail.component';
import {NotificationServiceBus} from '../../notification/notification.service';
import { ActivatedRoute, Data } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RolePermission } from '../../shared/role-permission/role-permission';
import { DatePipe } from '@angular/common';
import {NgForm} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {FileuploaderModule} from '../../shared/fileuploader/fileuploader.module';
import {AddressComponent} from '../../ui/address/address.component';
import {BillingAccountComponent} from '../../ui/billing-account/billing-account.component';
import {TermandconditionComponent} from '../../ui/termandcondition/termandcondition.component';
import {BookingHeaderComponent} from '../booking-header/booking-header.component';
import {InterpreterBoxComponent} from '../../shared/ui/interpreter-box/interpreter-box.component';
import {InterpreterPopupComponent} from '../../shared/ui/interpreter-popup/interpreter-popup.component';
import {UserService} from '../../api/user.service';
import {PreferedAllocationService} from '../../shared/prefered-allocation.service';
import {BookingHeaderService} from '../booking-header/booking-header.service';
import {GmapsApiService} from '../../api/gmaps-api.service';
import {RemoveSpacePipe} from '../../shared/pipe/remove-space.pipe';
import {AutoCompleteModule, CalendarModule as PrimeNgCalendarModule} from 'primeng/primeng';
import {MapsAPILoader} from '@agm/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { GLOBAL } from "../../shared/global";
import { Administrator } from "../../shared/model/user.entity";

describe('BookingDetailComponent', () => {
    let component: BookingDetailComponent;
    let fixture: ComponentFixture<BookingDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BookingDetailComponent, EnumValPipe, AddressComponent,
                BillingAccountComponent, TermandconditionComponent, BookingHeaderComponent,
                InterpreterBoxComponent, InterpreterPopupComponent, RemoveSpacePipe
            ],
            imports: [CustomFormsModule, FileuploaderModule, NgxPaginationModule,
                FormsModule, BrowserAnimationsModule, RouterTestingModule, HttpModule,
                Md2Module.forRoot(),
                MaterialModule, PrimeNgCalendarModule, AutoCompleteModule
            ],  providers: [MdDialog,
                ViewContainerRef,
                DatePipe, RolePermission, PreferedAllocationService, BookingHeaderService,
                NotificationServiceBus, { provide: BookingService, useClass: MockBookingService },
                { provide: UserService, useClass: MockUserService }, { provide: MapsAPILoader, useClass: FakeOpMapsAPILoader},
                SpinnerService, { provide: AuthHttp, useClass: MockBackend }, GmapsApiService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: {
                            subscribe: (fn: (value: Data) => void) => fn({
                                bookingModel: ''
                            })
                        }
                    }
                }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookingDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should save the file name correctly when upload of file is complete', () => {
        component.fileName = 'test.png';
        component._handleReaderLoaded({ 'target': { 'result': 'BASE64encode'}});
        expect(component.bookingModel.documents_attributes[0]).toEqual({ document: 'BASE64encode', document_file_name: 'test.png' });
    });

    it('should raise a warning if not enough interpreters are mentioned', () => {
        const nowDate = Date.now();
        component.bookingStartTime = new Date(nowDate);
        component.bookingEndTime = new Date(nowDate + (2 * 1000 * 60 * 60));
        GLOBAL.currentUser = new Administrator({});
        GLOBAL.currentUser.business_name = 'Vicdeaf';
        expect(component.isMoreInterpreterNeeded()).toEqual(true);
    });
});
