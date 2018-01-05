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

    handlePreference(backupPrefferedAllocations, selectedInterpreter, isPreffered, action) {
        /*
        * Check whether the interpreter is already in the list. If yes, then apply action (delete, undelete, change preference)
        */
        let retPrefferedAllocations = [];
        let interpreterExists = backupPrefferedAllocations.filter(i => i.interperter_id === selectedInterpreter.interpreter_id).length > 0;
        switch (action) {
            case 'delete':
                if (interpreterExists) {
                    /* Remove from API */
                    selectedInterpreter._destroy = 1;
                } else {
                    /* Remove locally*/
                    retPrefferedAllocations.filter(i => i.interperter_id === selectedInterpreter.interpreter_id);
                }
                break;
            case 'add':
                if (interpreterExists) {
                    /* Add in API */
                    selectedInterpreter._destroy = 0;
                } else {
                    /* Add in locally*/
                    retPrefferedAllocations.push(selectedInterpreter);
                }
                break;
        }

        return retPrefferedAllocations;

    }

}
