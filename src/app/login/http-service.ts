import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
declare var visualize: any;
@Injectable()
export class DemoService {
    public jaspersite ;
    public loginurl ;
    public dashboard ;
    private name;
    private env;
    private org;
    private pass;
    htmlstr;
    constructor(private http: HttpClient  ) {
        this.name = sessionStorage.getItem('username');
        this.pass = sessionStorage.getItem('password');
        this.org = sessionStorage.getItem('org');
        this.htmlstr = sessionStorage.getItem('htmlstr') ;
    }

    // REST API call for Login
    login(loginurl, Username, Password, Organization, environment) {
        const body = 'j_username=shruthi|westjet' +  '&' + 'j_password=shruthi' ;
       // console.log(body);
       this.name = Username ;
       this.org =  Organization ;
       this.env = environment;
       this.pass =  Password ;
       
        // const params = new HttpParams().set('j_username', window.atob(this.name) + '|' + window.atob(this.org) + '_' + window.atob(this.env)).set('j_password', window.atob( this.pass)) ;
        const params = new HttpParams().set('j_username', window.atob(this.name) + '|' + window.atob(this.org)).set('j_password', window.atob( this.pass)) ;
        const httpOptions = {
              headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'accept': 'application/json'}),
              params: params
        };
        return this.http.get(loginurl, httpOptions ) ;

    }

    // REST API call for Reportlist
    getreportslist(dashboard) {
        this.env = sessionStorage.getItem('env');
        console.log(this.env) ;
//         const params = new HttpParams().set('j_username', window.atob( this.name) + '|' + window.atob(this.org) + '_' +sessionStorage.getItem('env')).set('j_password', window.atob( this.pass));
         const params = new HttpParams().set('j_username', window.atob( this.name) + '|' + window.atob(this.org)).set('j_password', window.atob( this.pass));
         const httpOptions = {
               headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'accept': 'application/json'}) ,
                 params: params
         };
       
        return this.http.get(dashboard, httpOptions);
    }

    public drawResource(path: string) {
        let result = '' ;
        if (path != null) {

        result = visualize(
            {
                auth: {
                    name: window.atob( this.name ),
                    password: window.atob(this.pass),
                    organization: window.atob( this.org)
                }
            },
            function(v) {
                const dashboard = v.dashboard({
                    resource: path.trim(),
                    runImmediately: false
                });

                dashboard
                    .run()
                    .done(function() {
                        this.container('#reportcontainer')
                            .render()
                            .done(function() {
                                console.log('dashboard rendered');
                            })
                            .fail(function(e) {
                                //  alert(e);
                                document.getElementById('reportcontainer').innerHTML = 'Unable to render the report. Please retry' ;
                            });
                    })
                    .fail(function(e) {
                        // alert(e);
                        document.getElementById('reportcontainer').innerHTML = ' Unable to render the report. Please retry' ;
                    });
            }
        );
    } else {
        document.getElementById('reportcontainer').innerHTML = ' Unable to render the report. Please retry' ;
    }
    return result ;
    }

    DisplayOptions() {
        return this.htmlstr ;
    }

}
