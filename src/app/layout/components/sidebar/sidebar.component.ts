import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit , Output, EventEmitter, Injectable} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DemoService } from '../../../login/http-service';
import {LayoutComponent} from '../../layout.component' ;
import { SharedService } from '../../shared-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../../../../assets/String/globalvariables';
import { Form, NgForm } from '@angular/forms';
declare var visualize: any;
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {
    @Input() links: Array<any> = [];
    public User: String;
   private SelectedReport: string;
    // @ViewChild('f1') private ren1: ElementRef;
    // @ViewChild('f')  ren;
    isActive: boolean = false;
    showMenu: string = '';
    firsttime = true ;
    private dashboard = sessionStorage.getItem('dashboard') ;
    pushRightClass: string = 'push-right';
    constructor(
        private translate: TranslateService,
        public router: Router,
        private _demoService: DemoService,
        private _lay: LayoutComponent,
        private http: HttpClient ,
    ) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(
            browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en'
        );
        if (sessionStorage.getItem('isLoggedin') !== 'true') {
            this.router.navigate(['login/']);
        }
        // this.links = this._lay.links ;
        /////// Get Report List Ends here. we assign it to the links variable
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }
    ngAfterViewInit() {
        // this._lay.SetSelectedReport(sessionStorage.getItem('firstReport')) ;
    }
    eventCalled() {
        this.isActive = !this.isActive;
    }
    RetrieveReports( Resourcepath , Reportname) {
        this._lay.SetSelectedReport(Reportname) ;
        this.firsttime =  false ;
        console.log(this.firsttime) ;
        document.getElementById('reportcontainer').innerHTML = `
        <img id='load' style='display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;' visibility='visibility' src='assets/loading.gif'>`;
        // console.log(radios.nodeValue) ;
        this._demoService.drawResource(Resourcepath);
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    doSomething() {
        const elems = document.querySelectorAll('nav li');

        [].forEach.call(elems, function(el) {
            el.className = el.classList.toggle('smart') ;
        });
    }

    onLoggedout() {
        sessionStorage.removeItem('isLoggedin');
        // sessionStorage.removeItem('reportList');
        sessionStorage.removeItem('username');
        // sessionStorage.removeItem('defaultreport');
        // sessionStorage.removeItem('currentreport');
        sessionStorage.removeItem('org');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('dashboard');
        sessionStorage.clear();
        sessionStorage.clear();
    }

}
