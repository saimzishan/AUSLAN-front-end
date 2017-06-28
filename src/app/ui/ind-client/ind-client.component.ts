import { Component, OnInit, Input } from '@angular/core';
import { IndividualClient } from '../../shared/model/user.entity';
import {GLOBAL} from '../../shared/global';

@Component({
  selector: 'app-ind-client',
  templateUrl: './ind-client.component.html',
  styleUrls: ['./ind-client.component.css']
})
export class IndClientComponent   implements  OnInit {

  @Input() userModel: IndividualClient;
  address_title = 'INDIVIDUAL CLIENT ADDRESS';
  ngOnInit() {
    /*
    this.userModel.ndis_validity_start_date = GLOBAL.fixDateFormat(this.userModel.ndis_validity_start_date);
    this.userModel.ndis_validity_end_date = GLOBAL.fixDateFormat(this.userModel.ndis_validity_end_date);

    this.userModel.eaf_start_date = GLOBAL.fixDateFormat(this.userModel.eaf_start_date);
    this.userModel.eaf_end_date = GLOBAL.fixDateFormat(this.userModel.eaf_end_date);
    */
    delete this.userModel.password;

  }

}
