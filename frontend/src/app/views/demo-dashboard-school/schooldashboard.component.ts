import { Component, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import {Chart} from "angular-highcharts";
// import {} from "Highcharts";
import 'datatables.net';
import * as d3 from 'd3';

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
import {Router,ActivatedRoute} from "@angular/router";


import {HttpClient} from "@angular/common/http";
import { introJs } from './intro.js';

// import { chart } from 'highcharts';
// import * as Highcharts from "highcharts";
import { CloudData, CloudOptions,ZoomOnHoverOptions } from 'angular-tag-cloud-module';

import * as $ from 'jquery';
// declare var $:any;

import 'highcharts-more';
// import Tree from 'highcharts/modules/treemap';
// import Heatmap from 'highcharts/modules/heatmap';
let table=null;
let table2=null;
let table3=null;

let table4=null;


let g1data=0;
let g2data=0;
let g3data=0;

@Component({
  selector: 'app-schooldashboard',
  templateUrl: './schooldashboard.component.html',
    styleUrls: ['./schooldashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SchooldashboardComponent implements OnInit {
    // @ViewChild('ErrorSwal') private errorSwal;
    @ViewChild('SuccessSwal') private successSwal;
    @ViewChild('ErrorSwal2') private errorSwal2;

    constructor( private route: ActivatedRoute,private router: Router, private http: HttpClient, private AppServiceObj: AppService, private AppServiceBackendApiObj:
        AppServiceBackendApi) {
      }


      backendApiUrl= environment.backendApiUrl;
      classname = environment.classname;
      dburl = environment.dburl;
      dbport = environment.dbport;
      dbusername = environment.dbusername;
      dbpassword = environment.dbpassword;
      dbname = 'cdrepo';
      dbname2='';
      tablename = 'feedback'
      tablename2 = '';







  chart1:Chart;
  chart2:Chart;
  chart3:Chart;
  chart4:Chart;
  chart5:Chart;
  chart6:Chart;
  chart7:Chart;
  chart8:Chart;
  chart9:Chart;
  chart10:Chart;
  chart11:Chart;
  chart12:Chart;
  chart13:Chart;
  chart14:Chart;
  chart15:Chart;
  chart16:Chart;
  chart17:Chart;

  chart18:Chart;
  chart19:Chart;








  id:number;
  address:string;

  traveltime=0;
  studytime=0;
  absences=0;
  internet=0;
  guardian=0;
  freetime=0;
  activities=0;
  health=0;
  school=null;
  schoolname=null;

  studentid=0;
  attentiveness=0;
  emotional=0;
  date:any;
  teamplayer=0;
  outspoken=0;
  obedient=0;
  punctual=0;
  idfeedback=0;
  remarks=null;
  reviewer=null;
  finaloutcome=null;
  feedbackjson : any;
  predictedData: any;
  prediction :any;
  result: any;

  predictionjson:any;
  predictionres:any;



  traveltimepred=0;
  studytimepred=0;
  absencespred=0;
  freetimepred=0;
  healthpred=0;
  failurespred=0;
  gooutpred=0;
  markspred=0;







  ngOnInit() {

    let token = localStorage.getItem("token");
    if (token == null) {
      this.router.navigate(['login']);
    }
    else{
      $("#riskcards").hide();
    $("#fourthtable").hide();
    $("#thirdtable").hide();
    $("#secondtable").hide();
    $("#firsttable").hide();
    $("#fifthtable").hide();

    this.getchart1();
    this.getchart2();
    this.getchart3();
    this.getchart4();
    this.getBubbleChart();
    this.getcombinationchart();
    this.getareachart();
    this.getincomechart();
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
          element: "#kpi-row",
          intro: "From This 6 Cards you can find out total Number of students, the Total number of boys and girls among the total number of students, Total Number of teachers, Total Number of classrooms, and the total number of staffs Presents in school.",
          position: "relative"
        },
        {
          element: "#visual1",
          intro: "From this chart you can get information about how many numbers of students have enrolled in a particular month. It also helps you to find out the number of boys and girls have enrolled in a particular month.",
          position: "relative"
        },
        {
          element: "#visual2",
          intro: "This pie chart helps you to find out the percentage of students coming from high-income, medium-income, and low-income family.",
          position: "relative"
        },
        {
          element: "#visual3",
          intro: "This column chart helps you to find out the subject wise average marks for a particular classroom.",
          position: "relative"
        },
        {
          element: "#visual4",
          intro: "This chart helps you to find out the class wise average percentage of marks and average attendance.",
          position: "relative"
        },
        {
          element: "#visual5",
          intro: "This chart helps you to find out average percentage marks and average attendance for class IX, X, and XI.",
          position: "relative"
        },
        {
          element: "#visual6",
          intro: "This chart helps you to find out the comparison between three students in a particular class on the marks they have scored in each subject. It also helps you to find out the average marks.",
          position: "relative"
        },
        // {
        //   element: "#topmenu",
        //   intro: "All of these features will be available once you have a subscription.",
        //   position: "relative"
        // },
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
    //   $("#fullbody").attr('style','zoom:0%');
  }


  predictschool()
  {


      this.predictionjson = {


        "traveltimepred": this.traveltimepred,
        "studytimepred":this.studytimepred,
        "failurespred":this.failurespred,
        "freetimepred":this.freetimepred,
        "gooutpred":this.gooutpred,
        "healthpred":this.healthpred,
        "absencespred":this.absencespred,
        "markspred":this.markspred
      };


      this.http.post('http://localhost:5000/predictschool', this.predictionjson
      , { headers: {'Accept': 'application/json' , 'Content-Type': 'application/json'} })
      .subscribe(data => {


        console.log(data);
        console.log(data["prediction"])

        this.predictedData = data;
        // console.log(this.predictedData);
        // console.log(typeof (this.predictedData));
        this.prediction=this.predictedData["prediction"];

        // console.log(this.prediction[1]);
        this.result=this.prediction[1];

        console.log(this.result);

        if(this.result==1)
        {
          this.negativeresponse();
        }
        else if(this.result==0)
        {
            this.positiveresponse();

        }



      });





  }



  positiveresponse()
  {
    this.finaloutcome='Prediction: The student is not at risk.';

  }
  negativeresponse()
  {
    this.finaloutcome='Prediction: The student is at risk.';

  }



  getColumnDrilldownTable(x)
  {
      var age=0;

    if(x==0){   age=15; }
    if(x==1){   age=16; }
    if(x==2){   age=17; }
    if(x==3){   age=18; }
    if(x==4){   age=19; }
    if(x==5){   age=20; }
    if(x==6){   age=21; }
    if(x==7){   age=22; }



    console.log("***********************\n getColumnDrilldown Function called\n*************************");
    //The json request
    // let MysqlReportJson = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"SELECT * from students where school= \''+this.school+'\' and age='+age+' and studytime<3 and failures>0 and freetime>3 and absences >5 and (G1+G2+G3)<30;"}';
    let MysqlReportJson = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"SELECT * from students where school= \''+this.school+'\' and age='+age+' and studytime<3 and failures>0 and freetime>3 and absences >5 and (G1+G2+G3)<30;"}';



    MysqlReportJson = JSON.parse(MysqlReportJson);
    let _this = this;

   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (data) {
     console.log(data);
      var allrows = data.allcol;
      // alert(allrows);
      console.log(allrows);
      //The local array for store data
      let arrayreturn = [];


      $(document).ready(function()
        {
            table4 = $('#studentsearch4').DataTable( {
                // "pagingType": "full_numbers",
                "lengthChange": true,
                "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
            lengthMenu: [
              [ 5,10,15, -1 ],
              [ '5','10','15','Show all' ]
            ],
            buttons: [
              'print'
            ]

            } );



        } );


      $('#studentsearchbody4').html('');
          var body = '';
          //The append data in table as table row
              for(let i=0;i<allrows.length;i++)
              {

                body = body + '<tr align="center" >  ';
                //<td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td>
                for (let j = 0; j < 10; j++)
                {
                    if(j==0)
                    {
                        let bodytext = ' <td align="center"> ' + allrows[i][33]+ ' </td> ';
                        body = body + bodytext;


                    }
                    else if(j==7)
                    {
                        let bodytext = ' <td align="center"> ' + allrows[i][30]+ ' </td> ';
                        body = body + bodytext;


                    }
                    else if(j==8)
                    {
                        let bodytext = ' <td align="center"> ' + allrows[i][31]+ ' </td> ';
                        body = body + bodytext;


                    }
                    else if(j==9)
                    {
                        let bodytext = ' <td align="center"> ' + allrows[i][32]+ ' </td> ';
                        body = body + bodytext;


                    }
                    else
                    {

                    let bodytext = ' <td align="center"> ' + allrows[i][j-1]+ ' </td> ';

                    body = body + bodytext;
                    }
                }
                body = body + '</tr>';
              }

          $('#studentsearchbody4').append(body);
          $("#fourthtable").show();





    });



    table4.destroy();


  }


  searchatrisk()
  {

    this.getGradeWiseRisk();



      let testjson={};


    // this.AppServiceObj.TestSql(testjson,function(returnObj) {


    //     console.log('*********************DATA RETURNED***************',returnObj);
    //  })


    let _this = this;
    console.log(_this.address);
    //The json request
    // let MysqlReportJson = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"SELECT * from students where school= \''+this.school+'\' and studytime<3 and failures>0 and freetime>3 and absences >5 and (G1+G2+G3)<30;"}';
    // let MysqlReportJson = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"SELECT * from students where school= \''+this.school+'\' and studytime<3 and failures>0 and freetime>3 and absences >5 and (G1+G2+G3)<30;"}';
    let MysqlReportJson = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"SELECT * from students where school= \''+this.school+'\' and studytime<3 and failures>0 and freetime>3 and absences >5 and (G1+G2+G3)<30;"}';
     console.log(MysqlReportJson);

    //console.log(MysqlReportJson)
    MysqlReportJson = JSON.parse(MysqlReportJson);






    //The api calling
    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
      if (returnObj.final_status)
      {
        //The all data response in row format and store in variable
        var allrows = returnObj.allcol;
        //The local array for store data
        console.log(allrows);


        $(document).ready(function()
        {
            table3 = $('#studentsearch3').DataTable( {
                // "pagingType": "full_numbers",
                "lengthChange": true,
                "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
            lengthMenu: [
              [ 5,10,15, -1 ],
              [ '5','10','15','Show all' ]
            ],
            buttons: [
              'print'
            ]

            } );



        } );




          $('#studentsearchbody3').html('');
          var body = '';
          //The append data in table as table row
              for(let i=0;i<allrows.length;i++)
              {



                body = body + '<tr align="center">  ';
                //<td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td>
                for (let j = 0; j < 10; j++)
                {
                    if(j==0)
                    {
                        let bodytext = ' <td align="center"> ' + allrows[i][33]+ ' </td> ';
                        body = body + bodytext;


                    }
                    else if(j==7)
                    {
                        let bodytext = ' <td align="center"> ' + allrows[i][30]+ ' </td> ';
                        body = body + bodytext;


                    }
                    else if(j==8)
                    {
                        let bodytext = ' <td align="center"> ' + allrows[i][31]+ ' </td> ';
                        body = body + bodytext;


                    }
                    else if(j==9)
                    {
                        let bodytext = ' <td align="center"> ' + allrows[i][32]+ ' </td> ';
                        body = body + bodytext;


                    }
                    else
                    {

                    let bodytext = ' <td align="center"> ' + allrows[i][j-1]+ ' </td> ';

                    body = body + bodytext;
                    }
                }
                body = body + '</tr>';
              }

          $('#studentsearchbody3').append(body);
          $("#thirdtable").show();




      }


      let malecount=0;
      let femalecount=0;
      let arrayreturn2=[];
      let arrayreturn3=[];


      let columnarray=[];
      let count15=0;
      let count16=0;

      let count17=0;
      let count18=0;
      let count19=0;
      let count20=0;
      let count21=0;
      let count22=0;

      let countU=0;
      let countR=0;





      for(let i=0;i<allrows.length;i++)
      {

            if(allrows[i][3]=='U')
            {
                countU=countU+1;

            }
            else

                countR=countR+1;


      }





      for(let i=0;i<allrows.length;i++)
      {

            if(allrows[i][1]=='F')
            {
                femalecount=femalecount+1;

            }
            else

                malecount=malecount+1;


      }




      for(let i=0;i<allrows.length;i++)
      {

            if(allrows[i][2]==15)
            {
                count15=count15+1;

            }
            if(allrows[i][2]==16)
            {
                count16=count16+1;

            }if(allrows[i][2]==17)
            {
                count17=count17+1;

            }if(allrows[i][2]==18)
            {
                count18=count18+1;

            }if(allrows[i][2]==19)
            {
                count19=count19+1;

            }if(allrows[i][2]==20)
            {
                count20=count20+1;

            }if(allrows[i][2]==21)
            {
                count21=count21+1;

            }if(allrows[i][2]==22)
            {
                count22=count22+1;

            }

      }




      arrayreturn2.push({
        name: 'Male',
        y: malecount

      },{
        name: 'Female',
        y: femalecount
      });



      arrayreturn3.push({
        name: 'Urban',
        y: countU

      },{
        name: 'Rural',
        y: countR
      });



      columnarray.push(count15,count16,count17,count18,count19,count20,count21,count22);




        var result = JSON.stringify(arrayreturn2);
        console.log(result);
        //The making josn as per graph



          let chartObj: any = {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie',
              height:330,
              width:300
            },
            title: {
              text: 'Gender Wise Comparison',
              style: {
                  color: '#000000',
                  fontSize:12
              }
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            credits: {
              enabled: false
            },
            plotOptions: {
              pie: {

                colors: [
                    '#8FB9C5',
                    '#60A3BC',
                    '#2899B5'
                  ],

                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',

                }
              }
            },
            series: [{

              colorByPoint: true,
              data: arrayreturn2
            }]
          };


          _this.chart15 = new Chart(chartObj);






          let chartObj2 : any={

            chart: {
                type: 'bar',
                height:330,
                width:400
            },
            title: {
                text: 'Age wise Risk Analysis ',
                style: {
                    color: '#000000',
                    fontSize:12
                }
            },

            xAxis: {
                categories: ['15 years', '16 years', '17 years', '18 years', '19 years','20 years','21 years','22 years'],
                title: {
                    text: 'At-Risk'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of students',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },



            credits: {
                enabled: false
            },
            series: [{

                name: 'Number of students',
                data: columnarray,
                drilldown: 'Delivery',
                color:'#5d5c61',
                point: {
                  events: {
                    click: function (e) {
                     console.log('INSIDE COLUMN CHART DRILLDOWN',this.y,this.x)


                      _this.getColumnDrilldownTable(this.x);
                      //alert('Category: ' + parseInt(hr) + ', value: ' + this.y);
                    }
                  }
                }

            }]

        }

        _this.chart16 = new Chart(chartObj2);





        let chartObj3: any = {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie',
              height:330,
              width:300
            },

            credits: {
                enabled: false
            },


            title: {
              text: 'Address Wise Comparison',
              style: {
                  color: '#000000',
                  fontSize:12
              }
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },

            plotOptions: {
              pie: {
                colors: [
                    '#8FB9C5',
                    '#60A3BC',
                    '#2899B5'
                  ],
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',

                }
              }
            },
            series: [{

              colorByPoint: true,
              data: arrayreturn3
            }]
          };


          _this.chart17 = new Chart(chartObj3);



    });


    // let MysqlReportJson2 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"SELECT * from students order by G3 desc limit 5;"}';
    let MysqlReportJson2 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"SELECT * from students order by G3 desc limit 5;"}';

    //console.log(MysqlReportJson)
    MysqlReportJson2 = JSON.parse(MysqlReportJson2);

    //The api calling
    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson2, function (returnObj) {
      if (returnObj.final_status)
      {
        //The all data response in row format and store in variable
        var allrows = returnObj.allcol;
        //The local array for store data
        console.log(allrows);





        let idarray=[];
        let marksarray=[];

        (allrows).forEach((valueobj, index) =>
         {


            idarray.push(parseInt(valueobj[33]))
            marksarray.push(parseInt(valueobj[32]))

        });

        console.log(idarray,marksarray);


              let chartObj4: any = {
                chart: {
                    type: 'column',
                    height:330,
                    width:300
                },
                title: {
                    text: 'Top 5 Students',
                    style: {
                        color: '#000000',
                        fontSize:12
                    }
                },
                credits: {
                    enabled: false
                },

                xAxis: {
                    categories: idarray,
                    crosshair: true,
                    title: {
                        text: 'Student ID'
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Marks'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Marks',
                    data: marksarray,
                    color:'#74899C'

                }]
            }

              _this.chart18 = new Chart(chartObj4);

            };





      });








      $("#riskcards").show();








    table3.destroy();




  }


  submitfeedback()
  {
    let _this=this;


    _this.feedbackjson =

    {
      "id": _this.studentid,
      "date":_this.date,
      "attentiveness": _this.attentiveness,
      "emotional": _this.emotional,
      "teamplayer":_this.teamplayer,
      "outspoken":_this.outspoken,
      "punctual":_this.punctual,
      "obedient":_this.obedient,
      "remarks":_this.remarks,
      "reviewer":_this.reviewer
    };

    console.log(_this.feedbackjson);



    // this.AppServiceObj.Feedback(this.feedbackjson, function(returnObj) {


    //    console.log('*********************DATA RETURNED***************',returnObj);
    // })

    let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
    this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
    '","dbname":"'+this.dbname+ '","tablename":"' + this.tablename +
    '","query":"select * from feedback2;"}';



    MysqlReportJson = JSON.parse(MysqlReportJson);

    //The api calling
    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
      if (returnObj.final_status)
      {

        //The all data response in row format and store in variable
        var allrows = returnObj.allcol;
        //The local array for store data
        console.log(allrows);



        // let studentarray=[];
        let columnarray=[];
        let sumatt=0;
        let sumemo=0;
        let sumout=0;
        let sumpunc=0;
        let sumobed=0;

        (allrows).forEach((valueobj, index) => {

            sumatt=sumatt+parseInt(valueobj[2]);
            sumemo=sumemo+parseInt(valueobj[3]);
            sumout=sumout+parseInt(valueobj[5]);
            sumpunc=sumpunc+parseInt(valueobj[6]);
            sumobed=sumobed+parseInt(valueobj[7]);





        });
        let avgatt=sumatt/(allrows.length);
        let avgemo=sumemo/(allrows.length);
        let avgout=sumout/(allrows.length);
        let avgpunc=sumpunc/(allrows.length);
        let avgobed=sumobed/(allrows.length);

        columnarray.push(avgatt,avgemo,avgout,avgpunc,avgobed);
            // studentarray.push(parseInt(allrows[0][12]),parseInt(allrows[0][13]),parseInt(allrows[0][24]),parseInt(allrows[0][25]),parseInt(allrows[0][23]),parseInt(allrows[0][29]));


            // console.log(columnarray);



              let chartObj2 : any={

                chart: {
                    type: 'column'
                },
                title: {
                    text: '',
                    style: {
                        color: '#000000',
                        fontSize:12
                    }
                },
                xAxis: {
                    categories: ['Average Attentiveness', 'Average Emotional Stability','Average Outspoken score','Avegarge Punctuality Score','Average Obediency Score'],
                    title: {
                        text: 'Features'
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Rating',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },



                credits: {
                    enabled: false
                },
                series: [{

                    name: 'Score',
                    data: columnarray
                }]

            }

            _this.chart14 = new Chart(chartObj2);

            }

    });

    }

    // @page { size: auto;  margin: 0mm; }


  printDiv1(): void {


    $("#studentsearch_paginate").css('display','none');
    $("#studentsearch_length").css('display','none');
    $("#studentsearch_filter").css('display','none');
    $("#studentsearch_info").css('display','none');



    let printContents, popupWin;
    printContents = document.getElementById('printArea').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
            #studentsearch th, #studentsearch td{ border: 1px solid black;}


            </style>
        </head>

        <h1 style="text-align: center;">Student Details</h1>

    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  printDiv2(): void {

    $("#studentsearch2_paginate").css('display','none');
    $("#studentsearch2_length").css('display','none');
    $("#studentsearch2_filter").css('display','none');
    $("#studentsearch2_info").css('display','none');

    let printContents, popupWin;
    printContents = document.getElementById('printArea2').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          @page { size: auto;  margin: 0mm; }
          #studentsearch2 th, #studentsearch2 td{ border: 1px solid black}
        </style>
        </head>
        <h1 style="text-align: center;">Student Details</h1>

    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  printDiv3(): void {


    $("#studentsearch3_paginate").css('display','none');
    $("#studentsearch3_length").css('display','none');
    $("#studentsearch3_filter").css('display','none');
    $("#studentsearch3_info").css('display','none');



    // $("#im1").css({"display": "block", "margin-left": "auto","margin-right": "auto"});

    let printContents, popupWin;
    printContents = document.getElementById('printArea3').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          @page { size: auto;  margin: 0mm; }
          #studentsearch3 th, #studentsearch3 td{ border: 1px solid black}
        </style>
        </head>

        <h1 style="text-align: center;">At-Risk Students</h1>

    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }


  printDiv4(): void {


    $("#studentsearch4_paginate").css('display','none');
    $("#studentsearch4_length").css('display','none');
    $("#studentsearch4_filter").css('display','none');
    $("#studentsearch4_info").css('display','none');



    // $("#im1").css({"display": "block", "margin-left": "auto","margin-right": "auto"});

    let printContents, popupWin;
    printContents = document.getElementById('printArea4').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          @page { size: auto;  margin: 0mm; }
          #studentsearch4 th, #studentsearch4 td{ border: 1px solid black}
        </style>
        </head>

        <h1 style="text-align: center;">At-Risk Students</h1>

    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }



  getstudentchart()
  {


    let _this = this;
    console.log(_this.address);
    //The json request
    // let MysqlReportJson = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"SELECT Mjob,count(Mjob) from students where address= \''+this.address+'\' group by Mjob;"}';
    let MysqlReportJson = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"SELECT Mjob,count(Mjob) from students where address= \''+this.address+'\' group by Mjob;"}';

    //console.log(MysqlReportJson)
    MysqlReportJson = JSON.parse(MysqlReportJson);

    //The api calling
    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
      if (returnObj.final_status)
      {
        //The all data response in row format and store in variable
        var allrows = returnObj.allcol;
        //The local array for store data
        console.log(allrows);





        let arrayreturn2=[];

        (allrows).forEach((valueobj, index) => {


            arrayreturn2.push({
              name: valueobj[0],
              y: parseInt(valueobj[1])

            });


            // console.log("******************");
            //
            // console.log(arrayreturn2);
            //
            // console.log("------------------");

            var result = JSON.stringify(arrayreturn2);
            console.log(result);
            //The making josn as per graph

            if (index == allrows.length - 1) {
              //console.log('1');


              let chartObj: any = {
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie',
                //   height:300,
                //   width:300
                },
                title: {
                  text: '',
                  style: {
                      color: '#000000',
                      fontSize:12
                  }
                },
                tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                credits: {
                  enabled: false
                },
                // plotOptions: {
                //   pie: {

                //     allowPointSelect: true,
                //     cursor: 'pointer',
                //     dataLabels: {
                //       enabled: true,
                //       format: '<b>{point.name}</b>: {point.percentage:.1f} %',

                //     }
                //   }
                // },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        colors: [
                            '#8FB9C5',
                            '#60A3BC',
                            '#2899B5'
                      ],
                    }
                },
                series: [{

                  colorByPoint: true,
                  data: arrayreturn2
                }]
              };


              _this.chart9 = new Chart(chartObj);

            };


          });



      }

    });


    // let MysqlReportJson2 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"SELECT Fjob,count(Fjob) from students where address= \''+this.address+'\' group by Fjob;"}';
    let MysqlReportJson2 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"SELECT Fjob,count(Fjob) from students where address= \''+this.address+'\' group by Fjob;"}';

    //console.log(MysqlReportJson)
    MysqlReportJson2 = JSON.parse(MysqlReportJson2);

    //The api calling
    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson2, function (returnObj) {
      if (returnObj.final_status)
      {
        //The all data response in row format and store in variable
        var allrows = returnObj.allcol;
        //The local array for store data
        console.log(allrows);





        let arrayreturn3=[];

        (allrows).forEach((valueobj, index) => {


            arrayreturn3.push({
              name: valueobj[0],
              y: parseInt(valueobj[1])

            });



            var result = JSON.stringify(arrayreturn3);
            console.log(result);
            //The making josn as per graph

            if (index == allrows.length - 1) {
              //console.log('1');


              let chartObj: any = {
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie',
                  height:300,
                  width:300
                },
                title: {
                  text: 'Father\'s job type',
                  style: {
                      color: '#000000',
                      fontSize:12
                  }
                },
                tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                credits: {
                  enabled: false
                },
                plotOptions: {
                  pie: {
                    colors: [
                        '#8FB9C5',
                        '#60A3BC',
                        '#2899B5'
                      ],
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                      enabled: true,
                      format: '<b>{point.name}</b>: {point.percentage:.1f} %',

                    }
                  }
                },
                series: [{

                  colorByPoint: true,
                  data: arrayreturn3
                }]
              };


              _this.chart10 = new Chart(chartObj);

            };


          });



      }

    });









    // let MysqlReportJson3 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"select age,sum(G1)/count(G1) as G1_Average,sum(G2)/count(G2) as G2_Average,sum(G3)/count(G3) as G3_Average from students where address=\''+this.address+'\'group by age;"}';
    let MysqlReportJson3 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"select age,sum(G1)/count(G1) as G1_Average,sum(G2)/count(G2) as G2_Average,sum(G3)/count(G3) as G3_Average from students where address=\''+this.address+'\'group by age;"}';

    //console.log(MysqlReportJson)
    MysqlReportJson3 = JSON.parse(MysqlReportJson3);

    //The api calling
    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson3, function (returnObj) {
      if (returnObj.final_status)
      {
          console.log("******DATA*********",returnObj);
        //The all data response in row format and store in variable
        var allrows = returnObj.allcol;
        //The local array for store data
        console.log(allrows);





        let g1array=[];
        let g2array=[];
        let g3array=[];
        let avgarray=[];
        let sum=0;
        let avg=0;


        (allrows).forEach((valueobj, index) => {
            sum=0;
            sum=sum+parseFloat(valueobj[1])+parseFloat(valueobj[2])+parseFloat(valueobj[3]);
            g1array.push(parseFloat(valueobj[1]));
            g2array.push(parseFloat(valueobj[2]));
            g3array.push(parseFloat(valueobj[3]));
            avg=sum/3;
            avgarray.push(avg);

            //The making josn as per graph
                //console.log('1');


                let chartObj:any=

                {

                    title : {
                        text: 'Age Wise Average Marks',
                        style: {
                            color: '#000000',
                            fontSize:12
                        }
                     },
                     credits: {
                        enabled: false
                    },

                     xAxis : {
                        categories: ['15 years', '16 years', '17 years', '18 years', '19 years','20 years','21 years','22 years']
                     },
                     labels : {
                        items: [{
                           style: {
                              left: '50px',
                              top: '18px',
                            //   color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                           }
                        }]
                     },
                     series : [
                        {
                           type: 'column',
                           name: 'Subject G1',
                           data: g1array
                        },
                        {
                           type: 'column',
                           name: 'Subject G2',
                           data: g2array
                        },
                        {
                           type: 'column',
                           name: 'Subject G3',
                           data: g3array
                        },
                        {
                           type: 'spline',
                           name: 'Average',
                           data: avgarray,

                           marker: {
                              lineWidth: 2,
                            //   lineColor: Highcharts.getOptions().colors[3],
                              fillColor: 'white'
                           }
                        },

                     ]



                }

              _this.chart11 = new Chart(chartObj);


          });

            console.log(g1array,g2array,g3array,avgarray);

      }

    });


  }




