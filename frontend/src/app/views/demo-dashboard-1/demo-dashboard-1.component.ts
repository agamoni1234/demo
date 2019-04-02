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

// import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

import { introJs } from './intro.js';


// import { CloudData, CloudOptions,ZoomOnHoverOptions } from 'angular-tag-cloud-module';



let postalcode:number;
let orders:number;


let postalorders:any;
let postalorderslength:number;


let table1=null;
let table2=null;
let table3=null;
let table4=null;
let table5=null;




@NgModule({
  imports: [NgbModule,NgbPopover,ModalModule]
})
@Component({
    templateUrl: 'demo-dashboard-1.component.html'
})
export class DemoDashboard1Component implements OnInit {


  backendApiUrl= environment.backendApiUrl;
  classname = environment.classname;
  dburl = environment.dburl;
  dbport = environment.dbport;
  dbusername = environment.dbusername;
  dbpassword = environment.dbpassword;
  sqlpath=environment.sqlfilepath;


  totalcustomer = 0;
  totalorder = 0;
  totalsale = 0;
  monthsale = 0;


  totalorders_getswift = 0;
  totalcancelled_getswift=0;
  totalcompleted_getswift=0;
  totaldrivers_getswift=0;


  averageOntheway_getswift=0;
  averageDispatch_getswift=0;
  averageDelivery_getswift=0;

  //Showdate = moment(new Date()).format('YYYY-MM-DD');
  chart: Chart;
  chart2: Chart;
  chart3: Chart;
  chart4: Chart;

  chart5: Chart;
  chart6: Chart;
  chart7: Chart;
  chart8: Chart;
  twitterchart: Chart;
  sentimentchart: Chart;
  twitterchartBubble :Chart;



  Showdate: any = moment(new Date()).format('YYYY-MM-DD');
  Showdate2: any = moment(new Date()).format('YYYY-MM-DD');


  date1: any = moment(new Date()).format('YYYY-MM-DD');
  date2: any = moment(new Date()).format('YYYY-MM-DD');

  choice1:any="Total Completed Orders Based On Postal Code";
  choice2:any="Top 5 Drivers";




  totaltweets:any;
  totalpositive:any;
  totalneutral:any;
  totalnegative:any;

  tweet:any;

  // thisobject:any;
  // abc:any;

  // yearoptions =  {2018,2017,2016,2015,2014,2013};


  calendarOptions = {
    minYear: 1970,
    maxYear: 2030,
    format: 'YYYY-MM-DD',
    displayFormat: 'YYYY-MM-DD',
    barTitleFormat: 'MMMM YYYY',
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown
  };

  constructor(private router: Router, public http: HttpClient, private AppServiceObj: AppService, public AppServiceBackendApiObj:
    AppServiceBackendApi) {
  }

  latitude: Number = 37.77;
  longitude: Number =  -122.41;
  zoom: number = 12;

  markers: Marker[] = [


  ];

  lat:Number=0.00;
  lng:Number=0.00;







  locationdata:any;


