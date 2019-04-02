import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular-highcharts';
import { NgDatepickerModule } from 'ng2-datepicker';

import { PowerbiComponent } from './powerbi.component';
import { PowerbiRoutingModule } from './powerbi-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ChartModule,
    NgDatepickerModule,
    PowerbiRoutingModule
  ],
  declarations: [ PowerbiComponent ]
})
export class PowerbiModule { }