searchstudent()
{

    let _this = this;
    console.log(_this.address);
    //The json request
    // let MysqlReportJson = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"SELECT * from students where id= '+this.id+';"}';
    let MysqlReportJson = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"SELECT * from students where id= '+this.id+';"}';

    //console.log(MysqlReportJson)
    MysqlReportJson = JSON.parse(MysqlReportJson);

    //The api calling
    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
      if (returnObj.final_status)
      {
        var allrows = returnObj.allcol;


        _this.traveltime=allrows[0][12];
        _this.studytime=allrows[0][13];
        _this.internet=allrows[0][21];
        _this.absences=allrows[0][29];
        _this.guardian=allrows[0][11];
        _this.freetime=allrows[0][24];
        _this.activities=allrows[0][18];
        _this.health=allrows[0][28];

        //The all data response in row format and store in variable
        //The local array for store data
        console.log(allrows);


        $(document).ready(function()
        {
            table2 = $('#studentsearch2').DataTable( {
                // "pagingType": "full_numbers",
                "lengthChange": true,
                "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
            lengthMenu: [
              [ 5,10,15, -1 ],
              [ '5','10','15','Show all' ]
            ],
            buttons: [
              'print'
            ]

            } );



        } );




          // console.log("______________Length________________________"+selectedlength);
          // }
          $('#studentsearchbody2').html('');
          var body = '';
          //The append data in table as table row
              for(let i=0;i<allrows.length;i++)
              {


                // console.log("_______________________Inside For Each__________________________")
                // console.log(datareturn2[i]["handle"]);

                body = body + '<tr align="center">  ';
                //<td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td>
                for (let j = 0; j < 10; j++)
                {

                    let bodytext = ' <td align="center"> ' + allrows[i][j]+ ' </td> ';

                    body = body + bodytext;
                }
                body = body + '</tr>';
              }

          $('#studentsearchbody2').append(body);
        //   $('#studentsearch2_filter input').css('border','1px solid black');


          // this.initTable3();

          $('.secondtable').show();
          $('#secondtable').show();



      }

    });
    // table.destroy();




    // let MysqlReportJson4 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"SELECT * from students where id= '+this.id+';"}';
    let MysqlReportJson4 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"SELECT * from students where id= '+this.id+';"}';

    //console.log(MysqlReportJson)
    MysqlReportJson4 = JSON.parse(MysqlReportJson4);

    //The api calling
    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson4, function (returnObj) {
      if (returnObj.final_status)
      {
        //The all data response in row format and store in variable
        var allrows = returnObj.allcol;
        //The local array for store data
        console.log(allrows);


        let studentarray=[];
        let columnarray=[];

        columnarray.push(parseInt(allrows[0][30]),parseInt(allrows[0][31]),parseInt(allrows[0][32]));

            studentarray.push(parseInt(allrows[0][12]),parseInt(allrows[0][13]),parseInt(allrows[0][24]),parseInt(allrows[0][25]),parseInt(allrows[0][23]),parseInt(allrows[0][29]));


            console.log(columnarray);

              let chartObj: any = {

                    chart: {
                        type: 'area',
                        spacingBottom: 30
                    },
                    title: {
                        text: '',
                        style: {
                            color: '#000000',
                            fontSize:12
                        }
                    },


                    xAxis: {
                        categories: ['Travel Time', 'Study Time', 'Free Time', 'Outside Time', 'Absences','Family Relation']
                    },
                    yAxis: {
                        title: {
                            text: 'Y-Axis'
                        },
                        labels: {
                            formatter: function () {
                                return this.value;
                            }
                        }
                    },
                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.series.name + '</b><br/>' +
                                this.x + ': ' + this.y;
                        }
                    },
                    plotOptions: {
                        area: {
                            fillOpacity: 0.5,
                            color:'#74899C'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Student Analysis',
                        data: studentarray
                    },
                    ]

              };


              _this.chart12 = new Chart(chartObj);

              let chartObj2:any={

                chart: {
                    type: 'bar'
                },
                title: {
                    text: '',
                    style: {
                        color: '#000000',
                        fontSize:12
                    }
                },
                xAxis: {
                    categories: ['Subject G1', 'Subject G2', 'Subject G3'],
                    title: {
                        text: 'Subjects'
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Marks',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' millions'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },

                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Marks',
                    data: columnarray,
                    color:'#5d5c61'
                }]

            }

            _this.chart13 = new Chart(chartObj2);

            }

    });




    table2.destroy();






}


