import { Component } from '@angular/core';
import {LinkHelper, LINK} from '../../shared/router/linkhelper';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {
  linkName = LINK;
  constructor(public linkHelper: LinkHelper) {}
}
