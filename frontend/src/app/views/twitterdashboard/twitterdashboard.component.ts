import { Component, OnInit } from '@angular/core';
import {Chart} from "angular-highcharts";
import * as Highcharts from 'highcharts';
// import {highcharts-more} from "angular-highcharts";
// import {} from "Highcharts";
import 'datatables.net';
import * as d3 from 'd3';
// import { BubbleChartData } from '@opitzconsulting/bubble-chart';;
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
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

// import { chart } from 'highcharts';
// import * as Highcharts from "highcharts";
import { CloudData, CloudOptions,ZoomOnHoverOptions } from 'angular-tag-cloud-module';

import * as $ from 'jquery';
import { concat } from 'rxjs';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { introJs } from './intro.js';

// import 'twitter';
// import './config.js';

// declare var $:any;

// import {Year} from '../../year';

// require('highcharts/highcharts-more')(Highcharts);
let table5=null;
@Component({
  selector: 'app-twitterdashboard',
  templateUrl: './twitterdashboard.component.html',
  styleUrls: ['./twitterdashboard.component.scss']
})



export class TwitterdashboardComponent implements OnInit {


  backendApiUrl= environment.backendApiUrl;
  classname = environment.classname;
  dburl = environment.dburl;
  dbport = environment.dbport;
  dbusername = environment.dbusername;
  dbpassword = environment.dbpassword;
  dbname = '';
  tablename = '';
  keyname='';
  bucketname='';
  totaltweets = 3248;
  totalpositive = 0;
  totalnegative = 0;
  totalneutral = 0;
  mostpopular = '';
  filelength = 0;
  tweet = '';

  chart1:Chart;
  chart2:Chart;
  chart3: Chart;
  dataforcloud=[];
  globaldata={};
  columnchart2:Chart;
  twitterchart:Chart;


  constructor(private router: Router, private http: HttpClient, private AppServiceObj: AppService, private AppServiceBackendApiObj:
    AppServiceBackendApi) {
  }

  zoom: Number = 8;
  month: Month[];
  time:Time[];
  monthselected: Number;
  timeselected: Number;




  // markers: any;
  // initial center position for the map
  latitude: Number =  37.773972;
  longitude: Number =  -122.431297;
  // latitude: 37.6398299;
  // longitude: 22.28178;


  // globaldata={};

  // datacloud=this.getWordCloudData();
  // data: CloudData[] = this.datacloud;
  // markers: Marker[] = [{latitude: 37.6398299, longitude: -122.28178}];
  markers: Marker[] = [
    {
      latitude:  37.773972,
      longitude: -122.431297,
      // draggable: true
    },
    {
      latitude:33.493317,
      longitude: -80.855415,
      // draggable: false
    },
    {
      latitude: 26.203407,
      longitude:  -98.230011,
      // draggable: true
    },
    {
      latitude: 26.616756,
      longitude: -80.068451,
      // draggable: true
    },
    {

      latitude:44.016369,
      longitude:  -92.475395,
    }
  ];


  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value
    width : 700,
    height : 400,
    overflow: false,

  };

  data2:CloudData[];
  twitterData:any;
  sentimentchart:any;

  timestamp:any;

  // public bubbleChartData: Array<BubbleChartData>= [
  //   { caption: 'apples', value: 10, color: 'green'  },
  //   { caption: 'oranges', value: 20, color: 'orange' },
  //   { caption: 'bananas', value: 30, color: 'yellow' }
  // ];


  keyword:any;



  ngOnInit()
  {

    let token = localStorage.getItem("token");
    if (token == null) {
        this.router.navigate(['login']);
    }
    else{
      // this.testsql();

    this.keyword = 'twitter';
    this.refreshDashboard();

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
          element: "#dashboard-name",
          intro: "Dashboard Name"
        },
        {
          element: "#hashtag-input",
          intro: "Put your hashtag here, without using hash(#)",
          position: "relative"
        },
        {
          element: "#sendkeyword",
          intro: "Click to get the real-time feed from Twitter",
          position: "relative"
        },
        {
          element: "#twitterchart",
          intro: "Users by number of followers",
          position: "relative"
        },
        {
          element: "#sentimentchart",
          intro: "Sentiment Chart",
          position: "relative"
        },
        {
          element: "#printArea5",
          intro: "All the tweets",
          position: "relative"
        },
        {
          intro: "Thank you for visiting ClouDhiti!"
        }
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
  }

  refreshDashboard()
  {
    $("#tweetbody").hide();

    let _this=this;
    _this.totalpositive = 0;
    _this.totalnegative = 0;
    _this.totalneutral = 0;

    var data = this.keyword;
    var filelen=0;
    var dataforchart=[];
    var dataforchart2=[];
    var datafortable=[];

    this.AppServiceObj.TwitterAPI(data,function(returnObj) {
        var dataArray = returnObj.result;
        var master_json = {};
        var i=1;
        dataArray.forEach(element => {
            master_json['row'+i++]=[element['created_at'],element['text'],element['user']['name'],element['user']['followers_count']];
        });


        for (var o in master_json) {
            filelen++;
        }

        for(var index=1;index<=filelen;index++)
        {
            let linedata = (master_json["row" + index]);
            let line = linedata.toString();
            _this.timestamp=new Date(linedata[0]);
                dataforchart.push({
                    name: (linedata[2]),
                    y: parseInt(linedata[3])
            });
        }

        dataforchart.sort(function(a, b){
            return a.y-b.y
        })



        for(index=dataforchart.length-1;index>=dataforchart.length-10;index--)
        {
          dataforchart2.push(dataforchart[index]);
        }
        let chartObj2: any = {
            chart: {
            type: 'column'
            },
            title: {
            text: ''
            },
            xAxis: {
            type: 'category'
            },
            credits: {
            enabled: false
            },
            legend: {
            enabled: false
            },
            plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {

                        }
                    }
                },
                color: '#4B8CA5'

            }
        },

            series: [{
            name: 'Followers',
            data: dataforchart2,

            }]
        };

        _this.twitterchart = new Chart(chartObj2);

        //PIE Chart sentiment analysis

        dataArray.forEach(element1 => {
          if(element1['sentiment_score'] == 'Positive'){
            // _this.totalpositive = _this.totalpositive + parseFloat(element1['sentiment_score_raw']);
            _this.totalpositive = _this.totalpositive + 1;
          }
          else if(element1['sentiment_score'] == 'Negative'){
            // _this.totalnegative = _this.totalnegative + parseFloat(element1['sentiment_score_raw']);
            _this.totalnegative = _this.totalnegative + 1;
          }
          else{
            // _this.totalneutral = _this.totalneutral + parseFloat(element1['sentiment_score_raw']);
            _this.totalneutral = _this.totalneutral + 1;
          }
        });

        let chartObj: any = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Percentage',
                colorByPoint: true,
                data: [{
                    name: 'Positive',
                    y: _this.totalpositive,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Negative',
                    y: _this.totalnegative
                }, {
                    name: 'Neutral',
                    y: _this.totalneutral
                }]
            }]
        };
        _this.sentimentchart = new Chart(chartObj);

        //DATA TABLE FOR TWITTER DATA
        for(index=1;index<=filelen;index++)
        {
            let linedata = (master_json["row" + index]);
            var d = new Date(linedata[0]);
            datafortable.push({
                handle : linedata[2],
                tweet: linedata[1],
                timestamp:d
            });
            console.log("INSIDE TS FILE ::: ",linedata[0]," __ ",typeof(linedata[0]));

        }

        $("#twittertable").dataTable().fnDestroy();
        $(document).ready(function()
        {
            table5 = $('#twittertable').DataTable( {
                "lengthChange": true,
                "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
                order: [1, 'asc'],
                lengthMenu: [
                [ 5,10,15, -1 ],
                [ '5','10','15','Show all' ]
                ]
            });
        });

        $('#twittertablebody').html('');
        var body = '';
        for(let i=0;i<datafortable.length;i++)
        {



            body = body + '<tr align="right" > ';;
            for (let j = 0; j < 3; j++) {

            if (j == 0)
            {
                let bodytext = ' <td align="left"> ' + datafortable[i]["handle"] + ' </td> ';
                body = body + bodytext;
            }
                if(j==1)
                {

                body = body + ' <td align="left"> ' + datafortable[i]["tweet"] + ' </td> ';
            }
            if(j==2)
            {
                body = body + ' <td align="left"> ' + datafortable[i]["timestamp"] + ' </td> ';

            }
            }
            body = body + '</tr>';
        }
        $('#twittertablebody').append(body);


        // this.initTable3();

        $('.twittertable').show();
        $('#twittertable').show();
    });

    function get_text(tweet) {
      let txt = tweet.retweeted_status ? tweet.retweeted_status.full_text : tweet.full_text;
      return txt.split(/ |\n/).filter(v => !v.startsWith('http')).join(' ');
    }

    //Get sentiment pie chart - function call goes here
    //


  }


  sentimentData:any;
  locationdata:any;
  sentimentjson:any;
  locationjson:any;













