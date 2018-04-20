import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-termandcondition',
  templateUrl: './termandcondition.component.html',
  styleUrls: ['./termandcondition.component.css']
})
export class TermandconditionComponent implements OnInit {
    @Input() termsAndConditionAccepted = false;
    @Output() termAndConditionStatusChange = new EventEmitter<boolean>();
    public tNc = '';

    constructor(public platformLocation: PlatformLocation) {}

    ngOnInit() {
        this.setTnCUrl();
    }
    onChange() {
        this.termAndConditionStatusChange.emit(this.termsAndConditionAccepted);
    }

    setTnCUrl() {
        if ((this.platformLocation as any).location.origin.toString() === 'https://auslanconnections.vicdeaf.com.au') {
          this.tNc = 'https://s3-ap-southeast-2.amazonaws.com/auslan-public-bucket/Auslan_Online_Terms_And_Conditions_Vicdeaf.pdf';
        } else {
          this.tNc = 'https://s3-ap-southeast-2.amazonaws.com/auslan-public-bucket/Auslan_Online_Terms_And_Conditions_DSQ.pdf';
        }
      }
}
