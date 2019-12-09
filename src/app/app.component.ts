import { Component, OnInit, Directive } from '@angular/core';
// import {VisualizeJS} from './vjs.main.component';
import {Globals} from '../assets/String/globalvariables';
import {test1} from '../exp.js' ;
@Component({
    selector: 'app-root',
    // directives: [VisualizeJS],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {
        // test1.test() ;
    }
}