searchaddress()
{

    let _this = this;
    console.log(_this.address);
    //The json request
    // let MysqlReportJson = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"SELECT * from students where address= \''+this.address+'\';"}';
    let MysqlReportJson = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"SELECT * from students where address= \''+this.address+'\';"}';

    //console.log(MysqlReportJson)
    MysqlReportJson = JSON.parse(MysqlReportJson);

    //The api calling
    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
      if (returnObj.final_status)
      {
          console.log('DATA RETURNED',returnObj);
        //The all data response in row format and store in variable
        var allrows = returnObj.allcol;
        //The local array for store data
        console.log(allrows);



        $(document).ready(function()
        {
            table = $('#studentsearch').DataTable( {
                // "pagingType": "full_numbers",
                "lengthChange": true,
                "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
            lengthMenu: [
              [ 5,10,15, -1 ],
              [ '5','10','15','Show all' ]
            ],
            buttons: [
              'print'
            ]

            } );



        } );


          $('#studentsearchbody').html('');
          var body = '';
          //The append data in table as table row
              for(let i=0;i<allrows.length;i++)
              {

                body = body + '<tr align="center">  ';
                //<td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td>
                for (let j = 0; j < 7; j++)
                {
                    if(j==0)
                    {
                        let bodytext = ' <td align="center"> ' + allrows[i][33]+ ' </td> ';
                        body = body + bodytext;


                    }
                    else
                    {

                    let bodytext = ' <td align="center"> ' + allrows[i][j-1]+ ' </td> ';

                    body = body + bodytext;
                    }
                }
                body = body + '</tr>';
              }

          $('#studentsearchbody').append(body);


          // this.initTable3();

          $('.firsttable').show();
          $('#firsttable').show();



      }

    });





    console.log(_this.address);
    //The json request
    // let MysqlReportJson4 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"SELECT Mjob,count(Mjob) from students where address= \''+this.address+'\' group by Mjob;"}';
    let MysqlReportJson4 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"SELECT Mjob,count(Mjob) from students where address= \''+this.address+'\' group by Mjob;"}';

    //console.log(MysqlReportJson)
    MysqlReportJson4 = JSON.parse(MysqlReportJson4);

    //The api calling
    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson4, function (returnObj) {
      if (returnObj.final_status)
      {
        //The all data response in row format and store in variable
        var allrows = returnObj.allcol;
        //The local array for store data
        console.log(allrows);





        let arrayreturn2=[];

        (allrows).forEach((valueobj, index) => {


            arrayreturn2.push({
              name: valueobj[0],
              y: parseInt(valueobj[1])

            });


            // console.log("******************");
            //
            // console.log(arrayreturn2);
            //
            // console.log("------------------");

            var result = JSON.stringify(arrayreturn2);
            console.log(result);
            //The making josn as per graph

            if (index == allrows.length - 1) {
              //console.log('1');


              let chartObj: any = {
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie',
                  height:350,
                  width:350
                },
                title: {
                  text: '',
                  style: {
                      color: '#000000',
                      fontSize:12
                  }
                },

                tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                credits: {
                  enabled: false
                },
                plotOptions: {
                  pie: {
                    colors: [
                        '#8FB9C5',
                        '#60A3BC',
                        '#2899B5'
                    ],
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                      enabled: true,
                      format: '<b>{point.name}</b>: {point.percentage:.1f} %',

                    }
                  }
                },
                series: [{

                  colorByPoint: true,
                  data: arrayreturn2
                }]
              };


              _this.chart9 = new Chart(chartObj);

            };


          });



      }

    });


    // let MysqlReportJson2 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"SELECT Fjob,count(Fjob) from students where address= \''+this.address+'\' group by Fjob;"}';
    let MysqlReportJson2 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"SELECT Fjob,count(Fjob) from students where address= \''+this.address+'\' group by Fjob;"}';

    //console.log(MysqlReportJson)
    MysqlReportJson2 = JSON.parse(MysqlReportJson2);

    //The api calling
    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson2, function (returnObj) {
      if (returnObj.final_status)
      {
        //The all data response in row format and store in variable
        var allrows = returnObj.allcol;
        //The local array for store data
        console.log(allrows);





        let arrayreturn3=[];

        (allrows).forEach((valueobj, index) => {


            arrayreturn3.push({
              name: valueobj[0],
              y: parseInt(valueobj[1])

            });



            var result = JSON.stringify(arrayreturn3);
            console.log(result);
            //The making josn as per graph

            if (index == allrows.length - 1) {
              //console.log('1');


              let chartObj: any = {
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie',
                  height:350,
                  width:350
                },
                title: {
                  text: '',
                  style: {
                      color: '#000000',
                      fontSize:12
                  }
                },
                tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                credits: {
                  enabled: false
                },
                plotOptions: {
                  pie: {
                    colors: [
                        '#8FB9C5',
                        '#60A3BC',
                        '#2899B5'                      ],
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                      enabled: true,
                      format: '<b>{point.name}</b>: {point.percentage:.1f} %',

                    }
                  }
                },
                series: [{

                  colorByPoint: true,
                  data: arrayreturn3
                }]
              };


              _this.chart10 = new Chart(chartObj);

            };


          });



      }

    });









    // let MysqlReportJson3 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"select age,sum(G1)/count(G1) as G1_Average,sum(G2)/count(G2) as G2_Average,sum(G3)/count(G3) as G3_Average from students where address=\''+this.address+'\'group by age;"}';
    let MysqlReportJson3 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"select age,sum(G1)/count(G1) as G1_Average,sum(G2)/count(G2) as G2_Average,sum(G3)/count(G3) as G3_Average from students where address=\''+this.address+'\'group by age;"}';

    //console.log(MysqlReportJson)
    MysqlReportJson3 = JSON.parse(MysqlReportJson3);

    //The api calling
    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson3, function (returnObj) {
      if (returnObj.final_status)
      {
          console.log("******DATA*********",returnObj);
        //The all data response in row format and store in variable
        var allrows = returnObj.allcol;
        //The local array for store data
        console.log(allrows);





        let g1array=[];
        let g2array=[];
        let g3array=[];
        let avgarray=[];
        let sum=0;
        let avg=0;


        (allrows).forEach((valueobj, index) => {
            sum=0;
            sum=sum+parseFloat(valueobj[1])+parseFloat(valueobj[2])+parseFloat(valueobj[3]);
            g1array.push(parseFloat(valueobj[1]));
            g2array.push(parseFloat(valueobj[2]));
            g3array.push(parseFloat(valueobj[3]));
            avg=sum/3;
            avgarray.push(avg);

            //The making josn as per graph
                //console.log('1');


                let chartObj:any=

                {

                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        height:300,
                        width:350
                      },

                    title : {
                        text: '',
                        style: {
                            color: '#000000',
                            fontSize:12
                        }
                     },

                     credits: {
                        enabled: false
                    },

                     xAxis : {
                        categories: ['15 years', '16 years', '17 years', '18 years', '19 years','20 years','21 years','22 years']
                     },
                     labels : {
                        items: [{
                           style: {
                              left: '50px',
                              top: '18px',
                            //   color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                           }
                        }]
                     },
                     series : [
                        {
                           type: 'column',
                           name: 'Subject G1',
                           data: g1array
                        },
                        {
                           type: 'column',
                           name: 'Subject G2',
                           data: g2array
                        },
                        {
                           type: 'column',
                           name: 'Subject G3',
                           data: g3array
                        },
                        {
                           type: 'spline',
                           name: 'Average',
                           data: avgarray,

                           marker: {
                              lineWidth: 2,
                            //   lineColor: Highcharts.getOptions().colors[3],
                              fillColor: 'white'
                           }
                        },

                     ]



                }

              _this.chart11 = new Chart(chartObj);


          });

            console.log(g1array,g2array,g3array,avgarray);

      }

    });

    table.destroy();

}





