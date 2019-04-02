import 'datatables.net';
import {
    Component,
    OnInit,
    NgModule
}
from '@angular/core';
import {
    Router
}
from '@angular/router';

import {
    HttpClient
}
from '@angular/common/http';
import {
    AppService
}
from '../../app.service';
import {
    AppServiceBackendApi
}
from '../../app.servicebackendapi';
import {
    environment
}
from '../../../environments/environment';
import {
    DatePipe
}
from '@angular/common';
import {
    Chart
}
from 'angular-highcharts';

import * as moment from 'moment'
import * as $ from 'jquery';
// var $ = jquery.noConflict();
declare var $:any;


import {NgbModule, NgbPopover} from '@ng-bootstrap/ng-bootstrap';
// import * as bt from
import { ModalModule } from 'ngx-bootstrap/modal';
import { stringify } from 'querystring';
// import * as bt from '@ng-bootstrap/ng-bootstrap'
// import * as bt from "../../bootstrap";

let table1=null;
let table2=null;
let table3=null;
let table4=null;



@NgModule({
  imports: [NgbModule,NgbPopover,ModalModule]
})
@Component({
    templateUrl: 'console-page.component.html'
})
export class ConsolePageComponent implements OnInit {


  backendApiUrl= environment.backendApiUrl;
  classname = environment.classname;
  dburl = environment.dburl;
  dbport = environment.dbport;
  dbusername = environment.dbusername;
  dbpassword = environment.dbpassword;
  dbname = '';
  tablename = '';
  dbname2 = '';
  tablename2 = '';
  sqlpath=environment.sqlfilepath;


  totalcustomer = 0;
  totalorder = 0;
  totalsale = 0;
  monthsale = 0;


  totalorders_getswift = 0;
  totalcancelled_getswift=0;
  totalcompleted_getswift=0;
  totaldrivers_getswift=0

  //Showdate = moment(new Date()).format('YYYY-MM-DD');
  chart: Chart;
  chart2: Chart;
  chart3: Chart;
  chart4: Chart;

  chart5: Chart;
  chart6: Chart;
  chart7: Chart;
  chart8: Chart;


  Showdate: any = moment(new Date()).format('YYYY-MM-DD');
  Showdate2: any = moment(new Date()).format('YYYY-MM-DD');


  date1: any = moment(new Date()).format('YYYY-MM-DD');
  date2: any = moment(new Date()).format('YYYY-MM-DD');

  choice1:any="Total Orders Based On Postal Code";
  choice2:any="Top 5 Drivers";
  // thisobject:any;
  // abc:any;

  // yearoptions =  {2018,2017,2016,2015,2014,2013};

  constructor(private router: Router, public http: HttpClient, private AppServiceObj: AppService, public AppServiceBackendApiObj:
    AppServiceBackendApi) {
  }

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if (token == null) {
      this.router.navigate(['login']);
    }
  }
}
