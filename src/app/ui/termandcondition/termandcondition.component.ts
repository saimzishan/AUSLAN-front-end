import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-termandcondition',
  templateUrl: './termandcondition.component.html',
  styleUrls: ['./termandcondition.component.css']
})
export class TermandconditionComponent {
    @Input() termsAndConditionAccepted = false;
    @Output() termAndConditionStatusChange = new EventEmitter<boolean>();

    onChange() {
        this.termAndConditionStatusChange.emit(this.termsAndConditionAccepted);
    }
}
