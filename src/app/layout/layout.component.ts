import { Component, OnInit , AfterViewInit, ViewChild} from '@angular/core';
import { SharedService } from './shared-service';
import { DemoService } from '../login/http-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../../assets/String/globalvariables';
import {DashboardComponent} from './dashboard/dashboard.component' ;
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    providers: [SharedService, DashboardComponent],
})
export class LayoutComponent implements OnInit , AfterViewInit {
    SelectedReport ;
    links ;
    links1 = [] ;
    types;
    // private dashboard = sessionStorage.getItem('dashboard') ;
    dashboardslist ;
    // @ViewChild(DashboardComponent) dash;
    constructor(private _demoService: DemoService , private dash: DashboardComponent , private _globals: Globals) {}
    ngOnInit() {
        // Get the list of the Reports in Lost and Found
        let reportliststring = '';
        this.dashboardslist = this._globals.dashboard1 ;
        if (sessionStorage.getItem('rep') == null) {
        this.dashboardslist.forEach(dashboard => {
            let modifiedlinks = Array();
            this._demoService.getreportslist(dashboard['Path']).subscribe(
                (data: Response) => {
                    if (data['resourceLookup']) {
                        reportliststring = '';
                        // let modifientlinks = Array();
                        this.links = data['resourceLookup'] ;
                        console.log(data['resourceLookup']) ;
                        this.links.forEach(element => {
                            const val = element['label'] ;
                          //  if ( !['Month', 'Year' , 'Quarter' , 'Week'].includes(val) ) {
                                // let temp1 = element ;
                                if (element['description']) {
                                if (element['description'].includes('#M#')) {
                                    if (element['description'].includes('#D#')) {
                                        var desc= element['description'];    
                                        const temp = desc.substring(desc.lastIndexOf("#D#"),desc.lastIndexOf("#/D#")) ;
                                        console.log(temp) ;
                                        if (temp.length === 2) {
                                            const types = temp.split(',') ;
                                            console.log(types) ;
                                            element['reporttype'] = []  ;
                                            // this.links.forEach( itr2element => {
                                            //     if ( itr2element['label'] === val && !itr2element['description'].includes('#M') ) {
                                            //         types.forEach( type => {
                                            //             if (itr2element['uri'].includes(type) ) {
                                            //                 element['reporttype'].push({'type': type , 'uri' : itr2element['uri']}) ;
                                            //             }
                                            //         }) ;
                                            //     }
                                            // }) ;
                                            types.forEach( type => {
                                                let found = false ;
                                                this.links.forEach( itr2element => {
                                                    if ( itr2element['label'] === val && !itr2element['description'].includes('#M') ) {
                                                        if (itr2element['uri'].includes(type) ) {
                                                             found = true ;
                                            element['reporttype'].push({'type': type , 'uri' : itr2element['uri'] , 'checked' : ''}) ;
                                                                        }
                                                   }   }) ;
                                                if (found === false ) {
                                                element['reporttype'].push({'type': type , 'uri' : element['uri'], 'checked' : 'checked'}) ;
                                                }
                                            }) ;


                                        }
                                    }
                                    modifiedlinks.push(element) ;
                                } }
                            //}
                        });
                        this.links = modifiedlinks ;
                        this._demoService.drawResource(this.links[0]['uri']) ;
                        this.SetSelectedReport(this.links[0]['label']) ;
                    } else {
                        alert('Something went wrong') ;
                    }
                },
                response => {
                    console.log(response);
                    console.log(response.status);
                    if (response.status === 401) {
                    }
                }
            );
            this.links1.push({'FolderName' : dashboard['FolderName'] , 'dashboardlist': modifiedlinks}) ;

        });
        console.log(this.links1) ;
    } else {
        this.links = JSON.parse(sessionStorage.getItem('rep')) ;
        console.log(this.links) ;
        let modifiedlinks = Array();
                    this.links.forEach(element => {
                        const val = element['label'] ;
                        if ( !['Month', 'Year' , 'Quarter' , 'Week'].includes(val) ) {
                            modifiedlinks.push(element) ;
                        }

                    });
        this.links = modifiedlinks ;
        this._demoService.drawResource(sessionStorage.getItem('defaultreport')) ;
        this.SetSelectedReport(this.links[0]['label']) ;

    }
    }
    ngAfterViewInit() {
        // this.SetSelectedReport(this.links[0]['label']) ;
    }
    SetSelectedReport(name ) {
        this.SelectedReport = name ;
        this.links.forEach(element => {
            if (element['label'] === name ) {
                  this.types = element['reporttype'] ;
            // console.log(types) ;
            // console.log(label) ;
            }
        });
    }
    RetrieveReports1( Resourcepath , Reportname) {
        this.SetSelectedReport(Reportname) ;
        document.getElementById('reportcontainer').innerHTML = `
        <img id='load' style='display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;' visibility='visibility' src='assets/loading.gif'>`;
        // console.log(radios.nodeValue) ;
        this._demoService.drawResource(Resourcepath);
    }
}
