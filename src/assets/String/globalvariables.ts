
//    public let Reportlist;
//    let ReportList: Array<Array<any>> = [];
import { Injectable } from '@angular/core';

   @Injectable()
   export class Globals {
    ReportList;
    username: string;
    password: string;
    organization: string ;
    jaspersite = 'https://reports-testing.nettracer.aero/advanced/';
    loginurl = this.jaspersite + 'rest_v2/login';
    dashboard = 'https://reports-testing.nettracer.aero/advanced/rest_v2/resources?folderUri=/public/LostAndFound_'+sessionStorage.getItem('env')+'/Dashboards' ;
    dashboard1 = [ {'FolderName' : 'Lost And Found',
                    'Path' : 'https://reports-testing.nettracer.aero/advanced/rest_v2/resources?folderUri=/public/LostAndFound_'+sessionStorage.getItem('env')+'/Dashboards'},
                  ] ;

   }
