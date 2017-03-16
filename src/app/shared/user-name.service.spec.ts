/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserNameService } from './user-name.service';

describe('UserNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserNameService]
    });
  });

  it('should ...', inject([UserNameService], (service: UserNameService) => {
    expect(service).toBeTruthy();
  }));
});
