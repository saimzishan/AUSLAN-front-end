import { Component, Input, OnInit } from '@angular/core';
import { OrganisationalRepresentative } from '../../shared/model/user.entity';

@Component({
  selector: 'app-org-rep',
  templateUrl: './org-rep.component.html',
  styleUrls: ['./org-rep.component.css']
})
export class OrgRepComponent {
  @Input() userModel: OrganisationalRepresentative;
}
