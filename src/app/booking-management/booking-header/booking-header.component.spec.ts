import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookingHeaderComponent} from './booking-header.component';
import {BookingHeaderService} from './booking-header.service';
import {ViewContainerRef} from '@angular/core';
import {MaterialModule, MdDialog} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {CustomFormsModule} from 'ng2-validation';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {Md2Module} from 'md2';

describe('BookingHeaderComponent', () => {
    let component: BookingHeaderComponent;
    let fixture: ComponentFixture<BookingHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BookingHeaderComponent],
            providers: [MdDialog,
                ViewContainerRef, BookingHeaderService],
            imports: [CustomFormsModule,
                FormsModule, BrowserAnimationsModule, RouterTestingModule, HttpModule,
                Md2Module.forRoot(),
                MaterialModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookingHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