searchschool()
{

    let _this = this;
    console.log(_this.schoolname);
    //The json request
    // let MysqlReportJson = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"SELECT * from students where school= \''+this.schoolname+'\';"}';
    let MysqlReportJson = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"SELECT * from students where school= \''+this.schoolname+'\';"}';

    //console.log(MysqlReportJson)
    MysqlReportJson = JSON.parse(MysqlReportJson);

    //The api calling
    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
      if (returnObj.final_status)
      {
        console.log('DATA FROM MYSQL',returnObj);

        //The all data response in row format and store in variable
        var allrows = returnObj.allcol;
        //The local array for store data
        console.log(allrows);



        $(document).ready(function()
        {
            table = $('#studentsearch').DataTable( {
                // "pagingType": "full_numbers",
                "lengthChange": true,
                "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
            lengthMenu: [
              [ 5,10,15, -1 ],
              [ '5','10','15','Show all' ]
            ],
            buttons: [
              'print'
            ]

            } );



        } );



          $('#studentsearchbody').html('');
          var body = '';
          //The append data in table as table row
              for(let i=0;i<allrows.length;i++)
              {

                body = body + '<tr align="center" >  ';
                //<td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td>
                for (let j = 0; j < 7; j++)
                {
                    if(j==0)
                    {
                        let bodytext = ' <td align="center"> ' + allrows[i][33]+ ' </td> ';
                        body = body + bodytext;


                    }
                    else
                    {

                    let bodytext = ' <td align="center"> ' + allrows[i][j-1]+ ' </td> ';

                    body = body + bodytext;
                    }
                }
                body = body + '</tr>';
              }

          $('#studentsearchbody').append(body);


          // this.initTable3();

          $('.firsttable').show();
          $('#firsttable').show();



      }

    });





    console.log(_this.schoolname);
    //The json request
    // let MysqlReportJson4 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"SELECT Mjob,count(Mjob) from students where school= \''+this.schoolname+'\' group by Mjob;"}';
    let MysqlReportJson4 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"SELECT Mjob,count(Mjob) from students where school= \''+this.schoolname+'\' group by Mjob;"}';

    //console.log(MysqlReportJson)
    MysqlReportJson4 = JSON.parse(MysqlReportJson4);

    //The api calling
    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson4, function (returnObj) {
      if (returnObj.final_status)
      {
        //The all data response in row format and store in variable
        var allrows = returnObj.allcol;
        //The local array for store data
        console.log(allrows);





        let arrayreturn2=[];

        (allrows).forEach((valueobj, index) => {


            arrayreturn2.push({
              name: valueobj[0],
              y: parseInt(valueobj[1])

            });


            // console.log("******************");
            //
            // console.log(arrayreturn2);
            //
            // console.log("------------------");

            var result = JSON.stringify(arrayreturn2);
            console.log(result);
            //The making josn as per graph

            if (index == allrows.length - 1) {
              //console.log('1');


              let chartObj: any = {
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie',
                  height:350,
                  width:350
                },

                credits: {
                    enabled: false
                },

                title: {
                  text: '',
                  style: {
                      color: '#000000',
                      fontSize:12
                  }
                },
                tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },

                plotOptions: {
                  pie: {
                    colors: [
                        '#8FB9C5',
                        '#60A3BC',
                        '#2899B5'
                     ],
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                      enabled: true,
                      format: '<b>{point.name}</b>: {point.percentage:.1f} %',

                    }
                  }
                },
                series: [{

                  colorByPoint: true,
                  data: arrayreturn2
                }]
              };


              _this.chart9 = new Chart(chartObj);

            };


          });



      }

    });


    // let MysqlReportJson2 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"SELECT Fjob,count(Fjob) from students where school= \''+this.schoolname+'\' group by Fjob;"}';
    let MysqlReportJson2 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"SELECT Fjob,count(Fjob) from students where school= \''+this.schoolname+'\' group by Fjob;"}';

    //console.log(MysqlReportJson)
    MysqlReportJson2 = JSON.parse(MysqlReportJson2);

    //The api calling
    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson2, function (returnObj) {
      if (returnObj.final_status)
      {
        //The all data response in row format and store in variable
        var allrows = returnObj.allcol;
        //The local array for store data
        console.log(allrows);





        let arrayreturn3=[];

        (allrows).forEach((valueobj, index) => {


            arrayreturn3.push({
              name: valueobj[0],
              y: parseInt(valueobj[1])

            });



            var result = JSON.stringify(arrayreturn3);
            console.log(result);
            //The making josn as per graph

            if (index == allrows.length - 1) {
              //console.log('1');


              let chartObj: any = {
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie',
                  height:350,
                  width:350
                },
                title: {
                  text: '',
                  style: {
                      color: '#000000',
                      fontSize:12
                  }
                },
                tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                credits: {
                  enabled: false
                },
                plotOptions: {
                  pie: {
                    colors: [
                        '#8FB9C5',
                        '#60A3BC',
                        '#2899B5'
                    ],
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                      enabled: true,
                      format: '<b>{point.name}</b>: {point.percentage:.1f} %',

                    }
                  }
                },
                series: [{

                  colorByPoint: true,
                  data: arrayreturn3
                }]
              };


              _this.chart10 = new Chart(chartObj);

            };


          });



      }

    });









    // let MysqlReportJson3 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"select age,sum(G1)/count(G1) as G1_Average,sum(G2)/count(G2) as G2_Average,sum(G3)/count(G3) as G3_Average from students where school=\''+this.schoolname+'\'group by age;"}';
    let MysqlReportJson3 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"select age,sum(G1)/count(G1) as G1_Average,sum(G2)/count(G2) as G2_Average,sum(G3)/count(G3) as G3_Average from students where school=\''+this.schoolname+'\'group by age;"}';

    //console.log(MysqlReportJson)
    MysqlReportJson3 = JSON.parse(MysqlReportJson3);

    //The api calling
    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson3, function (returnObj) {
      if (returnObj.final_status)
      {
          console.log("******DATA*********",returnObj);
        //The all data response in row format and store in variable
        var allrows = returnObj.allcol;
        //The local array for store data
        console.log(allrows);





        let g1array=[];
        let g2array=[];
        let g3array=[];
        let avgarray=[];
        let sum=0;
        let avg=0;


        (allrows).forEach((valueobj, index) => {
            sum=0;
            sum=sum+parseFloat(valueobj[1])+parseFloat(valueobj[2])+parseFloat(valueobj[3]);
            g1array.push(parseFloat(valueobj[1]));
            g2array.push(parseFloat(valueobj[2]));
            g3array.push(parseFloat(valueobj[3]));
            avg=sum/3;
            avgarray.push(avg);

            //The making josn as per graph
                //console.log('1');


                let chartObj:any=

                {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        height:300,
                        width:350
                      },

                    title : {
                        text: '',
                        style: {
                            color: '#000000',
                            fontSize:12
                        }
                     },
                     xAxis : {
                        categories: ['15 years', '16 years', '17 years', '18 years', '19 years','20 years','21 years','22 years']
                     },
                     labels : {
                        items: [{
                           style: {
                              left: '50px',
                              top: '18px',
                            //   color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                           }
                        }]
                     },
                     series : [
                        {
                           type: 'column',
                           name: 'Subject G1',
                           data: g1array
                        },
                        {
                           type: 'column',
                           name: 'Subject G2',
                           data: g2array
                        },
                        {
                           type: 'column',
                           name: 'Subject G3',
                           data: g3array
                        },
                        {
                           type: 'spline',
                           name: 'Average',
                           data: avgarray,

                           marker: {
                              lineWidth: 2,
                            //   lineColor: Highcharts.getOptions().colors[3],
                              fillColor: 'white'
                           }
                        },

                     ]



                }

              _this.chart11 = new Chart(chartObj);


          });

            console.log(g1array,g2array,g3array,avgarray);

      }

    });

    table.destroy();

}




  getchart1() {
    let _this = this;


    let chartObj: any = {

      chart: {
        type: 'areaspline'
      },
      title: {
        text: '',
        style: {
          color: '#000000',
          fontSize: 12
        }
      },

      credits: {
        enabled: false
      },

      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 700,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor: ('#FFFFFF')
      },
      xAxis: {
        categories: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        plotBands: [{ // visualize the weekend
          from: 4.5,
          to: 6.5,
          color: 'rgba(226, 95, 52, 0.1)'
        }]
      },
      yAxis: {
        title: {
          text: 'Count Of Students'
        }
      },
      tooltip: {
        shared: true,
        valueSuffix: ' '
      },

      plotOptions: {
        areaspline: {
          fillOpacity: 0.5
        }
      },
      series: [{
        name: 'Boys',
        data: [3, 4, 3, 5, 4, 10, 12, 3, 4, 3, 5, 4]
      }, {
        name: 'Girls',
        data: [1, 3, 4, 3, 3, 5, 4, 1, 3, 4, 3, 3]
      }],
      colors: ['#f5835d','#F26851']

    };
    _this.chart1 = new Chart(chartObj);


  }



