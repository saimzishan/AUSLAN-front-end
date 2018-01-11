import {Component, OnInit, Input} from '@angular/core';
import {BookingService} from '../../api/booking.service';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'app-linkid-popup',
    templateUrl: './linkid-popup.component.html',
    styleUrls: ['./linkid-popup.component.css']
})
export class LinkidPopupComponent implements OnInit {
    selectedLinkId: number;
    availableLinkIds: Array<number|string> = ['New linked booking'];
    @Input() bookingId: number;

    constructor(private bookingService: BookingService, private dialogRef: MdDialogRef<LinkidPopupComponent>) {
    }

    ngOnInit() {
        this.bookingService.getAvailableLinkIds(this.bookingId)
            .subscribe((res: any) => {
                this.availableLinkIds.push(...res.data.link_ids.map(obj => obj.link_id));
            });
    }

    closeDialog(val) {
        this.dialogRef.close(val ? this.selectedLinkId : val);
    }
}
