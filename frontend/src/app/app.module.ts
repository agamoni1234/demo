import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy,CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';
import { TreeviewModule } from 'ngx-treeview';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { SampleModule } from 'ngx-intro-js-wrapper';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { DemoLayoutComponent } from './containers';
import { ConsoleLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ForgotPasswordComponent } from './views/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './views/resetpassword/resetpassword.component';

import {HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import * as highmaps from 'highcharts/modules/map.src';



const APP_CONTAINERS = [
  DefaultLayoutComponent,
  DemoLayoutComponent,
  ConsoleLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular'


// Import routing module
import { AppRoutingModule } from './app.routing';
import { AppService } from './app.service';
import { AppServiceBackendApi } from './app.servicebackendapi';


// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ConsolePageComponent } from './views/console-page/console-page.component';
import { from } from 'rxjs';

import { ParticlesModule } from 'angular-particle';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ChartModule,
    // SweetAlert2Module.forRoot(),
    TreeviewModule.forRoot(),
    ReactiveFormsModule,
    NgxSpinnerModule,
    ParticlesModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  providers: [
        AppService,
        AppServiceBackendApi,
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] } // add as factory to your providers
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
