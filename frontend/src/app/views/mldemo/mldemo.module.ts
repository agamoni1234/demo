import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common"
import { ChartModule } from 'angular-highcharts';
import { NgDatepickerModule } from 'ng2-datepicker';
import { TagCloudModule } from 'angular-tag-cloud-module';

import { AgmCoreModule } from '@agm/core';

import {MlComponent} from "./mldemo.component";
import {MlRoutingModule} from "./mldemo-routing.module";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ChartModule,
    NgDatepickerModule,
    MlRoutingModule,
    TagCloudModule
  ],
  declarations: [ MlComponent ],


})
export class MlModule { }
