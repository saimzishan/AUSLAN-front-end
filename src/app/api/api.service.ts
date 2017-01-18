import { Injectable } from '@angular/core'
import {Http, Headers} from '@angular/http'
import {User} from '../shared/model/user.entity'
import {ROLE} from '../shared/model/role.enum'
import {GLOBAL} '../shared/global'
import 'rxjs/add/operator/map';


@Injectable()
export class ApiService {

  users: User[] = [];
  constructor(private http: Http, private headers: Headers) {
    headers.append('Content-Type', 'application/json');
	}

	addNewUser() {

    let newUser = new User('Admin1', 'Joe Doe', 'this is very secure password','this is very secure password', ROLE.SHITTY_DEVELOPER);

		this.http
			.post(GLOBAL.USER_API, JSON.stringify(newUser), this.headers)
			.map(res => res.json())
			.subscribe(
				data => this.users.push(data),
				err => this.logError(err),
				() => console.log('Updated User')
			);
	}

	editUser(user: User) {
			this.http
			.post(GLOBAL.USER_API, JSON.stringify(user), this.headers)
			.map(res => res.json())
			.subscribe(
				null,
				err => this.logError(err),
				() => console.log('Updated User')
			);
	}

	deleteUser(user: User) {
		this.http
			.delete(GLOBAL.USER_API + user._id)
			.map(res => res.text())
			.subscribe(
				data => {
					var midx = -1;

					this.users.forEach( (t, idx) => {
						if (t._id == user._id) {
							midx = idx;
						}
					});

					this.users.splice(midx, 1);
				},
				err => this.logError(err),
				() => console.log('Request for all users completed successfully')
			);
	}

	loadAllUsers() {
		this.http
			.get(GLOBAL.USER_API)
			.map(res => {
        return res.json()
      })
			.subscribe(
				data => {
          this.users = data;
        },
				err => this.logError(err),
				() => console.log("Loaded all users")
			);
	}

  loadUserById(id) {
    this.http
      .get(GLOBAL.USER_API + id)
      .map(res => res.json())
      .subscribe(
        data => this.users = [data],
        err => this.logError(err),
        () => console.log("Loaded user with id " + id)
      );
  }

	logError(err) {
		console.error('There was an error: ' + err);
	}

}
