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

import * as moment from 'moment';
// import * as $ from 'jquery';
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
    templateUrl: 'powerbi.component.html'
})
export class PowerbiComponent implements OnInit {


  // backendApiUrl= environment.backendApiUrl;
  // classname = environment.classname;
  // dburl = environment.dburl;
  // dbport = environment.dbport;
  // dbusername = environment.dbusername;
  // dbpassword = environment.dbpassword;
  // dbname = '';
  // tablename = '';
  // dbname2 = '';
  // tablename2 = '';
  // sqlpath=environment.sqlfilepath;


  // totalcustomer = 0;
  // totalorder = 0;
  // totalsale = 0;
  // monthsale = 0;


  // totalorders_getswift = 0;
  // totalcancelled_getswift=0;
  // totalcompleted_getswift=0;
  // totaldrivers_getswift=0

  // //Showdate = moment(new Date()).format('YYYY-MM-DD');
  // chart: Chart;
  // chart2: Chart;
  // chart3: Chart;
  // chart4: Chart;

  // chart5: Chart;
  // chart6: Chart;
  // chart7: Chart;
  // chart8: Chart;


  // Showdate: any = moment(new Date()).format('YYYY-MM-DD');
  // Showdate2: any = moment(new Date()).format('YYYY-MM-DD');


  // date1: any = moment(new Date()).format('YYYY-MM-DD');
  // date2: any = moment(new Date()).format('YYYY-MM-DD');

  // choice1:any="Total Orders Based On Postal Code";
  // choice2:any="Top 5 Drivers";
  // // thisobject:any;
  // // abc:any;

  // // yearoptions =  {2018,2017,2016,2015,2014,2013};


  // calendarOptions = {
  //   minYear: 1970,
  //   maxYear: 2030,
  //   format: 'YYYY-MM-DD',
  //   displayFormat: 'YYYY-MM-DD',
  //   barTitleFormat: 'MMMM YYYY',
  //   barTitleIfEmpty: 'Click to select a date',
  //   placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
  //   fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
  //   useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown
  // };

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

  //   // $.noConflict();

  //   // var $ = jQuery.noConflict();

  //   let token = localStorage.getItem("token");
  //   if (token == null) {


  //     this.router.navigate(['login']);
  //   }


  //   // this.totalcustomers();
  //   // this.totalsales();
  //   // this.totalorders();
  //   // this.monthsales();

  //   // setTimeout(function (){ $('[data-toggle="popover"]').popover("show");},4000);

  //   // $('[data-toggle="popover"]').popover();




  //   //var dt2= $filter('date')(e.date, 'yyyy-dd-mm');
  //     ////console.log(dt2);
  //     //var svg = d3.select('#chart');
  //     //svg.selectAll("*").remove();
  //     // $('.sampledelivery').hide();
  //     // $('#sampledelivery').hide();

  //     // $('.bestdriver').hide();
  //     // $('#bestdriver').hide();

  //     // $('.worstdriver').hide();
  //     // $('#worstdriver').hide();


  //     // $('.deliverydetails').hide();
  //     // $('#deliverydetails').hide();




  //     // this.getdatagraphs5();
  //     // this.getdatagraphs6();


  //   }


  // // storefromdate(e)
  // // {
  // //   this.date1 = moment(e).format('YYYY-MM-DD');


  // // }


  // // doSomething(e) {
  // //   let date = moment(e).format('YYYY-MM-DD');
  // //   this.date2 = moment(e).format('YYYY-MM-DD');


  // //   this.totalordersGetswift(this.date1,this.date2);
  // //   this.totalcancelledGetswift(this.date1,this.date2);
  // //   this.totalcompletedGetswift(this.date1,this.date2);
  // //   this.totaldriversGetswift(this.date1,this.date2);




  // //   this.getdatagraphs1(date);
  // //   this.getdatagraphs2(date);
  // //   this.getdatagraphs3(date);
  // //   this.getdatagraphs5(this.date1,this.date2);
  // //   this.getdatagraphs6(this.date1,this.date2);
  // //   this.getdatagraphs7(this.date1,this.date2);
  // //   // this.getdatagraphs8();
  // //   this.getbestdrivertable(this.date1,this.date2);
  // //   // this.getworstdrivertable();





  // // }

  // // ngAfterViewInit() {
  // //   this.getdatagraphs1(this.Showdate)
  // //   this.getdatagraphs2(this.Showdate)
  // //   // this.getdatagraphs2(this.Showdate)
  // //   //this.getpopup(26466);
  // // }

  // // totalcustomers() {
  // //   let _this = this;

  // //   //The json request
  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //   //   this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //   //   '","dbname":"' + this.dbname + '","tablename":"' + this.tablename +
  // //   //   '","query":"select count(distinct field_14, field_15)  from firepiecustomers"}';



  // //     // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //     // this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //     // '","dbname":"' + this.dbname + '","tablename":"' + this.tablename +
  // //     // '","sqlPath":"/home/thirdeye/Documents/firepie/CloudhitiFE/backend/queries/getTotalCustomers.sql","parameters":[]}';





  // //     // MysqlReportJson = JSON.parse(MysqlReportJson);



  // //     var path=this.sqlpath+"getTotalCustomers.sql";

  // //     var MysqlReportJson={
  // //       "sqlPath" : path ,
  // //       "classname" : this.classname ,
  // //       "dburl" : this.dburl,
  // //       "dbport" : this.dbport,
  // //       "dbusername" : this.dbusername,
  // //       "dbpassword" : this.dbpassword,
  // //       "dbname" : this.dbname,
  // //       "parameters":[]
  // //     };




  // //   //The api calling
  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
  // //     if (returnObj.final_status) {
  // //       //The all data response in row format and store in variable
  // //       var allrows = returnObj.allcol;
  // //       //The local array for store data
  // //       _this.totalcustomer = allrows[0][0];
  // //       var myjson=JSON.stringify(MysqlReportJson);
  // //     }
  // //   });
  // // }

  // // totalsales() {
  // //   let _this = this;

  // //   //The json request
  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //   //   this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //   //   '","dbname":"' + this.dbname + '","tablename":"' + this.tablename +
  // //   //   '","query":"select sum(c.subtotal+c.sales_tax) Total_sale from firepieorders c;"}';
  // //   // ////console.log(MysqlReportJson)




  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //   // this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //   // '","dbname":"' + this.dbname + '","tablename":"' + this.tablename +
  // //   // '","sqlPath":"/home/thirdeye/Documents/firepie/CloudhitiFE/backend/queries/getTotalSales.sql","parameters":[]}';



  // //   var path=this.sqlpath+"getTotalSales.sql";

  // //   var MysqlReportJson={
  // //     "sqlPath" : path ,
  // //     "classname" : this.classname ,
  // //     "dburl" : this.dburl,
  // //     "dbport" : this.dbport,
  // //     "dbusername" : this.dbusername,
  // //     "dbpassword" : this.dbpassword,
  // //     "dbname" : this.dbname,
  // //     "parameters":[]
  // //   };

  // //   // MysqlReportJson = JSON.parse(MysqlReportJson);


  // //   //The api calling
  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
  // //     if (returnObj.final_status) {
  // //       //The all data response in row format and store in variable
  // //       var allrows = returnObj.allcol;
  // //       //The local array for store data
  // //       _this.totalsale = allrows[0][0];

  // //       var myjson=JSON.stringify(MysqlReportJson);
  // //     }
  // //   });

  // // }


  // // totalorders() {
  // //   let _this = this;

  // //   //The json request
  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //   //   this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //   //   '","dbname":"' + this.dbname + '","tablename":"' + this.tablename +
  // //   //   '","query":"select count(id) from firepieorders"}';
  // //   // //console.log(MysqlReportJson)



  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //   //   this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //   //   '","dbname":"' + this.dbname + '","tablename":"' + this.tablename +
  // //   //   '","sqlPath":"/home/thirdeye/Documents/firepie/CloudhitiFE/backend/queries/getTotalOrders.sql","parameters":[]}';


  // //     // var path=this.sqlpath+"getTotalOrders.sql";

  // //     // var MysqlReportJson={
  // //     //   "sqlPath" : path ,
  // //     //   "classname" : this.classname ,
  // //     //   "dburl" : this.dburl,
  // //     //   "dbport" : this.dbport,
  // //     //   "dbusername" : this.dbusername,
  // //     //   "dbpassword" : this.dbpassword,
  // //     //   "dbname" : this.dbname,
  // //     //   "parameters":[]
  // //     // };

  // //   // MysqlReportJson = JSON.parse(MysqlReportJson);

  // //     //console.log(MysqlReportJson)

  // //   //The api calling
  // //   // this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
  // //   //   if (returnObj.final_status) {
  // //   //     //The all data response in row format and store in variable
  // //   //     var allrows = returnObj.allcol;
  // //   //     //The local array for store data
  // //   //     _this.totalorder = allrows[0][0];
  // //   //     var myjson=JSON.stringify(MysqlReportJson);
  // //   //   }
  // //   // });

  // // }

  // // monthsales() {
  // //   let _this = this;

  // //   //The json request
  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //   //   this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //   //   '","dbname":"' + this.dbname + '","tablename":"' + this.tablename +
  // //   //   '","query":"select sum(c.subtotal+c.sales_tax) Total_sale from firepieorders c where  date(c.scheduled_dt) BETWEEN  DATE_FORMAT(NOW() ,\'%Y-%m-01\') AND NOW();"}';
  // //   // //console.log(MysqlReportJson)


  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //   // this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //   // '","dbname":"' + this.dbname + '","tablename":"' + this.tablename +
  // //   // '","sqlPath":"/home/thirdeye/Documents/firepie/CloudhitiFE/backend/queries/getMonthSales.sql","parameters":[]}';


  // //   // MysqlReportJson = JSON.parse(MysqlReportJson);



  // //   // var path=this.sqlpath+"getMonthSales.sql";

