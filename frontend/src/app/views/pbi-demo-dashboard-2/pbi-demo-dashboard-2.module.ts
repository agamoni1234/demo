import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common"
import { ChartModule } from 'angular-highcharts';
import { NgDatepickerModule } from 'ng2-datepicker';

import { PBIDemoDashboard2Component } from './pbi-demo-dashboard-2.component';
import { PBIDemoDashboard2RoutingModule } from './pbi-demo-dashboard-2-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ChartModule,
    NgDatepickerModule,
    PBIDemoDashboard2RoutingModule
  ],
  declarations: [ PBIDemoDashboard2Component ]
})
export class PBIDemoDashboard2Module { }
