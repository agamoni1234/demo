import { Component, OnInit } from '@angular/core';
import {Chart} from "angular-highcharts";
import 'datatables.net';
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
  selector: 'app-mldashboard',
  templateUrl: './mldemo.component.html',
  styleUrls: ['./mldemo.component.scss']
})



export class MlComponent implements OnInit {


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
  chartCluster:Chart;


  constructor(private router: Router, private http: HttpClient, private AppServiceObj: AppService, private AppServiceBackendApiObj:
    AppServiceBackendApi) {
  }




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
    this.getClusterGraph();

    //this.introMethod();
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




  sentimentData:any;
  locationdata:any;
  sentimentjson:any;
  locationjson:any;
  

  getClusterGraph()
  {
    let _this = this;

    this.http.get(environment.backendPythonApiUrl+'api/ml/getcluster',{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {
    console.log(data);
    console.log('sentose',data['cluster1']);
    console.log('Versi',data['cluster2']);
    console.log('Virginica',data['cluster3']);


    var dataSentosa=data['cluster1'];
    var dataVersi=data['cluster2'];
    var dataVirginica=data['cluster3'];


    let chartObj:any={


      chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    title: {
        text: 'Clustering on IRIS dataset'
    },

    xAxis: {
        title: {
            enabled: true,
            text: ''
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: ''
        }
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        // backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        borderWidth: 1
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x} , {point.y} '
            }
        }
    },
    responsive: {
      rules: [{
          condition: {
              maxWidth: 1800
          },
          chartOptions: {
              legend: {
                  align: 'center',
                  verticalAlign: 'bottom',
                  layout: 'horizontal'
              },
              yAxis: {
                  labels: {
                      align: 'left',
                      x: 0,
                      y: -5
                  },
                  title: {
                      text: null
                  }
              },
              subtitle: {
                  text: null
              },
              credits: {
                  enabled: false
              }
          }
      }]
  },
    series: [{
        name: 'Sentosa',
        color: 'rgb(223, 83, 83)',
        data: dataSentosa

    }, {
        name: 'Versi',
        color: 'rgb(119, 152, 191)',
        data: dataVersi
    },
    {
      name: 'Virginica',
      color: 'rgb(255,255,0)',
      data: dataVirginica
  }]



    }
    _this.chartCluster = new Chart(chartObj);



  }

  )};





}





