import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterPopupComponent } from './interpreter-popup.component';

describe('InterpreterPopupComponent', () => {
  let component: InterpreterPopupComponent;
  let fixture: ComponentFixture<InterpreterPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpreterPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
