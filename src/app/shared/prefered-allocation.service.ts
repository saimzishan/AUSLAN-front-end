import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';


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

    handlePreference(backupPrefferedAllocations, currentInterpreterID, isEditBooking, action) {
        /*
        * Check whether the interpreter is already in the list. If yes, then apply action (delete, undelete, change preference)
        */
        let retPrefferedAllocations = backupPrefferedAllocations;
        let interpreterExists = backupPrefferedAllocations.filter(i => i.interperter_id === currentInterpreterID).length > 0;
        switch (action) {
            case 'delete':
                if (interpreterExists) {
                    /* Remove from API */
                } else {
                    /* Remove locally*/
                }
                break;
            case 'add':
                if (interpreterExists) {
                    /* Add in API */
                } else {
                    /* Add in locally*/
                }
                break;
        }

        return retPrefferedAllocations;

    }

}
