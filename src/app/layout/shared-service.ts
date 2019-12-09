import {Injectable} from '@angular/core';
@Injectable()
export class SharedService {
    CurrentReportLabel: string ;

    setCurrentReportLabel(data: string) {
        this.CurrentReportLabel = data ;
    }

}
