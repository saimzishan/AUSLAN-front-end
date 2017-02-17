import {AuthGuard} from './auth.guard';
import {ReflectiveInjector} from '@angular/core';
import {Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../shared/model/user.entity';

let sampleTok = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY';
sampleTok = sampleTok + '3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

describe('AuthGuardService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthGuard, { provide: Router, useClass: RouterStub }],
            imports: [RouterTestingModule]
        });
    });

    it('user should be logged out by default',
        // inject your guard
        async(inject([AuthGuard], (auth: AuthGuard) => {
          let val: boolean = AuthGuard.isLoggedIn();
        expect(val).toEqual(false);
    })));

    it('user should login if token and email is there',
        // inject your guard
        async(inject([AuthGuard], (auth: AuthGuard) => {
        let u =  new User({token: sampleTok,
              id: 2, email: 'admin1@aus.au', name: 'Joe Doe 2',
              password: 'secure_password'
          });
        AuthGuard.login(u);
        expect(AuthGuard.isLoggedIn()).toEqual(true);
      })));

    it('user should logout',
        // inject your guard
        async(inject([AuthGuard], (auth: AuthGuard) => {
        AuthGuard.logout();
        expect(AuthGuard.isLoggedIn()).toEqual(false);
    })));

    it('checks if a user is valid',
        // inject your guard service AND Router
        async(inject([AuthGuard, Router], (auth: AuthGuard, router: Router) => {

            let spyNavigation = spyOn(router, 'navigate');
            let state = {url: 'lalala'};
            expect(auth.canActivate(<any>{}, <any>state)).toBeFalsy();

            expect(spyNavigation).toHaveBeenCalledWith(['/authenticate'], { queryParams: { returnUrl: state.url } });

        })));
});
class RouterStub {
    navigate(routes: string[]) {
        // do nothing
    }
}
