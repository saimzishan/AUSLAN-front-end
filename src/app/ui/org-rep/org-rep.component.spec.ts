import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgRepComponent } from './org-rep.component';

describe('OrgRepComponent', () => {
  let component: OrgRepComponent;
  let fixture: ComponentFixture<OrgRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
