import { Injectable } from '@angular/core';
import {Response} from '@angular/http';

@Injectable()
export class UserService {


    sayHello(url: string): Promise<XMLHttpRequest> {
      // Makes a synchronous request
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url + '/sayHello', false);
      xhr.send();
      return Promise.resolve(xhr);
    };
  constructor() { }

}
