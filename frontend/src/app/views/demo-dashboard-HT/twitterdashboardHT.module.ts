import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { ChartsModule } from 'ng2-charts/ng2-charts';
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from "@angular/common"
import { ChartModule } from 'angular-highcharts';
import { NgDatepickerModule } from 'ng2-datepicker';
import { TagCloudModule } from 'angular-tag-cloud-module';

import { AgmCoreModule } from '@agm/core';
// import { BubbleChartModule } from '@opitzconsulting/bubble-chart';

// import { NavController } from 'ionic-angular';

// import * as highmaps from 'highcharts/modules/map.src';


import {TwitterdashboardHTComponent} from "./twitterdashboardHT.component";
import {TwitterdashboardHTRoutingModule} from "./twitterdashboardHT-routing.module";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ChartModule,
    // BubbleChartModule,
    NgDatepickerModule,
    TwitterdashboardHTRoutingModule,
    TagCloudModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDSDT5DVQmxVZrAYXJDhlEl-1JTObkt9FM'
    })
  ],
  declarations: [ TwitterdashboardHTComponent ],


})
export class TwitterdashboardHTModule { }
