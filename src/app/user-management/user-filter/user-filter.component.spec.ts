/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFilterComponent } from './user-filter.component';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';

describe('UserFilterComponent', () => {
  let component: UserFilterComponent;
  let fixture: ComponentFixture<UserFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFilterComponent ],
      imports: [FormsModule, RouterTestingModule, CustomFormsModule, MaterialModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