// gettotaltweets()
// {
//   let _this = this;



//   let MysqlReportJson='{"accesskey":"AKIAJ3CQKJCIK5S3ZGEA","secretKey":"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", "bucketName":"'+this.bucketname+'","key":"'+this.keyname+'"}';
//   MysqlReportJson = JSON.parse(MysqlReportJson);


//   //The api calling
//   this.AppServiceBackendApiObj.GetBucketFileContent(MysqlReportJson, function (data) {
//       //The all data response in row format and store in variable

//     let filelen = 0;

//     for (var o in data) {
//       filelen++;
//   }

//   _this.totaltweets=filelen;
//   // //console.log('+++++++++++++++++++++++++',_this.totaltweets);


//   })

// }


//  gettotalpositive()
//  {
//    let _this=this;


//   let MysqlReportJson='{"accesskey":"AKIAJ3CQKJCIK5S3ZGEA","secretKey":"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", "bucketName":"'+this.bucketname+'","key":"'+this.keyname+'"}';
//   MysqlReportJson = JSON.parse(MysqlReportJson);


//   //The api calling
//   this.AppServiceBackendApiObj.GetBucketFileContent(MysqlReportJson, function (data) {
//       //The all data response in row format and store in variable

//       let index=0;
//       let pcount=0;
//       var filelen = 0;
//       for (var o in data) {
//         filelen++;
//     }
//       filelen=filelen;

//       for(index=0;index<filelen;index++)
//       {


//         let linedata = (data["row" + index]);
//         let line = linedata.toString();
//         // //console.log(line);

//         // //console.log(data.keys);
//         let x = line.split(",");

//         let i = 0;

//         if(x[16]=="Positive")
//         {
//           pcount=pcount+1;
//         }


//         }
//   _this.totalpositive=pcount;
//   // //console.log('____________________',_this.totalpositive)


//   })

//  }


//  gettotalneutral()
//  {
//    let _this=this;


//   let MysqlReportJson='{"accesskey":"AKIAJ3CQKJCIK5S3ZGEA","secretKey":"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", "bucketName":"'+this.bucketname+'","key":"'+this.keyname+'"}';
//   MysqlReportJson = JSON.parse(MysqlReportJson);


//   //The api calling
//   this.AppServiceBackendApiObj.GetBucketFileContent(MysqlReportJson, function (data) {
//       //The all data response in row format and store in variable

//       let index=0;
//       let neutralcount=0;
//       var filelen = 0;
//       for (var o in data) {
//         filelen++;
//     }
//       filelen=filelen;

//       for(index=0;index<filelen;index++)
//       {


//         let linedata = (data["row" + index]);
//         let line = linedata.toString();
//         // //console.log(line);

//         // //console.log(data.keys);
//         let x = line.split(",");

//         let i = 0;

//         if(x[16]=="Neutral")
//         {
//           neutralcount=neutralcount+1;
//         }


//         }
//   _this.totalneutral=neutralcount;
//   // //console.log('____________________',_this.totalpositive)


//   })

//  }

//  gettotalnegative()
//  {
//    let _this=this;


