import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {JReportsComponent} from '../../jaspereports.component';
// import {RoundProgressModule} from 'angular-svg-round-progressbar';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    imports: [CommonModule, DashboardRoutingModule ],
    declarations: [DashboardComponent, JReportsComponent]
})
export class DashboardModule {}
