import { Component, AfterViewChecked } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})

export class JobDetailComponent implements AfterViewChecked {

  ngAfterViewChecked() {
        $(document).foundation();
    }
}