  timestamp:any;



  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if (token == null) {
      this.router.navigate(['login']);
    }
    else{
      this.getdatagraphs6(this.date1,this.date2);
      this.getdatagraphs5(this.date1,this.date2);
      this.getdatagraphs7(this.date1,this.date2);
      this.getbestdrivertable(this.date1,this.date2);






        $('.sampledelivery').hide();
        $('#sampledelivery').hide();

        $('#emailformpopup').hide();


        // $('.bestdriver').hide();
        // $('#bestdriver').hide();

        $('.worstdriver').hide();
        $('#worstdriver').hide();


        $('.deliverydetails').hide();
        $('#deliverydetails').hide();


        $('#tweetbody').hide();
        $('#printArea2').show();




        // this.getdatagraphs5();
        // this.getdatagraphs6();

        this.introMethod();
    }
  }

  introMethod() {
    const IntroJs = introJs;
    let intro = IntroJs();
    intro.setOptions({
      steps: [
        {
          intro: "CloudDhiti quick tour guide welcomes you!"
        },
        {
          element: "#headingTxt",
          intro: "Dashboard Name"
        },
        {
          element: "#cardsid1",
          intro: "From this 6 cards you can find the total number of orders taken, the total number of drivers, total number of orders successfully completd, the total number of orders canceled, average preparation time, and average delivery time."
        },
        {
          element: "#comparison",
          intro: "From this chart you can find out what are the average delivery time, average preparation time in any particular hour of the day on a particular date or within two particular dates."
        },
        {
          element: "#pie-comparison",
          intro: "From this particular you can find out what is the percentage of successfully completed orders, and canceled orders."
        },
        {
          element: "#postalcolumn",
          intro: "From this column chart you can find out the total number of successfully completed orders and canceled orders in a particular postal code."
        },
        {
          element: "#printArea2",
          intro: "From this section you can find out the information about the top 5 drivers who have a very good performance and, top 5 optimizable drivers, who need to improve their performance."
        },
        {
          intro: "Thank you for visiting ClouDhiti!"
        }
        // {
        //   element: "#sidebar-navigation",
        //   intro: "Nav-Bar",
        //   position: "relative"
        // }
      ],
        showProgress: false,
        skipLabel: "Skip",
        doneLabel: "Done",
        nextLabel: "Next",
        prevLabel: "Prev",
        overlayOpacity: 0.8,
        tooltipPosition: 'bottom',
      });
      intro.start();
      $("#demo-dashboard-1-body").attr('style','zoom:0%');
  }

  storefromdate(e)
  {
    this.date1 = moment(e).format('YYYY-MM-DD');

  }

  storetodate(e)
  {
    this.date2 = moment(e).format('YYYY-MM-DD');


  }

  doSomething(e) {

    $('.printArea4').hide();
    $('#printArea4').hide();
    // $('#emailformpopup').show();


    let date = moment(e).format('YYYY-MM-DD');
    // this.date2 = moment(e).format('YYYY-MM-DD');





    // this.chart5=null;
    // this.chart6=null;
    // this.chart7=null;





    // this.getmap(this.date1,this.date2);




  }

  ngAfterViewInit() {
    // this.getdatagraphs1(this.Showdate)
    // this.getdatagraphs2(this.Showdate)
    // this.getdatagraphs2(this.Showdate)
    //this.getpopup(26466);
  }

  printDiv2(): void {


    $("#printbutton").css('display','none');
    $("#emailbutton").css('display','none');
    $("#emailpopup").css('display','none');


    $("#deliverydetails_paginate").css('display','none');
    $("#deliverydetails_length").css('display','none');
    $("#deliverydetails_filter").css('display','none');
    $("#deliverydetails_info").css('display','none');



    let printContents1,popupWin;
    printContents1 = document.getElementById('printArea4').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
    <html>
    <head>
    <style>
    @page { size: auto;}
    #deliverydetails th, #deliverydetails td{ border: 0.5px solid black;font-size:10px;}

    </style>
    </head>
    <body onload="window.print();window.close()">
    <img src="assets/img/brand/LIGHT-BACKGROUND-LOGO.png" style="width: 200px;height: 50px;display:block;margin-left:auto;margin-right:auto;margin-bottom:30px;">
    ${printContents1}
    </body>
    </html>`
    );
    popupWin.document.close();
    $("#printbutton").css('display','');

    $("#emailbutton").show();
    // $("#sendemailbutton").css('dispaly','');


    $("#deliverydetails_paginate").css('display','');
    $("#deliverydetails_length").css('display','');
    $("#deliverydetails_filter").css('display','');
    $("#deliverydetails_info").css('display','');
    $("#emailpopup").show();



    // let printContents, popupWin;
    // printContents = document.getElementById('printArea4').innerHTML;
    // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // popupWin.document.open();
    // popupWin.document.write(`
    //   <html>
    //     <head>
    //       <title>Print tab</title>
    //       <style>
    //       //........Customized style.......
    //       </style>
    //     </head>
    // <body onload="window.print();window.close()">${printContents}</body>
    //   </html>`
    // );
    // popupWin.document.close();
  }

  getdatagraphs5(date1,date2) {

    var params=new Array();

    let _this = this;

      // console.log(data.allcol.length);


        //The all data response in row format and store in variable
        let arrayreturn2 = [];




          arrayreturn2.push(

            {name: "Cancelled", y: 522},
            {name: "Completed", y: 5112}

          );



         console.log('ARRAY RETURN',arrayreturn2);




            let chartObj: any = {
              chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                // margin: [0, 0, 0, 100]
                spacingLeft: 30,





              },

              title: {
                text: ''
              },
              tooltip: {
                pointFormat: 'Percentage: <b>{point.percentage:.1f}%</b><br/>Total: <b>{point.y}</b>'
              },
              credits: {
                enabled: false
              },
              plotOptions: {
                pie: {

                  colors: [
                    '#e25f34',
                    '#f5835d',
                    '#F29479'
                  ],
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>',

                  }
                }
              },
              series: [{
                name:'Percentage',
                colorByPoint: true,
                data: arrayreturn2
              }]
            };


            _this.chart5 = new Chart(chartObj);
            // _this.chart5 = null;

  }

  getdatagraphs6(date1, date2)
  {

    let _this = this;

    let arrayreturn1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let arrayreturn2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    arrayreturn2 = [0, 0, 0, 0, 10, 12, 16, 29, 11, 15, 18, 18, 10];
    arrayreturn1 = [0, 0, 0, 0, 13, 21, 14, 24, 13, 22, 15, 17, 15];

    // console.log('ARRAY 1', arrayreturn1);
    // console.log('ARRAY 2', arrayreturn2);


    let chartObj: any = {
      chart: {
        type: 'column',
        // height:330,
        marginTop: 50,
        zoomType: 'x',
        reflow: true
      },
      title: {
        text: '',
      },
      xAxis: {
        title: {
          enabled: true,
          text: 'Hours of the Day',
          style: {
            fontWeight: 'bold',
            color: 'black'
          }
        },
        categories: ["11 AM", "12 PM", "01 PM", "02 PM", "03 PM", "04 PM", "05 PM",
          "06 PM", "07 PM", "08 PM", "09 PM", "10 PM", "11 PM"],
        labels: {
          style: {
            fontSize: '10px',
            // fontWeight: 'bold',
            color: 'black'
          },
        }
      },
      yAxis: {
        title: {
          text: 'Average Preparation,Delivery Time (mins)',
          style: {
            fontWeight: 'bold',
            color: 'black',
            fontsize: '5px'
          }
        },
        stackLabels: {
          enabled: true,
          style: {
            fontSize: '10px',
            // fontWeight: 'bold',
            color: 'black'
          }
        }
      },
      legend: {
        align: 'center',
        x: 0,
        verticalAlign: 'top',
        y: -15,
        floating: true,
        backgroundColor: 'white',
        borderColor: '#CCC',
        // borderWidth: 1,
        shadow: false,
        itemStyle: {
          font: '10pt',

        },

      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}'
      },

      plotOptions: {
        series: {
          stacking: 'normal',
          cursor: 'pointer',

        }
      },
      credits: {
        enabled: false
      },
      series:
      [
        {
          name: ' Average Delivery Time',
          data: arrayreturn2,
          color: '#F29479',

          drilldown: 'Delivery1',
          point: {
            events: {
              click: function (e) {
                if (this.color != '#F29479') {
                  return;
                }
                // alert(this.category);
                var time = this.category.split(' ');
                var date = time[3] + "-" + time[2] + "-" + time[1];
                var hr = time[0];
                var hr1 = hr[1];
                if (time[5] == "PM") {
                  hr1 = parseInt(time[4]);
                }

                _this.getpopuptable(date, hr);

              }
            }
          }


        },

        {


          name: ' Average Preparation Time',
          data: arrayreturn1,
          color: '#e25f34',


          drilldown: 'Delivery3',
          point: {
            events: {
              click: function (e) {
                if (this.color != '#e25f34') {
                  return;
                }
                // alert(this.category);
                var time = this.category.split(' ');
                var date = time[3] + "-" + time[2] + "-" + time[1];
                //console.log(time);
                // var hr=time[1].split(" ");
                var hr = time[0];

                //console.log(hr);
                var hr1 = hr[1]
                //parseInt(hr[0]) ;
                //console.log(hr1);
                if (time[5] == "PM") {
                  hr1 = parseInt(time[4]);
                }

                // alert('***************HOUR****************'+hr1);
                //console.log(this);
                // alert(date+" "+hr1);
                _this.getpopuptable(date, hr);
                //alert('Category: ' + parseInt(hr) + ', value: ' + this.y);
              }
            }
          }


        }



      ]
    };
    _this.chart6 = new Chart(chartObj);










  }

  getbestdrivertable(date1,date2)
  {




      let data=
      [
        ["38", "1452", "448", "6702", "354", "78.32"],
        ["35", "1231", "245", "3146", "670", "33.80"],
        ["16", "2045", "603", "5644", "453", "28.75"],
        ["60", "1718", "854", "4305", "189", "17.65"],
        ["11", "1350", "66", "3594", "310", "13.26"]
      ]


      let _this = this;

      console.log(data);

      let arrayreturn = [];


      $("#bestdriver").dataTable().fnDestroy();


      $(document).ready(function()
      {
          table2 = $('#bestdriver').DataTable( {
              "lengthChange": true,
              "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
              "ordering": false,
              lengthMenu: [
                [ 5,10,15, -1 ],
                [ '5','10','15','Show all' ]
              ]

          } );

      } );






      var selectedlength = data.length;

      $('#bestdriverbody').html('');
      var body = '';
      $.each(data, function (index, valueobj) {
        body = body + '<tr align="right" >  ';
        for (var i = 0; i < 5; i++) {

          if (i == 1) {
            let bodytext = ' <td align="right"  >' + valueobj[i] + ' </td> ';
            body = body + bodytext;
          }
          else if (i==3) {
            let bodytext = ' <td align="right"  > ' +'$'+ valueobj[i] + ' </td> ';
            body = body + bodytext;
          }
          else {
            body = body + ' <td align="right"> ' + valueobj[i] + ' </td> ';
          }
        }
        body = body + '</tr>';
      });


      $('#bestdriverbody').append(body);


      // this.initTable3();

      $('.bestdriver').show();
      $('#bestdriver').show();
      $('#printArea2').show();


  };

  getworstdrivertable(date1,date2)
  {




    let data=
    [
      ["56", "1424", "14220", "3040", "80", "0.07"],
      ["54", "7457", "19704", "1896", "35", "1.42"],
      ["03", "4428", "63844", "4836", "19", "2.22"],
      ["13", "6298", "60411", "2015", "60", "7.46"],
      ["91", "1589", "88944", "4018", "94", "7.55"]
    ]


      $("#worstdriver").dataTable().fnDestroy();


      $(document).ready(function()
      {
          table3 = $('#worstdriver').DataTable( {
              // "pagingType": "full_numbers",
              "lengthChange": true,
              "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
              "ordering": false,
              lengthMenu: [
                [ 5,10,15, -1 ],
                [ '5','10','15','Show all' ]
              ]


          } );



      } );






      var selectedlength = data.length;

      $('#worstdriverbody').html('');
      var body = '';
      //The append data in table as table row
      $.each(data, function (index, valueobj) {
        body = body + '<tr align="right" >  ';
        //<td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td>
        for (var i = 0; i < 5; i++) {

          if (i == 0) {
            let bodytext = ' <td align="right"  >' + valueobj[i] + ' </td> ';
            //$compile(bodytext)($scope);
            body = body + bodytext;
          }

          else if (i==3) {
            let bodytext = ' <td align="right"  > ' +'$'+ valueobj[i] + ' </td> ';
            body = body + bodytext;
          }
          else {
            body = body + ' <td align="right"> ' + valueobj[i] + ' </td> ';
          }
        }
        body = body + '</tr>';
      });


      $('#worstdriverbody').append(body);



      $('.worstdriver').show();
      $('#worstdriver').show();





      //  table3.destroy();
  };

  getpopuptable = function(orderdate,orderhour)
  {



      let data=
      [
        ["2019-01-20", "02:00 PM", "1974", "Completed", "502", "10.00", "5.22"],
        ["2019-01-20", "06:00 PM", "1975", "Completed", "503", "08.00", "5.00"],
        ["2019-01-20", "06:13 PM", "1976", "Cancelled", "504", "07.45", "15.20"],
        ["2019-01-20", "06:52 PM", "1977", "Completed", "505", "07.50", "10.00"],
        ["2019-01-20", "07:26 PM", "1978", "Pending", "506", "10.00", "8.00"],
        ["2019-01-20", "07:45 PM", "1979", "Pending", "507", "6.00", "7.50"],

      ];



      $("#deliverydetails").dataTable().fnDestroy();



      $(document).ready(function()
      {
          table4 = $('#deliverydetails').DataTable( {
              "lengthChange": true,
              "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
          lengthMenu: [
            [ 5,10,15, -1 ],
            [ '5','10','15','Show all' ]
          ]


          } );



      } );

      // var selectedlength = data.length;





      $('#deliverydetailsbody').html('');
      var body = '';
      //The append data in table as table row
      $.each(data, function (index, valueobj) {
        body = body + '<tr align="right"  >  ';
        //<td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td>
        for (var i = 0; i < 7; i++) {

          if (i==3) {
            let bodytext = ' <td align="left"  > ' + valueobj[i] + ' </td> ';
            body = body + bodytext;
          }

          else if (i==5) {
            let bodytext = ' <td align="right"  > ' +'$'+ valueobj[i] + ' </td> ';
            body = body + bodytext;
          }
          else if (i==6 ) {
            let bodytext = ' <td align="right"  > ' + valueobj[i] + ' </td> ';
            body = body + bodytext;
          }

           else {
            body = body + ' <td align="right"> ' + valueobj[i] + ' </td> ';
          }
        }
        body = body + '</tr>';
      });


      $('#deliverydetailsbody').append(body);


      // this.initTable3();


      $('.printArea4').show();
      $('#printArea4').show();
      // $('#printbutton').show();

      $('.deliverydetails').show();
      $('#deliverydetails').show();






      // table4.destroy();

  };

  getdatagraphs7(date1,date2) {

        let _this = this;


        let arrayreturn2 = ["74110", "74112", "74121", "74207", "74203", "74116", "74117", "74102", "74234", "74227"];
        let arrayreturn1=[9031, 1290, 885, 361, 177, 150, 76, 44, 32, 19];

        //The append data in table as table row


            console.log('*********************DATA****************',arrayreturn1);
            console.log('*********************CATEGORIES****************',arrayreturn2);


            let chartObj: any = {
              chart: {
                type: 'column',
                height: 300
              },
              title: {
                text: '',
              },
              xAxis: {
                title: {
                  enabled: true,
                  text: 'Postal Code',
                  style: {

                    // fontSize:'10px',
                    fontWeight: 'bold',
                    color: 'black'
                  }
                },
                categories: arrayreturn2,
                labels: {
                  style: {
                    fontSize: '10px',
                    // fontWeight: 'bold',
                    color: 'black'
                  },
                }
              },
              yAxis: {

                title: {
                  text: 'Number Of Orders ',
                  style: {
                    fontWeight: 'bold',
                    color: 'black'
                  }
                },
                stackLabels: {
                  enabled: true,
                  style: {
                    fontSize: '8px',
                    fontWeight: 'bold',
                    color: 'black'
                  }
                }
              },
              legend: {
                align: 'center',
                x: 0,
                verticalAlign: 'top',
                y: -15,
                floating: true,
                backgroundColor: 'white',
                borderColor: '#CCC',
                // borderWidth: 1,
                shadow: false
              },
              tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}'
              },
              plotOptions: {
                series: {}
              },
              credits: {
                enabled: false
              },
              series: [{
                name: 'Total Orders',
                data: arrayreturn1,
                color: '#CF6D53',
              }]
            };
            _this.chart7 = new Chart(chartObj);


  };

  getdatagraphs8(date1,date2) {
    let _this=this;




    let arrayreturn2 = ["74110", "74112", "74121", "74207", "74203", "74116", "74117", "74102", "74234", "74227"];
    let arrayreturn1=[22, 19, 85, 310, 17, 150, 70, 44, 23, 51];




            let chartObj: any = {
              chart: {
                type: 'column',
                height:300
              },
              title: {
                text: '',
              },
              xAxis: {
                title: {
                  enabled: true,
                  text: 'Postal Code',
                  style: {


                    fontWeight: 'bold',
                    color: 'black'
                  }
                },
                categories: arrayreturn2,
                labels: {
                  style: {
                    fontSize: '10px',
                    // fontWeight: 'bold',
                    color: 'black'
                  },
                }
              },
              yAxis: {

                title: {
                  text: 'Number Of Orders ',
                  style: {
                    fontWeight: 'bold',
                    color: 'black'
                  }
                },
                stackLabels: {
                  enabled: true,
                  style: {
                    fontSize: '8px',
                    fontWeight: 'bold',
                    color: 'black'
                  }
                }
              },
              legend: {
                align: 'center',
                x: 0,
                verticalAlign: 'top',
                y: -15,
                floating: true,
                backgroundColor: 'white',
                borderColor: '#CCC',
                // borderWidth: 1,
                shadow: false
              },
              tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}'
              },
              plotOptions: {
                series: {}
              },
              credits: {
                enabled: false
              },
              series: [{
                name: 'Total Orders',
                data: arrayreturn1,
                color: '#e25f34',
              }]
            };
            _this.chart8 = new Chart(chartObj);
  };

  selectchoice1()
  {
    // alert(this.choice1);
    if(this.choice1=="Total Cancelled Orders Based On Postal Code")
    {

      $('#postalcolumn').hide();
      $('#postalcolumn2').show();

      this.getdatagraphs8(this.date1,this.date2);
    }

    if(this.choice1=="Total Completed Orders Based On Postal Code")
    {
      $('#postalcolumn2').hide();
      $('#postalcolumn').show();



      this.getdatagraphs7(this.date1,this.date2);



    }


  };

  selectchoice2()
  {
    // alert(this.choice2);

    if(this.choice2=="Top 5 Drivers")
    {
      $('#printArea3').hide();
      $('#printArea2').show();


      this.getbestdrivertable(this.date1,this.date2);

    }
    if(this.choice2=="Optimizable Drivers")
    {
      $('#printArea2').hide();
      $('#printArea3').show();


      this.getworstdrivertable(this.date1,this.date2);
    }

  }
}

  interface Marker {
    latitude: Number;
    longitude: Number;
    postalcode:String;
    orders:Number;

  }
