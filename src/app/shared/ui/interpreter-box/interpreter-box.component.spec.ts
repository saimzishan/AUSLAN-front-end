import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterBoxComponent } from './interpreter-box.component';

describe('InterpreterBoxComponent', () => {
  let component: InterpreterBoxComponent;
  let fixture: ComponentFixture<InterpreterBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpreterBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
