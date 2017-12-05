import { Component, OnInit, Input } from '@angular/core';
import { IndividualClient } from '../../shared/model/user.entity';
import {GLOBAL} from '../../shared/global';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-ind-client',
  templateUrl: './ind-client.component.html',
  styleUrls: ['./ind-client.component.css']
})
export class IndClientComponent   implements  OnInit {

  @Input() userModel: IndividualClient;
  @Input() canCalculateDistance: boolean;
  address_title = 'INDIVIDUAL CLIENT ADDRESS';
  ngOnInit() {
    delete this.userModel.password;

  }

}
