/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {HttpModule} from '@angular/http';
import { UserHeaderComponent } from './user-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import {LinkHelper, LinkAuth} from '../../shared/router/linkhelper';
import {RolePermission} from '../../shared/role-permission/role-permission';

describe('UserHeaderComponent', () => {
  let component: UserHeaderComponent;
  let fixture: ComponentFixture<UserHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHeaderComponent ],
      imports: [RouterTestingModule, HttpModule],
      providers: [LinkHelper, LinkAuth, RolePermission]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
