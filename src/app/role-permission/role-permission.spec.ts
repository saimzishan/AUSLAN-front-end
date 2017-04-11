import { TestBed, inject } from '@angular/core/testing';
import { RolePermission } from './role-permission';
import { Http, XHRBackend, HttpModule, Response, ResponseOptions } from '@angular/http';


describe('RolePermission', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RolePermission],
            imports: [HttpModule]
        });
    });

    it('should have valid  object', inject([RolePermission, Http], (service: RolePermission, http: Http) => {
        expect(service).toBeTruthy();
    }));
    describe('RolePermission methods', () => {
        let role_service: RolePermission = new RolePermission(null);
        beforeEach(() => {
            role_service.loadDefaultData();
        });
        it('should have valid permissions', () => {
            expect(role_service.permissions).toBeTruthy();
        });
        it('Default Route for an existing default role', () => {
            expect(role_service.getDefaultRoute('admin')).toEqual('user-management');
        });
        it('Default Route for an existing role', () => {
            expect(role_service.getDefaultRoute('booking-officer')).toEqual('booking-management');
        });
        it('Default Route for an non - existing role', () => {
            expect(role_service.getDefaultRoute('interpreters')).toEqual('user-management');
        });

        it('The restricted route should report restricted', () => {
            expect(role_service.isRestrictedRoute('interpreters', 'booking-management')).toEqual(true);
        });

        it('The non restricted route should not report restricted ', () => {
            expect(role_service.isRestrictedRoute('interpreters', 'user-management')).toEqual(false);
        });

        it('The route with data permission for existing owner should be readonly ', () => {
            expect(role_service.isDataReadOnly('interpreters', 'user-management', 'admin')).toEqual(true);
        });

        it('The route with data permission for non-existing owner should report ', () => {
            expect(role_service.isDataReadOnly('interpreters', 'user-management', 'booking-officer')).toEqual(false);
        });

        it('The route with non existing data permission should be not readonly ', () => {
            expect(role_service.isDataReadOnly('booking-officer', 'user-management', 'admin')).toEqual(false);
        });
    });
});
