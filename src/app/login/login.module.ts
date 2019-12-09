import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Injectable} from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DemoService} from './http-service';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { Globals } from '../../assets/String/globalvariables';
// import {InterceptorModule} from './interceptor.module';
@NgModule({
    imports: [CommonModule, LoginRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule ],
    declarations: [LoginComponent],
    providers: [DemoService, Globals],
})

@Injectable()
export class LoginModule {
    constructor() {}
}
