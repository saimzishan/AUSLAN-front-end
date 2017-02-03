import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ApiService } from './api/api.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { UserService } from './api/user.service';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { EnumValPipe } from './shared/pipe/enum-val.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

export function authService(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
};


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    AdminComponent,
    EnumValPipe,
    NotFoundComponent,
  ], exports: [EnumValPipe],
  imports: [CustomFormsModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],  providers: [ApiService, UserService, {
      provide: AuthHttp,
      useFactory: authService,
      deps: [Http, RequestOptions]
    }],

  bootstrap: [AppComponent],
})
export class AppModule {
  /*constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }*/
 }
