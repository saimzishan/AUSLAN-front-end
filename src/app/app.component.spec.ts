/* tslint:disable:no-unused-variable */

import { AppComponent } from './app.component';
import {GLOBAL} from './shared/global';
import { AuthComponent } from './auth/auth.component';
import {
    ResponseOptions,
    Response,
    Http, HttpModule,
    BaseRequestOptions,
    RequestMethod
} from '@angular/http';
import {UserService} from './api/user.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import {
    TestBed, fakeAsync, async, inject
} from '@angular/core/testing';

import { FormsModule }   from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { EnumValPipe } from './shared/pipe/enum-val.pipe';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AuthComponent,
        DashboardComponent,
        AdminComponent, EnumValPipe
      ],  providers: [UserService], imports: [CustomFormsModule,  HttpModule,  FormsModule
  ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title as declared in GLOBAL`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(GLOBAL.TITLE + GLOBAL.VERSION);
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(GLOBAL.TITLE);
  }));
});