getchart2()
{


    let _this=this;

    let chartObj: any = {
        chart: {
            type: 'column',
            options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
            viewDistance: 25
         }
        },
        title: {
          text: '',
          style: {
            color: '#000000',
            fontSize:12
        }
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
            borderWidth: 0,
            dataLabels: {
              enabled: true
            }
          },

          column: {

            depth: 25
         }

        },

        series: [{
            name: 'Marks',
            data: [
                ['English', 24.2],
                ['Chemistry', 20.8],
                ['Phtsics', 14.9],
                ['History', 13.7],
                ['Geography', 13.1],
                ['Maths', 12.7],
                ['Biology', 12.4],
                ['Computer', 12.2],
                ['Hindi', 12.0]

            ],
            color:'#F26851'
        }]

      };


      _this.chart2 = new Chart(chartObj);



}


getchart3()
{
    let _this=this;

    let chartObj:any={


        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        credits: {
            enabled: false
        },

        title: {
            text: '',
            style: {
                color: '#000000',
                fontSize:12
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                colors: [
                    '#8FB9C5',
                    '#60A3BC',
                    '#2899B5'
                  ],
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Elementary School',
                y: 60,
                sliced: true,
                selected: true
            }, {
                name: 'High School',
                y: 20
            }, {
                name: 'Middle School',
                y: 20
            }
            ]
        }]



    }

    _this.chart3 = new Chart(chartObj);




}

