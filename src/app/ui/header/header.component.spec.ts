/* tslint:disable:no-unused-variable */
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject, ComponentFixture, async } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { DummyComponent, RouterStub} from '../../shared/test/Mock';
import {APP_BASE_HREF} from '@angular/common';
import { AuthComponent } from '../../auth/auth.component';

describe('component: TestComponent', function() {
    beforeEach(() => {

      TestBed.configureTestingModule({
        declarations: [HeaderComponent],
            imports: [RouterTestingModule]
        }).compileComponents();
    });
    describe('HeaderComponent Create', () => {
        let component: HeaderComponent;
        let fixture: ComponentFixture<HeaderComponent>;
        beforeEach(() => {
            fixture = TestBed.createComponent(HeaderComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });
});
