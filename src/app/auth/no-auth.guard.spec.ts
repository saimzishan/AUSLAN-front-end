import { NoAuthGuard } from './no-auth.guard';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { User } from '../shared/model/user.entity';
import { RouterStub } from '../shared/test/Mock';
import { RolePermission } from '../shared/role-permission/role-permission';
import { HttpModule, Http, RequestOptions } from '@angular/http';


let sampleTok = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY';
sampleTok = sampleTok + '3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

describe('AuthGuardService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NoAuthGuard, { provide: Router, useClass: RouterStub }],
            imports: [RouterTestingModule, HttpModule]
        });
    });

    it('user should always return true',
        // inject your guard
        async(inject([NoAuthGuard], (auth: NoAuthGuard) => {
            let val: boolean = auth.canActivate(null, null);
            expect(val).toEqual(true);
        })));

    it('user should always return true',
        // inject your guard
        async(inject([NoAuthGuard], (auth: NoAuthGuard) => {
            let u = new User({
                token: sampleTok,
                id: 2, email: 'admin1@aus.au', name: 'Joe Doe 2',
                password: 'secure_password'
            });
            AuthGuard.login(u);
            expect(AuthGuard.isLoggedIn()).toEqual(true);
            let val: boolean = auth.canActivate(null, null);
            expect(AuthGuard.isLoggedIn()).toEqual(false);
        })));

});
