import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReportsComponent} from './reports.component';
import {NotificationServiceBus} from '../notification/notification.service';
import {NgForm} from '@angular/forms';
import {FormsModule}   from '@angular/forms';
import {CalendarModule as PrimeNgCalendarModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsComponent ],
      imports: [FormsModule, PrimeNgCalendarModule, BrowserAnimationsModule],
      providers: [NotificationServiceBus]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
