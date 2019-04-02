import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from "@angular/common"
import { ChartModule } from 'angular-highcharts';
import { NgDatepickerModule } from 'ng2-datepicker';



import {SchooldashboardComponent} from "./schooldashboard.component";
import {SchooldashboardRoutingModule} from "./schooldashboard-routing.module";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ChartModule,
    NgDatepickerModule,
    SchooldashboardRoutingModule
  ],
  declarations: [ SchooldashboardComponent ],


})
export class SchooldashboardModule { }
