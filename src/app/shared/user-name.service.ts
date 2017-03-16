import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { User }    from './model/user.entity';


@Injectable()
export class UserNameService {

  // Observable string sources
  loggedInUser = new Subject<User>();
  // Observable string streams
  loggedInUser$ = this.loggedInUser.asObservable();
  // Service message commands
  setLoggedInUser(user: User) {
    this.loggedInUser.next(user);
  }

}
