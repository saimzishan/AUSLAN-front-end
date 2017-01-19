import { Component } from '@angular/core';

import {GLOBAL} from './shared/global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = GLOBAL.TITLE + GLOBAL.VERSION;

}
