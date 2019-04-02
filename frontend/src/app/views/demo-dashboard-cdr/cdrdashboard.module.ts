import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { ChartsModule } from 'ng2-charts/ng2-charts';
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from "@angular/common"
import { ChartModule } from 'angular-highcharts';
// import { NgDatepickerModule } from 'ng2-datepicker';
// import { TagCloudModule } from 'angular-tag-cloud-module';

// import { AgmCoreModule } from '@agm/core';

// import { NavController } from 'ionic-angular';

// import * as highmaps from 'highcharts/modules/map.src';
import { AgmCoreModule } from '@agm/core';
// import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import {CdrdashboardComponent} from "./cdrdashboard.component";
import {CdrdashboardRoutingModule} from "./cdrdashboard-routing.module";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ChartModule,
    CdrdashboardRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDSDT5DVQmxVZrAYXJDhlEl-1JTObkt9FM'
    }),
   
  ],
  declarations: [ CdrdashboardComponent ],


})
export class CdrdashboardModule { }
