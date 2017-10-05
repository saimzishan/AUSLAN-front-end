import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class PreferedAllocationService {

    // Observable Array sources
    private interpreterList = new Subject<Array<any>>();

    // Observable Array streams
    interpreterStream$ = this.interpreterList.asObservable();

    // Service  commands
    publishData(data: Array<any>) {
        this.interpreterList.next(data);
    }
}