  // //   // var MysqlReportJson={
  // //   //   "sqlPath" : path ,
  // //   //   "classname" : this.classname ,
  // //   //   "dburl" : this.dburl,
  // //   //   "dbport" : this.dbport,
  // //   //   "dbusername" : this.dbusername,
  // //   //   "dbpassword" : this.dbpassword,
  // //   //   "dbname" : this.dbname,
  // //   //   "parameters":[]
  // //   // };



  // //   // select sum(c.subtotal+c.sales_tax) Total_sale from firepieorders c where  date(c.scheduled_dt) BETWEEN  DATE_FORMAT(NOW() ,'%Y-%m-01') AND NOW()

  // //   //The api calling
  // //   // this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
  // //   //   if (returnObj.final_status) {
  // //   //     //The all data response in row format and store in variable
  // //   //     var allrows = returnObj.allcol;
  // //   //     //The local array for store data
  // //   //     _this.monthsale = allrows[0][0];
  // //   //   }
  // //   // });

  // // }


  // // getDeliveryDate = function(orderdate,orderhour)


  // // {

  // //   // private http:HttpClient;
  // //   let backendApiUrl= environment.backendApiUrl;

  // //   function GetDynamicTableData( MysqlReportJson:Object,cb: Function) : any {

  // //   var myjson=JSON.stringify(MysqlReportJson);

  // //   _this.http.post(backendApiUrl+'api/reporting/getdynamictabledata',MysqlReportJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {

  // //       cb(data);
  // //     },
  // //     (err) => {
  // //       cb({status:false});
  // //     });
  // // }






  // //   function getpopup(id,thisobj) {
  // //     //var thisObject1;
  // //     let thisobject=thisobj;
  // //     // this.abc=$(this);
  // //     // let MysqlReportJson= '{"classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://cloudhiti.c0ttn3nzqakk.us-west-2.rds.amazonaws.com:","dbport":"3306","dbusername":"cloudhiti","dbpassword":"kolkata257!","dbname":"firepie","tablename":"firepieorders","query":"  select *,CONVERT_TZ(created_at, \'+00:00\',\'-7:00\') as created_at from firepieorders where id='+id+' "}';
  // //     ////console.log($scope.MysqlReportJson)
  // //     // MysqlReportJson = JSON.parse(MysqlReportJson );
  // //     let _this = this;
  // //     // private getdata:AppServiceBackendApi;
  // //     // let getdata=new AppServiceBackendApi();
  // //     // let hhtp2=new HttpClient();
  // //     // HttpClient http2=new HttpClient();
  // //     // let getdata=new AppServiceBackendApi();


  // //     // GetDynamicTableData(MysqlReportJson, function (data)
  // //     // {
  // //     //
  // //     //   //console.log("inside getdynamic");
  // //     //
  // //     //
  // //     //   var allrows = data.allcol;
  // //     //
  // //     //
  // //     //   $(this).attr('data-content','Cannot proceed with Save while Editing a row.');
  // //     //   $(this).popover('show');
  // //     //
  // //     //   //console.log(allrows,thisobject);
  // //     //   // thisobject.popover({
  // //     //   //   title: 'Order Details of Id-' + id + '  <button type="button" id="close" class="close" onclick="$(&quot;#' + id + '&quot;).popover(&quot;hide&quot;);">&times;</button>',
  // //     //   //   content: '<ol>' +
  // //     //   //     '<li >Source : <strong>' + allrows[0][1] + '</strong></li>' +
  // //     //   //     '<li >Customer Id : <strong>' + allrows[0][3] + '</strong></li>' +
  // //     //   //     '<li > Date CreatedDt : <strong>' + allrows[0][18] + ' </strong></li>' +
  // //     //   //     '<li >Subtotal : $ <strong>' + allrows[0][10] + '</strong></li></ol>' +
  // //     //   //     '',
  // //     //   //   placement: 'left',
  // //     //   //   html: true,
  // //     //   //   trigger: 'click'
  // //     //   // }).popover('show');
  // //     // }),function (errorMessage) {
  // //     // };


  // //   }
  // //   //The json request
  // //   // let MysqlReportJson= '{"classname": "'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname+'","tablename":"'+this.tablename+'","query":" select date(CONVERT_TZ(c.created_at, \'+00:00\',\'-7:00\')  ) order_date, HOUR(CONVERT_TZ(c.created_at, \'+00:00\',\'-7:00\') ) order_hour, b.field_6 driver_id ,CONVERT_TZ(a.field_17, \'+00:00\',\'-7:00\')    pickup_time, CONVERT_TZ(a.field_18, \'+00:00\',\'-7:00\')    dropoff_time,b.field_11 estimated_distance  ,c.id as OrderID   from firepiedeliveries a join firepieget_swift_deliveries b on a.field_1 = b.field_2 join firepieorders c on a.field_12 = c.id where b.field_5 <> \'Cancelled\' and date(CONVERT_TZ(c.created_at, \'+00:00\',\'-7:00\') ) = \''+orderdate+'\' and HOUR(CONVERT_TZ(c.created_at, \'+00:00\',\'-7:00\') )= '+parseInt(orderhour)+' group by 5"}';


  // //   var params=new Array();
  // //   params.push(orderdate);
  // //   params.push(parseInt(orderhour));






  // //   var path=this.sqlpath+"getDeliveryTable.sql";

