import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
//import 'rxjs/add/operator/map';
import {User} from '../shared/model/user.entity'


@Injectable()
export class ApiService {

  users: User[] = [];
  constructor(private http: Http) {

	}

	addNewUser() {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');

    var newUser = new User('Admin1', 'Joe Doe', 'this is very secure password','this is very secure password');

		this.http
			.post('http://localhost:8080/api/user', JSON.stringify(newUser), headers)
			.map(res => res.json())
			.subscribe(
				data => this.users.push(data),
				err => this.logError(err),
				() => console.log('Updated User')
			);
	}

	saveUser(user: User) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http
			.post('http://localhost:8080/api/user', JSON.stringify(user), headers)
			.map(res => res.json())
			.subscribe(
				null,
				err => this.logError(err),
				() => console.log('Updated User')
			);
	}

	deleteUser(user: User) {
		this.http
			.delete('http://localhost:8080/api/user/' + user._id)
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
			.get('http://localhost:8080/api/user')
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
      .get('http://localhost:8080/api/user/' + id)
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
