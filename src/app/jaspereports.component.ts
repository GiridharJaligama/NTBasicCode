import { Component, Attribute, Input } from '@angular/core';
import { DemoService } from './login/http-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var visualize: any;

@Component({
    selector: 'app-vjs',
    template: `<div id='reportcontainer' style="height:700px" ><img id='load' class='center' visibility='visibility' src='assets/loading.gif'></div>
    `,
    styleUrls: ['./jasperreports.component.scss']
})
export class JReportsComponent {
    ResourceName: string;
    ResourcePath: string;
    name: string;
    password: string;
    organization: string;
    // @Input()
    // path: string;
    constructor(private _demoService: DemoService,
        private http: HttpClient ) {
        this.ResourcePath = sessionStorage.getItem('defaultreport');
        console.log('JJ' + this.ResourcePath);
        // this.drawResource(this.ResourcePath);
        this._demoService.drawResource(this.ResourcePath);
    }
}