getchart4()
{
 let _this=this;

 let chartObj:any=

 {
    chart: {
        type: 'columnrange',
        inverted: true,
        width:1300,
        // height:300
    },

    credits: {
        enabled: false
    },


    title: {
        text: '',
        style: {
            color: '#000000',
            fontSize:12
        }
    },

    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    yAxis: {
        title: {
            text: 'Number Of Students'
        }
    },

    tooltip: {
        valueSuffix: ''
    },

    plotOptions: {
        columnrange: {
            dataLabels: {
                enabled: true,
                format: '{y}'
            }
        }
    },

    legend: {
        enabled: false
    },

    series: [{
        name: 'Attendance',
        data: [
            [10, 25],
            [8, 30],
            [6, 35],
            [9, 32],
            [5, 40],
            [25, 45],
            [6, 36],
            [6, 21],
            [3, 19],
            [3, 34],
            [8, 40],
            [9, 36]
        ],
        color:'#74899c'
    }]




 }

 _this.chart4 = new Chart(chartObj);


}

getBubbleChart()
{

    let _this=this;

    let chartObj:any=

    {

        chart : {
           type: 'bubble',
           zoomType: 'xy'
        },
        credits: {
            enabled: false
        },

        title : {
           text: '',
           style: {
               color: '#000000',
               fontSize:12
           }
        },
        series : [
           {
              data: [
                 [97, 36, 79], [94, 74, 60], [68, 76, 58], [64, 87, 56],
                 [68, 27, 73], [74, 99, 42], [7, 93, 87],  [51, 69, 40],
                 [38, 23, 33], [57, 86, 31]
              ],
              name:'Class XI',
              color:'#f5480f'
           },
           {
              data: [
                 [25, 10, 87], [2, 75, 59],  [11, 54, 8],  [86, 55, 93],
                 [5, 3, 58],   [90, 63, 44], [91, 33, 17], [97, 3, 56],
                 [15, 67, 48], [54, 25, 81]
              ],
              name:'Class X',
              color:'#f3b2a9'


           },
           {
              data: [
                 [47, 47, 21], [20, 12, 4],  [6, 76, 91],  [38, 30, 60],
                 [57, 98, 64], [61, 17, 80], [83, 60, 13], [67, 78, 75],
                 [64, 12, 10], [30, 77, 82]
              ],
              name:'Class IX',
              color:'#a7482f'
           }
        ]


    }

    _this.chart5 = new Chart(chartObj);

}


