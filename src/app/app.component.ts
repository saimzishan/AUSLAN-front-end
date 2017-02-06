import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {GLOBAL} from './shared/global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public constructor(private titleService: Title ) {
    this.titleService.setTitle(GLOBAL.TITLE + GLOBAL.VERSION);
  }

}
