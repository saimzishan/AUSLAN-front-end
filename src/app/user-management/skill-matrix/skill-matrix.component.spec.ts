import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillMatrixComponent } from './skill-matrix.component';
import {EnumValPipe} from '../../shared/pipe/enum-val.pipe';
import {CustomFormsModule} from 'ng2-validation';
import {MaterialModule} from '@angular/material';
import {UserHeaderComponent} from '../user-header/user-header.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {LinkAuth, LinkHelper} from '../../shared/router/linkhelper';
import {RolePermission} from '../../shared/role-permission/role-permission';
import {HttpModule} from '@angular/http';
import {SpinnerService} from '../../spinner/spinner.service';
import {NotificationServiceBus} from '../../notification/notification.service';
import {UserService} from '../../api/user.service';
import {MockUserService} from '../../shared/test/Mock';
import {AuthHttp} from 'angular2-jwt';
import {MockBackend} from '@angular/http/testing';
import {Interpreter} from '../../shared/model/user.entity';


describe('SkillMatrixComponent', () => {
  let component: SkillMatrixComponent;
  let fixture: ComponentFixture<SkillMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillMatrixComponent, UserHeaderComponent, EnumValPipe ]
      ,
      imports: [CustomFormsModule, MaterialModule, HttpModule,
        FormsModule, RouterTestingModule
      ],
      providers: [LinkAuth, LinkHelper, RolePermission,
        { provide: UserService, useClass: MockUserService},
        { provide: AuthHttp, useClass: MockBackend},
        NotificationServiceBus,
        SpinnerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillMatrixComponent);
    component = fixture.componentInstance;
    component.userModel = new Interpreter();
    component.userModel.first_name = 'A';
    component.userModel.last_name = 'B';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
