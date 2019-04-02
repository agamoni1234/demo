import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular-highcharts';
import { NgDatepickerModule } from 'ng2-datepicker';

import { ConsolePageComponent } from './console-page.component';
import { ConsolePageRoutingModule } from './console-page-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ChartModule,
    NgDatepickerModule,
    ConsolePageRoutingModule
  ],
  declarations: [ ConsolePageComponent ]
})
export class ConsolePageModule { }
