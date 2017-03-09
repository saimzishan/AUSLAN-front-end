/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, ViewContainerRef } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {UserDetailComponent} from '../user-detail/user-detail.component';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { UserService } from '../../api/user.service';
import { MockUserService } from '../../shared/test/Mock';
import {  MdDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {  Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';
import {User} from '../../shared/model/user.entity';
import {ROLE} from '../../shared/model/role.enum';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailComponent ],
      imports: [FormsModule, MdDialogModule, CustomFormsModule, MaterialModule],
      providers: [MdDialogRef, { provide: UserService, useClass: MockUserService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Testing Add User', () => {
      beforeEach((done) => {
          spyOn(component, 'addUser').and.callThrough();

          fixture.debugElement.query(By.css('input[name=first_name]')).nativeElement.value = 'dummy';
          fixture.debugElement.query(By.css('input[name=last_name]')).nativeElement.value = 'dummy';
          fixture.debugElement.query(By.css('input[name=password]')).nativeElement.value = 'dummy@admin.com';
          fixture.debugElement.query(By.css('input[name=certainPassword]')).nativeElement.value = 'dummy@admin.com';
          fixture.debugElement.query(By.css('input[name=email]')).nativeElement.value = 'dummy@admin.com';

          let select = fixture.debugElement.query(By.css('select[name=role]')).nativeElement;


          select.value = 'Accountant';
          dispatchEvent(select, 'change');
          fixture.detectChanges();
          fixture.debugElement.query(By.css('button[name=add_user]')).nativeElement.click();

          done();
      });
      it('should call the add User Api', (done) => {
          fixture.whenStable().then(() => {
              let expected = 1;
              expect(component.addUser).toHaveBeenCalledTimes(expected);
              done();
          });

      });

  });


  describe('Testing Edit User', () => {
      beforeEach((done) => {
          spyOn(component, 'editUser').and.callThrough();

          fixture.detectChanges();

          let select = fixture.debugElement.query(By.css('section[name=list_user]')).nativeElement;

          select.value = 'Accountant';
          dispatchEvent(select, 'change');
          fixture.detectChanges();
          fixture.debugElement.query(By.css('button[name=edit_user]')).nativeElement.click();
          done();
      });
      it('should call the edit User Api', (done) => {
          fixture.whenStable().then(() => {
              let expected = 1;
              expect(component.editUser).toHaveBeenCalledTimes(expected);
              done();
          });

      });

  });


  describe('Testing removeUser ', () => {
      beforeEach((done) => {
          spyOn(component, 'updateStatus').and.callThrough();

          fixture.detectChanges();

          let select = fixture.debugElement.query(By.css('section[name=list_user]')).nativeElement;

          select.value = 'Accountant';
          dispatchEvent(select, 'change');
          fixture.detectChanges();
          fixture.debugElement.query(By.css('button[name=del_user]')).nativeElement.click();
          done();

      });
      it('should call the remove User Api', (done) => {
          fixture.whenStable().then(() => {
              let expected = 1;
              expect(component.updateStatus).toHaveBeenCalledTimes(expected);
              done();
          });

      });

  });
});