//   let MysqlReportJson='{"accesskey":"AKIAJ3CQKJCIK5S3ZGEA","secretKey":"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", "bucketName":"'+this.bucketname+'","key":"'+this.keyname+'"}';
//   MysqlReportJson = JSON.parse(MysqlReportJson);


//   //The api calling
//   this.AppServiceBackendApiObj.GetBucketFileContent(MysqlReportJson, function (data) {
//       //The all data response in row format and store in variable
//       //console.log("inside negative count data",data);
//       let index=0;
//       let ncount=0;
//       var filelen = 0;

//       for (var o in data) {
//         filelen++;
//     }

//       //console.log("==================================================LENGTH OF FILE",filelen);

//       for(index=0;index<filelen;index++)
//       {


//         let linedata = (data["row" + index]);
//         let line = linedata.toString();
//         // //console.log(line);

//         // //console.log(data.keys);
//         let x = line.split(",");

//         let i = 0;
//         //console.log("x[16]==",x[16]);

//         if(x[16]=="Negative")
//         {
//           ncount=ncount+1;
//         }



//         }

//   _this.totalnegative=ncount+1;


//   //console.log("negative count is ",ncount)


//   })

//  }

//  getmostpopular()
//  {

//   let _this = this;


//   let MysqlReportJson='{"accesskey":"AKIAJ3CQKJCIK5S3ZGEA","secretKey":"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","bucketName":"'+this.bucketname+'","key":"'+this.keyname+'"}';


//   MysqlReportJson = JSON.parse(MysqlReportJson);
//   //console.log("************New query**********"+MysqlReportJson);
//   let datareturn4=[];

//   //The api calling
//   this.AppServiceBackendApiObj.GetBucketFileContent(MysqlReportJson, function (returnObj)
//   {

//     //console.log(returnObj);
//     let index=1;

//     for (var o in returnObj)
//     {
//       let linedata = (returnObj["row" + index]);
//       let line = linedata.toString();

//       let x = line.split(",");



//           datareturn4.push({
//             handle: (x[0]),
//             followers: parseInt(x[2])

//           });

//     index++;
//     }

//     //console.log(datareturn4);
//     let sorteddata=[];
//     sorteddata = datareturn4.sort((n1, n2) => {
//       return this.naturalCompare(n1.followers, n2.followers)
//     })
//     //console.log(sorteddata);






//       });

