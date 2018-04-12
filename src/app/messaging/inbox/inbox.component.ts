import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {URLSearchParams} from '@angular/http';
import {SpinnerService} from '../../spinner/spinner.service';
import {RolePermission} from '../../shared/role-permission/role-permission';
import {GLOBAL} from '../../shared/global';
import {IndividualClient, Interpreter, OrganisationalRepresentative, User} from '../../shared/model/user.entity';
import {Booking} from '../../shared/model/booking.entity';
import {BookingInterpreter} from '../../shared/model/contact.entity';
import {BOOKING_STATE} from '../../shared/model/booking-state.enum';
import {UserService} from '../../api/user.service';
import {MessagingService} from '../../api/messaging.service';
import {NotificationServiceBus} from '../../notification/notification.service';
import {PlatformLocation} from '@angular/common';
import {Administrator, BookingOfficer} from '../../shared/model/user.entity';
import {ActivatedRoute, Router} from '@angular/router';
import {PerfectScrollbarComponent, PerfectScrollbarConfigInterface, PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.component.html',
    styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, OnDestroy {

    messageThreads = [];
    userId;
    message_body = '';
    message_thread_id;
    message_tag = '';
    checked = false;
    isTagShow = false;
    messages;
    loginUserID = -1;
    business_id = -1;
    sub;
    messageThreadPage = 1;
    messagePage = 1;
    totalItems = 0;
    selectedMessageThread = 0;
    messageCount = -1;
    searchInterpreterQuery = '';
    showLoadMore = false;
    draftMessage;
    public config: PerfectScrollbarConfigInterface = {};

    @ViewChild(PerfectScrollbarComponent) componentScroll: PerfectScrollbarComponent;

    constructor(private userService: UserService, private notificationServiceBus: NotificationServiceBus, public platformLocation: PlatformLocation,
                private messagingService: MessagingService, private _location: Location, public spinnerService: SpinnerService,
                private rolePermission: RolePermission, private router: Router, private route: ActivatedRoute) {
                    if (localStorage.getItem('message')) {
                        this.draftMessage = JSON.parse(localStorage.getItem('message'));
                        this.userId = +this.draftMessage.user_id;
                        this.message_body = this.draftMessage.text;
                        this.selectedMessageThread = +this.draftMessage.selected_message_thread;
                        this.message_thread_id = this.draftMessage.thread_id;
                        this.messageThreadPage = this.draftMessage.thread_page_no;
                        this.getInterpreterMessage(this.message_thread_id);
                    }
    }

    ngOnInit() {
        this.business_id = GLOBAL.currentUser.business_id;
        this.sub = this.route.params.subscribe(params => {
            this.loginUserID = params['id'] || -1;
            if (this.loginUserID > 0) {
                this.isTagShow = Boolean(params['id2']);
                if (this.isTagShow) {
                    this.message_tag = params['id2'];
                }
            }
            if (this.isCurrentUserAdminOrBookingOfficer()) {
                this.getAllMessageThreads(this.business_id);
            } else {
                this.getInterpreterMessages();
            }
        });
    }

    loadMore() {
        this.messagePage += 1;
        if (this.isCurrentUserAdminOrBookingOfficer()) {
            this.getInterpreterMessage(this.message_thread_id);
        } else {
            this.getInterpreterMessages();
        }
    }
    scrollReachedAtTop() {
        this.showLoadMore = true;
    }
    scrollReachedAtBottom() {
        this.showLoadMore = false;
    }
    getInterpreterMessages() {
        let id = this.isCurrentUserAdminOrBookingOfficer() ? this.userId : this.loginUserID;
        this.spinnerService.requestInProcess(true);
        this.messagingService.getInterpreterMessages(id, this.messagePage)
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        this.messageCount = res.data.messages_count;
                        this.messages = res.data.messages.reverse();
                        setTimeout(() => {
                            this.componentScroll.directiveRef.scrollToBottom();
                            this.spinnerService.requestInProcess(false);
                        }, 500);

                    }
                },
                errors => {
                    this.spinnerService.requestInProcess(false);
                    let e = errors.json();
                    this.notificationServiceBus.launchNotification(true, e);
                });
    }

    getInterpreterMessage(id) {
        this.spinnerService.requestInProcess(true);
        this.messagingService.getInterpreterMessage(id, this.business_id, this.messagePage)
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        this.messageCount = res.data.messages_count;
                        this.messages = res.data.messages.reverse();
                        setTimeout(() => {
                            this.componentScroll.directiveRef.scrollToBottom();
                            this.spinnerService.requestInProcess(false);
                        }, 500);

                    }
                },
                errors => {
                    this.spinnerService.requestInProcess(false);
                    let e = errors.json();
                    this.notificationServiceBus.launchNotification(true, e);
                });
    }


    getAllMessageThreads(businessId) {
        this.spinnerService.requestInProcess(true);
        this.messagingService.allMessageThreads(businessId, this.messageThreadPage, this.searchInterpreterQuery)
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        this.messageThreads = res.data.message_threads;
                        this.totalItems = res.data.message_threads_count;
                        if (!localStorage.getItem('message') && this.totalItems > 0) {
                            this.selectedMessageThread = 0;
                            this.userId = this.messageThreads[this.selectedMessageThread].user_id;
                            this.message_thread_id = this.messageThreads[this.selectedMessageThread].id;
                            this.getInterpreterMessage(this.message_thread_id);
                        }
                    }
                    this.spinnerService.requestInProcess(false);
                },
                errors => {
                    this.spinnerService.requestInProcess(false);
                    let e = errors.json();
                    this.notificationServiceBus.launchNotification(true, e);
                });
    }
    searchInterpreter() {
        this.messageThreadPage = 0;
        this.messageThreads = [];
        this.totalItems = 0;
        this.selectedMessageThread = 0;
        this.userId = 0;
        this.message_thread_id = 0;
        this.messages = []
        this.getAllMessageThreads(this.business_id);
    }

    sendMessage() {
        let id = Boolean(this.userId) ? this.userId : this.loginUserID;
        let url = (this.platformLocation as any).location.href;
        url = url.substr(0, 30);
        url += id + '/inbox';
        this.spinnerService.requestInProcess(true);
        this.message_body = this.message_body.trim();
        let message_tag = '';
        if (this.isCurrentUserAdminOrBookingOfficer()) {
            let arr = this.message_body.split(' ');
            let probablyTag = this.message_body.length > 0 && this.message_body.startsWith('#') &&
            Boolean(arr) && arr.length > 0 && !isNaN(parseInt(arr[0].replace('#', ''), 10));
            message_tag = probablyTag ?
                arr[0].replace('#', '') : '';
        } else {
            message_tag = this.isTagShow && parseInt(this.message_tag, 10) > 0 ?
                this.message_tag : '';
        }
        this.messagingService.sendMessages(this.loginUserID, url, this.message_body,
            this.userId, message_tag)
            .subscribe((res: any) => {
                if (res.status === 200) {
                    this.notificationServiceBus.launchNotification(false, 'Message sent successfully..');
                    this.message_body = '';
                    if (this.isCurrentUserAdminOrBookingOfficer()) {
                        this.getInterpreterMessage(this.message_thread_id);
                    } else {
                        this.getInterpreterMessages();
                    }
                }
                this.spinnerService.requestInProcess(false);
            }, errors => {
                this.spinnerService.requestInProcess(false);
                let e = errors.json();
                this.notificationServiceBus.launchNotification(true, e);
            });
    }

    showSingleMessageThread(index) {
        this.message_body = this.selectedMessageThread !== index ? '' : this.message_body;
        this.selectedMessageThread = index;
        this.userId = this.messageThreads[index].user_id;
        this.message_thread_id = this.messageThreads[index].id;
        this.getInterpreterMessage(this.message_thread_id);

    }

    saveMessageOfThread() {
        if (this.message_body === '' || this.message_body === null) {
            localStorage.removeItem('message');
        } else {
            localStorage.setItem('message',
            `{"user_id": "` + this.userId + `","text": "` + this.message_body + `",
            "selected_message_thread": "` + this.selectedMessageThread + `",
            "thread_id": "` + this.message_thread_id + `","thread_page_no": "` + this.messageThreadPage + `"}`);
        }
    }

    checkEmpty() {
        if (this.message_body.trim().length === 0) {
            this.message_body = null;
        }
    }

    hasTag(message) {
        return Boolean(message.tag) && message.tag.length > 1;
    }

    onTagClicked(message_tag) {
        let route = GLOBAL.currentUser instanceof Interpreter || GLOBAL.currentUser instanceof OrganisationalRepresentative
        || GLOBAL.currentUser instanceof IndividualClient
            ? 'job-detail' : 'booking-job';
        this.router.navigate(['/booking-management/' + message_tag, route]);
    }

    getMessage(message) {
        let ind = message.indexOf('#');
        let messageTag = message.substring(ind + 1, message.length);
        return messageTag;
    }

    isCurrentUserAdminOrBookingOfficer(): boolean {
        return Boolean(GLOBAL.currentUser instanceof Administrator || GLOBAL.currentUser instanceof BookingOfficer);
    }

    backClicked() {
        this._location.back();
    }

    ngOnDestroy() {
        localStorage.setItem('bookingId', '-1');
        this.saveMessageOfThread();
    }

    checkDayIsToday(lastMesgDate) {
        let curentDate = new Date();
        let curentDay = curentDate.getDate();
        let lastMesgDay = lastMesgDate.substring(8, 10);
        return (+lastMesgDay === curentDay);
    }

    getPage(page: number) {
        this.messageThreadPage = page;
        this.getAllMessageThreads(this.business_id);
    }
    clear() {
        this.searchInterpreterQuery = '';
        this.searchInterpreter();
    }

}
