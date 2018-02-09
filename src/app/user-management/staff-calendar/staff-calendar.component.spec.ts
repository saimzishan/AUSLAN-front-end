import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarModule } from 'ap-angular2-fullcalendar';
import { MobileHeaderComponent } from '../../ui/mobile-header/mobile-header.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { StaffCalendarComponent } from './staff-calendar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CustomFormsModule } from 'ng2-validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserHeaderComponent } from '../user-header/user-header.component';
import { InterpreterComponent } from '../../ui/interpreter/interpreter.component';
import { LinkHelper, LinkAuth } from '../../shared/router/linkhelper';
import { AddressComponent } from '../../ui/address/address.component';
import { RolePermission } from '../../shared/role-permission/role-permission';
import { DatePipe } from '@angular/common';

describe('StaffCalendarComponent', () => {
  let component: StaffCalendarComponent;
  let fixture: ComponentFixture<StaffCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaffCalendarComponent, AddressComponent, MobileHeaderComponent, UserHeaderComponent, InterpreterComponent ],
      providers: [LinkHelper, LinkAuth, RolePermission, DatePipe],
      imports: [HttpModule, CalendarModule, FormsModule, MaterialModule, RouterTestingModule, CustomFormsModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
