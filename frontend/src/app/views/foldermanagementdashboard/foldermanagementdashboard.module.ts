import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from "@angular/common"
import { ChartModule } from 'angular-highcharts';
import { NgDatepickerModule } from 'ng2-datepicker';
import { NgxSpinnerModule } from 'ngx-spinner';

import {FoldermanagementdashboardComponent} from "./foldermanagementdashboard.component";
import {foldermanagementdashboardRoutingModule} from "./foldermanagementdashboard-routing.module";
import { TreeModule } from 'ng2-tree';
// import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ChartModule,
    NgDatepickerModule,
    foldermanagementdashboardRoutingModule,
    TreeModule,
    // SweetAlert2Module,
    NgxSpinnerModule
  ],
  declarations: [ FoldermanagementdashboardComponent ],


})
export class FoldermanagementdashboardModule { }
