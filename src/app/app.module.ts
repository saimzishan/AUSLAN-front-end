import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http,HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    BaseRequestOptions,
     MockBackend,
     {
       provide: Http,
       deps: [MockBackend, BaseRequestOptions],
       useFactory: (backend, options) => { return new Http(backend, options); }
     }],
  bootstrap: [AppComponent]
})
export class AppModule { }
