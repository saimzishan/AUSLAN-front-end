import { Component } from '@angular/core';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';


import { ApiService } from './api/api.service';
import {User} from './shared/model/user.entity'
import {ROLE} from './shared/model/role.enum'

// globally loaded lodash
declare let _: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  private mock_db: User[] = [
    new User('admin@aus.au', 'Jane Doe', 'mockme', 'mockme', ROLE.SITE_ADMIN )
  ];

  constructor(private service: ApiService, private backend: MockBackend)
  {
    this.backend.connections.subscribe( c => {

        let singleUserMatcher = /\/api\/User\/([0-9]+)/i;

        // return all Users
        // GET: /User
        if (c.request.url === "http://localhost:8080/api/user" && c.request.method === 0) {
          let res = new Response(new ResponseOptions({
            body: JSON.stringify(this.mock_db)
          }));

          c.mockRespond(res);
        }
        // return User matching the given id
        // GET: /User/:id
        else if (c.request.url.match(singleUserMatcher) && c.request.method === 0) {
          let matches = this.mock_db.filter( (u) => {
            return u._id == c.request.url.match(singleUserMatcher)[1]
          });

          c.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(matches[0])
          })));
        }
        // Add or update a User
        // POST: /User
        else if (c.request.url === 'http://localhost:8080/api/user' && c.request.method === 1) {
          let newUser: User = JSON.parse(c.request._body);

          let existingUser = this.mock_db.filter( (u: User) => { return u._id == newUser._id});
          if (existingUser && existingUser.length === 1) {
            Object.assign(existingUser[0], newUser);

            c.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(existingUser[0])
            })));
          } else {
            newUser._id = parseInt(_.max(this.mock_db, function(t) {
              return t._id;
            })._id || 0, 10) + 1;

            this.mock_db.push(newUser);

            c.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(newUser)
            })));
          }
        }
        // Delete a User
        // DELETE: /User/:id
        else if (c.request.url.match(singleUserMatcher) && c.request.method === 3) {
          let UserId = c.request.url.match(singleUserMatcher)[1];
          let pos = _.indexOf(_.pluck(this.mock_db, '_id'), UserId);

          this.mock_db.splice(pos, 1);

          c.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify({})
          })));
        }

      });
  }

  public ngOnInit(){
    this.service.loadAllUsers();
  }
}
