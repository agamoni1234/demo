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
// declare var $:any;

// import {Year} from '../../year';
import * as moment from 'moment';
import { introJs } from './intro.js';

declare var require: any
require('highcharts-more')(Highcharts);

// require('highcharts-more')(Highcharts);
// require('highcharts/highcharts-3d')(Highcharts);

@Component({
  selector: 'app-twitterdashboard',
  templateUrl: './twitterdashboardHT.component.html',
  styleUrls: ['./twitterdashboardHT.component.scss']
})



export class TwitterdashboardHTComponent implements OnInit {


  backendApiUrl= environment.backendApiUrl;
  classname = environment.classname;
  dburl = environment.dburl;
  dbport = environment.dbport;
  dbusername = environment.dbusername;
  dbpassword = environment.dbpassword;
  // dbname = environment.dbname;
  // tablename = environment.tablename;
  // keyname=environment.keyname;
  // bucketname=environment.bucketname;
  totaltweets = 0;
  totalpositive = 0;
  totalnegative = 0;
  totalneutral = 0;
  mostpopular = '';
  filelength = 0;
  tweet = '';

//   GlobalDatePicker_Date: any = moment(new Date()).format('YYYY-MM-DD');
  GlobalDatePicker_Date: any = moment(new Date()).format('DD MMM,YYYY');
  chart1:Chart;
  chart2:Chart;
  chart3: Chart;
  dataforcloud=[];
  globaldata={};
  columnchart2:Chart;
  chartSexTrafficking: Chart;
  chartSexAndLaborTrafficking: Chart;
  chartLaborTrafficking:Chart;
  chartNationalHumanTraffickingHotlineCases:Chart;
  chartFormsOfHumanTrafficking:Chart;
  chartSurvivorsWhoContactedTheHotlineDirectlyByYear:Chart;
  chartIndividualVictimsOfHumanTrafficking:Chart;
  chartSurvivorAge:Chart;
  chartSurvivorGender:Chart;
  chartTop5ReportedRaceOrEthnicity:Chart;
  chartAgeAtTimeSexOrLaborTraffickingBegan:Chart;


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
  // markers: Marker[] = [
  //   {
  //     latitude:  37.773972,
  //     longitude: -122.431297,
  //     // draggable: true
  //   },
  //   {
  //     latitude:33.493317,
  //     longitude: -80.855415,
  //     // draggable: false
  //   },
  //   {
  //     latitude: 26.203407,
  //     longitude:  -98.230011,
  //     // draggable: true
  //   },
  //   {
  //     latitude: 26.616756,
  //     longitude: -80.068451,
  //     // draggable: true
  //   },
  //   {

  //     latitude:44.016369,
  //     longitude:  -92.475395,
  //   }
  // ];