getcombinationchart()
{

    let _this=this;

    let chartObj:any=

    {

        title : {
            text: '',
            style: {
                color: '#000000',
                fontSize:12
            }
         },
         xAxis : {
            categories: ['Maths', 'Physics', 'English', 'Chmemistry', 'Computer']

         },
         labels : {
            items: [{
               html: 'Attendance',

               style: {
                  left: '50px',
                  top: '18px',
                //   color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
               }
            }]
         },

         credits: {
            enabled: false
        },

         series : [
            {
               type: 'column',
               name: 'Jane',
               data: [3, 2, 1, 3, 4],
               color:'#f5480f'

            },
            {
               type: 'column',
               name: 'John',
               data: [2, 3, 5, 7, 6],
               color:'#f3b2a9'

            },
            {
               type: 'column',
               name: 'Joe',
               data: [4, 3, 3, 9, 0],
               color:'#a7482f'


            },
            {
               type: 'spline',
               name: 'Average',
               data: [3, 2.67, 3, 6.33, 3.33],

               marker: {
                  lineWidth: 2,
                //   lineColor: Highcharts.getOptions().colors[3],
                  fillColor: 'white'
               }
            },
            {
               type: 'pie',
               name: 'Total consumption',

               data: [
                  {
                     name: 'Jane',
                     y: 13,
                    //  color: Highcharts.getOptions().colors[0] // Jane's color
                  },
                  {
                     name: 'John',
                     y: 23,
                    //  color: Highcharts.getOptions().colors[1] // John's color
                  },
                  {
                     name: 'Joe',
                     y: 19,
                    //  color: Highcharts.getOptions().colors[2] // Joe's color
                  }
               ],
               center: [100, 40],
               size: 40,
               showInLegend: false,
               dataLabels: {
                  enabled: false
               },
               colors: [
                    '#E14328',
                    '#EA604E',
                    '#CF6D53'
              ],
            }
         ]



    }

    _this.chart6 = new Chart(chartObj);

}

