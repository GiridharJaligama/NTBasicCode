import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DemoService } from './http-service';
import { Globals } from '../../assets/String/globalvariables';
import { NgForm, NgModel } from '@angular/forms';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    public reportList: Array<Array<any>> = [];
    public jaspersite;
    public loginurl;
    public dashboard;
    private isvalidlogin;
    // @ViewChild('f') form;
    org='Alaska';
    pass='';
    name='';
    environment='DEV';
    saved = false;
    // @ViewChild('org') org: ElementRef;
    // @ViewChild('name') name: ElementRef;
    // @ViewChild('password') pass: ElementRef;
    private Organization: string;
    private username: string;
    private password: string;
    private env: string;
    constructor(
        public router: Router,
        private _demoService: DemoService,
        private http: HttpClient,
        private globals: Globals
    ) {
        this.reportList = globals.ReportList;
        this.jaspersite = globals.jaspersite;
        this.loginurl = globals.loginurl;
        this.dashboard = globals.dashboard;
        this.isvalidlogin = false;
    }

    ngOnInit() {}

    onLoggedin() {
       this.saved = true;
       if(this.name !=='' && this.pass !==''){
        const form={
            userName:this.name,
            password:this.pass,
            tenant:this.org + '_' + this.environment,
            environment:this.environment
        }
        console.log(form)
        document.getElementById('submit').style.visibility = 'hidden';
        document.getElementById('loader').innerHTML = `
        <img id='load' style='display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;height:100px' visibility='visibility' src='assets/login-load.gif'>`;
        this.Organization = window.btoa(form.tenant);
        this.username = window.btoa(form.userName);
        this.password = window.btoa(form.password) ;
        this.env = window.btoa(form.environment);

        sessionStorage.setItem('username', this.username);
        sessionStorage.setItem('password', this.password);
        sessionStorage.setItem('org', this.Organization);
        sessionStorage.setItem('env', form.environment);
        sessionStorage.setItem('dashboard', this.dashboard) ;

        // // Make Login REST API request and on succesfull response navigate to Dashboard
        this._demoService
            .login(
                this.loginurl,
                this.username,
                this.password,
                this.Organization,
                this.env
            )
            .subscribe(
                data => {
                    // console.log(data);
                    sessionStorage.setItem('isLoggedin', 'true');
                    console.log('leaving');
                    this.router.navigate(['dashboard/']);
                    // return true;
                },
                res => {
                    console.log(res);
                    if (res.status === 401) {
                        document.getElementById('ValidUP').innerHTML =
                            ' Please enter valid Username and Password.';
                        document.getElementById('submit').style.visibility =
                            'visible';
                    }
                    if (res.status === 200) {
                        sessionStorage.setItem('isLoggedin', 'true');
                        this.router.navigate(['dashboard/']);
                    }
                }
            );
    }
}
}