  // //   var MysqlReportJson={
  // //     "sqlPath" : path ,
  // //     "classname" : this.classname ,
  // //     "dburl" : this.dburl,
  // //     "dbport" : this.dbport,
  // //     "dbusername" : this.dbusername,
  // //     "dbpassword" : this.dbpassword,
  // //     "dbname" : this.dbname,
  // //     "parameters":params
  // //   };


  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' + this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword + '","dbname":"' + this.dbname + '","tablename":"' + this.tablename + '","query":"select date(CONVERT_TZ(c.created_at, \\\'+00:00\\\',\\\'-7:00\\\')  ) order_date, HOUR(CONVERT_TZ(c.created_at, \\\'+00:00\\\',\\\'-7:00\\\') ) order_hour, b.field_6 driver_id ,CONVERT_TZ(a.field_17, \\\'+00:00\\\',\\\'-7:00\\\')    pickup_time, CONVERT_TZ(a.field_18, \\\'+00:00\\\',\\\'-7:00\\\')    dropoff_time,b.field_11 estimated_distance  ,c.id as OrderID   from firepiedeliveries a join firepieget_swift_deliveries b on a.field_1 = b.field_7 join firepieorders c on a.field_12 = c.id where b.field_5 <> \\\'Cancelled\\\' and date(CONVERT_TZ(c.created_at, \\\'+00:00\\\',\\\'-7:00\\\') ) = \\\'\'+orderdate+\'\\\' and HOUR(CONVERT_TZ(c.created_at, \\\'+00:00\\\',\\\'-7:00\\\') )= \'+parseInt(orderhour)+\' group by 5"}';

  // //   ////console.log(MysqlReportJson)
  // //   // MysqlReportJson = JSON.parse(MysqlReportJson);
  // //   //The api calling
  // //   let _this = this;

  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (data) {
  // //     ////console.log(data);
  // //     //The all data response in row format and store in variable
  // //     var allrows = data.allcol;
  // //     // alert(allrows);
  // //     //The local array for store data
  // //     let arrayreturn = [];


  // //     // var settings = {
  // //     //   layout: {
  // //     //     pageSidebarClosed: false, // sidebar menu state
  // //     //     pageContentWhite: true, // set page content layout
  // //     //     pageBodySolid: false, // solid body color state
  // //     //     pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
  // //     //   },
  // //     //   assetsPath: './assets',
  // //     //   globalPath: './assets/global',
  // //     //   layoutPath: './assets/layouts/layout',
  // //     // };


  // //     // var table = $('#sampledelivery').DataTable({


  // //     //   "searching": false,
  // //     //   "paging": true,
  // //     //   "info": false,
  // //     //   "lengthChange": false,
  // //     //   "destroy": true,
  // //     //   "responsive": true,
  // //       // "scrollY": 300
  // //       // // paging: false,
  // //       // "lengthMenu": 5

  // //     // });


  // //     // var oTable = table;


  // //     // settings.layout.pageContentWhite = true;
  // //     // settings.layout.pageBodySolid = false;
  // //     // settings.layout.pageSidebarClosed = false;


  // //     //var selectedlength=data.colnames.length;












  // //     $(document).ready(function()
  // //     {
  // //         table1 = $('#sampledelivery').DataTable( {
  // //             // "pagingType": "full_numbers",
  // //             "lengthChange": true,
  // //             "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
  // //         lengthMenu: [
  // //           [ 5,10,15, -1 ],
  // //           [ '5','10','15','Show all' ]
  // //         ]
  // //         // order: [[1, 'asc']]
  // //         // buttons: [
  // //         //   'print'
  // //         // ]

  // //         } );



  // //     } );

  // //     var selectedlength = data.colnames.length;
  // //     // if ($("#sampledelivery").oTable) {
  // //     //   $("#sampledelivery").oTable.fnDestroy();
  // //     // }
  // //     $('#sampledeliverybody').html('');
  // //     var body = '';
  // //     //The append data in table as table row
  // //     $.each(data.allcol, function (index, valueobj) {
  // //       body = body + '<tr align="right"  >  ';
  // //       //<td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td>
  // //       for (var i = 0; i < selectedlength; i++) {

  // //         if (i == 6) {
  // //           let bodytext = ' <td align="right"  > <a class="getorder"  id="' + valueobj[i] + '" onclick="javascript:;" href="javascript:void;">' + valueobj[i] + ' </td> ';
  // //           //$compile(bodytext)($scope);
  // //           body = body + bodytext;
  // //         } else {
  // //           body = body + ' <td align="right"> ' + valueobj[i] + ' </td> ';
  // //         }
  // //       }
  // //       body = body + '</tr>';
  // //     });


  // //     $('#sampledeliverybody').append(body);


  // //     // this.initTable3();

  // //     $('.sampledelivery').show();
  // //     $('#sampledelivery').show();

  // //     $('.getorder').click(function(){
  // //       // alert("The paragraph was clicked.");
  // //       var thisobject=$(this);
  // //       var id = $(this).attr('id');


  // //       // let MysqlReportJson= '{"classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://cloudhiti.c0ttn3nzqakk.us-west-2.rds.amazonaws.com:","dbport":"3306","dbusername":"cloudhiti","dbpassword":"kolkata257!","dbname":"firepie","tablename":"firepieorders","query":"  select *,CONVERT_TZ(created_at, \'+00:00\',\'-7:00\') as created_at from firepieorders where id='+id+' "}';




  // //       var params=new Array();
  // //       params.push(id);




  // //       var path=_this.sqlpath+"getDialogPopup.sql";

  // //       var MysqlReportJson={
  // //         "sqlPath" : path ,
  // //         "classname" : _this.classname ,
  // //         "dburl" : _this.dburl,
  // //         "dbport" : _this.dbport,
  // //         "dbusername" : _this.dbusername,
  // //         "dbpassword" : _this.dbpassword,
  // //         "dbname" : _this.dbname,
  // //         "parameters":params
  // //       };


  // //       GetDynamicTableData(MysqlReportJson, function (data)
  // //       {


  // //         var allrows = data.allcol;


  // //         // $(this).attr('data-content','Cannot proceed with Save while Editing a row.');
  // //         // $(this).popover('show');

  // //         thisobject.popover({
  // //           title: 'Order Details of Id-' + id + '  <button type="button" id="close" class="close" onclick="$(&quot;#' + id + '&quot;).popover(&quot;hide&quot;);">&times;</button>',
  // //           content: '<ol>' +
  // //             '<li >Source : <strong>' + allrows[0][1] + '</strong></li>' +
  // //             '<li >Customer Id : <strong>' + allrows[0][3] + '</strong></li>' +
  // //             '<li > Date CreatedDt : <strong>' + allrows[0][18] + ' </strong></li>' +
  // //             '<li >Subtotal : $ <strong>' + allrows[0][10] + '</strong></li></ol>' +
  // //             '',
  // //           placement: 'left',
  // //           html: true,
  // //           trigger: 'click'
  // //         }).popover('show');
  // //       }),function (errorMessage) {
  // //       };


  // //       // //console.log(thisobject);
  // //       // $(this).attr('data-content','Cannot proceed with Save while Editing a row.');
  // //       // $(this).popover('show');
  // //       // alert("order id is: "+id);
  // //       // getpopup(id,thisobject);
  // //       // // import * as th from bootstrap-js
  // //       // $("#myModal .modal-body").html(data)
  // //       // var data = "<ul><li>1</li><li>2</li></ul>";
  // //       // $("#myModal .modal-body").html(data);
  // //       // $("#myModal").modal();

  // //     });


  // //   },function (errorMessage) {
  // //   });

  // //     table1.destroy();

  // // };




  // // printDiv(): void {



  // //   $("#printArea_paginate").css('display','none');
  // //   $("#printArea_length").css('display','none');
  // //   $("#printArea_filter").css('display','none');
  // //   $("#printArea_info").css('display','none');






  // //   let printContents, popupWin;
  // //   printContents = document.getElementById('printArea').innerHTML;
  // //   popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  // //   popupWin.document.open();
  // //   popupWin.document.write(`
  // //     <html>
  // //       <head>
  // //         <title>Print tab</title>
  // //         <style>
  // //         //........Customized style.......
  // //         </style>
  // //       </head>
  // //   <body onload="window.print();window.close()">${printContents}</body>
  // //     </html>`
  // //   );
  // //   popupWin.document.close();
  // // }


  // // printDiv2(): void {


  // //   $("#printbutton").css('display','none');

  // //   $("#deliverydetails_paginate").css('display','none');
  // //   $("#deliverydetails_length").css('display','none');
  // //   $("#deliverydetails_filter").css('display','none');
  // //   $("#deliverydetails_info").css('display','none');



  // //   let printContents1,popupWin;
  // //   printContents1 = document.getElementById('printArea4').innerHTML;
  // //   popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  // //   popupWin.document.open();
  // //   popupWin.document.write(`
  // //   <html>
  // //   <head>
  // //   <style>
  // //   @page { size: auto;}
  // //   #deliverydetails th, #deliverydetails td{ border: 0.3px solid black;font-size:10px;}

  // //   </style>
  // //   </head>
  // //   <body onload="window.print();window.close()">
  // //   <img src="assets/img/brand/LIGHT-BACKGROUND-LOGO.png" style="width: 200px;height: 50px;display:block;margin-left:auto;margin-right:auto">
  // //   ${printContents1}
  // //   </body>
  // //   </html>`
  // //   );
  // //   popupWin.document.close();

  // //   // let printContents, popupWin;
  // //   // printContents = document.getElementById('printArea4').innerHTML;
  // //   // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  // //   // popupWin.document.open();
  // //   // popupWin.document.write(`
  // //   //   <html>
  // //   //     <head>
  // //   //       <title>Print tab</title>
  // //   //       <style>
  // //   //       //........Customized style.......
  // //   //       </style>
  // //   //     </head>
  // //   // <body onload="window.print();window.close()">${printContents}</body>
  // //   //   </html>`
  // //   // );
  // //   // popupWin.document.close();
  // // }



  // // getdatagraphs1(date) {

  // //   //date = '2018-03-23'

  // //   //Date('yyyy-mm-dd')
  // //   //var dt2= $filter('date')(date, 'EEE d MMM yyyy')+ ", ";
  // //   //var datePipe = new DatePipe("en-US");
  // //   //var dt2 = datePipe.transform(date, 'MMM-dd-yyyy')+ ", ";
  // //   var dt2 = moment(date).format('ddd D MM YYYY ')
  // //   //The json request
  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //   //   this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //   //   '","dbname":"' + this.dbname + '","tablename":"' + this.tablename +
  // //   //   '","query":"  select date(c.scheduled_dt) order_date, HOUR( CONVERT_TZ(c.created_at, \'+00:00\',\'-7:00\') )  order_hour , CAST( sum((UNIX_TIMESTAMP(a.field_17) - UNIX_TIMESTAMP(c.created_at))/60 )/count(c.id) AS DECIMAL(10,2)) average_prep_time,  CAST(sum((UNIX_TIMESTAMP(a.field_18) - UNIX_TIMESTAMP(a.field_17))/60 )/count(c.id) AS DECIMAL(10,2)) as average_delivery_time    from firepiedeliveries a join firepieget_swift_deliveries b on a.field_1 = b.field_2 join firepieorders c on a.field_12 = c.id where b.field_5 <> \'Cancelled\'     and date(CONVERT_TZ(c.created_at, \'+00:00\',\'-7:00\'))  = \'' +
  // //   //   date + '\' and a.field_17 > 0 group by 1,2 order by 1,2   ;"}';


  // //     var params=new Array();

  // //     params.push(date);



  // //     var path=this.sqlpath+"getDataGraph1.sql";

  // //     var MysqlReportJson={
  // //       "sqlPath" : path ,
  // //       "classname" : this.classname ,
  // //       "dburl" : this.dburl,
  // //       "dbport" : this.dbport,
  // //       "dbusername" : this.dbusername,
  // //       "dbpassword" : this.dbpassword,
  // //       "dbname" : this.dbname,
  // //       "parameters":params
  // //     };





  // //   // MysqlReportJson = JSON.parse(MysqlReportJson);
  // //   //The api calling
  // //   let _this = this;
  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (data) {

  // //     if (data.final_status) {

  // //       //The all data response in row format and store in variable
  // //       var allrows = data.allcol;
  // //       //The local array for store data
  // //       let arrayreturn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // //       let arrayreturn1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // //       var selectedlength = data.colnames.length;

  // //       //The append data in table as table row


  // //       (allrows).forEach((valueobj, index) => {
  // //         //The making josn as per graph
  // //         arrayreturn[parseInt(valueobj[1]) - 1] = parseFloat(valueobj[2]);
  // //         arrayreturn1[parseInt(valueobj[1]) - 1] = parseFloat(valueobj[3]);

  // //         if (index == allrows.length - 1) {
  // //           ////console.log('1');
  // //           arrayreturn[parseInt(valueobj[1]) - 1] = parseFloat(valueobj[2]);
  // //           arrayreturn1[parseInt(valueobj[1]) - 1] = parseFloat(valueobj[3]);

  // //           let chartObj: any = {
  // //             chart: {
  // //               type: 'column'

  // //             },
  // //             title: {
  // //               text: '',
  // //             },
  // //             xAxis: {
  // //               title: {
  // //                 enabled: true,
  // //                 text: 'Hours of the Day',
  // //                 style: {
  // //                   fontWeight: 'bold',
  // //                   color: 'black'
  // //                 }
  // //               },
  // //               categories: [dt2 + "01 AM", dt2 + "02 AM", dt2 + " 03 AM", dt2 + "04 AM", dt2 + "05 AM", dt2 +
  // //               "06 AM", dt2 + "07 AM", dt2 + "08 AM", dt2 + "09 AM", dt2 + "10 AM", dt2 + "11 AM", dt2 +
  // //               "12 AM", dt2 + "01 PM", dt2 + "02 PM", dt2 + "03 PM", dt2 + "04 PM", dt2 + "05 PM", dt2 +
  // //               "06 PM", dt2 + "07 PM", dt2 + "08 PM", dt2 + "09 PM", dt2 + "10 PM", dt2 + "11 PM", dt2 +
  // //               "12 PM"
  // //               ],
  // //               labels: {
  // //                 style: {
  // //                   fontSize: '8px',
  // //                   fontWeight: 'bold',
  // //                   color: 'black'
  // //                 },
  // //               }
  // //             },
  // //             yAxis: {
  // //               title: {
  // //                 text: 'Average delivery and preparation time (mins)',
  // //                 style: {
  // //                   fontWeight: 'bold',
  // //                   color: 'black',
  // //                   fontsize: '5px'
  // //                 }
  // //               },
  // //               stackLabels: {
  // //                 enabled: true,
  // //                 style: {
  // //                   fontSize: '10px',
  // //                   fontWeight: 'bold',
  // //                   color: 'black'
  // //                 }
  // //               }
  // //             },
  // //             legend: {
  // //               align: 'right',
  // //               x: 0,
  // //               verticalAlign: 'top',
  // //               y: -15,
  // //               floating: true,
  // //               backgroundColor: 'white',
  // //               borderColor: '#CCC',
  // //               // borderWidth: 1,
  // //               shadow: false
  // //             },
  // //             tooltip: {
  // //               headerFormat: '<b>{point.x}</b><br/>',
  // //               pointFormat: '{series.name}: {point.y}'
  // //             },

  // //             plotOptions: {
  // //               series: {
  // //                 stacking: 'normal',
  // //                 cursor: 'pointer',

  // //               }/*column: {
  // //       			            stacking: 'normal',
  // //       			            dataLabels: {
  // //       			                enabled: true,
  // //       			                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
  // //       			            }
  // //       			        }*/
  // //             },
  // //             credits: {
  // //               enabled: false
  // //             },
  // //             series: [{
  // //               name: 'Average Delivery Time',
  // //               data: arrayreturn1,
  // //               color: '#9FBD69',
  // //               drilldown: 'Delivery',
  // //               point: {
  // //                 events: {
  // //                   click: function (e) {
  // //                     if(this.color != '#9FBD69')
  // //                     {
  // //                       return;
  // //                     }
  // //                     // alert(this.category);
  // //                     var time= this.category.split(' ');
  // //                     var date= time[3]+"-"+time[2]+"-"+time[1];
  // //                     ////console.log(time);
  // //                     var hr=time[1].split(" ");
  // //                     ////console.log(hr);
  // //                     var hr1=hr[1]
  // //                     //parseInt(hr[0]) ;
  // //                     ////console.log(hr1);
  // //                     if( time[5] == "PM")
  // //                     {
  // //                       hr1=parseInt(time[4]) + 12;
  // //                     }
  // //                     ////console.log(this);
  // //                     // alert(date+" "+hr1);
  // //                     _this.getDeliveryDate(date,hr1);
  // //                     //alert('Category: ' + parseInt(hr) + ', value: ' + this.y);
  // //                   }
  // //                 }
  // //               }

  // //             }, {
  // //               name: 'Average Preparation Time',
  // //               data: arrayreturn,
  // //               //colorByPoint: true,
  // //               color: '#74BAD2',
  // //               drilldown: 'Delivery1'
  // //             }]
  // //           };
  // //           _this.chart = new Chart(chartObj);

  // //         }
  // //       });

  // //     }
  // //   });

  // // }


  // // getdatagraphs2(date) {
  // //   // date = '2018-03-23'

  // //   var dt2 = moment(date).format('ddd D MM YYYY ')
  // //   //The json request
  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //   //   this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //   //   '","dbname":"' + this.dbname + '","tablename":"' + this.tablename +
  // //   //   '","query":"select  HOUR( CONVERT_TZ(c.created_at,\'+00:00\',\'-7:00\') )  order_hour , count(distinct c.id) order_cnt  from firepiedeliveries a join firepieget_swift_deliveries b on a.field_1 = b.field_2  join firepieorders c on a.field_12 = c.id where b.field_5 <> \'Cancelled\' and date(CONVERT_TZ(c.created_at, \'+00:00\',\'-7:00\'))  =  \'' +
  // //   //   date + '\'  group by 1 order by 1,2   "}';

  // //   // MysqlReportJson = JSON.parse(MysqlReportJson);



  // //   var params=new Array();

  // //     params.push(date);



  // //     var path=this.sqlpath+"getDataGraph2.sql";

  // //     var MysqlReportJson={
  // //       "sqlPath" : path ,
  // //       "classname" : this.classname ,
  // //       "dburl" : this.dburl,
  // //       "dbport" : this.dbport,
  // //       "dbusername" : this.dbusername,
  // //       "dbpassword" : this.dbpassword,
  // //       "dbname" : this.dbname,
  // //       "parameters":params
  // //     };









  // //   //The api calling
  // //   let _this = this;
  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (data) {

  // //     //console.log(data);
  // //     if (data.final_status) {

  // //       //The all data response in row format and store in variable
  // //       var allrows = data.allcol;
  // //       //The local array for store data
  // //       let arrayreturn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // //       let arrayreturn1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // //       var selectedlength = data.colnames.length;

  // //       //The append data in table as table row


  // //       (allrows).forEach((valueobj, index) => {

  // //         //The making josn as per graph
  // //         arrayreturn[parseInt(valueobj[0]) - 1] = parseFloat(valueobj[1]);

  // //         if (index == allrows.length - 1) {
  // //           ////console.log('1');
  // //           arrayreturn[parseInt(valueobj[0]) - 1] = parseFloat(valueobj[1]);
  // //           let chartObj: any = {
  // //             chart: {
  // //               type: 'column'
  // //             },
  // //             title: {
  // //               text: '',
  // //             },
  // //             xAxis: {
  // //               title: {
  // //                 enabled: true,
  // //                 text: 'Hours of the Day',
  // //                 style: {
  // //                   fontWeight: 'bold',
  // //                   color: 'black'
  // //                 }
  // //               },
  // //               categories: [dt2 + "01 AM", dt2 + "02 AM", dt2 + " 03 AM", dt2 + "04 AM", dt2 + "05 AM", dt2 +
  // //               "06 AM", dt2 + "07 AM", dt2 + "08 AM", dt2 + "09 AM", dt2 + "10 AM", dt2 + "11 AM", dt2 +
  // //               "12 AM", dt2 + "01 PM", dt2 + "02 PM", dt2 + "03 PM", dt2 + "04 PM", dt2 + "05 PM", dt2 +
  // //               "06 PM", dt2 + "07 PM", dt2 + "08 PM", dt2 + "09 PM", dt2 + "10 PM", dt2 + "11 PM", dt2 +
  // //               "12 PM"
  // //               ],
  // //               labels: {
  // //                 style: {
  // //                   fontSize: '8px',
  // //                   fontWeight: 'bold',
  // //                   color: 'black'
  // //                 },
  // //               }
  // //             },
  // //             yAxis: {

  // //               title: {
  // //                 text: 'Total Orders ',
  // //                 style: {
  // //                   fontWeight: 'bold',
  // //                   color: 'black'
  // //                 }
  // //               },
  // //               stackLabels: {
  // //                 enabled: true,
  // //                 style: {
  // //                   fontSize: '10px',
  // //                   fontWeight: 'bold',
  // //                   color: 'black'
  // //                 }
  // //               }
  // //             },
  // //             legend: {
  // //               align: 'right',
  // //               x: 0,
  // //               verticalAlign: 'top',
  // //               y: -15,
  // //               floating: true,
  // //               backgroundColor: 'white',
  // //               borderColor: '#CCC',
  // //               // borderWidth: 1,
  // //               shadow: false
  // //             },
  // //             tooltip: {
  // //               headerFormat: '<b>{point.x}</b><br/>',
  // //               pointFormat: '{series.name}: {point.y}'
  // //             },
  // //             plotOptions: {
  // //               series: {}
  // //             },
  // //             credits: {
  // //               enabled: false
  // //             },
  // //             series: [{
  // //               name: 'Total Orders',
  // //               data: arrayreturn,
  // //               color: '#9FBD69',
  // //             }]
  // //           };
  // //           _this.chart2 = new Chart(chartObj);


  // //         }
  // //       });

  // //     }
  // //   });

  // // }


  // // getdatagraphs3(date) {
  // //   date = '2018-03-23'

  // //   var dt2 = moment(date).format('ddd D MM YYYY ')
  // //   //The json request
  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //   //   this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //   //   '","dbname":"' + this.dbname + '","tablename":"' + this.tablename +
  // //   //   '","query":"  select count(source),source from firepieorders where source=\'chow_now\' or source=\'grubhub\' or source=\'eat_24\' group by source;"}';

  // //   // MysqlReportJson = JSON.parse(MysqlReportJson);
  // //   //The api calling


  // //   var path=this.sqlpath+"getDataGraph3.sql";

  // //   var MysqlReportJson={
  // //     "sqlPath" : path ,
  // //     "classname" : this.classname ,
  // //     "dburl" : this.dburl,
  // //     "dbport" : this.dbport,
  // //     "dbusername" : this.dbusername,
  // //     "dbpassword" : this.dbpassword,
  // //     "dbname" : this.dbname,
  // //     "parameters":[]
  // //   };







  // //   let _this = this;
  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (data) {

  // //     //console.log(data);
  // //     if (data.final_status) {

  // //       //The all data response in row format and store in variable
  // //       var allrows = data.allcol;
  // //       //The local array for store data
  // //       let arrayreturn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // //       let arrayreturn1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // //       let arrayreturn2 = [];
  // //       var selectedlength = data.colnames.length;

  // //       //The append data in table as table row
  // //       // //console.log("------------------");
  // //       //
  // //       // //console.log(data["allcol"]);
  // //       //
  // //       // //console.log("------------------");

  // //       (allrows).forEach((valueobj, index) => {


  // //         arrayreturn2.push({
  // //           name: valueobj[1],
  // //           y: parseInt(valueobj[0])

  // //         });


  // //         // //console.log("******************");
  // //         //
  // //         // //console.log(arrayreturn2);
  // //         //
  // //         // //console.log("------------------");

  // //         var result = JSON.stringify(arrayreturn2);
  // //         //The making josn as per graph

  // //         if (index == allrows.length - 1) {
  // //           ////console.log('1');


  // //           let chartObj: any = {
  // //             chart: {
  // //               plotBackgroundColor: null,
  // //               plotBorderWidth: null,
  // //               plotShadow: false,
  // //               type: 'pie'
  // //             },
  // //             title: {
  // //               text: ''
  // //             },
  // //             tooltip: {
  // //               pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  // //             },
  // //             credits: {
  // //               enabled: false
  // //             },
  // //             plotOptions: {
  // //               pie: {
  // //                 colors: [
  // //                   '#c8dc8e',
  // //                   '#a4c9d0',
  // //                   '#89b299'
  // //                 ],
  // //                 allowPointSelect: true,
  // //                 cursor: 'pointer',
  // //                 dataLabels: {
  // //                   enabled: true,
  // //                   format: '<b>{point.name}</b>: {point.percentage:.1f} %',

  // //                 }
  // //               }
  // //             },
  // //             series: [{

  // //               colorByPoint: true,
  // //               data: arrayreturn2
  // //             }]
  // //           };


  // //           _this.chart3 = new Chart(chartObj);

  // //         };


  // //       });

  // //     }

  // //   });
  // // }




  // // getdatagraphs4(date) {
  // //   date = '2018-03-23'

  // //   var dt2 = moment(date).format('ddd D MM YYYY ')
  // //   //The json request
  // //   let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //     this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //     '","dbname":"' + this.dbname + '","tablename":"' + this.tablename +
  // //     '","query":"  select count(source),source from firepieorders where source=\'chow_now\' or source=\'grubhub\' or source=\'eat_24\' group by source;"}';

  // //   MysqlReportJson = JSON.parse(MysqlReportJson);
  // //   //The api calling
  // //   let _this = this;
  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (data) {

  // //     //console.log(data);
  // //     if (data.final_status) {

  // //       //The all data response in row format and store in variable
  // //       var allrows = data.allcol;
  // //       //The local array for store data
  // //       let arrayreturn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // //       let arrayreturn1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // //       let arrayreturn2 = [];
  // //       var selectedlength = data.colnames.length;

  // //       //The append data in table as table row
  // //       // //console.log("------------------");
  // //       //
  // //       // //console.log(data["allcol"]);
  // //       //
  // //       // //console.log("------------------");

  // //       (allrows).forEach((valueobj, index) => {


  // //         arrayreturn2.push({
  // //           name: valueobj[1],
  // //           y: parseInt(valueobj[0])

  // //         });


  // //         // //console.log("******************");
  // //         //
  // //         // //console.log(arrayreturn2);
  // //         //
  // //         // //console.log("------------------");

  // //         var result = JSON.stringify(arrayreturn2);
  // //         //The making josn as per graph

  // //         if (index == allrows.length - 1) {
  // //           ////console.log('1');


  // //           let chartObj: any = {
  // //             chart: {
  // //               plotBackgroundColor: null,
  // //               plotBorderWidth: null,
  // //               plotShadow: false,
  // //               type: 'pie'
  // //             },
  // //             title: {
  // //               text: 'Orders by Source'
  // //             },
  // //             tooltip: {
  // //               pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  // //             },
  // //             credits: {
  // //               enabled: false
  // //             },
  // //             plotOptions: {
  // //               pie: {
  // //                 colors: [
  // //                   '#c8dc8e',
  // //                   '#a4c9d0',
  // //                   '#89b299'
  // //                 ],
  // //                 allowPointSelect: true,
  // //                 cursor: 'pointer',
  // //                 dataLabels: {
  // //                   enabled: true,
  // //                   format: '<b>{point.name}</b>: {point.percentage:.1f} %',

  // //                 }
  // //               }
  // //             },
  // //             series: [{

  // //               colorByPoint: true,
  // //               data: arrayreturn2
  // //             }]
  // //           };


  // //           _this.chart3 = new Chart(chartObj);

  // //         };


  // //       });

  // //     }

  // //   });
  // // }



  // // getdatagraphs5(date1,date2) {
  // //   // date = '2018-03-23'

  // //   // var dt2 = moment(date).format('ddd D MM YYYY ')
  // //   //The json request
  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //   //   this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //   //   '","dbname":"' + this.dbname2 + '","tablename":"' + this.tablename2 +
  // //   //   '","query":"select current_stage, count(*) as count from cloudhiti.getswift_api_deliveries where STR_TO_DATE(created_local, \'%m/%d/%Y\') between \''+ date1 + '\' and \''+ date2 + '\' group by 1;"}';


  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //   // this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //   // '","dbname":"' + this.dbname2 + '","tablename":"' + this.tablename2 +
  // //   // '","sqlPath":"/home/thirdeye/Documents/firepie/CloudhitiFE/backend/queries/getDataStackedChart.sql","parameters":params}';

  // //   var params=new Array();

  // //   params.push(date1);
  // //   params.push(date2);


  // //   var path=this.sqlpath+"getPieChart1.sql";

  // //   var MysqlReportJson={
  // //     "sqlPath" : path ,
  // //     "classname" : this.classname ,
  // //     "dburl" : this.dburl,
  // //     "dbport" : this.dbport,
  // //     "dbusername" : this.dbusername,
  // //     "dbpassword" : this.dbpassword,
  // //     "dbname" : this.dbname2,
  // //     "parameters":params
  // //   };

  // // //console.log(JSON.stringify(MysqlReportJson));




  // //   // MysqlReportJson = JSON.parse(MysqlReportJson);
  // //   //The api calling
  // //   let _this = this;
  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (data) {

  // //     //console.log(data);
  // //     if (data.final_status) {

  // //       //The all data response in row format and store in variable
  // //       var allrows = data.allcol;
  // //       //The local array for store data
  // //       let arrayreturn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // //       let arrayreturn1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // //       let arrayreturn2 = [];
  // //       var selectedlength = data.colnames.length;


  // //       (allrows).forEach((valueobj, index) => {


  // //         arrayreturn2.push({
  // //           name: valueobj[0],
  // //           y: parseInt(valueobj[1])

  // //         });

  // //         //console.log('ALL ROWS',allrows);

  // //        //console.log('ARRAY RETURN',arrayreturn2);
  // //         var result = JSON.stringify(arrayreturn2);


  // //         //The making josn as per graph

  // //         if (index == allrows.length - 1) {
  // //           ////console.log('1');



  // //           let chartObj: any = {
  // //             chart: {
  // //               plotBackgroundColor: null,
  // //               plotBorderWidth: null,
  // //               plotShadow: false,
  // //               type: 'pie',
  // //               // margin: [0, 0, 0, 100]
  // //               spacingLeft: 30,





  // //             },

  // //             title: {
  // //               text: ''
  // //             },
  // //             tooltip: {
  // //               pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  // //             },
  // //             credits: {
  // //               enabled: false
  // //             },
  // //             plotOptions: {
  // //               pie: {

  // //                 colors: [
  // //                   '#c8dc8e',
  // //                   '#a4c9d0',
  // //                   '#89b299'
  // //                 ],
  // //                 allowPointSelect: true,
  // //                 cursor: 'pointer',
  // //                 dataLabels: {
  // //                   enabled: true,
  // //                   format: '<b>{point.name}</b>: {point.percentage:.1f} %',

  // //                 }
  // //               }
  // //             },
  // //             series: [{
  // //               name:'Percentage',
  // //               colorByPoint: true,
  // //               data: arrayreturn2
  // //             }]
  // //           };


  // //           _this.chart5 = new Chart(chartObj);

  // //         };


  // //       });

  // //     }

  // //   });
  // // }


  // // getdatagraphs6(date1,date2) {

  // //   // date = '2018-11-30';

  // //   //Date('yyyy-mm-dd')
  // //   //var dt2= $filter('date')(date, 'EEE d MMM yyyy')+ ", ";
  // //   //var datePipe = new DatePipe("en-US");
  // //   //var dt2 = datePipe.transform(date, 'MMM-dd-yyyy')+ ", ";
  // //   var dt2 = moment(date1).format('ddd D MM YYYY ')
  // //   //The json request
  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //   //   this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //   //   '","dbname":"' + this.dbname + '","tablename":"' + this.tablename +
  // //   //   '","query":" select driver_id, driver_name, created_local,STR_TO_DATE(created_local, \'%m/%d/%Y\') created_local_date,HOUR(STR_TO_DATE(created_local, \'%m/%d/%Y %H\')) - 12 created_local_hour,available_to_accept, accepted_to_pickup, pickup_to_destination,total_price, delivery_price, tip, tax, distance_by_road_miles, distance_by_road_km from cloudhiti.getswift_api_deliveries where STR_TO_DATE(created_local, \'%m/%d/%Y\')=\'2018-11-30\';"}';
  // //   // //console.log('***********************************',MysqlReportJson);




  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //   //   this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //   //   '","dbname":"' + this.dbname2 + '","tablename":"' + this.tablename2 +
  // //   //   '","query":" select HOUR(STR_TO_DATE(created_local, \'%m/%d/%Y %H\')) - 12 created_local_hour,round((sum(Accepted_To_Pickup)/count(Accepted_To_Pickup)),2) avg_accepted_To_Pickup,round((sum(available_to_accept)/count(available_to_accept)),2) avg_available_to_accept,round((sum(pickup_to_destination)/count(pickup_to_destination)),2) avg_pickup_to_destination from getswift_api_deliveries  where STR_TO_DATE(created_local, \'%m/%d/%Y\') between \''+ date1 + '\' and \''+ date2 + '\' group by 1;"}';

  // //   //   //console.log('***********************************',MysqlReportJson);




  // //     var params=new Array();

  // //     params.push(date1);
  // //     params.push(date2);


  // //     var path=this.sqlpath+"getDataStackedChart.sql";

  // //     var MysqlReportJson={
  // //       "sqlPath" : path ,
  // //       "classname" : this.classname ,
  // //       "dburl" : this.dburl,
  // //       "dbport" : this.dbport,
  // //       "dbusername" : this.dbusername,
  // //       "dbpassword" : this.dbpassword,
  // //       "dbname" : this.dbname2,
  // //       "parameters":params
  // //     };

  // //   //console.log(JSON.stringify(MysqlReportJson));







  // //   // MysqlReportJson = JSON.parse(MysqlReportJson);
  // //   //The api calling
  // //   let _this = this;
  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (data) {

  // //     //console.log('***************DATA*******************',data);
  // //     if (data.final_status) {

  // //       var allrows = data.allcol;
  // //       let arrayreturn = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // //       let arrayreturn1 = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // //       let arrayreturn2 = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // //       var selectedlength = data.colnames.length;


  // //       //console.log('**************ALL ROWS***************',allrows);

  // //       (allrows).forEach((valueobj, index) => {
  // //         //console.log(index, '1');
  // //         arrayreturn[parseInt(valueobj[0]) + 1] = parseFloat(valueobj[1]);
  // //         arrayreturn1[parseInt(valueobj[0]) + 1] = parseFloat(valueobj[2]);
  // //         arrayreturn2[parseInt(valueobj[0]) + 1] = parseFloat(valueobj[3]);


  // //         if (index == allrows.length - 1) {
  // //           arrayreturn[parseInt(valueobj[0]) + 1] = parseFloat(valueobj[1]);
  // //           arrayreturn1[parseInt(valueobj[0]) + 1] = parseFloat(valueobj[2]);
  // //           arrayreturn2[parseInt(valueobj[0]) + 1] = parseFloat(valueobj[3]);


  // //           //console.log('ARRAY ',arrayreturn);
  // //           //console.log('ARRAY 1',arrayreturn1);
  // //           //console.log('ARRAY 2',arrayreturn2);


  // //           let chartObj: any = {
  // //             chart: {
  // //               type: 'column',
  // //               height:330,
  // //               marginTop: 50


  // //             },
  // //             title: {
  // //               text: '',
  // //             },
  // //             xAxis: {
  // //               title: {
  // //                 enabled: true,
  // //                 text: 'Hours of the Day',
  // //                 style: {
  // //                   fontWeight: 'bold',
  // //                   color: 'black'
  // //                 }
  // //               },
  // //               categories: ["11 AM","12 PM", "01 PM", "02 PM","03 PM","04 PM","05 PM",
  // //               "06 PM","07 PM","08 PM","09 PM","10 PM","11 PM"],
  // //               labels: {
  // //                 style: {
  // //                   fontSize: '10px',
  // //                   // fontWeight: 'bold',
  // //                   color: 'black'
  // //                 },
  // //               }
  // //             },
  // //             yAxis: {
  // //               title: {
  // //                 text: 'Average Pickup and Acceptance Time (mins)',
  // //                 style: {
  // //                   fontWeight: 'bold',
  // //                   color: 'black',
  // //                   fontsize: '5px'
  // //                 }
  // //               },
  // //               stackLabels: {
  // //                 enabled: true,
  // //                 style: {
  // //                   fontSize: '10px',
  // //                   // fontWeight: 'bold',
  // //                   color: 'black'
  // //                 }
  // //               }
  // //             },
  // //             legend: {
  // //               align: 'right',
  // //               x: 0,
  // //               verticalAlign: 'top',
  // //               y: -15,
  // //               floating: true,
  // //               backgroundColor: 'white',
  // //               borderColor: '#CCC',
  // //               // borderWidth: 1,
  // //               shadow: false,
  // //               itemStyle: {
  // //                 font: '10pt',

  // //              },

  // //             },
  // //             tooltip: {
  // //               headerFormat: '<b>{point.x}</b><br/>',
  // //               pointFormat: '{series.name}: {point.y}'
  // //             },

  // //             plotOptions: {
  // //               series: {
  // //                 stacking: 'normal',
  // //                 cursor: 'pointer',

  // //               }
  // //             },
  // //             credits: {
  // //               enabled: false
  // //             },
  // //             series: [{
  // //               name: ' Average Available To Accept Time',
  // //               data: arrayreturn1,
  // //               color: '#9FBD69',


  // //               drilldown: 'Delivery',
  // //               point: {
  // //                 events: {
  // //                   click: function (e) {
  // //                     if(this.color != '#9FBD69')
  // //                     {
  // //                       return;
  // //                     }
  // //                     // alert(this.category);
  // //                     var time= this.category.split(' ');
  // //                     var date= time[3]+"-"+time[2]+"-"+time[1];
  // //                     ////console.log(time);
  // //                     // var hr=time[1].split(" ");
  // //                     var hr=time[0];

  // //                     ////console.log(hr);
  // //                     var hr1=hr[1]
  // //                     //parseInt(hr[0]) ;
  // //                     ////console.log(hr1);
  // //                     if( time[5] == "PM")
  // //                     {
  // //                       hr1=parseInt(time[4]);
  // //                     }

  // //                     // alert('***************HOUR****************'+hr1);
  // //                     ////console.log(this);
  // //                     // alert(date+" "+hr1);
  // //                     _this.getpopuptable(date,hr);
  // //                     //alert('Category: ' + parseInt(hr) + ', value: ' + this.y);
  // //                   }
  // //                 }
  // //               }


  // //             }, {
  // //               name: 'Average Accepted To Pickup Time',
  // //               data: arrayreturn,
  // //               color: '#74BAD2',
  // //             },
  // //             {
  // //               name: ' Average Pickup To Destination Time',
  // //               data: arrayreturn2,
  // //               color: '#669999',




  // //             }]
  // //           };
  // //           _this.chart6 = new Chart(chartObj);

  // //         }
  // //       });

  // //     }
  // //   });

  // // }


  // // getbestdrivertable(date1,date2)
  // // {


  // //   // let MysqlReportJson= '{"classname": "'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":" select Driver_ID,Driver_Name,round((sum(Distance_By_Road_Km)/sum(Pickup_To_Destination)),2) as speed from cloudhiti.getswift_api_deliveries group by 2 order by 3 desc limit 5;"}';




  // //   // MysqlReportJson = JSON.parse(MysqlReportJson);




  // //     var params=new Array();

  // //     params.push(date1);
  // //     params.push(date2);



  // //   var path=this.sqlpath+"getBestDriverTable.sql";

  // //   var MysqlReportJson={
  // //     "sqlPath" : path ,
  // //     "classname" : this.classname ,
  // //     "dburl" : this.dburl,
  // //     "dbport" : this.dbport,
  // //     "dbusername" : this.dbusername,
  // //     "dbpassword" : this.dbpassword,
  // //     "dbname" : this.dbname2,
  // //     "parameters":params
  // //   };

  // // //console.log(JSON.stringify(MysqlReportJson));











  // //   //The api calling
  // //   let _this = this;

  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (data) {
  // //     ////console.log(data);
  // //     //The all data response in row format and store in variable
  // //     var allrows = data.allcol;
  // //     // alert(allrows);
  // //     //console.log(allrows);
  // //     //The local array for store data
  // //     let arrayreturn = [];


  // //     $("#bestdriver").dataTable().fnDestroy();


  // //     $(document).ready(function()
  // //     {
  // //         table2 = $('#bestdriver').DataTable( {
  // //             // "pagingType": "full_numbers",
  // //             "lengthChange": true,
  // //             "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
  // //             "ordering": false

  // //         // lengthMenu: [
  // //         //   [ 5,10,15, -1 ],
  // //         //   [ '5','10','15','Show all' ]
  // //         // ]
  // //         // order: [[1, 'asc']]
  // //         // buttons: [
  // //         //   'print'
  // //         // ]

  // //         } );



  // //     } );






  // //     //var selectedlength=data.colnames.length;
  // //     var selectedlength = data.colnames.length;
  // //     // if ($("#bestdriver").oTable) {
  // //     //   $("#bestdriver").oTable.fnDestroy();
  // //     // }
  // //     $('#bestdriverbody').html('');
  // //     var body = '';
  // //     //The append data in table as table row
  // //     $.each(data.allcol, function (index, valueobj) {
  // //       body = body + '<tr align="right" >  ';
  // //       //<td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td>
  // //       for (var i = 0; i < selectedlength-1; i++) {

  // //         if (i == 1) {
  // //           let bodytext = ' <td align="right"  >' + valueobj[i] + ' </td> ';
  // //           //$compile(bodytext)($scope);
  // //           body = body + bodytext;
  // //         } else {
  // //           body = body + ' <td align="right"> ' + valueobj[i] + ' </td> ';
  // //         }
  // //       }
  // //       body = body + '</tr>';
  // //     });


  // //     $('#bestdriverbody').append(body);


  // //     // this.initTable3();

  // //     $('.bestdriver').show();
  // //     $('#bestdriver').show();




  // //     });

  // //     //  table2.destroy();
  // //   };



  // // getworstdrivertable(date1,date2)
  // // {


  // //   // let MysqlReportJson= '{"classname": "'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":" select Driver_ID,Driver_Name,round((sum(Distance_By_Road_Km)/sum(Pickup_To_Destination)),2) as speed from cloudhiti.getswift_api_deliveries group by 2 order by 3 asc limit 5;"}';




  // //   // MysqlReportJson = JSON.parse(MysqlReportJson);
  // //   //The api calling
  // //   let _this = this;


  // //   var params=new Array();

  // //   params.push(date1);
  // //   params.push(date2);




  // //   var path=this.sqlpath+"getWorstDriverTable.sql";

  // //   var MysqlReportJson={
  // //     "sqlPath" : path ,
  // //     "classname" : this.classname ,
  // //     "dburl" : this.dburl,
  // //     "dbport" : this.dbport,
  // //     "dbusername" : this.dbusername,
  // //     "dbpassword" : this.dbpassword,
  // //     "dbname" : this.dbname2,
  // //     "parameters":params
  // //   };

  // // //console.log(JSON.stringify(MysqlReportJson));






  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (data) {
  // //     ////console.log(data);
  // //     //The all data response in row format and store in variable
  // //     var allrows = data.allcol;
  // //     // alert(allrows);
  // //     //console.log(allrows);
  // //     //The local array for store data
  // //     let arrayreturn = [];


  // //     $("#worstdriver").dataTable().fnDestroy();


  // //     $(document).ready(function()
  // //     {
  // //         table3 = $('#worstdriver').DataTable( {
  // //             // "pagingType": "full_numbers",
  // //             "lengthChange": true,
  // //             "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
  // //             "ordering": false

  // //         // lengthMenu: [
  // //         //   [ 5,10,15, -1 ],
  // //         //   [ '5','10','15','Show all' ]
  // //         // ]
  // //         // order: [[1, 'asc']]
  // //         // buttons: [
  // //         //   'print'
  // //         // ]

  // //         } );



  // //     } );






  // //     //var selectedlength=data.colnames.length;
  // //     var selectedlength = data.colnames.length;
  // //     // if ($("#bestdriver").oTable) {
  // //     //   $("#bestdriver").oTable.fnDestroy();
  // //     // }
  // //     $('#worstdriverbody').html('');
  // //     var body = '';
  // //     //The append data in table as table row
  // //     $.each(data.allcol, function (index, valueobj) {
  // //       body = body + '<tr align="right" >  ';
  // //       //<td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td>
  // //       for (var i = 0; i < selectedlength-1; i++) {

  // //         if (i == 0) {
  // //           let bodytext = ' <td align="right"  >' + valueobj[i] + ' </td> ';
  // //           //$compile(bodytext)($scope);
  // //           body = body + bodytext;
  // //         } else {
  // //           body = body + ' <td align="right"> ' + valueobj[i] + ' </td> ';
  // //         }
  // //       }
  // //       body = body + '</tr>';
  // //     });


  // //     $('#worstdriverbody').append(body);



  // //     $('.worstdriver').show();
  // //     $('#worstdriver').show();




  // //     });

  // //     //  table3.destroy();
  // //   };




  // // getpopuptable = function(orderdate,orderhour)


  // // {



  // //   // private http:HttpClient;
  // //   let backendApiUrl= environment.backendApiUrl;


  // //   //console.log("***********************\n getDeliveryDate Function called\n*************************");
  // //   //The json request
  // //   // let MysqlReportJson= '{"classname": "'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"select GetSwift_Job_Id,Current_Stage,Total_Price,Driver_Name,Driver_ID,Destination_Adress,Total_Job_Time,HOUR(STR_TO_DATE(created_local, \'%m/%d/%Y %H\')) as \'Order Hour\' from cloudhiti.getswift_api_deliveries where STR_TO_DATE(created_local, \'%m/%d/%Y\') between \''+ this.date1 + '\' and \''+ this.date2 + '\' and HOUR(STR_TO_DATE(created_local, \'%m/%d/%Y %H\')) - 12=\''+orderhour+'\' limit 100;"}';



  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' + this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword + '","dbname":"' + this.dbname + '","tablename":"' + this.tablename + '","query":"select date(CONVERT_TZ(c.created_at, \\\'+00:00\\\',\\\'-7:00\\\')  ) order_date, HOUR(CONVERT_TZ(c.created_at, \\\'+00:00\\\',\\\'-7:00\\\') ) order_hour, b.field_6 driver_id ,CONVERT_TZ(a.field_17, \\\'+00:00\\\',\\\'-7:00\\\')    pickup_time, CONVERT_TZ(a.field_18, \\\'+00:00\\\',\\\'-7:00\\\')    dropoff_time,b.field_11 estimated_distance  ,c.id as OrderID   from firepiedeliveries a join firepieget_swift_deliveries b on a.field_1 = b.field_7 join firepieorders c on a.field_12 = c.id where b.field_5 <> \\\'Cancelled\\\' and date(CONVERT_TZ(c.created_at, \\\'+00:00\\\',\\\'-7:00\\\') ) = \\\'\'+orderdate+\'\\\' and HOUR(CONVERT_TZ(c.created_at, \\\'+00:00\\\',\\\'-7:00\\\') )= \'+parseInt(orderhour)+\' group by 5"}';

  // //   ////console.log(MysqlReportJson)
  // //   // MysqlReportJson = JSON.parse(MysqlReportJson);
  // //   //The api calling
  // //   let _this = this;



  // //   var params=new Array();

  // //   params.push(this.date1);
  // //   params.push(this.date2);
  // //   params.push(orderhour);




  // //   var path=this.sqlpath+"getPopupTable.sql";

  // //   var MysqlReportJson={
  // //     "sqlPath" : path ,
  // //     "classname" : this.classname ,
  // //     "dburl" : this.dburl,
  // //     "dbport" : this.dbport,
  // //     "dbusername" : this.dbusername,
  // //     "dbpassword" : this.dbpassword,
  // //     "dbname" : this.dbname2,
  // //     "parameters":params
  // //   };

  // // //console.log(JSON.stringify(MysqlReportJson));
















  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (data) {
  // //     ////console.log(data);
  // //     //The all data response in row format and store in variable
  // //     var allrows = data.allcol;
  // //     // alert(allrows);
  // //     //console.log('****************Popup data*************',allrows);
  // //     //The local array for store data
  // //     let arrayreturn = [];



  // //     $("#deliverydetails").dataTable().fnDestroy();



  // //     $(document).ready(function()
  // //     {
  // //         table4 = $('#deliverydetails').DataTable( {
  // //             // "pagingType": "full_numbers",
  // //             "lengthChange": true,
  // //             "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
  // //         lengthMenu: [
  // //           [ 5,10,15, -1 ],
  // //           [ '5','10','15','Show all' ]
  // //         ]
  // //         // order: [[1, 'asc']]
  // //         // buttons: [
  // //         //   'print'
  // //         // ]

  // //         } );



  // //     } );

  // //     var selectedlength = data.colnames.length;


  // //     // $('#deliverydetails').DataTable( {
  // //     //   destroy: true,
  // //     // } );
  // //     // if ($("#deliverydetails").table4) {
  // //     //   $("#deliverydetails").table4.fnDestroy();
  // //     // }
  // //     $('#deliverydetailsbody').html('');
  // //     var body = '';
  // //     //The append data in table as table row
  // //     $.each(data.allcol, function (index, valueobj) {
  // //       body = body + '<tr align="right"  >  ';
  // //       //<td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td>
  // //       for (var i = 0; i < selectedlength; i++) {

  // //         if (i==1) {
  // //           let bodytext = ' <td align="left"  > ' + valueobj[i] + ' </td> ';
  // //           body = body + bodytext;
  // //         }
  // //         else if (i==8 ) {
  // //           let bodytext = ' <td align="right"  > ' + valueobj[i] + ' </td> ';
  // //           body = body + bodytext;
  // //         }

  // //          else {
  // //           body = body + ' <td align="right"> ' + valueobj[i] + ' </td> ';
  // //         }
  // //       }
  // //       body = body + '</tr>';
  // //     });


  // //     $('#deliverydetailsbody').append(body);


  // //     // this.initTable3();


  // //     $('.printArea4').show();
  // //     $('#printArea4').show();

  // //     $('.deliverydetails').show();
  // //     $('#deliverydetails').show();




  // //   },function (errorMessage) {
  // //   });

  // //     // table4.destroy();

  // // };



  // // getdatagraphs7(date1,date2) {
  // //   // date = '2018-03-23'

  // //   // var dt2 = moment(date).format('ddd D MM YYYY ')
  // //   //The json request
  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //   //   this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //   //   '","dbname":"' + this.dbname2 + '","tablename":"' + this.tablename2 +
  // //   //   '","query":" select count(GetSwift_Job_Id),Destination_Postcode from getswift_api_deliveries group by 2 order by 1 desc limit 10;"}';

  // //   // MysqlReportJson = JSON.parse(MysqlReportJson);







  // //   var params=new Array();

  // //   params.push(date1);
  // //   params.push(date2);





  // //   var path=this.sqlpath+"getBestPostal.sql";

  // //   var MysqlReportJson={
  // //     "sqlPath" : path ,
  // //     "classname" : this.classname ,
  // //     "dburl" : this.dburl,
  // //     "dbport" : this.dbport,
  // //     "dbusername" : this.dbusername,
  // //     "dbpassword" : this.dbpassword,
  // //     "dbname" : this.dbname2,
  // //     "parameters":params
  // //   };

  // // //console.log(JSON.stringify(MysqlReportJson));



  // //   //The api calling
  // //   let _this = this;
  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (data) {

  // //     //console.log(data);
  // //     if (data.final_status) {

  // //       //The all data response in row format and store in variable
  // //       var allrows = data.allcol;
  // //       //The local array for store data
  // //       let arrayreturn1 = [];
  // //       let arrayreturn2=[];
  // //       // let arrayreturn1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // //       var selectedlength = data.colnames.length;

  // //       //The append data in table as table row


  // //       (allrows).forEach((valueobj, index) => {

  // //         //The making josn as per graph
  // //         arrayreturn1[index] = parseFloat(valueobj[0]); //count data
  // //         arrayreturn2[index] = valueobj[1]; //categories postal code


  // //         if (index == allrows.length - 1) {
  // //           ////console.log('1');
  // //           arrayreturn1[index] = parseFloat(valueobj[0]);
  // //           arrayreturn2[index] = valueobj[1];


  // //           //console.log('*********************DATA****************',arrayreturn1);
  // //           //console.log('*********************CATEGORIES****************',arrayreturn2);


  // //           let chartObj: any = {
  // //             chart: {
  // //               type: 'column',
  // //               height: 300
  // //             },
  // //             title: {
  // //               text: '',
  // //             },
  // //             xAxis: {
  // //               title: {
  // //                 enabled: true,
  // //                 text: 'Postal Code',
  // //                 style: {

  // //                   // fontSize:'10px',
  // //                   fontWeight: 'bold',
  // //                   color: 'black'
  // //                 }
  // //               },
  // //               categories: arrayreturn2,
  // //               labels: {
  // //                 style: {
  // //                   fontSize: '10px',
  // //                   // fontWeight: 'bold',
  // //                   color: 'black'
  // //                 },
  // //               }
  // //             },
  // //             yAxis: {

  // //               title: {
  // //                 text: 'Number Of Orders ',
  // //                 style: {
  // //                   fontWeight: 'bold',
  // //                   color: 'black'
  // //                 }
  // //               },
  // //               stackLabels: {
  // //                 enabled: true,
  // //                 style: {
  // //                   fontSize: '8px',
  // //                   fontWeight: 'bold',
  // //                   color: 'black'
  // //                 }
  // //               }
  // //             },
  // //             legend: {
  // //               align: 'right',
  // //               x: 0,
  // //               verticalAlign: 'top',
  // //               y: -15,
  // //               floating: true,
  // //               backgroundColor: 'white',
  // //               borderColor: '#CCC',
  // //               // borderWidth: 1,
  // //               shadow: false
  // //             },
  // //             tooltip: {
  // //               headerFormat: '<b>{point.x}</b><br/>',
  // //               pointFormat: '{series.name}: {point.y}'
  // //             },
  // //             plotOptions: {
  // //               series: {}
  // //             },
  // //             credits: {
  // //               enabled: false
  // //             },
  // //             series: [{
  // //               name: 'Total Orders',
  // //               data: arrayreturn1,
  // //               color: '#9FBD69',
  // //             }]
  // //           };
  // //           _this.chart7 = new Chart(chartObj);


  // //         }
  // //       });

  // //     }
  // //   });

  // // }



  // // getdatagraphs8(date1,date2) {
  // //   // date = '2018-03-23'

  // //   // var dt2 = moment(date).format('ddd D MM YYYY ')
  // //   //The json request
  // //   // let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
  // //   //   this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
  // //   //   '","dbname":"' + this.dbname2 + '","tablename":"' + this.tablename2 +
  // //   //   '","query":" select count(GetSwift_Job_Id),Destination_Postcode from getswift_api_deliveries where Current_Stage=\'Cancelled\' group by 2 order by 1 desc limit 10;"}';

  // //   // MysqlReportJson = JSON.parse(MysqlReportJson);



  // //   var params=new Array();

  // //   params.push(date1);
  // //   params.push(date2);




  // //   var path=this.sqlpath+"getCancelledPostal.sql";

  // //   var MysqlReportJson={
  // //     "sqlPath" : path ,
  // //     "classname" : this.classname ,
  // //     "dburl" : this.dburl,
  // //     "dbport" : this.dbport,
  // //     "dbusername" : this.dbusername,
  // //     "dbpassword" : this.dbpassword,
  // //     "dbname" : this.dbname2,
  // //     "parameters":params
  // //   };

  // // //console.log(JSON.stringify(MysqlReportJson));

  // //   //The api calling
  // //   let _this = this;
  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (data) {

  // //     //console.log(data);
  // //     if (data.final_status) {

  // //       //The all data response in row format and store in variable
  // //       var allrows = data.allcol;
  // //       //The local array for store data
  // //       let arrayreturn1 = [];
  // //       let arrayreturn2=[];
  // //       // let arrayreturn1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // //       var selectedlength = data.colnames.length;

  // //       //The append data in table as table row


  // //       (allrows).forEach((valueobj, index) => {

  // //         //The making josn as per graph
  // //         arrayreturn1[index] = parseFloat(valueobj[0]); //count data
  // //         arrayreturn2[index] = valueobj[1]; //categories postal code


  // //         if (index == allrows.length - 1) {
  // //           ////console.log('1');
  // //           arrayreturn1[index] = parseFloat(valueobj[0]);
  // //           arrayreturn2[index] = valueobj[1];


  // //           //console.log('*********************DATA****************',arrayreturn1);
  // //           //console.log('*********************CATEGORIES****************',arrayreturn2);


  // //           let chartObj: any = {
  // //             chart: {
  // //               type: 'column',
  // //               height:300
  // //             },
  // //             title: {
  // //               text: '',
  // //             },
  // //             xAxis: {
  // //               title: {
  // //                 enabled: true,
  // //                 text: 'Postal Code',
  // //                 style: {


  // //                   fontWeight: 'bold',
  // //                   color: 'black'
  // //                 }
  // //               },
  // //               categories: arrayreturn2,
  // //               labels: {
  // //                 style: {
  // //                   fontSize: '10px',
  // //                   // fontWeight: 'bold',
  // //                   color: 'black'
  // //                 },
  // //               }
  // //             },
  // //             yAxis: {

  // //               title: {
  // //                 text: 'Number Of Orders ',
  // //                 style: {
  // //                   fontWeight: 'bold',
  // //                   color: 'black'
  // //                 }
  // //               },
  // //               stackLabels: {
  // //                 enabled: true,
  // //                 style: {
  // //                   fontSize: '8px',
  // //                   fontWeight: 'bold',
  // //                   color: 'black'
  // //                 }
  // //               }
  // //             },
  // //             legend: {
  // //               align: 'right',
  // //               x: 0,
  // //               verticalAlign: 'top',
  // //               y: -15,
  // //               floating: true,
  // //               backgroundColor: 'white',
  // //               borderColor: '#CCC',
  // //               // borderWidth: 1,
  // //               shadow: false
  // //             },
  // //             tooltip: {
  // //               headerFormat: '<b>{point.x}</b><br/>',
  // //               pointFormat: '{series.name}: {point.y}'
  // //             },
  // //             plotOptions: {
  // //               series: {}
  // //             },
  // //             credits: {
  // //               enabled: false
  // //             },
  // //             series: [{
  // //               name: 'Total Orders',
  // //               data: arrayreturn1,
  // //               color: '#9FBD69',
  // //             }]
  // //           };
  // //           _this.chart7 = new Chart(chartObj);


  // //         }
  // //       });

  // //     }
  // //   });

  // // }


  // // selectchoice1()
  // // {
  // //   // alert(this.choice1);

  // //   if(this.choice1=="Total Orders Based On Postal Code")
  // //   {
  // //     this.getdatagraphs7(this.date1,this.date2);
  // //   }
  // //   if(this.choice1=="Cancelled Orders Based On Postal Code")
  // //   {
  // //     this.getdatagraphs8(this.date1,this.date2);
  // //   }

  // // }


  // // selectchoice2()
  // // {
  // //   // alert(this.choice2);

  // //   if(this.choice2=="Top 5 Drivers")
  // //   {
  // //     $('#printArea3').hide();
  // //     $('#printArea2').show();


  // //     this.getbestdrivertable(this.date1,this.date2);

  // //   }
  // //   if(this.choice2=="Worst 5 Drivers")
  // //   {
  // //     $('#printArea2').hide();
  // //     $('#printArea3').show();


  // //     this.getworstdrivertable(this.date1,this.date2);
  // //   }

  // // }



  // // totalordersGetswift(date1,date2) {
  // //   let _this = this;


  // //   var params=new Array();

  // //   params.push(date1);
  // //   params.push(date2);




  // //   var path=this.sqlpath+"getTotalordersGetSwift.sql";

  // //     var MysqlReportJson={
  // //       "sqlPath" : path ,
  // //       "classname" : this.classname ,
  // //       "dburl" : this.dburl,
  // //       "dbport" : this.dbport,
  // //       "dbusername" : this.dbusername,
  // //       "dbpassword" : this.dbpassword,
  // //       "dbname" : this.dbname,
  // //       "parameters":params
  // //     };




  // //   //The api calling
  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
  // //     if (returnObj.final_status) {
  // //       //The all data response in row format and store in variable
  // //       var allrows = returnObj.allcol;
  // //       //The local array for store data
  // //       _this.totalorders_getswift = allrows[0][0];
  // //       var myjson=JSON.stringify(MysqlReportJson);
  // //       //console.log(_this.totalorders_getswift);
  // //     }
  // //   });
  // // }

  // // totalcompletedGetswift(date1,date2) {
  // //   let _this = this;

  // //   var params=new Array();

  // //   params.push(date1);
  // //   params.push(date2);





  // //   var path=this.sqlpath+"getTotalCompletedGetswift.sql";

  // //     var MysqlReportJson={
  // //       "sqlPath" : path ,
  // //       "classname" : this.classname ,
  // //       "dburl" : this.dburl,
  // //       "dbport" : this.dbport,
  // //       "dbusername" : this.dbusername,
  // //       "dbpassword" : this.dbpassword,
  // //       "dbname" : this.dbname,
  // //       "parameters":params
  // //     };




  // //   //The api calling
  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
  // //     if (returnObj.final_status) {
  // //       //The all data response in row format and store in variable
  // //       var allrows = returnObj.allcol;
  // //       //The local array for store data
  // //       _this.totalcompleted_getswift = allrows[0][0];
  // //       var myjson=JSON.stringify(MysqlReportJson);
  // //       //console.log(myjson);
  // //       //console.log(_this.totalcompleted_getswift);
  // //     }
  // //   });
  // // }


  // // totalcancelledGetswift(date1,date2) {
  // //   let _this = this;


  // //   var params=new Array();

  // //   params.push(date1);
  // //   params.push(date2);





  // //   var path=this.sqlpath+"getTotalCancelledGetswift.sql";

  // //     var MysqlReportJson={
  // //       "sqlPath" : path ,
  // //       "classname" : this.classname ,
  // //       "dburl" : this.dburl,
  // //       "dbport" : this.dbport,
  // //       "dbusername" : this.dbusername,
  // //       "dbpassword" : this.dbpassword,
  // //       "dbname" : this.dbname,
  // //       "parameters":params
  // //     };




  // //   //The api calling
  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
  // //     if (returnObj.final_status) {
  // //       //The all data response in row format and store in variable
  // //       var allrows = returnObj.allcol;
  // //       //The local array for store data
  // //       _this.totalcancelled_getswift = allrows[0][0];
  // //       var myjson=JSON.stringify(MysqlReportJson);
  // //       //console.log(myjson);
  // //       //console.log(_this.totalcancelled_getswift);
  // //     }
  // //   });
  // // }

  // // totaldriversGetswift(date1,date2) {
  // //   let _this = this;


  // //   var params=new Array();

  // //   params.push(date1);
  // //   params.push(date2);





  // //   var path=this.sqlpath+"getTotalDrivers.sql";

  // //     var MysqlReportJson={
  // //       "sqlPath" : path ,
  // //       "classname" : this.classname ,
  // //       "dburl" : this.dburl,
  // //       "dbport" : this.dbport,
  // //       "dbusername" : this.dbusername,
  // //       "dbpassword" : this.dbpassword,
  // //       "dbname" : this.dbname,
  // //       "parameters":params
  // //     };




  // //   //The api calling
  // //   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
  // //     if (returnObj.final_status) {
  // //       //The all data response in row format and store in variable
  // //       var allrows = returnObj.allcol;
  // //       //The local array for store data
  // //       _this.totaldrivers_getswift = allrows[0][0];
  // //       var myjson=JSON.stringify(MysqlReportJson);
  // //       //console.log(myjson);
  // //       //console.log(_this.totaldrivers_getswift);
  // //     }
  // //   });
  // // }


  // }

