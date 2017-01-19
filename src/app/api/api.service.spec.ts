/* tslint:disable:no-unused-variable */

import {GLOBAL} from '../shared/global';
import { ApiService } from '../api/api.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
    ResponseOptions,
    Response,
    Http,
    BaseRequestOptions,
    RequestMethod
} from '@angular/http';

import {
    TestBed, fakeAsync, inject, ComponentFixture
} from '@angular/core/testing';

const mockHttpProvider = {
    deps: [ MockBackend, BaseRequestOptions ],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          { provide: Http, useValue: mockHttpProvider },
          MockBackend,
          BaseRequestOptions, ApiService]
    });
});

  it('should ...', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
