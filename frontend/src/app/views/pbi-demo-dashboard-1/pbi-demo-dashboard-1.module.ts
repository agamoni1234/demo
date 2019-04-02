import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common"
import { ChartModule } from 'angular-highcharts';
import { NgDatepickerModule } from 'ng2-datepicker';

import { PBIDemoDashboard1Component } from './pbi-demo-dashboard-1.component';
import { PBIDemoDashboard1RoutingModule } from './pbi-demo-dashboard-1-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ChartModule,
    NgDatepickerModule,
    PBIDemoDashboard1RoutingModule
  ],
  declarations: [ PBIDemoDashboard1Component ]
})
export class PBIDemoDashboard1Module { }
