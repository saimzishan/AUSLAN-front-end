/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserNameService } from './user-name.service';
import {PreferedAllocationService} from './prefered-allocation.service';

describe('PreferedAllocationService', () => {
    let prefAllocationBackup = [];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PreferedAllocationService]
        });
    });

    it('should exists', inject([PreferedAllocationService],
        (service: PreferedAllocationService) => {
        expect(service).toBeTruthy();
    }));

    it('should remove the prefered interpreter locally', inject([PreferedAllocationService],
        (service: PreferedAllocationService) => {

        service.handlePreference(prefAllocationBackup, 2, false, 'delete');

    }));
    it('should remove the blocked interpreter locally', inject([PreferedAllocationService],
        (service: PreferedAllocationService) => {

            service.handlePreference(prefAllocationBackup, 2, false, 'delete');

        }));
    it('should remove the prefered interpreter from api', inject([PreferedAllocationService],
        (service: PreferedAllocationService) => {

            service.handlePreference(prefAllocationBackup, 2, false, 'delete');

        }));
    it('should remove the prefered interpreter from api', inject([PreferedAllocationService],
        (service: PreferedAllocationService) => {

            service.handlePreference(prefAllocationBackup, 2, false, 'delete');

        }));

    it('should add the prefered interpreter locally', inject([PreferedAllocationService],
        (service: PreferedAllocationService) => {

            service.handlePreference(prefAllocationBackup, 2, false, 'add');

        }));
    it('should add the blocked interpreter locally', inject([PreferedAllocationService],
        (service: PreferedAllocationService) => {

            service.handlePreference(prefAllocationBackup, 2, false, 'add');

        }));
    it('should add the prefered interpreter from api', inject([PreferedAllocationService],
        (service: PreferedAllocationService) => {

            service.handlePreference(prefAllocationBackup, 2, false, 'add');

        }));

    it('should add the blocked interpreter from api', inject([PreferedAllocationService],
        (service: PreferedAllocationService) => {

            service.handlePreference(prefAllocationBackup, 2, false, 'add');

        }));

    it('should change preference from prefered to blocked', inject([PreferedAllocationService],
        (service: PreferedAllocationService) => {

            service.handlePreference(prefAllocationBackup, 2, false, 'add');

        }));

    it('should change preference to prefered from blocked', inject([PreferedAllocationService],
        (service: PreferedAllocationService) => {

            service.handlePreference(prefAllocationBackup, 2, false, 'add');

        }));
    it('should add multiple prefered interpreters to already existing interpreters, remove one of them locally and from api', inject([PreferedAllocationService],
        (service: PreferedAllocationService) => {

            service.handlePreference(prefAllocationBackup, 2, false, 'add');

        }));
    it('should add prefered interpreters to already existing interpreters, ' +
        'should add blocked interpreters , remove one from prefered locally', inject([PreferedAllocationService],
        (service: PreferedAllocationService) => {

            service.handlePreference(prefAllocationBackup, 2, false, 'add');

        }));

});
