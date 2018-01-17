import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileHeaderComponent } from './mobile-header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpModule} from '@angular/http';

describe('MobileHeaderComponent', () => {
  let component: MobileHeaderComponent;
  let fixture: ComponentFixture<MobileHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileHeaderComponent ],
        imports: [RouterTestingModule, HttpModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