getareachart()
{

    let _this=this;

    let chartObj:any=
    {
        chart: {
            type: 'area',
            spacingBottom: 30
        },
        title: {
            text: '',
            style: {
                color: '#000000',
                fontSize:12
            }
        },

        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 80,
            y: 10,
            floating: true,
            borderWidth: 1,
            // backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            categories: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII','IX','X']
        },

        yAxis: {
            title: {
                text: 'Y-Axis'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    this.x + ': ' + this.y;
            }
        },
        plotOptions: {
            area: {
                fillOpacity: 0.5
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Percentage',
            data: [94, 95, 68, 56, 78, 45, 98, 82,75,85]
        },
        {
            name: 'Attendance',
            data: [60, 90, 48, 84, 68, 95, 98, 22,65,75]
        }],
        colors: ['#f5a88e','#CF6D53']

    }

    _this.chart7 = new Chart(chartObj);
}



getincomechart()
{
    let _this=this;

    let chartObj:any={


        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: '',
            style: {
                color: '#000000',
                fontSize:12
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        credits: {
            enabled: false
          },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                colors: [
                    '#CF6D53',
                    '#f5835d',
                    '#e25f34'
              ],
              showInLegend:true,
              dataLabels: {
                enabled: false,
                //format: '<b>{point.name}</b>',

              }
            }
        },



        series: [{
            name: 'Income',
            colorByPoint: true,
            data: [{
                name: 'Low Income',
                y: 60,
                sliced: true,
                selected: true
            }, {
                name: 'Mid Income',
                y: 25
            }, {
                name: 'High Income',
                y: 15
            }
            ]
        }]



    }

    _this.chart8 = new Chart(chartObj);




}


getGradeWiseRisk()
{
    let _this=this;




    // let MysqlReportJson4 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"root","dbpassword":"root","dbname":"mlpractice","tablename":"students","query":"SELECT count(id) from students WHERE G1 < 8 union SELECT count(id) from students WHERE G2 < 8 union SELECT count(id) from students WHERE G3 < 8;"}';
    let MysqlReportJson4 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename2+'","query":"SELECT count(id) from students WHERE G1 < 8 union SELECT count(id) from students WHERE G2 < 8 union SELECT count(id) from students WHERE G3 < 8;"}';

    //console.log(MysqlReportJson)
    MysqlReportJson4 = JSON.parse(MysqlReportJson4);

    //The api calling
    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson4, function (returnObj) {
      if (returnObj.final_status)
      {
        //The all data response in row format and store in variable
        var allrows = returnObj.allcol;
        //The local array for store data
        console.log(allrows);





        let risk=[];
        let subject='G';
        let i=1;

        (allrows).forEach((valueobj, index) => {


            risk.push({
              name: subject+i,
              y: parseInt(valueobj[0])

            });
            i=i+1;

            var result = JSON.stringify(risk);
            console.log(result);

            if (index == allrows.length - 1) {


              let chartObj: any = {
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie',
                  height:330,
                  width:300,
                  margin: [-50, 5, 5, 5]                },
                title: {
                  text: '',
                  style: {
                      color: '#000000',
                      fontSize:12
                  }
                },
                tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                credits: {
                  enabled: false
                },
                plotOptions: {
                  pie: {
                    colors: [
                        '#8FB9C5',
                        '#60A3BC',
                        '#2899B5'
                      ],

                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                      enabled: true,
                      format: '<b>{point.name}</b>: {point.percentage:.1f} %',

                    }
                  }
                },
                series: [{

                  colorByPoint: true,
                  data: risk
                }]
              };


              _this.chart19 = new Chart(chartObj);

            };


          });



      }

    });


}


searchfeedback()
{

    let _this = this;
    console.log(_this.idfeedback);
    //The json request

    let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
    this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
    '","dbname":"'+this.dbname+ '","tablename":"' + this.tablename +
    '","query":"select * from feedback2 where id='+this.idfeedback+';"}';

    MysqlReportJson = JSON.parse(MysqlReportJson);


    this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
        if (returnObj.final_status)
        {
          //The all data response in row format and store in variable
          var allrows = returnObj.allcol;
          //The local array for store data
          console.log(allrows);



          $(document).ready(function()
          {
              table = $('#feedbacksearch').DataTable( {
                  // "pagingType": "full_numbers",
                  dom: 'Bfrtip',
            //   lengthMenu: [
            //     [ 5, -1 ],
            //     [ '5 rows','Show all' ]
            //   ],
            //   buttons: [
            //     'print'
            //   ]

              } );



          } );


            $('#feedbacksearchbody').html('');
            var body = '';

            for(let i=0;i<1;i++)
                {

                  body = body + '<tr align="center" class="odd gradeX table-active" >  ';
                  for (let j = 0; j < 10; j++)
                  {


                      let bodytext = ' <td align="center"> ' + allrows[i][j]+ ' </td> ';

                      body = body + bodytext;

                  }
                  body = body + '</tr>';
                }

            $('#feedbacksearchbody').append(body);



            $('.fifthtable').show();
            $('#fifthtable').show();



        }

      });



    table.destroy();


}






}