//  }



  printDiv(): void {
    let printContents, popupWin;
    printContents = document.getElementById('printArea').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
  printDiv3(): void {


    $("#printbutton2").css('display','none');
    $("#emailbutton2").css('display','none');
    $("#emailpopup2").css('display','none');



    $("#twittertable_paginate").css('display','none');
    $("#twittertable_length").css('display','none');
    $("#twittertable_filter").css('display','none');
    $("#twittertable_info").css('display','none');



    let printContents1,popupWin;
    printContents1 = document.getElementById('printArea5').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
    <html>
    <head>
    <style>
    @page { size: auto;}
    #twittertable th, #twittertable td{ border: 0.3px solid black;font-size:10px;}

    </style>
    </head>
    <body onload="window.print();window.close()">
    <img src="assets/img/brand/LIGHT-BACKGROUND-LOGO.png" style="width: 200px;height: 50px;display:block;margin-left:auto;margin-right:auto;margin-bottom:30px;">
    ${printContents1}
    </body>
    </html>`
    );
    popupWin.document.close();



    $("#printbutton2").css('display','');

    $("#emailbutton2").show();

    $("#emailpopup2").css('display','none');

    // $("#sendemailbutton").css('dispaly','');


    $("#twittertable_paginate").css('display','');
    $("#twittertable_length").css('display','');
    $("#twittertable_filter").css('display','');
    $("#twittertable_info").css('display','');
    $("#emailpopup2").show();

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



  // getTableData()
  // {

  //   let MysqlReportJson='{"accesskey":"AKIAJ3CQKJCIK5S3ZGEA","secretKey":"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", "bucketName":"'+this.bucketname+'","key":"'+this.keyname+'"}';
  //   MysqlReportJson = JSON.parse(MysqlReportJson);
  //   //console.log("inside gettable mysql",MysqlReportJson);

  //   let datareturn2=[];

  //   //The api calling
  //   this.AppServiceBackendApiObj.GetBucketFileContent(MysqlReportJson, function (data) {
  //       //The all data response in row format and store in variable

  //     let index=1;
  //     //console.log("==================================================",data);

  //     let filelen = 0;

  //     for (var o in data) {
  //       filelen++;
  //   }

  //     //console.log("==================================================LENGTH OF FILE",filelen);

  //     for(index=0;index<filelen;index++)
  //     {


  //       let linedata = (data["row" + index]);
  //       let line = linedata.toString();
  //       // //console.log(line);

  //       // //console.log(data.keys);
  //       let x = line.split(",");
  //       // //console.log(x[0]);
  //       // let i = 0;


  //           datareturn2.push({
  //             handle : x[0],
  //             tweet: x[4]

  //           });

  //       }


  //       // //console.log(datareturn2);
  //       // //console.log(datareturn2.length);

  //       var settings = {
  //         layout: {
  //           pageSidebarClosed: false, // sidebar menu state
  //           pageContentWhite: true, // set page content layout
  //           pageBodySolid: false, // solid body color state
  //           pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
  //         },
  //         assetsPath: './assets',
  //         globalPath: './assets/global',
  //         layoutPath: './assets/layouts/layout',
  //       };


  //       // var table = $('#sampledelivery').DataTable({


  //       //   "searching": false,
  //       //   "paging": true,
  //       //   "info": false,
  //       //   "lengthChange": false,
  //       //   "destroy": true,
  //       //   "responsive": true,
  //       //   // "scrollY": 300
  //       //   // // paging: false,
  //       //   // "lengthMenu": 5

  //       // });


  //       $(document).ready(function() {
  //         $('#sampledelivery').DataTable( {
  //             // "pagingType": "full_numbers",
  //             dom: 'Bfrtip',
  //       lengthMenu: [
  //           [ 5, -1 ],
  //           [ '5 rows','Show all' ]
  //       ],
  //       buttons: [
  //           'print'
  //       ]

  //         } );
  //     } );


  //       // var oTable = table;


  //       settings.layout.pageContentWhite = true;
  //       settings.layout.pageBodySolid = false;
  //       settings.layout.pageSidebarClosed = false;


  //       // //console.log("______________Length________________________"+selectedlength);
  //       // }
  //       $('#sampledeliverybody').html('');
  //       var body = '';
  //       //The append data in table as table row
  //           for(let i=0;i<datareturn2.length;i++)
  //           {


  //             // //console.log("_______________________Inside For Each__________________________")
  //             // //console.log(datareturn2[i]["handle"]);

  //             body = body + '<tr align="justify">  ';
  //             //<td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td>
  //             for (let j = 0; j < 2; j++) {

  //               if (j == 1) {
  //                 let bodytext = ' <td align="justify"> ' + datareturn2[i]["handle"] + ' </td> ';
  //                 //$compile(bodytext)($scope);
  //                 body = body + bodytext;
  //               } else {
  //                 // this.gettotaltweets();
  //                 // this.gettotalpositive();
  //                 // this.gettotalnegative();
  //                 body = body + ' <td align="justify"> ' + datareturn2[i]["tweet"] + ' </td> ';
  //               }
  //             }
  //             body = body + '</tr>';
  //           }

  //       $('#sampledeliverybody').append(body);


  //       // this.initTable3();
  //       // $("#printArea").css('display','');

  //       // $('.sampledelivery').show();
  //       // $('#sampledelivery').show();



  //       //console.log(datareturn2);
  //   });

  // }



  // getTableDataFiltered(month)
  // {


  //   let id=month;
  //   let mon='';

  //   if(id==2)
  //   {
  //     mon='Jan';

  //   }
  //   else if(id==3)
  //   {
  //     mon='Feb';
  //   }
  //   else if(id==4)
  //   {
  //     mon='Mar';
  //   }
  //   else if(id==5)
  //   {
  //     mon='Apr';
  //   }
  //   else if(id==6)
  //   {
  //     mon='May';
  //   }
  //   else if(id==7)
  //   {
  //     mon='Jun';
  //   }
  //   else if(id==8)
  //   {
  //     mon='Jul';
  //   }
  //   else if(id==9)
  //   {
  //     mon='Aug';
  //   }
  //   else if(id==10)
  //   {
  //     mon='Sep';
  //   }
  //   else if(id==11)
  //   {
  //     mon='Oct';
  //   }
  //   else if(id==12)
  //   {
  //     mon='Nov';
  //   }
  //   else if(id==13)
  //   {
  //     mon='Dec';
  //   }


  //   let MysqlReportJson='{"accesskey":"AKIAJ3CQKJCIK5S3ZGEA","secretKey":"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", "bucketName":"'+this.bucketname+'","key":"'+this.keyname+'"}';
  //   MysqlReportJson = JSON.parse(MysqlReportJson);

  //   let datareturn2=[];

  //   //The api calling
  //   this.AppServiceBackendApiObj.GetBucketFileContent(MysqlReportJson, function (data) {
  //     //The all data response in row format and store in variable
  //     let index=1;


  //     var filelen = 0;

  //     for (var o in data) {
  //       filelen++;
  //   }
  //     for(index=1;index<=filelen;index++)
  //     {


  //       let linedata = (data["row" + index]);
  //       let line = linedata.toString();
  //       // //console.log(line);

  //       // //console.log(data.keys);
  //       let x = line.split(",");




  //       let date=x[12];
  //       //console.log('_____________________________________++++++++++++___________________________');
  //       //console.log(date);
  //       let datearray= date.split(" ");
  //       let m=datearray[1];


  //       // //console.log(x[0]);
  //       // let i = 0;
  //       if(m==mon) {

  //         datareturn2.push({
  //           handle: x[0],
  //           tweet: x[4]

  //         });

  //       }

  //     }


  //     // //console.log(datareturn2);
  //     // //console.log(datareturn2.length);

  //     var settings = {
  //       layout: {
  //         pageSidebarClosed: false, // sidebar menu state
  //         pageContentWhite: true, // set page content layout
  //         pageBodySolid: false, // solid body color state
  //         pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
  //       },
  //       assetsPath: './assets',
  //       globalPath: './assets/global',
  //       layoutPath: './assets/layouts/layout',
  //     };




  //     $(document).ready(function() {
  //       $('#sampledelivery').DataTable( {
  //           // "pagingType": "full_numbers",
  //           dom: 'Bfrtip',
  //     lengthMenu: [
  //         [ 5, -1 ],
  //         [ '5 rows','Show all' ]
  //     ],
  //     buttons: [
  //         'print'
  //     ]

  //       } );
  //   } );


  //     settings.layout.pageContentWhite = true;
  //     settings.layout.pageBodySolid = false;
  //     settings.layout.pageSidebarClosed = false;


  //     // //console.log("______________Length________________________"+selectedlength);
  //     // }
  //     $('#sampledeliverybody').html('');
  //     var body = '';
  //     //The append data in table as table row
  //     for(let i=0;i<datareturn2.length;i++)
  //     {


  //       //console.log("_______________________Inside For Each__________________________")
  //       //console.log(datareturn2[i]["handle"]);

  //       body = body + '<tr align="justify" class="odd gradeX table-active" >  ';
  //       //<td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td>
  //       for (let j = 0; j < 2; j++) {

  //         if (j == 1) {
  //           let bodytext = ' <td align="justify"> ' + datareturn2[i]["handle"] + ' </td> ';
  //           //$compile(bodytext)($scope);
  //           body = body + bodytext;
  //         } else {
  //           body = body + ' <td align="justify"> ' + datareturn2[i]["tweet"] + ' </td> ';
  //         }
  //       }
  //       body = body + '</tr>';
  //     }



  //     $('#sampledeliverybody').append(body);


  //     // this.initTable3();

  //     $('.sampledelivery').show();
  //     $('#sampledelivery').show();



  //     //console.log(datareturn2);
  //   });

  // }

  // fetchsentimentdata() {
  //   this.http.get('http://localhost:5000/fetchSentimentData').subscribe(data => {
  //     this.sentimentData = data as JSON;
  //     //console.log(this.sentimentData);
  //     //console.log(typeof (this.sentimentData));
  //     this.sentimentjson=JSON.stringify(this.sentimentData);
  //     //console.log(this.sentimentjson);
  //     //console.log(typeof (this.sentimentjson));
  //
  //
  //     let obj: sentiment = JSON.parse(this.sentimentjson);
  //     //console.log(obj.sent);
  //     //console.log(obj.val)
  //
  //   })
  // }
  //
  // fetchlocationdata() {
  //   this.http.get('http://localhost:5000/fetchLocationData').subscribe(data => {
  //     this.locationdata = data as JSON;
  //     //console.log(this.locationdata);
  //     //console.log(typeof (this.locationdata));
  //
  //     this.locationjson=JSON.stringify(this.locationdata);
  //     //console.log(this.locationjson);
  //     //console.log(typeof (this.locationjson));
  //
  //   })
  // }



  // getWordCloudFiltered(month)
  // {
  //   let id=month;
  //   let mon='';

  //   if(id==2)
  //   {
  //     mon='Jan';

  //   }
  //   else if(id==3)
  //   {
  //     mon='Feb';
  //   }
  //   else if(id==4)
  //   {
  //     mon='Mar';
  //   }
  //   else if(id==5)
  //   {
  //     mon='Apr';
  //   }
  //   else if(id==6)
  //   {
  //     mon='May';
  //   }
  //   else if(id==7)
  //   {
  //     mon='Jun';
  //   }
  //   else if(id==8)
  //   {
  //     mon='Jul';
  //   }
  //   else if(id==9)
  //   {
  //     mon='Aug';
  //   }
  //   else if(id==10)
  //   {
  //     mon='Sep';
  //   }
  //   else if(id==11)
  //   {
  //     mon='Oct';
  //   }
  //   else if(id==12)
  //   {
  //     mon='Nov';
  //   }
  //   else if(id==13)
  //   {
  //     mon='Dec';
  //   }

  //   //console.log(mon);
  //   //console.log("Inside wordclouddata");
  //   let _this = this;
  //   // let arrayreturn = [];
  //   let fulldata="";
  //   var freqMap = {};
  //   var dataforcloud=[];

  //   let MysqlReportJson='{"accesskey":"AKIAJ3CQKJCIK5S3ZGEA","secretKey":"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", "bucketName":"'+this.bucketname+'","key":"'+this.keyname+'"}';
  //   MysqlReportJson = JSON.parse(MysqlReportJson);


  //   this.AppServiceBackendApiObj.GetWordCloudContent(MysqlReportJson, function (data)
  //   {

  //     //console.log(data);
  //     // //console.log(data);
  //     _this.globaldata=data;



  //     let index=1;

  //     var filelen = 0;

  //     for (var o in data) {
  //       filelen++;
  //   }
  //   filelen=filelen-1;



  //     for(index=1;index<=filelen;index++) {




  //       let linedata = data["text"+index];
  //       //console.log((linedata));

  //       let x = linedata.split(",");
  //       let date=x[1];

  //       let datearray= date.split(" ");
  //       let m=datearray[1];
  //       //console.log('THE DATE IS',date);
  //       //console.log('THE GIVEN DATE IS',mon);


  //       if(m==mon)
  //       {

  //         fulldata=fulldata+x[0];

  //       }




  //     }

  //     fulldata=fulldata.toLowerCase();

  //     let word=fulldata.split(" ");


  //     word.forEach(function(w) {

  //       if (!freqMap[w]) {
  //         freqMap[w] = 0;
  //       }
  //       freqMap[w] += 1;

  //     });



  //     let keylist=Object.keys(freqMap);


  //     //console.log("_____________________________");


  //     for(let i=0;i<keylist.length;i++)
  //     {
  //       (dataforcloud).push({
  //         text: keylist[i],
  //         weight: parseInt(freqMap[keylist[i]]),
  //         color: '#429ef4'

  //       });
  //     }





  //     _this.data2 = dataforcloud;

  //     //console.log(_this.data2);

  //   });


  // }


  // getWordCloudData()
  // {
  //   // let globaldata={};

  //   //console.log("Inside wordclouddata");
  //   let _this = this;
  //   // let arrayreturn = [];
  //   let fulldata="";
  //   var freqMap = {};
  //   var dataforcloud=[];

  //   let MysqlReportJson='{"accesskey":"AKIAJ3CQKJCIK5S3ZGEA","secretKey":"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", "bucketName":"'+this.bucketname+'","key":"'+this.keyname+'"}';
  //   MysqlReportJson = JSON.parse(MysqlReportJson);


  //   this.AppServiceBackendApiObj.GetWordCloudContent(MysqlReportJson, function (data)
  //   {

  //     // //console.log(data);
  //     // //console.log(data);
  //     _this.globaldata=data;



  //     let index=1;

  //     var filelen = 0;

  //     for (var o in data) {
  //       filelen++;
  //   }
  //   filelen=filelen-1;



  //     for(index=1;index<=filelen;index++) {


  //       let linedata = data["text"+index];
  //       // //console.log('**************Wordcloud********************');

  //       // //console.log((linedata));

  //       let x = linedata.split(",");
  //       // //console.log(x);


  //       let text=x[0];



  //       fulldata=fulldata+text;
  //       // //console.log(fulldata);


  //     }

  //     fulldata=fulldata.toLowerCase();
  //     //console.log('**************fulldata********************');

  //     //console.log(fulldata);

  //     let word=fulldata.split(" ");


  //     word.forEach(function(w) {

  //       if (!freqMap[w]) {
  //         freqMap[w] = 0;
  //       }
  //       freqMap[w] += 1;

  //     });



  //     let keylist=Object.keys(freqMap);


  //     //console.log("_______________xxxxxxxxxxxxxxxx__________________");


  //     for(let i=0;i<keylist.length;i++)
  //     {
  //       (dataforcloud).push({
  //         text: keylist[i],
  //         weight: parseInt(freqMap[keylist[i]]),
  //         color: '#429ef4'

  //       });
  //     }





  //     _this.data2 = dataforcloud;

  //     //console.log(_this.data2);

  //   });


  // }

  getSentimentDataFiltered(month)
  {

    let id=month;
    let mon='';

    if(id==2)
    {
      mon='Jan';

    }
    else if(id==3)
    {
      mon='Feb';
    }
    else if(id==4)
    {
      mon='Mar';
    }
    else if(id==5)
    {
      mon='Apr';
    }
    else if(id==6)
    {
      mon='May';
    }
    else if(id==7)
    {
      mon='Jun';
    }
    else if(id==8)
    {
      mon='Jul';
    }
    else if(id==9)
    {
      mon='Aug';
    }
    else if(id==10)
    {
      mon='Sep';
    }
    else if(id==11)
    {
      mon='Oct';
    }
    else if(id==12)
    {
      mon='Nov';
    }
    else if(id==13)
    {
      mon='Dec';
    }

    //console.log(mon);

    let _this = this;
    let arrayreturn = [];


    let MysqlReportJson='{"accesskey":"AKIAJ3CQKJCIK5S3ZGEA","secretKey":"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", "bucketName":"'+this.bucketname+'","key":"'+this.keyname+'"}';
    MysqlReportJson = JSON.parse(MysqlReportJson);


    // //The api calling
    // this.AppServiceBackendApiObj.GetBucketFileContent(MysqlReportJson, function (data)
    // {
    //   // //console.log(data);
    //   let index=1;
    //   let ncount=0;
    //   let pcount=0;

    //   for(index=1;index<=10;index++)
    //   {


    //     let linedata = (data["row" + index]);

    //     let line = linedata.toString();

    //     // //console.log(data.keys);
    //     let x = line.split(",");


    //     let date=x[12];
    //     let datearray= date.split(" ");
    //     let m=datearray[1];

    //     if(m==mon) {

    //       // //console.log(x[0]);
    //       let i = 0;

    //       if (x[15] == "Negative") {
    //         ncount = ncount + 1;

    //       }
    //       else if (x[15] == "Positive") {
    //         pcount = pcount + 1;
    //       }
    //     }

    //     // //console.log(x[i] + "\n");


    //   }


    //   //console.log(pcount);
    //   //console.log(ncount);


    //   for(let i=0;i<2;i++)
    //   {

    //     if(i==0) {
    //       arrayreturn.push({
    //         name: 'Negative',
    //         y: ncount,
    //         sliced: true,
    //         selected: true


    //       });
    //     }
    //     else if(i==1)
    //     {
    //       arrayreturn.push({
    //         name: 'Positive',
    //         y: pcount


    //       });
    //     }

    //   }

    //   //console.log(arrayreturn);



    //   let chartObj: any = {
    //     chart: {
    //       plotBackgroundColor: null,
    //       plotBorderWidth: null,
    //       plotShadow: false,
    //       type: 'pie'
    //     },
    //     title: {
    //       text: 'Twitter Sentiment Analysis'
    //     },
    //     tooltip: {
    //       pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    //     },
    //     plotOptions: {
    //       pie: {
    //         colors: [
    //           '#8FB9C5',
    //           '#60A3BC',
    //           '#2899B5'
    //         ],
    //         allowPointSelect: true,
    //         cursor: 'pointer',
    //         dataLabels: {
    //           enabled: true,
    //           format: '<b>{point.name}</b>: {point.percentage:.1f} %',

    //         }
    //       }
    //     },
    //     series: [{
    //       name: 'Percentage',
    //       colorByPoint: true,
    //       data: arrayreturn
    //     }]
    //   };
    //   _this.chart2 = new Chart(chartObj);




    // });



  }


  // getSentimentData()
  // {
  //   let _this = this;
  //   let arrayreturn = [];


  //   let MysqlReportJson='{"accesskey":"AKIAJ3CQKJCIK5S3ZGEA","secretKey":"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","bucketName":"'+this.bucketname+'","key":"'+this.keyname+'"}';
  //   MysqlReportJson = JSON.parse(MysqlReportJson);


  //   //The api calling
  //   // this.AppServiceBackendApiObj.GetBucketFileContent(MysqlReportJson, function (data)
  //   // {
  //   //   // //console.log(data);
  //   //   let index=1;
  //   //   let ncount=0;
  //   //   let pcount=0;
  //   //   let neucount = 0;
  //   //   var filelen = 0;

  //   //   for (var o in data) {
  //   //     filelen++;
  //   // }
  //   //   filelen=filelen-1;


  //   //   for(index=1;index<=filelen;index++)
  //   //   {


  //   //     let linedata = (data["row" + index]);

  //   //     // //console.log(linedata);


  //   //     let line = linedata.toString();
  //   //     //console.log(line);

  //   //     // //console.log(data.keys);
  //   //     let x = line.split(",");
  //   //     //console.log(x[15]);
  //   //     let i = 0;

  //   //       if(x[16]=="Negative")
  //   //       {
  //   //         ncount=ncount+1;

  //   //       }
  //   //       else if(x[16]=="Positive")
  //   //       {
  //   //         pcount=pcount+1;
  //   //       }

  //   //       else if(x[16]=="Neutral")
  //   //       {
  //   //         neucount=neucount+1;
  //   //       }

  //   //       // //console.log(x[i] + "\n");


  //   //   }





  //   //   for(let i=0;i<3;i++)
  //   //   {

  //   //     if(i==0) {
  //   //       arrayreturn.push({
  //   //         name: 'Negative',
  //   //         y: ncount,
  //   //         sliced: true,
  //   //         selected: true


  //   //       });
  //   //     }
  //   //     else if(i==1)
  //   //     {
  //   //       arrayreturn.push({
  //   //         name: 'Positive',
  //   //         y: pcount


  //   //       });
  //   //     }
  //   //     // else if(i==2)
  //   //     // {
  //   //     //   arrayreturn.push({
  //   //     //     name: 'Neutral',
  //   //     //     y: neucount


  //   //     //   });
  //   //     // }

  //   //   }

  //   //   //console.log(arrayreturn);



  //   //   let chartObj: any = {
  //   //     chart: {
  //   //       plotBackgroundColor: null,
  //   //       plotBorderWidth: null,
  //   //       plotShadow: false,
  //   //       type: 'pie'
  //   //     },
  //   //     title: {
  //   //       text: ''
  //   //     },
  //   //     tooltip: {
  //   //       pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  //   //     },
  //   //     plotOptions: {
  //   //       pie: {
  //   //         colors: [
  //   //           '#8FB9C5',
  //   //           '#60A3BC',
  //   //           '#2899B5'
  //   //         ],
  //   //         allowPointSelect: true,
  //   //         cursor: 'pointer',
  //   //         dataLabels: {
  //   //           enabled: true,
  //   //           format: '<b>{point.name}</b>: {point.percentage:.1f} %',

  //   //         }
  //   //       }
  //   //     },
  //   //     series: [{
  //   //       name: 'Percentage',
  //   //       colorByPoint: true,
  //   //       data: arrayreturn
  //   //     }]
  //   //   };
  //   //   _this.chart2 = new Chart(chartObj);




  //   // });



  // }















  // getTweet(handlename)


  // {
  //   //console.log(handlename);


  //     let _this=this;


  //     let MysqlReportJson='{"accesskey":"AKIAJ3CQKJCIK5S3ZGEA","secretKey":"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","bucketName":"'+this.bucketname+'","key":"'+this.keyname+'"}';
  //     MysqlReportJson = JSON.parse(MysqlReportJson);


  //     //The api calling
  //     // this.AppServiceBackendApiObj.GetBucketFileContent(MysqlReportJson, function (data) {
  //     //     //The all data response in row format and store in variable

  //     //     let index=1;
  //     //     let tweet='';
  //     //     var filelen = 0;

  //     //     for (var o in data) {
  //     //       filelen++;
  //     //   }
  //     //     filelen=filelen-1;

  //     //     for(index=1;index<=filelen;index++)
  //     //     {


  //     //       let linedata = (data["row" + index]);
  //     //       let line = linedata.toString();
  //     //       // //console.log(line);

  //     //       // //console.log(data.keys);
  //     //       let x = line.split(",");

  //     //       let i = 0;

  //     //       if(x[0]==handlename)
  //     //       {
  //     //         _this.tweet=x[4];
  //     //         //console.log('TWEET',_this.tweet);

  //     //         $(document).ready(function()
  //     //         {
  //     //           $("#tweetbody").show();

  //     //           $("#tweet").html(_this.tweet);

  //     //         });

  //     //         break;
  //     //       }


  //     //       }



  //     //      })





  // }




getcolumnchart() {


    let _this = this;
    //console.log(this.bucketname);


    let MysqlReportJson='{"accesskey":"AKIAJ3CQKJCIK5S3ZGEA","secretKey":"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","bucketName":"'+this.bucketname+'","key":"'+this.keyname+'"}';


    MysqlReportJson = JSON.parse(MysqlReportJson);
    //console.log("************New query**********"+MysqlReportJson);
    let datareturn4=[];
    let datareturn5=[];


    let chartObj: any = {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'category'
      },

      legend: {
        enabled: false
      },

  //   series: [{
  //     data: datareturn4
  // }]

      series: [{
        name: 'Followers',
        data: [{
          name: '@garryk',
          y: 4352
        },{
          name: '@simon',
          y: 2423
        },{
          name: '@katep',
          y: 4097
        },{
          name: '@iamammyjackson',
          y: 3214
        },{
          name: '@taylork',
          y: 234
        },{
          name: '@lara',
          y: 543
        },{
          name: '@sumanmalhotra',
          y: 873
        },{
          name: '@kajalawrgl',
          y: 994
        },{
          name: '@namo',
          y: 8874
        },{
          name: '@andrew',
          y: 761
        },{
          name: '@larrypage',
          y: 1233
        },{
          name: '@tomcruise',
          y: 3321
        },{
          name: '@miranair',
          y: 435
        },
      ]
      }]
    };


    _this.columnchart2 = new Chart(chartObj);

}


getbubblechart(){
  let _this=this;
  let chartObj:any={
    chart: {
        type: 'packedbubble',
        height: '100%'
    },
    title: {
        text: 'Carbon emissions around the world (2014)'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.y}m CO<sub>2</sub>'
    },
    plotOptions: {
        packedbubble: {
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 250
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            },
            minPointSize: 5
        }
    },
    series: [{
        name: 'Europe',
        data: [{
            name: 'Germany',
            value: 767.1
        }, {
            name: 'Croatia',
            value: 20.7
        },
        {
            name: "Belgium",
            value: 97.2
        },
        {
            name: "Czech Republic",
            value: 111.7
        },
        {
            name: "Netherlands",
            value: 158.1
        },
        {
            name: "Spain",
            value: 241.6
        },
        {
            name: "Ukraine",
            value: 249.1
        },
        {
            name: "Poland",
            value: 298.1
        },
        {
            name: "France",
            value: 323.7
        },
        {
            name: "Romania",
            value: 78.3
        },
        {
            name: "United Kingdom",
            value: 415.4
        }, {
            name: "Turkey",
            value: 353.2
        }, {
            name: "Italy",
            value: 337.6
        },
        {
            name: "Greece",
            value: 71.1
        },
        {
            name: "Austria",
            value: 69.8
        },
        {
            name: "Belarus",
            value: 67.7
        },
        {
            name: "Serbia",
            value: 59.3
        },
        {
            name: "Finland",
            value: 54.8
        },
        {
            name: "Bulgaria",
            value: 51.2
        },
        {
            name: "Portugal",
            value: 48.3
        },
        {
            name: "Norway",
            value: 44.4
        },
        {
            name: "Sweden",
            value: 44.3
        },
        {
            name: "Hungary",
            value: 43.7
        },
        {
            name: "Switzerland",
            value: 40.2
        },
        {
            name: "Denmark",
            value: 40
        },
        {
            name: "Slovakia",
            value: 34.7
        },
        {
            name: "Ireland",
            value: 34.6
        },
        {
            name: "Croatia",
            value: 20.7
        },
        {
            name: "Estonia",
            value: 19.4
        },
        {
            name: "Slovenia",
            value: 16.7
        },
        {
            name: "Lithuania",
            value: 12.3
        },
        {
            name: "Luxembourg",
            value: 10.4
        },
        {
            name: "Macedonia",
            value: 9.5
        },
        {
            name: "Moldova",
            value: 7.8
        },
        {
            name: "Latvia",
            value: 7.5
        },
        {
            name: "Cyprus",
            value: 7.2
        }]
    }, {
        name: 'Africa',
        data: [{
            name: "Senegal",
            value: 8.2
        },
        {
            name: "Cameroon",
            value: 9.2
        },
        {
            name: "Zimbabwe",
            value: 13.1
        },
        {
            name: "Ghana",
            value: 14.1
        },
        {
            name: "Kenya",
            value: 14.1
        },
        {
            name: "Sudan",
            value: 17.3
        },
        {
            name: "Tunisia",
            value: 24.3
        },
        {
            name: "Angola",
            value: 25
        },
        {
            name: "Libya",
            value: 50.6
        },
        {
            name: "Ivory Coast",
            value: 7.3
        },
        {
            name: "Morocco",
            value: 60.7
        },
        {
            name: "Ethiopia",
            value: 8.9
        },
        {
            name: "United Republic of Tanzania",
            value: 9.1
        },
        {
            name: "Nigeria",
            value: 93.9
        },
        {
            name: "South Africa",
            value: 392.7
        }, {
            name: "Egypt",
            value: 225.1
        }, {
            name: "Algeria",
            value: 141.5
        }]
    }, {
        name: 'Oceania',
        data: [{
            name: "Australia",
            value: 409.4
        },
        {
            name: "New Zealand",
            value: 34.1
        },
        {
            name: "Papua New Guinea",
            value: 7.1
        }]
    }, {
        name: 'North America',
        data: [{
            name: "Costa Rica",
            value: 7.6
        },
        {
            name: "Honduras",
            value: 8.4
        },
        {
            name: "Jamaica",
            value: 8.3
        },
        {
            name: "Panama",
            value: 10.2
        },
        {
            name: "Guatemala",
            value: 12
        },
        {
            name: "Dominican Republic",
            value: 23.4
        },
        {
            name: "Cuba",
            value: 30.2
        },
        {
            name: "USA",
            value: 5334.5
        }, {
            name: "Canada",
            value: 566
        }, {
            name: "Mexico",
            value: 456.3
        }]
    }, {
        name: 'South America',
        data: [{
            name: "El Salvador",
            value: 7.2
        },
        {
            name: "Uruguay",
            value: 8.1
        },
        {
            name: "Bolivia",
            value: 17.8
        },
        {
            name: "Trinidad and Tobago",
            value: 34
        },
        {
            name: "Ecuador",
            value: 43
        },
        {
            name: "Chile",
            value: 78.6
        },
        {
            name: "Peru",
            value: 52
        },
        {
            name: "Colombia",
            value: 74.1
        },
        {
            name: "Brazil",
            value: 501.1
        }, {
            name: "Argentina",
            value: 199
        },
        {
            name: "Venezuela",
            value: 195.2
        }]
    }, {
        name: 'Asia',
        data: [{
            name: "Nepal",
            value: 6.5
        },
        {
            name: "Georgia",
            value: 6.5
        },
        {
            name: "Brunei Darussalam",
            value: 7.4
        },
        {
            name: "Kyrgyzstan",
            value: 7.4
        },
        {
            name: "Afghanistan",
            value: 7.9
        },
        {
            name: "Myanmar",
            value: 9.1
        },
        {
            name: "Mongolia",
            value: 14.7
        },
        {
            name: "Sri Lanka",
            value: 16.6
        },
        {
            name: "Bahrain",
            value: 20.5
        },
        {
            name: "Yemen",
            value: 22.6
        },
        {
            name: "Jordan",
            value: 22.3
        },
        {
            name: "Lebanon",
            value: 21.1
        },
        {
            name: "Azerbaijan",
            value: 31.7
        },
        {
            name: "Singapore",
            value: 47.8
        },
        {
            name: "Hong Kong",
            value: 49.9
        },
        {
            name: "Syria",
            value: 52.7
        },
        {
            name: "DPR Korea",
            value: 59.9
        },
        {
            name: "Israel",
            value: 64.8
        },
        {
            name: "Turkmenistan",
            value: 70.6
        },
        {
            name: "Oman",
            value: 74.3
        },
        {
            name: "Qatar",
            value: 88.8
        },
        {
            name: "Philippines",
            value: 96.9
        },
        {
            name: "Kuwait",
            value: 98.6
        },
        {
            name: "Uzbekistan",
            value: 122.6
        },
        {
            name: "Iraq",
            value: 139.9
        },
        {
            name: "Pakistan",
            value: 158.1
        },
        {
            name: "Vietnam",
            value: 190.2
        },
        {
            name: "United Arab Emirates",
            value: 201.1
        },
        {
            name: "Malaysia",
            value: 227.5
        },
        {
            name: "Kazakhstan",
            value: 236.2
        },
        {
            name: "Thailand",
            value: 272
        },
        {
            name: "Taiwan",
            value: 276.7
        },
        {
            name: "Indonesia",
            value: 453
        },
        {
            name: "Saudi Arabia",
            value: 494.8
        },
        {
            name: "Japan",
            value: 1278.9
        },
        {
            name: "China",
            value: 10540.8
        },
        {
            name: "India",
            value: 2341.9
        },
        {
            name: "Russia",
            value: 1766.4
        },
        {
            name: "Iran",
            value: 618.2
        },
        {
            name: "Korea",
            value: 610.1
        }]
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'right',
                    verticalAlign: 'middle',
                    layout: 'vertical'
                }
            }
        }]
    }
  };

  _this.chart3 = new Chart(chartObj);
}

// gettweets(){

// }

}

interface sentiment {
  sent: string;
  val : number;
}


interface Marker {
  latitude: number;
  longitude: number;
  // draggable: boolean;
}

export class Month {

  public id: Number;
  public name: String;

}

export class Time{
  public id:Number;
  public name: String;

}
