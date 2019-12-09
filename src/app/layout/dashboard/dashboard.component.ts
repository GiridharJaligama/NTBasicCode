import { Component, OnInit, Input , ChangeDetectorRef, Output, EventEmitter, ViewChild ,ElementRef, Injectable} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {JReportsComponent} from '../../jaspereports.component';
import {SidebarComponent} from '../components/sidebar/sidebar.component';
import { AfterViewInit } from '@angular/core';
import { DemoService } from '../../login/http-service';
import { SharedService } from '../shared-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {LayoutComponent} from '../layout.component' ;
import { Observable } from 'rxjs';

declare var visualize: any;
@Injectable()
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    // selector: 'app-vjs',
    // template: `<div style="margin-top : 10px; font-size:13px;font-weight:bold;font-family:Arial;"> Lost and Found Reports</div>
    // <div id='reportcontainer' style="height:700px" ><img id='load' class='center' visibility='visibility' src='assets/loading.gif'></div>
    // `,
    // styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit , AfterViewInit  {
    // @Input() hero: JReportsComponent ;
    @Output() loaded = new EventEmitter();
    // @ViewChild('f') htmldiv;
    @Input() label = 'test' ;
    // changeDetectorRef: ChangeDetectorRef ;
    public pathdemo: string ;
    ResourceName: string ;
    ResourcePath: string ;
    visibility: string ;
    name: string;
    password: string;
    organization: string;
    h = 2 * (window.innerHeight) + 'px' ;
    htmlstr ;
    types ;
    constructor(private _demoService: DemoService,
        private http: HttpClient , private _sharedservice: SharedService , private changedet: ChangeDetectorRef) {
    }

    ngOnInit() {
    }
    ngAfterViewInit() {

    }
    ngOnChange() {

    }
}
