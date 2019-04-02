import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common"
import { ChartModule } from 'angular-highcharts';
import { NgDatepickerModule } from 'ng2-datepicker';

import { DemoDashboard1Component } from './demo-dashboard-1.component';
import { DemoDashboard1RoutingModule } from './demo-dashboard-1-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ChartModule,
    NgDatepickerModule,
    DemoDashboard1RoutingModule
  ],
  declarations: [ DemoDashboard1Component ]
})
export class DemoDashboard1Module { }
