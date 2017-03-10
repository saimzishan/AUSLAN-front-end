import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingHeaderComponent } from './booking-header.component';

describe('BookingHeaderComponent', () => {
  let component: BookingHeaderComponent;
  let fixture: ComponentFixture<BookingHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
