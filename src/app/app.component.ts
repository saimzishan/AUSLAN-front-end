import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {GLOBAL} from './shared/global';
import {AuthGuard} from './auth/auth.guard';
import { SpinnerService } from './spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isRequesting: boolean;

  public constructor(private spinnerService: SpinnerService, private titleService: Title ) {
    this.titleService.setTitle(GLOBAL.TITLE + GLOBAL.VERSION);
    spinnerService.requestInProcess$.subscribe(
      isDone => {
        this.isRequesting = isDone;
      });
  }

  isLoggedIn() {
    return AuthGuard.isLoggedIn();
  }

  showProgress(val: boolean) {
    this.isRequesting = val;
  }
}
