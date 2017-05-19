import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndClientComponent } from './ind-client.component';

describe('IndClientComponent', () => {
  let component: IndClientComponent;
  let fixture: ComponentFixture<IndClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