  calendarOptions = {
    minYear: 1970,
    maxYear: 2030,
    format:'DD MMM,YYYY', //'YYYY-MM-DD',
    displayFormat: 'DD MMM,YYYY',
    barTitleFormat: 'MMMM YYYY',
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown
  };


  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value
    width : 500,
    height : 300,
    overflow: false,

  };

  data2:CloudData[];

  timestamp:any;

  // public bubbleChartData: Array<BubbleChartData>= [
  //   { caption: 'apples', value: 10, color: 'green'  },
  //   { caption: 'oranges', value: 20, color: 'orange' },
  //   { caption: 'bananas', value: 30, color: 'yellow' }
  // ];


  ngOnInit()
  {
    this.timestamp=this.GlobalDatePicker_Date;
    let token = localStorage.getItem("token");

    if (token == null) {
        this.router.navigate(['login']);
    }
    else{
      $("#tweetbody").hide();




      this.getchartSexTrafficking();
      this.getchartSexAndLaborTrafficking();
      this.getchartLaborTrafficking();
      this.getchartNationalHumanTraffickingHotlineCases();
      this.getchartFormsOfHumanTrafficking();
      this.getchartSurvivorsWhoContactedTheHotlineDirectlyByYear();
      this.getchartIndividualVictimsOfHumanTrafficking();
      this.getchartSurvivorAge();
      this.getchartSurvivorGender();
      this.getchartTop5ReportedRaceOrEthnicity();
      this.getchartAgeAtTimeSexOrLaborTraffickingBegan();
      // this.getPackedbubbleChart();

      this.getcolumnchart();
      this.getSentimentData();
      this.getWordCloudData();
      this.getTableData();

      // this.getbubblechart();





      this.time=[
        {id:0,name:"00:00"},
        {id:1,name:"01:00"},
        {id:2,name:"02:00"},
        {id:3,name:"03:00"},
        {id:4,name:"04:00"},
        {id:5,name:"05:00"},
        {id:6,name:"06:00"},
        {id:7,name:"07:00"},
        {id:8,name:"08:00"},
        {id:9,name:"09:00"},
        {id:10,name:"10:00"},
        {id:11,name:"11:00"},
        {id:12,name:"12:00"},
        {id:13,name:"13:00"},
        {id:14,name:"14:00"},
        {id:15,name:"16:00"},
        {id:17,name:"17:00"},
        {id:18,name:"18:00"},
        {id:19,name:"19:00"},
        {id:20,name:"20:00"},
        {id:21,name:"21:00"},
        {id:22,name:"22:00"},
        {id:23,name:"23:00"}



      ];

      this.month=[
        {id:1,name:"All"},
        {id:2,name:"January"},
        {id:3,name:"February"},
        {id:4,name:"March"},
        {id:5,name:"April"},
        {id:6,name:"May"},
        {id:7,name:"June"},
        {id:8,name:"July"},
        {id:9,name:"August"},
        {id:10,name:"September"},
        {id:11,name:"October"},
        {id:12,name:"November"},
        {id:13,name:"December"}


      ];
      this.monthselected=1;
      this.timeselected=24;

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
          element: "#sentiment-analysis",
          intro: "This section tells you what people are saying over twitter on Human-Trafficking. You can also find sentiment analysis of the tweets."
        },
        {
          element: "#kpi-row",
          intro: "you can also get sentiment analysis of these tweets like you can find out how many numbers of positive tweets, negative tweets and neutral tweets among them."
        },
        {
          element:"#sec1-row2-vis1",
          intro: "This word cloud will help you to find out what are the most popular keywords within these tweets."
        },
        {
          element:"#sec1-row2-vis2",
          intro:"This Pie chart helps you to find how many numbers of positive, negative, and neutral tweets are there and percentage on the total."
        },
        {
          element:"#sec1-row2-vis3",
          intro:"This column chart will help you to find out the top 10 Twitter Handles according to the number of followers among these 50 tweets."
        },
        {
          element:"#sec1-row3-vis1",
          intro:"This table will help you to find all the 50 tweets, Twitter handles and Timestamp."
        },

        {
          element: "#growing-awareness",
          intro: "Awareness based on historical data gathered by ClouDhiti.",
          position: "relative"
        },
        {
          element:"#kpi-row-sec2",
          intro:"From these four cards you can find out how many number of individual victims of human trafficking, number of registered cases of human trafficking, number of potential traffickers, and number of trafficking business."
        },
        {
          element:"#sec2-row2-vis1",
          intro:"you can find out various types of sex trafficking and the total number of victims in each type."
        },
        {
          element:"#sec2-row2-vis2",
          intro:"you can find out various types of Sex And Labor Trafficking and the total number of victims in each type."
        },
        {
          element:"#sec2-row2-vis3",
          intro:"you can find out various types of Labor Trafficking and the total number of victims in each type and percentage on total"
        },
        {
          element:"#sec2-row3-vis1",
          intro:"This section helps you to find the number fo human trafficking Hotline cases registered from 2007 to 2017."
        },
        {
          element:"#sec2-row3-vis2",
          intro:"This section helps you to find out what are the different types of human trafficking cases registered in 2017 and the number of cases in each type. "
        },
        {
          element:"#sec2-row3-vis3",
          intro:"This column chart helps you to find out the number of unique survivor and number of calls and texts from survivors on a particular year."
        },
        {
          element: "#survivors-human-trafficking",
          intro: "This section gives you the information about people who survived in various Human-Trafficking related cases.",
          position: "relative"
        },
        {
          element:"#sec3-row2-vis1",
          intro:"This chart helps you to find age-related information of the victims who have survived."
        },
        {
          element:"#sec3-row2-vis2",
          intro:"This chart helps you to find out gender-related information of the victims who have survived."
        },
        {
          element:"#sec3-row2-vis3",
          intro:"This pie chart helps you to find out Race or Ethnicity-related information of the victims who have survived."
        },
        {
          element:"#sec3-row3-vis1",
          intro:"This section helps you to find out the number of victims for different types of human trafficking."
        },
        {
          element:"#sec3-row3-vis2",
          intro:"This graph helps you to find out the age of the survivors when sex or labor traffic began with them. It also helps you to find out the number of survivors on a particular age range. "
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
      //$("#demo-dashboard-1-body").attr('style','zoom:0%');
  }


  sentimentData:any;
  locationdata:any;
  sentimentjson:any;
  locationjson:any;



  storefromdate(e)//after clicking on datepicker
  {
    this.GlobalDatePicker_Date = moment(e).format('DD MMM,YYYY');
    this.timestamp=this.GlobalDatePicker_Date;

  }


  printDiv(): void 
  {
    let printContents,printContents2,printContents4, popupWin;
    // @page { size: auto;  margin: 0mm; }
    $("#sampledelivery_info").css('display','none');
    $("#sampledelivery_filter").css('display','none');
    $("#sampledelivery_paginate").css('display','none');
    $("#sampledelivery_length").css('display','none');
    $("#dataTablePrintBtn").css('display','none');
    $("#im1").css({"display": "block", "margin-left": "auto","margin-right": "auto"});
    // $("#emailbutton2").hide();
    
    printContents = document.getElementById('printArea').innerHTML;
    // printContents2 = document.getElementById('printArea2').innerHTML;
    // printContents4 = document.getElementById('printAreacalls').innerHTML;
    
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
            #toptwitterhandletxt{margin-left:25px;}
            #sampledelivery{margin-top:25px;}
            #sampledelivery th, #sampledelivery td{ border: 0.5px solid black;}
            #sampledelivery2 th, #sampledelivery2 td{ border: 0.5px solid black}
            #sampledelivery2calls th, #sampledelivery2calls td{ border: 0.5px solid black}
          </style>
        </head>
        <body onload="window.print();window.close()">
          <img src="assets/img/brand/LIGHT-BACKGROUND-LOGO.png" style="width: 200px;height: 50px;display:block;margin-left:auto;margin-right:auto;margin-bottom:10px;">
         ${printContents}
        </body>
      </html>`
    );
    popupWin.document.close();
    $("#sampledelivery_info").css('display','');
    $("#sampledelivery_filter").css('display','');
    $("#sampledelivery_paginate").css('display','');
    $("#sampledelivery_info").css('display','');
    $("#sampledelivery_length").css('display','');
    $("#im1").css('display','none');
    $("#dataTablePrintBtn").css('display','');
    // $("#emailbutton2").show();
  }




    getSentimentData()
    {
            let _this = this;
            let arrayreturn = [];
            let dataexist_Falg=0;

            let chartObj: any = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                credits:{
                    enabled:false
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> <br/>Number of Tweets: <b>{point.y}</b>'
                },
                plotOptions: {
                    pie: {
                    colors: ['#F26851','#F08D7E','#FFC2B7','#FEC9B7','#F29479'],
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    },
                    showInLegend: true,
                    }
                },
                series: [{
                    name: 'Percentage',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'Negative',
                            y: 40,
                            sliced: true,
                            selected: true


                        },
                        {
                            name: 'Positive',
                            y: 6


                        },
                        {
                            name: 'Neutral',
                            y: 4


                        }

                    ]
                }]
                };
                _this.chart2 = new Chart(chartObj);



    }

    getcolumnchart()
    {

            let _this = this;
            let chartObj: any = {
                chart: {
                    type: 'column'
                },
                credits:{
                    enabled:false
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
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    // alert('Category: ' + this.name + ', value: ' + this.y);
                                    _this.getTweet(this.name);
                                }
                            }
                        },
                        colors: ['#FFC6B6','#FDB1A4','#F08D7E','#FFC2B7','#FEC9B7','#F29479','#F26851']
                    }
                },
                    series: [{
                        name: 'Followers',
                        data: [
                          {name: "@ZnaTrainer", y: 47328},
                          {name: "@mglessman", y: 20932},
                          {name: "@thebestcloser", y: 11914},
                          {name: "@thebestcloser", y: 11914},
                          {name: "@TerryTerse", y: 5575},
                          {name: "@PaulDakers1", y: 4208},
                          {name: "@ValVaaniaGlass", y: 3804},
                          {name: "@SHMartens", y: 3765},
                          {name: "@CTSKIDOO", y: 3457},
                          {name: "@realtrumpcousin", y: 3157}
                        ]

                    }],
                    colors: ['#F26851']
            };


           _this.columnchart2 = new Chart(chartObj);
    }

    gettotaltweets()
    {
            let _this = this;



            // let MysqlReportJson='{"accesskey":"AKIAJ3CQKJCIK5S3ZGEA","secretKey":"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", "bucketName":"'+this.bucketname+'","key":"'+this.keyname+'"}';
            // MysqlReportJson = JSON.parse(MysqlReportJson);


            //The api calling
            // this.AppServiceBackendApiObj.GetBucketFileContent(MysqlReportJson, function (data) {
            //     //The all data response in row format and store in variable

            // let filelen = 0;
            // let totalTweets=0;

            //     for (var o in data)
            //     {
            //         filelen++;
            //     }
            //     filelen=filelen-1;
            //     for(let index=0;index<=filelen;index++)//
            //     {
            //         let linedata = (data["row" + index]);
            //         let line = linedata.toString();

            //         let x = line.split(",");

            //         let timestamp_temp=x[14];
            //         let timearray = timestamp_temp.split(" ");
            //         timestamp_temp=timearray[2]+" "+timearray[1]+","+timearray[5];

            //         //console.log("temp==>",timestamp_temp);
            //         //console.log("Global==>",_this.GlobalDatePicker_Date);

            //         if(_this.GlobalDatePicker_Date==timestamp_temp)//Checking The data with the date filter
            //         {
            //             //console.log("Inside Total Tweet method");
            //             totalTweets++;

            //         }
            //     }
            //     //console.log("======>",totalTweets);
            //     _this.totaltweets=totalTweets;
            //     // console.log('+++++++++++++++++++++++++',_this.totaltweets);



            // })

    }

    gettotalpositive()
    {
              let _this=this;

            //    let MysqlReportJson='{"accesskey":"AKIAJ3CQKJCIK5S3ZGEA","secretKey":"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", "bucketName":"'+this.bucketname+'","key":"'+this.keyname+'"}';
            //    MysqlReportJson = JSON.parse(MysqlReportJson);


            //    //The api calling
            //    this.AppServiceBackendApiObj.GetBucketFileContent(MysqlReportJson, function (data) {
            //    //The all data response in row format and store in variable

            //     let index=0;
            //     let pcount=0;
            //     var filelen = 0;

            //     for (var o in data) //it will calculate the file length
            //     {
            //         filelen++;
            //     }

            //     filelen=filelen;

            //     for(index=0;index<filelen;index++)
            //     {
            //         let linedata = (data["row" + index]);
            //         let line = linedata.toString();
            //         let x = line.split(",");
            //         let i = 0;
            //         let timestamp_temp=x[14];
            //         //console.log('TIMESTAMP',timestamp_temp);
            //         let timearray = timestamp_temp.split(" ");
            //         timestamp_temp=timearray[2]+" "+timearray[1]+","+timearray[5];

            //         if(_this.GlobalDatePicker_Date==timestamp_temp)//Checking The data with the date filter
            //         {
            //             if(x[16]=="Positive")
            //             {
            //                 pcount=pcount+1;
            //             }
            //         }

            //     }
            //     _this.totalpositive=pcount;
            //     // console.log('____________________',_this.totalpositive)
            // })

    }

    gettotalnegative()
    {
        let _this=this;

      //   let MysqlReportJson='{"accesskey":"AKIAJ3CQKJCIK5S3ZGEA","secretKey":"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", "bucketName":"'+this.bucketname+'","key":"'+this.keyname+'"}';
      //   MysqlReportJson = JSON.parse(MysqlReportJson);

      //   //The api calling
      //   this.AppServiceBackendApiObj.GetBucketFileContent(MysqlReportJson, function (data) {
      //    //The all data response in row format and store in variable
      //    //console.log("inside negative count data",data);
      //    let index=0;
      //    let ncount=0;
      //    var filelen = 0;

      //       for (var o in data)
      //       {
      //           filelen++;
      //       }

      //    //console.log("==================================================LENGTH OF FILE",filelen);

      //    for(index=0;index<filelen;index++)
      //    {
      //           let linedata = (data["row" + index]);
      //           let line = linedata.toString();
      //           let x = line.split(",");
      //           let i = 0;
      //           let timestamp_temp=x[14];
      //           let timearray = timestamp_temp.split(" ");
      //           timestamp_temp=timearray[2]+" "+timearray[1]+","+timearray[5];

      //           if(_this.GlobalDatePicker_Date==timestamp_temp)//Checking The data with the date filter
      //           {
      //                   if(x[16]=="Negative")
      //                   {
      //                       ncount=ncount+1;
      //                   }
      //           }
      //    }

      //   _this.totalnegative=ncount;
      //   console.log("negative count is ",ncount)

      //  })

    }

    gettotalneutral()
    {
        let _this=this;
      //   let MysqlReportJson='{"accesskey":"AKIAJ3CQKJCIK5S3ZGEA","secretKey":"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", "bucketName":"'+this.bucketname+'","key":"'+this.keyname+'"}';
      //   MysqlReportJson = JSON.parse(MysqlReportJson);

      //   //The api calling
      //   this.AppServiceBackendApiObj.GetBucketFileContent(MysqlReportJson, function (data)
      //   {
      //           //The all data response in row format and store in variable

      //           let index=0;
      //           let neutralcount=0;
      //           var filelen = 0;
      //           for (var o in data)
      //           {
      //                   filelen++;
      //           }
      //           filelen = filelen;

      //           for(index=0;index<filelen;index++)
      //           {
      //               let linedata = (data["row" + index]);
      //               let line = linedata.toString();
      //               let x = line.split(",");
      //               let i = 0;
      //               let timestamp_temp=x[14];
      //               let timearray = timestamp_temp.split(" ");
      //               timestamp_temp=timearray[2]+" "+timearray[1]+","+timearray[5];

      //               if(_this.GlobalDatePicker_Date==timestamp_temp)//Checking The data with the date filter
      //               {
      //                       if(x[16]=="Neutral")
      //                       {
      //                           neutralcount=neutralcount+1;
      //                       }
      //               }

      //           }
      //           _this.totalneutral=neutralcount;
      //           // console.log('____________________',_this.totalpositive)


      //  })

    }


    getTableData()
    {
        let _this=this;

        let datareturn2=
        [
          {handle: "@araWars", tweet: "anal sex somalia porn free videos of hot naked gir…rn the sexual trafficking https://t.co/WZkLjr6JOf", timestamp: "Tue Feb 05 14:17:37 IOT 2019"}
          ,{handle: "@amina_kutigi", tweet: "RT @DaveVescio: BREAKING NEWS: Man wants to sue hi…t his consent' as part of 'anti-natalist' moveme…", timestamp: "Tue Feb 05 14:17:37 IOT 2019"}
          ,{handle: "@starbadir", tweet: "RT @_SJPeace_: The Holocaust was legal. Slavery wa…ho hid Jews in their homes were criminalized. Pe…", timestamp: "Tue Feb 05 14:17:38 IOT 2019"}
          ,{handle: "@erin_jazmine", tweet: "RT @TwittaHoney: People can get away with anything…t sex trafficking. We are allowing bad actors to…", timestamp: "Tue Feb 05 14:17:40 IOT 2019"}
          ,{handle: "@RealAliceCarter", tweet: "RT @mofaizal09: Tired of work 🤮🤮🤮 It’s seems th… - that’s about it - what makes you a #billionai…", timestamp: "Tue Feb 05 14:17:41 IOT 2019"}
          ,{handle: "@TerryTerse", tweet: "RT @_SJPeace_: The Holocaust was legal. Slavery wa…ho hid Jews in their homes were criminalized. Pe…", timestamp: "Tue Feb 05 14:17:41 IOT 2019"}
          ,{handle: "@Mureed_Shayy", tweet: "RT @JamshidBaloch7: Defending #HumanRights not a c… political and Human rights activist- his life a…", timestamp: "Tue Feb 05 14:17:46 IOT 2019"}
          ,{handle: "@bsant54", tweet: "@w_terrence Ex-pat Cdn. Read a long time ago about…n wonder if anything has changed. Great Terrence.", timestamp: "Tue Feb 05 14:17:47 IOT 2019"}
          ,{handle: "@Larry72611401", tweet: "RT @FaceTheNation: WATCH: @SpeakerPelosi 'doesn't … do this-' accuses President Trump@margbrennan s…", timestamp: "Tue Feb 05 14:17:48 IOT 2019"}
          ,{handle: "@RehnSturm256", tweet: "RT @pettanko_pop: @The_GreatPlague @animatic80 Not…n the gaming world just got popped for being a p…", timestamp: "Tue Feb 05 14:17:48 IOT 2019"}
          ,{handle: "@OneMarzian", tweet: "RT @MarcHoogeslag: Poachers driving African parrot… trade- investigators say https://t.co/2rLIX6BSOE", timestamp: "Tue Feb 05 14:17:48 IOT 2019"}
          ,{handle: "@Official__Keanu", tweet: "RT @ShaahYaan777: the civilized world has sewed th…ir The human rights violation in #Kashmir is not…", timestamp: "Tue Feb 05 14:17:49 IOT 2019"}
          ,{handle: "@ShellyMcgough", tweet: "RT @aplusk: Update on our work! Check out the impa…ligence and Leads | Thorn https://t.co/zvqFLGrrj4", timestamp: "Tue Feb 05 14:17:49 IOT 2019"}
          ,{handle: "@AklerKen", tweet: "RT @rothschildmd: @TheRickWilson My favorite part …c ring of child trafficking at the heart of Amer…", timestamp: "Tue Feb 05 14:17:49 IOT 2019"}
          ,{handle: "@thebestcloser", tweet: "RT @ZnaTrainer: 🌴Thank⚡️#Q👋🇺🇸.@thebestcloser🇺…rNation🇺🇸#1👋worldwide🗺most powerfully prolif…", timestamp: "Tue Feb 05 14:17:50 IOT 2019"}
          ,{handle: "@MegsleyMajor", tweet: "@reb_femme The eu is just slavery.", timestamp: "Tue Feb 05 14:17:53 IOT 2019"}
          ,{handle: "@Sebi_Xo", tweet: "RT @sure_kamhunga: 1. Wake up at 4302. Leave at 5.…e tired- start work at 730 or 85. Leave work- qu…", timestamp: "Tue Feb 05 14:17:53 IOT 2019"}
          ,{handle: "@kaysirota", tweet: "Happy Lunar New Year- Oakland!🐖(But enough with t…ecrackers...k? Gotta get up early for work...) 😴", timestamp: "Tue Feb 05 14:17:54 IOT 2019"}
          ,{handle: "@ApolloGarvan", tweet: "RT @Pup_Amp: Sex trafficking is up 170% in SF repo… INCREASED since #SESTA/#FOSTA?! It's almost lik…", timestamp: "Tue Feb 05 14:17:54 IOT 2019"}
          ,{handle: "@thebestcloser", tweet: "RT @ZnaTrainer: 🌴Thank⚡️#Q👋🇺🇸.@thebestcloser🇺…rNation🇺🇸#1👋worldwide🗺most powerfully prolif…", timestamp: "Tue Feb 05 14:17:54 IOT 2019"}
          ,{handle: "@qaz20181102", tweet: "#expo2025including #Osaka-Present Japan is contami…nalist#Discrimination#racist#Fascism#Antifascists", timestamp: "Tue Feb 05 14:17:55 IOT 2019"}
          ,{handle: "@MandyKilpatric4", tweet: "RT @jules_su: depriving a civilian population of m…- and creating a system of wage slavery where it…", timestamp: "Tue Feb 05 14:17:56 IOT 2019"}
          ,{handle: "@Larry72611401", tweet: "RT @parscale: The border wall/fence has saved coun… it saves one more young person from human traff…", timestamp: "Tue Feb 05 14:17:57 IOT 2019"}
          ,{handle: "@NeilSmi84626771", tweet: "RT @w_terrence: I want this message to reach every…Democratic Party is the party of slavery & the K…", timestamp: "Tue Feb 05 14:17:57 IOT 2019"}
          ,{handle: "@kindasortaleila", tweet: "RT @_SJPeace_: The Holocaust was legal. Slavery wa…ho hid Jews in their homes were criminalized. Pe…", timestamp: "Tue Feb 05 14:17:58 IOT 2019"}
          ,{handle: "@FrancesEds", tweet: "RT @_SJPeace_: The Holocaust was legal. Slavery wa…ho hid Jews in their homes were criminalized. Pe…", timestamp: "Tue Feb 05 14:17:58 IOT 2019"}
          ,{handle: "@CTSKIDOO", tweet: "RT @Distinct_Words: Dianne Feinstein (D-CA) & supp…ands that all immigration enforcement end for an…", timestamp: "Tue Feb 05 14:17:59 IOT 2019"}
          ,{handle: "@mglessman", tweet: "RT @parscale: The border wall/fence has saved coun… it saves one more young person from human traff…", timestamp: "Tue Feb 05 14:17:59 IOT 2019"}
          ,{handle: "@notxsteve", tweet: "RT @w_terrence: I want this message to reach every…Democratic Party is the party of slavery & the K…", timestamp: "Tue Feb 05 14:18:00 IOT 2019"}
          ,{handle: "@TheLibertysmith", tweet: "@NIA_Anarchist @SocialismBC @David_J_Pettit @NoahH…n government assumed that right from the Spanish.", timestamp: "Tue Feb 05 14:18:01 IOT 2019"}
          ,{handle: "@realtrumpcousin", tweet: "RT @ChJLuc91: Speechless here.... planned parenth…avers” and @SpeakerPelosi calls a wall immoral?…", timestamp: "Tue Feb 05 14:18:01 IOT 2019"}
          ,{handle: "@SHMartens", tweet: "RT @LisaMei62: 'This is an urgent humanitarian iss…veraging every resource we have to confront this…", timestamp: "Tue Feb 05 14:18:04 IOT 2019"}
          ,{handle: "@ArtworksMick", tweet: "Christian Slavery - Acceptable? https://t.co/koFYSA9SeG", timestamp: "Tue Feb 05 14:18:00 IOT 2019"}
          ,{handle: "@PaulDakers1", tweet: "Well Cressida Dick got promoted to head of #MPS for #murder it's not really a surprise!", timestamp: "Tue Feb 05 14:18:07 IOT 2019"}
          ,{handle: "@ValVaaniaGlass", tweet: "RT @DeseretNews: From @TimBBallard: 'Had there be…tors would have been forced to take me to a port…", timestamp: "Tue Feb 05 14:18:07 IOT 2019"}
          ,{handle: "@ronh808", tweet: "RT @SurfCityWriter: Adding on to this- those who o…ion of Japanese Americans such as Fred Korematsu…", timestamp: "Tue Feb 05 14:18:09 IOT 2019"}
          ,{handle: "@DeetheDonnn", tweet: "RT @Kisses4Keila: This is just like the husband an…a tool to pretend to be a slave owner and free t…", timestamp: "Tue Feb 05 14:18:11 IOT 2019"}
          ,{handle: "@LisaIronTongue", tweet: "RT @BreeNewsome: How is this not a form of human t…sider it unnecessary to track the children is if…", timestamp: "Tue Feb 05 14:18:14 IOT 2019"}
          ,{handle: "@ZnaTrainer", tweet: "RT @ZnaTrainer: 🌴Thank⚡️#Q👋🇺🇸.@thebestcloser🇺…rNation🇺🇸#1👋worldwide🗺most powerfully prolif…", timestamp: "Tue Feb 05 14:18:14 IOT 2019"}
          ,{handle: "@Eddiexy", tweet: "RT @aniefioketimMyk: 'Sit at home and be counted f… heard all year😂😂But when 'Python dance' comes…", timestamp: "Tue Feb 05 14:18:15 IOT 2019"}
          ,{handle: "@NIA_Anarchist", tweet: "@TheLibertysmith @SocialismBC @David_J_Pettit @Noa…ted to fight over and against the MEX government.", timestamp: "Tue Feb 05 14:18:15 IOT 2019"}
          ,{handle: "@fight4URIndia", tweet: "RT @DaveVescio: BREAKING NEWS: Man wants to sue hi…t his consent' as part of 'anti-natalist' moveme…", timestamp: "Tue Feb 05 14:18:15 IOT 2019"}
          ,{handle: "@Devilsmummy", tweet: "RT @DaveVescio: BREAKING NEWS: Man wants to sue hi…t his consent' as part of 'anti-natalist' moveme…", timestamp: "Tue Feb 05 14:18:17 IOT 2019"}
          ,{handle: "@wildpaz1_", tweet: "RT @realDonaldTrump: With Caravans marching throug…ans must be prepared to do whatever is necessary…", timestamp: "Tue Feb 05 14:18:18 IOT 2019"}
          ,{handle: "@suo_gan", tweet: "@APWestRegion Human trafficking and anyone who thi…fic scandal. The party of family values did this.", timestamp: "Tue Feb 05 14:18:20 IOT 2019"}
          ,{handle: "@LonGenug", tweet: "There's slavery in your shrimp: what can consumers… @oxfamnovib @fairfood https://t.co/zw3h4lfbSA", timestamp: "Tue Feb 05 14:18:20 IOT 2019"}
          ,{handle: "@BKMARS1", tweet: "RT @cs00582scs: #TEXAS... #ConservativesPLS RT- RT… Issac-John Bernard Collins is wanted for aggrav…", timestamp: "Tue Feb 05 14:18:24 IOT 2019"}
          ,{handle: "@lilponyboi", tweet: "Soon as I meet a bitch who luv money more than I do I’m trappin her😂👶🏽😰", timestamp: "Tue Feb 05 14:18:25 IOT 2019"}
          ,{handle: "@LilKemaaaa", tweet: "It really bothers me when people say “the holocaus…ery & discrimination that still happens today. 😓", timestamp: "Tue Feb 05 14:18:26 IOT 2019"}
          ,{handle: "@MoHared2022", tweet: "RT @DCI_Kenya: The #INTERPOL African Regional Conf… conference focuses on Regional Police Challenge…", timestamp: "Tue Feb 05 14:18:27 IOT 2019"}
        ];

        var settings =
        {
            layout: {
                pageSidebarClosed: false, // sidebar menu state
                pageContentWhite: true, // set page content layout
                pageBodySolid: false, // solid body color state
                pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
            },
            assetsPath: './assets',
            globalPath: './assets/global',
            layoutPath: './assets/layouts/layout',
        };

        $("#sampledelivery").dataTable().fnDestroy();

        $(document).ready(function () {
            $('#sampledelivery').DataTable({
                // "pagingType": "full_numbers",
                dom: 'Bfrtip',
                // lengthMenu: [
                //     [5, -1],
                //     ['5 rows', 'Show all']
                // ],
                buttons: [
                    'print'
                ],
                rowReorder: {
                    selector: 'td:nth-child(2)'
                },
                responsive: true,
                "lengthChange": true,
                    "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
                lengthMenu: [
                  [5,10,15, -1],
                  ['5','10','15','Show all']
                ]

            });
        });


        settings.layout.pageContentWhite = true;
        settings.layout.pageBodySolid = false;
        settings.layout.pageSidebarClosed = false;


        $('#sampledeliverybody').html('');
        var body = '';


        //The append data in table as table row
        for (let i = 0; i < datareturn2.length; i++)
        {

                // console.log("_______________________Inside For Each__________________________")
                // console.log(datareturn2[i]["handle"]);

                body = body + '<tr align="justify">  ';
                //<td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td>
                for (let j = 0; j < 3; j++) {

                    if (j == 1) {
                        let bodytext = ' <td align="center" style="width:15% !important;"> ' + datareturn2[i]["handle"] + ' </td> ';
                        //$compile(bodytext)($scope);
                        body = body + bodytext;
                    }
                    else if (j == 0)
                    {
                        // this.gettotaltweets();
                        // this.gettotalpositive();
                        // this.gettotalnegative();
                        body = body + ' <td align="justify" style="width:65% !important;"> ' + datareturn2[i]["tweet"] + ' </td> ';
                    }
                    else if (j == 2)
                    {
                        // this.gettotaltweets();
                        // this.gettotalpositive();
                        // this.gettotalnegative();
                        body = body + ' <td align="center" style="width:20% !important;"> ' + datareturn2[i]["timestamp"] + ' </td> ';
                    }

                }
                body = body + '</tr>';
        }

          $('#sampledeliverybody').append(body);




    }





  getchartAgeAtTimeSexOrLaborTraffickingBegan()
  {
    let chartObj: any =
    {
            chart:
            {
                type: 'line'
            },
            credits:{
              enabled:false
            },
            title:
            {
                text: ' '
            },
            // subtitle: {
            //     text: 'Source: WorldClimate.com'
            // },
            xAxis:
            {
                categories: ['<b>0-8</b>', '<b>9-11</b>', '<b>12-14</b>', '<b>15-17</b>', '<b>18-20</b>', '<b>21-23</b>', '<b>24-26</b>', '<b>27-29</b>', '<b>30-32</b>', '<b>33-35</b>', '<b>36-38</b>', '<b>39-47</b>','<b>48+</b>']
            },
            yAxis:
            {
                title:
                {
                    text: '<b>Number of Survivors</b>'
                }
            },
            plotOptions:
            {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false,


                }
            },
            series: [{
                name: 'Sex',
                data: [52,35,146,269,190,107,65,38,37,16,12,30,3]
            },{
                name: 'Labor',
                data: [5,7,26,75,39,38,20,12,7,11,8,14,18]
            }],
            colors: ['#FF816A','#E14328']
    };
    this.chartAgeAtTimeSexOrLaborTraffickingBegan=new Chart(chartObj);
  }

  getchartTop5ReportedRaceOrEthnicity()
  {
    let chartObj: any =
    {

        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        credits:{
          enabled:false
        },
        title: {
            text: ' '
        },
        tooltip: {
            pointFormat: 'Percentage: <b>{point.percentage:.1f}%</b> <br/> Total Number : <b>{point.y}</b>   '//{series.name}: <b>{point.percentage:.1f}%</b>
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,
                colors:['#F26851','#F08D7E','#FFC2B7','#FEC9B7','#F29479']
            }
        },
        series: [{
            name: 'Sex Trafficking',
            colorByPoint: true,
            data: [
            {
                name: 'Latino',
                y: 1230,
            },
            {
                name: 'Asian',
                y: 979
            },
            {
                name: 'White',
                y: 699
            },
            {
              name: 'African, AfricanAmerican, Black',
              y: 592
            },
            {
              name: 'Multi-Ethnic, Multi-Racial',
              y: 136
            }
          ]
        }]

    };
    this.chartTop5ReportedRaceOrEthnicity=new Chart(chartObj);
  }

  getchartSurvivorGender()
  {
    let chartObj: any =
    {
        chart: {
            type: 'pie',
            options3d: {
                enabled: false,
                alpha: 45
            },

        },
        credits: {
          enabled: false
        },
        title: {
            text: ' ',
            enabled: false
        },
        tooltip: {
          pointFormat: 'Percentage: <b>{point.percentage:.1f}%</b> <br/> Total Number : <b>{point.y}</b>   '//{series.name}: <b>{point.percentage:.1f}%</b>
        },
        // subtitle: {
        //     text: '3D donut in Highcharts'
        // },
        plotOptions:
        {
            pie:
            {
                innerSize: 100,
                depth: 45,
                dataLabels: {
                  enabled: false,
                  format: '{point.name}: {point.y}'
                },
                showInLegend: true,
                colors:
                [
                  '#F26851',
                  '#e8523c',
                  '#fcbfb3',
                  '#f08d7e',

                ]
            }
        },
        series: [{
            name: 'Total No.',
            data: [
                ['Female', 8561],
                ['Male',1454],
                ['Gender Minorities', 59],
                ['Unknown', 541]
            ]
        }]


    };
    this.chartSurvivorGender=new Chart(chartObj);
  }

  getchartSurvivorAge()
  {
    let chartObj: any =
    {
        chart: {
            type: 'pie',
            options3d: {
                enabled: false,
                alpha: 45
            },

        },
        credits: {
          enabled: false
        },
        title: {
            text: ' ',
            enabled: false
        },
        tooltip: {
          pointFormat: 'Percentage: <b>{point.percentage:.1f}%</b> <br/> Total Number : <b>{point.y}</b>   '//{series.name}: <b>{point.percentage:.1f}%</b>
        },
        // subtitle: {
        //     text: '3D donut in Highcharts'
        // },
        plotOptions:
        {
            pie:
            {
                innerSize: 100,
                depth: 45,
                dataLabels: {
                  enabled: false,
                  format: '{point.name}: {point.y}'
                },
                showInLegend: true,
                colors:
                [
                  '#fcbfb3',
                  '#f08d7e',
                  '#e8523c',
                  '#F26851'
                ]
            }
        },
        series: [{
            name: 'Total No.',
            data: [
                ['Adult', 6204],
                ['Minor',2762],
                ['Unknown', 1575]
            ]
        }]


    };
    this.chartSurvivorAge=new Chart(chartObj);

  }

  getchartIndividualVictimsOfHumanTrafficking()
  {
    let chartObj: any =
    {
        chart: {
            type: 'pie',
            options3d: {
                enabled: false,
                alpha: 45
            },

        },
        credits: {
          enabled: false
        },
        title: {
            text: ' ',
            enabled: false
        },
        tooltip: {
          pointFormat: 'Percentage: <b>{point.percentage:.1f}%</b> <br/> Total Number : <b>{point.y}</b>   '//{series.name}: <b>{point.percentage:.1f}%</b>
        },
        // subtitle: {
        //     text: '3D donut in Highcharts'
        // },
        plotOptions:
        {
            pie:
            {
                innerSize: 100,
                depth: 45,
                dataLabels: {
                  enabled: false,
                  format: '<b>{point.name}</b>: {point.y}'
                },
                showInLegend: true,
                colors:
                [
                  '#fcbfb3',
                  '#f08d7e',
                  '#e8523c',
                  '#F26851'
                ]
            }
        },
        series: [{
            name: 'Total No.',
            data: [
                ['Not specified', 838],
                ['Labor trafficking', 1979],
                ['Sex trafficking', 7255],
                ['Sex & labor trafficking', 542]
            ]
        }]

    };
    this.chartIndividualVictimsOfHumanTrafficking=new Chart(chartObj);
  }

  getchartSurvivorsWhoContactedTheHotlineDirectlyByYear()
  {

    //  let colors = ["#7cb5ec","#f45b5b", "#91e8e1"];



      let chartObj: any =
      {

        chart: {
          type: 'column'
        },
        credits:{
          enabled:false
        },
        title: {
          text: '  '
        },
        xAxis: {
          categories: ['<b>2015</b>', '<b>2016</b>', '<b>2017</b>']
        },
        yAxis: {
          min: 0,
          title: {
            text: '<b>Total  No.</b>'
          },
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: 'bold',
              // color: ['#F26851'],
            }
          }
        },
        legend: {
          align: 'center',
          x: 30,
          verticalAlign: 'bottom',
          y: 0,
          floating: false,
          // backgroundColor: ['#FFC6B6','#FDB1A4','#F08D7E','#FFC2B7','#FEC9B7','#F29479','#F26851'],
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
        },
        tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: true,

            },

          }
        },
        series:
        [
            {
              name: '# of unique survivors',
              data: [1548,2064,2144]
            },
            {
              name: '# of calls and texts from survivors',
              data: [4370,4890,5263]
            }
        ],
        colors: ['#FFC6B6','#F26851']
      };
      this.chartSurvivorsWhoContactedTheHotlineDirectlyByYear = new Chart(chartObj);

  }

  getchartFormsOfHumanTrafficking()
  {
    let chartObj: any =
    {
        chart: {
            type: 'pie',
            options3d: {
                enabled: false,
                alpha: 45
            },

        },
        credits: {
          enabled: false
        },
        title: {
            text: ' ',
            enabled: false
        },
        tooltip: {
          pointFormat: 'Percentage: <b>{point.percentage:.1f}%</b> <br/> Total Number : <b>{point.y}</b>   '//{series.name}: <b>{point.percentage:.1f}%</b>
        },
        // subtitle: {
        //     text: '3D donut in Highcharts'
        // },
        plotOptions:
        {
            pie:
            {
                innerSize: 100,
                depth: 45,
                dataLabels: {
                  enabled: false
                },
                showInLegend: true,
                colors:
                [
                  '#fcbfb3',
                  '#f08d7e',
                  '#e8523c',
                  '#F26851'
                ]
            }
        },
        series: [{
            name: 'Total No.',
            data: [
                ['Not specified', 851],
                ['Labor trafficking', 1274],
                ['Sex trafficking', 6244],
                ['Sex & labor trafficking', 390]
            ]
        }]


    };
    this.chartFormsOfHumanTrafficking = new Chart(chartObj);
  }

  getchartNationalHumanTraffickingHotlineCases()
  {
        let chartObj: any ={
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        credits: {
          enabled: false
        },
        title: {
            text: ' ',
            align: 'center',
            verticalAlign: 'middle',
            y: -130
        },
        tooltip: {
            pointFormat: 'Percentage: <b>{point.percentage:.2f}%</b> <br/> Total No.: <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                showInLegend: true,
                colors: [
                  '#F26851',
                  '#FFC6B6'
                ],
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },
        series: [{
            type: 'pie',
            name: 'National Human Trafficking Hotline Cases',
            innerSize: '50%',
            data: [
                ['2007-2016', 40987],
                ['2017', 8759]
            ]
        }]
    };
    this.chartNationalHumanTraffickingHotlineCases = new Chart(chartObj);
  }

  getchartLaborTrafficking()
  {


    let chartObj: any =
    {
        chart: {
            type: 'pie'
        },
        credits:{
          enabled:false
        },
        title: {
            text: ' '
        },
        // subtitle: {
        //     text: 'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
        // },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false,
                    format: '{point.name}'
                },
                showInLegend: true,
                colors: ['#FEC9B7','#F29479','#F26851']

            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span>Percentage</span>: <b>{point.percentage:.2f}%</b> of total<br/> <span>Total No.</span>: <b>{point.y}</b>'
        },

        "series": [
            {
                "name": "Labor Trafficking",
                "colorByPoint": true,
                "data": [
                    {
                        "name": "Domestic work",
                        "y": 242,
                        "drilldown": "Domestic work"
                    },
                    {
                        "name": "Agriculture",
                        "y": 134,
                        "drilldown": "Agriculture"
                    },
                    {
                        "name": "Peddling and begging",
                        "y": 109,
                        "drilldown": "Peddling and begging"
                    }

                ]
            }
        ],
        "drilldown": {
            "series": [
                {
                    "name": "Domestic work",
                    "id": "Domestic work",
                    "data": [
                              [
                                "cooking",
                                50
                              ],
                              [
                                "cleaning",
                                50
                              ],
                              [
                                "child-care",
                                50
                              ],
                              [
                                "elder care",
                                25
                              ],
                              [
                                "gardening",
                                25
                              ],
                              [
                                "other household work",
                                42
                              ]

                            ]
                },
                {
                    "name": "Agriculture",
                    "id": "Agriculture",
                    "data": [
                        [
                            "harvest crops",
                            34
                        ],
                        [
                            "factory workers",
                            100
                        ],

                    ]
                },
                {
                    "name": "Peddling and begging",
                    "id": "Peddling and begging",
                    "data": [
                        [
                            "soliciting money",
                            59
                        ],
                        [
                            "selling products",
                            50
                        ],
                    ]
                }

            ]
        }

    };
    this.chartLaborTrafficking = new Chart(chartObj);

  }

  getchartSexAndLaborTrafficking()
  {
    let chartObj: any =
    {
          chart: {
            type: 'column'
          },
          credits:{
            enabled:false
          },
          title: {
            text: ''//Browser market shares. January, 2018
          },
          subtitle: {
            text: ''//Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>
          },
          xAxis: {
            type: 'category'
          },
          yAxis: {
            title: {
              text: '<b>Total No.</b>'
            }

          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: '{point.y}'//{point.y:.1f}%
              },
              colors: ['#FFC6B6','#FDB1A4','#F08D7E','#FFC2B7','#FEC9B7','#F29479','#F26851']
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name} of</span><br>',
            pointFormat: '<span>{point.name}</span>: <b>{point.y}</b><br/>'//<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>
          },

          "series": [
            {
              "name": "Total No.",
              "colorByPoint": true,
              color: '#4B8CA5',
              "data": [
                {
                  "name": "<b>Illicit massage businesses</b>",
                  "y": 774,
                },
                {
                  "name": "<b>Bar/strip club/cantina<b/>",
                  "y": 194,
                },
                {
                  "name": "<b>Illicit activities</b>",
                  "y": 104,
                }
              ]
            }
          ],

    };
    this.chartSexAndLaborTrafficking = new Chart(chartObj);
  }


  getchartSexTrafficking() {
    let chartObj: any =
    {

        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        credits:{
          enabled:false
        },
        title: {
            text: '  '//<span class="chartTitleCssClass">Sex Trafficking in January, 2018</span>
        },
        tooltip: {
            pointFormat: 'Percentage: <b>{point.percentage:.1f}%</b> <br/> Total Number : <b>{point.y}</b> '//{series.name}: <b>{point.percentage:.1f}%</b>
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,
                colors: [
                  '#fcbfb3',
                  '#f08d7e',
                  '#e8523c'
                ]
            }
        },
        series: [{
            name: 'Sex Trafficking',
            colorByPoint: true,
            data: [
            {
                name: 'Escort services',
                y: 1572,
            },
            {
                name: 'Residential',
                y: 508
            },
            {
                name: 'Outdoor solicitation',
                y: 329
            }
          ]
        }]

    };
    this.chartSexTrafficking = new Chart(chartObj);

  }



  getWordCloudData()
  {

    let _this = this;
    _this.data2 =[ {text: "", weight: 62, color: "#e14228"}
    ,{text: "legal", weight: 8, color: "#e14228"}
    ,{text: "slavery", weight: 8, color: "#e14228"}
    ,{text: "trafficking", weight: 8, color: "#e14228"}
    ,{text: "human", weight: 6, color: "#e14228"}
    ,{text: "Slavery", weight: 5, color: "#e14228"}
    ,{text: "@_SJPeace_", weight: 4, color: "#e14228"}
    ,{text: "criminalized", weight: 4, color: "#e14228"}
    ,{text: "Holocaust", weight: 4, color: "#e14228"}
    ,{text: "homes", weight: 4, color: "#e14228"}
    ,{text: "Jews", weight: 4, color: "#e14228"}
    ,{text: "just", weight: 4, color: "#e14228"}
    ,{text: "legalPeople", weight: 4, color: "#e14228"}
    ,{text: "part", weight: 4, color: "#e14228"}
    ,{text: "Pe…", weight: 4, color: "#e14228"}
    ,{text: "rights", weight: 4, color: "#e14228"}
    ,{text: "Segregation", weight: 4, color: "#e14228"}
    ,{text: "was", weight: 4, color: "#e14228"}
    ,{text: "'antinatalist'", weight: 3, color: "#e14228"}
    ,{text: "'without", weight: 3, color: "#e14228"}
    ,{text: "@DaveVescio", weight: 3, color: "#e14228"}
    ,{text: "@w_terrence", weight: 3, color: "#e14228"}
    ,{text: "@ZnaTrainer", weight: 3, color: "#e14228"}
    ,{text: "🌴Thank⚡️Q👋🇺🇸@thebestcloser🇺🇸@bestclosershow🇺🇸MAGA🇺🇸", weight: 3, color: "#e14228"}
    ,{text: "birth", weight: 3, color: "#e14228"}
    ,{text: "BREAKING", weight: 3, color: "#e14228"}
    ,{text: "CloserNation🇺🇸1👋worldwide🗺most", weight: 3, color: "#e14228"}
    ,{text: "consent'", weight: 3, color: "#e14228"}
    ,{text: "end", weight: 3, color: "#e14228"}
    ,{text: "free", weight: 3, color: "#e14228"}
    ,{text: "giving", weight: 3, color: "#e14228"}
    ,{text: "government", weight: 3, color: "#e14228"}
    ,{text: "his", weight: 3, color: "#e14228"}
    ,{text: "Human", weight: 3, color: "#e14228"}
    ,{text: "Man", weight: 3, color: "#e14228"}
    ,{text: "Mike‼️KAG2020🇺🇸", weight: 3, color: "#e14228"}
    ,{text: "moveme…", weight: 3, color: "#e14228"}
    ,{text: "not", weight: 3, color: "#e14228"}
    ,{text: "parents", weight: 3, color: "#e14228"}
    ,{text: "party", weight: 3, color: "#e14228"}
    ,{text: "person", weight: 3, color: "#e14228"}
    ,{text: "powerfully", weight: 3, color: "#e14228"}
    ,{text: "prolif…", weight: 3, color: "#e14228"}
    ,{text: "sex", weight: 3, color: "#e14228"}
    ,{text: "sue", weight: 3, color: "#e14228"}
    ,{text: "today", weight: 3, color: "#e14228"}
    ,{text: "wants", weight: 3, color: "#e14228"}
    ,{text: "work", weight: 3, color: "#e14228"}
    ,{text: "@David_J_Pettit", weight: 2, color: "#e14228"}
    ,{text: "@NoahHerschberg", weight: 2, color: "#e14228"}
    ,{text: "@parscale", weight: 2, color: "#e14228"}
    ,{text: "@SocialismBC", weight: 2, color: "#e14228"}
    ,{text: "@SpeakerPelosi", weight: 2, color: "#e14228"}
    ,{text: "African", weight: 2, color: "#e14228"}
    ,{text: "Americans", weight: 2, color: "#e14228"}
    ,{text: "anything", weight: 2, color: "#e14228"}
    ,{text: "Black", weight: 2, color: "#e14228"}
    ,{text: "border", weight: 2, color: "#e14228"}
    ,{text: "children", weight: 2, color: "#e14228"}
    ,{text: "countless", weight: 2, color: "#e14228"}
    ,{text: "Democrat", weight: 2, color: "#e14228"}
    ,{text: "Democratic", weight: 2, color: "#e14228"}
    ,{text: "Democrats", weight: 2, color: "#e14228"}
    ,{text: "El", weight: 2, color: "#e14228"}
    ,{text: "everyone", weight: 2, color: "#e14228"}
    ,{text: "forced", weight: 2, color: "#e14228"}
    ,{text: "got", weight: 2, color: "#e14228"}
    ,{text: "Gringos", weight: 2, color: "#e14228"}
    ,{text: "History", weight: 2, color: "#e14228"}
    ,{text: "horrific", weight: 2, color: "#e14228"}
    ,{text: "it’s", weight: 2, color: "#e14228"}
    ,{text: "Japan", weight: 2, color: "#e14228"}
    ,{text: "K…", weight: 2, color: "#e14228"}
    ,{text: "Kashmir", weight: 2, color: "#e14228"}
    ,{text: "Leave", weight: 2, color: "#e14228"}
    ,{text: "lives", weight: 2, color: "#e14228"}
    ,{text: "makes", weight: 2, color: "#e14228"}
    ,{text: "message", weight: 2, color: "#e14228"}
    ,{text: "MEX", weight: 2, color: "#e14228"}
    ,{text: "monthThe", weight: 2, color: "#e14228"}
    ,{text: "My", weight: 2, color: "#e14228"}
    ,{text: "Not", weight: 2, color: "#e14228"}
    ,{text: "opposed", weight: 2, color: "#e14228"}
    ,{text: "Party", weight: 2, color: "#e14228"}
    ,{text: "Paso", weight: 2, color: "#e14228"}
    ,{text: "porn", weight: 2, color: "#e14228"}
    ,{text: "reach", weight: 2, color: "#e14228"}
    ,{text: "really", weight: 2, color: "#e14228"}
    ,{text: "reason", weight: 2, color: "#e14228"}
    ,{text: "Regional", weight: 2, color: "#e14228"}
    ,{text: "right", weight: 2, color: "#e14228"}
    ,{text: "saved", weight: 2, color: "#e14228"}
    ,{text: "saves", weight: 2, color: "#e14228"}
    ,{text: "Spanish", weight: 2, color: "#e14228"}
    ,{text: "the", weight: 2, color: "#e14228"}
    ,{text: "thing", weight: 2, color: "#e14228"}
    ,{text: "This", weight: 2, color: "#e14228"}
    ,{text: "traff…", weight: 2, color: "#e14228"}
    ,{text: "wall", weight: 2, color: "#e14228"}
    ,{text: "wall/fence", weight: 2, color: "#e14228"}];


  }


  getTweet(handlename)
  {
      let _this = this;
      let data =
 {
                row1: ["@ZnaTrainer,RT @ZnaTrainer: 🌴Thank⚡️#Q👋🇺🇸.@thebestcloser🇺…rNation🇺🇸#1👋worldwide🗺most powerfully prolif…"]

              , row2: ["@mglessman,RT @parscale: The border wall/fence has saved coun… it saves one more young person from human traff…"]

              , row3: ["@thebestcloser,RT @ZnaTrainer: 🌴Thank⚡️#Q👋🇺🇸.@thebestcloser🇺…rNation🇺🇸#1👋worldwide🗺most powerfully prolif…"]

              , row4: ["@thebestcloser,RT @ZnaTrainer: 🌴Thank⚡️#Q👋🇺🇸.@thebestcloser🇺…rNation🇺🇸#1👋worldwide🗺most powerfully prolif…"]

              , row5: ["@TerryTerse,RT @_SJPeace_: The Holocaust was legal. Slavery wa…ho hid Jews in their homes were criminalized. Pe…"]

              , row6: ["@PaulDakers1,Well Cressida Dick got promoted to head of #MPS for #murder it's not really a surprise!"]

              , row7: ["@ValVaaniaGlass,RT @DeseretNews: From @TimBBallard: 'Had there be…tors would have been forced to take me to a port…"]

              , row8: ["@SHMartens,RT @LisaMei62: 'This is an urgent humanitarian iss…veraging every resource we have to confront this…"]

              , row9: ["@CTSKIDOO,RT @Distinct_Words: Dianne Feinstein (D-CA) & supp…ands that all immigration enforcement end for an…"]

              , row10: ["@realtrumpcousin,RT @ChJLuc91: Speechless here....  planned parenth…avers”  and @SpeakerPelosi calls a wall immoral?…"]
 };

          let index = 1;
          let tweet = '';
          var filelen = 0;

          for (var o in data)
          {
              filelen++;
          }
          filelen = filelen;

          for (index = 1; index <= filelen; index++)
          {
              let linedata = (data["row" + index]);
              let line = linedata.toString();
              // console.log(line);
              // console.log(data.keys);
              let x = line.split(",");
              let i = 0;

              if (x[0] == handlename)
              {
                  _this.tweet = x[1];
                  console.log('TWEET', _this.tweet);

                  $(document).ready(function ()
                  {
                      $("#tweetbody").show();
                      $("#tweet").html(_this.tweet);
                  });
                  break;
              }
          }

  }






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
