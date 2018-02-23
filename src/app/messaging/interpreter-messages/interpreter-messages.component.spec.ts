import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterMessagesComponent } from './interpreter-messages.component';

describe('InterpreterMessagesComponent', () => {
  let component: InterpreterMessagesComponent;
  let fixture: ComponentFixture<InterpreterMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpreterMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
