import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { MobileHeaderComponent } from './mobile-header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpModule} from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { MockBackend } from '@angular/http/testing';

describe('MobileHeaderComponent', () => {
  let component: MobileHeaderComponent;
  let fixture: ComponentFixture<MobileHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileHeaderComponent ],
        imports: [RouterTestingModule, HttpModule],
      providers: [{ provide: AuthHttp, useClass: MockBackend }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
