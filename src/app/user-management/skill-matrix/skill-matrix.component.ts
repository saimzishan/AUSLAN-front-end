import {Component, OnInit} from '@angular/core';
import {BA, BOOKING_NATURE} from '../../shared/model/booking-nature.enum';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../api/user.service';
import {NotificationServiceBus} from '../../notification/notification.service';
import {SpinnerService} from '../../spinner/spinner.service';
import {Interpreter} from '../../shared/model/user.entity';

@Component({
    selector: 'app-skill-matrix',
    templateUrl: './skill-matrix.component.html',
    styleUrls: ['./skill-matrix.component.css']
})
export class SkillMatrixComponent implements OnInit {
    raw_nature_of_appointment: string;
    appointment_types = Object.keys(BOOKING_NATURE).filter(value => value === BOOKING_NATURE[value]
        || BOOKING_NATURE[value].startsWith(value)).map(v => BOOKING_NATURE[v]) as string[];
    levels = ['1', '2', '3', 'n/a'];
    specific_appointment_types = [];
    doSave = false;
    sub;
    userModel: Interpreter;
    current_level = '';

    constructor(public spinnerService: SpinnerService,
                public notificationServiceBus: NotificationServiceBus,
                private route: ActivatedRoute, private userService: UserService) {
        BA.loadItems();
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let param_id = params['id'] || '';
            if (Boolean(param_id) && parseInt(param_id, 10) > 0) {
                this.getInterpreterDetail(param_id);
            }
        });
    }

    getInterpreterDetail(param_id) {
        this.spinnerService.requestInProcess(true);
        this.userService.getUser(param_id)
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        this.userModel = res.data;
                        this.natureOfApptChange('Human Services');

                    }
                    this.spinnerService.requestInProcess(false);
                },
                err => {
                    this.spinnerService.requestInProcess(false);
                    let e = err.json() || 'There is some error on server side';
                    this.notificationServiceBus.launchNotification(true, e);
                });
    }


    skillChanged(level: string, raw_specific_booking_type: string) {

        this.current_level = level !== this.current_level ? '' : this.current_level;

        let assignment = this.userModel.assignments_attributes.filter(a => a.assignment_type_category_name
            === this.raw_nature_of_appointment
            && a.assignment_type_name === raw_specific_booking_type);
        if (Boolean(assignment) && assignment.length > 0) {
            assignment[0].level = level === 'n/a' ? 0 : parseInt(level, 10);
            this.doSave = true;
        }
    }

    aokChanged(level: string) {

        let assignments = this.userModel.assignments_attributes.filter(a => a.assignment_type_category_name
            === this.raw_nature_of_appointment);
        if (Boolean(assignments) && assignments.length > 0) {
            for (let ass of assignments) {
                ass.level = level === 'n/a' ? 0 : parseInt(level, 10);
                this.doSave = true;
            }
        }
        this.current_level = level;
    }

    isAOKChecked(level: string) {

        return this.current_level === level;
    }

    isChecked(level: string, raw_specific_booking_type: string) {
        if (Boolean(this.userModel.assignments_attributes)) {

            let assignment = this.userModel.assignments_attributes.filter(a => a.assignment_type_category_name
                === this.raw_nature_of_appointment
                && a.assignment_type_name === raw_specific_booking_type);
            return (Boolean(assignment) && assignment.length > 0 ) && (assignment[0].level.toString() === level
                || (level === 'n/a' && assignment[0].level === 0));
        }
        return false;
    }

    natureOfApptChange(value) {

        this.raw_nature_of_appointment = value;
        let val: BOOKING_NATURE = <BOOKING_NATURE> BOOKING_NATURE[this.raw_nature_of_appointment];
        this.specific_appointment_types = BA.DISSCUSSION_ITEM[BOOKING_NATURE[val]];
        this.specific_appointment_types.forEach((item, index) => {
            this.specific_appointment_types[index] = item.replace(/\s?\(Please specify\s?(?:length)? in Notes\)/, '');
        });
        this.current_level = '';
    }

    apply(val: boolean) {
        if (!val) {
            location.reload();
        } else {
            this.spinnerService.requestInProcess(true);

            this.userService.updateUser(this.userModel)
                .subscribe((res: any) => {
                        if (res.status === 200) {
                            // UI Notification
                            this.spinnerService.requestInProcess(false);
                            this.notificationServiceBus.launchNotification(false, 'User details updated Successfully');
                        }
                    },
                    (err) => {
                        this.spinnerService.requestInProcess(false);
                        this.notificationServiceBus.launchNotification(true, err);
                    });
        }
    }
}
