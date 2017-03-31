import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingJobsComponent } from './booking-jobs.component';

describe('BookingJobsComponent', () => {
  let component: BookingJobsComponent;
  let fixture: ComponentFixture<BookingJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
