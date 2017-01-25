import { Injectable } from '@angular/core';
import {Response} from '@angular/http';

@Injectable()
export class UserService {


    sayHello(url: string) {
      // Makes a synchronous request
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url + '/sayHello', false);
      xhr.send();
      let out = JSON.parse(xhr.responseText).reply;
      return out;
    };
  constructor() { }

}
