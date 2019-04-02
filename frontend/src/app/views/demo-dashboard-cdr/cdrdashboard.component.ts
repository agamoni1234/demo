import 'datatables.net';

import { Component, OnInit, NgModule, ViewEncapsulation, AfterViewInit } from '@angular/core';
import {
  Router
}
from '@angular/router';
import { Title } from '@angular/platform-browser';
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
// import {
//   Chart, Highcharts
// }
// from 'angular-highcharts';
import * as moment from 'moment'
import * as $ from 'jquery';
import { introJs } from './intro.js';
import {Chart} from "angular-highcharts";
import * as Highcharts from 'highcharts';

// var $ = jquery.noConflict();
declare var $:any;
declare var available: Number;



import * as d3 from 'd3';

let missed = 0;
let inComing=0;
let outGoing= 0;
let table = null;
let jsondata={};
var distsource = [];
var disttarget = [];
var finalarray=[];
let sun = 0;let mon = 0;let tue = 0;let wed = 0;let thu = 0;let fri = 0;let sat = 0;





interface Node {
  id: string;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

// interface Graph {
//   nodes: Node[];
//   links: Link[];
// }
// interface ResponseData {
//   nodes: Node[],
//   links: Link[]

// }

@Component({
  selector: 'app-cdrdashboard',
  templateUrl: './cdrdashboard.component.html',
  styleUrls: ['./cdrdashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CdrdashboardComponent implements OnInit  {

  constructor(private router: Router, private http: HttpClient, private AppServiceObj: AppService, private AppServiceBackendApiObj:
    AppServiceBackendApi,private title: Title) {
  }



  classname=environment.classname;
  dburl=environment.dburl;
  dbport=environment.dbport;
  dbusername=environment.dbusername;
  dbpassword=environment.dbpassword;
  tablename3='';
  dbname2='';



  from = null;
  to = null;
  from2 = null;
  to2 = null;
  from3 = null;
  to3 = null;
  number = null;
  target = null;
  other = null;
  chart1: Chart;
  chart2: Chart;
  chart3: Chart;
  chart4: Chart;
  chart5: Chart;
  tomap = null;
  frommap = null;
  numbermap = null;
  allrows1:[[0,0,0],[0,0,0]];
  // initial center position for the map
  latitude: Number = 37.516447;
  longitude: Number = -120.144040;
  lat: Number = 37.516447;
  // lng: Number = 92.9376;
  long: Number = -120.144040;
  zoom: Number = 3;



  markers: Marker[] = [

  ];

  markers1: Marker1[] = [];
  markers2: Marker2[] = [];




  total_calls:number;
  total_successful_calls:number;
  total_dropped_calls:number;
  total_towers:number;
  total_calling_people:number;
  total_called_people:number;
  pn= null;






  ngOnInit() {

    let token = localStorage.getItem("token");
    if (token == null) {
      this.router.navigate(['login']);
    }
    else{
      this.totalcalls();
    this.totalsuccessfulcalls();
    this.totaldroppedcalls();
    this.totaltowers();
    this.totalcallingpeople();
    this.totalcalledpeople();
    this.getpiechart1();
    this.tablehome();
    this.getweekdayschart();
    // this.maphome();
    this.getdatagraphs2();
    this.getdatagraphs3();


    //this.linkChart();
    // this.title.setTitle('CDR Analysis Dashboard');
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
          element: "#headingtxt",
          intro: "Dashboard Name"
        },
        {
          element: "#kpi-row",
          intro: "From this 6 KPI's you can find how many numbers of total calls, successful calls, and dropped calls have occurred. you can also find the Total number of towers, total calling people, and total called people.",
          position: "relative"
        },
        // {
        //   element: "#visual-row",
        //   intro: "All the visuals",
        //   position: "relative"
        // },
        {
          element: "#visual1",
          intro: "This pie chart helps you to find out what are the percentage of incoming calls, outgoing calls, and other types of calls have has occurred within two specified dates.",
          position: "relative"
        },
        {
          element: "#visual2",
          intro: "It gives you information about the top 8 callers two specified dates.",
          position: "relative"
        },
        {
          element: "#visual3",
          intro: "This column chart helps you to give information about the number of calls has occurred weekday basis within two particular dates.",
          position: "relative"
        },
        // {
        //   element: "#visual-row-2",
        //   intro: "All the visuals",
        //   position: "relative"
        // },
        {
          element: "#visual-4",
          intro: "This chart helps you to find out the average number of calls on each month on a year by top 5 callers.",
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
      //$("#demo-dashboard-1-body").attr('style','zoom:0%');
  }

  linkChart(date1,date2){

    let classname=environment.classname;
    let dburl=environment.dburl;
    let dbport=environment.dbport;
    let dbusername=environment.dbusername;
    let dbpassword=environment.dbpassword;
    let tablename3='';
    let dbname2='';


    let AppServiceBackendApiObj1:AppServiceBackendApi;



    //console.log('D3.js version:', d3['version']);

    // d3.select("svg").remove();
    var svg1 = d3.select('#svg1');
    svg1.selectAll("*").remove();
    var svg = d3.select('#svg1');
    var width = +svg.attr('width');
    var height = +svg.attr('height');


    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));
    // //console.log("rrrrrrr",jsondata);
    this.AppServiceObj.WriteJson(jsondata, function(returnObj) {
      //console.log('*********************DATA RETURNED***************',JSON.stringify(returnObj.result));
     //  _this.linkChart();
      // d3.json<ResponseData>()
      //   .catch ((err) => { throw new Error('Bad data file!') })
      //   .then ((data) => {
          // //console.log("---",data);
          //console.log("resulst",returnObj.result);
          var ret_res = JSON.parse(returnObj.result);
          var nodes: Node[] = [];
          var links: Link[] = [];

          ret_res.nodes.forEach((d) => {
            nodes.push(<Node>d);
          });

          ret_res.links.forEach((d) => {
            links.push(<Link>d);
          });

          svg.append("svg:defs").selectAll('marker')
                        .data(['end'])
                        .enter()
                        .append("svg:marker")
                        .attr('id', function (d) {
                            return d;
                        })
                        .attr('viewBox', '0 -5 10 10')
                        .attr('refX', 15)
                        .attr('refY', -1.5)
                        .attr('markerWidth', 6)
                        .attr('markerHeight', 6)
                        .attr('orient', 'auto')
                        .append('svg:path')
                        .attr("d", "M0,-5L10,0L0,5");


          var link = svg.append('g')
            .attr('class', 'links')
            .selectAll('line')
            // .selectAll('path')
            .data(ret_res.links)
            .enter()
            .append('line')
            .attr('stroke-width', (d: any) => Math.sqrt(d.value))
            // .append("svg:path")
            // .classed("link", true)
            .attr("marker-end", "url(#end)");

          var node = svg.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            // .selectAll('.node')
            .data(ret_res.nodes)
            .enter()
            .append('circle')
            .attr('r', 5)
            .attr('fill', (d: any) => color(d.group))

            // .on("click", function (d) {getData(d); });
            // .attr('onclick',"getdata();")
            // .on("click",fooFunction("barParameter"));
            .on("click", function (d)


            {


              var phone_number=d.id;
              this.pn = phone_number;
              //console.log("@@@###",this.pn);

              // this.getNodeTableData(phone_number,date1,date2);

              let MysqlReportJson1 = '{"classname":"'+classname+'","dburl":"'+dburl+'","dbport":"'+dbport+'","dbusername":"'+dbusername+'","dbpassword":"'+dbpassword+'","dbname":"'+dbname2+'","tablename":"'+tablename3+'","query":"select calling_number, calling_number_name,called_number,called_number_name,date,time,duration,tower,calltype,imei from cdr_new_mockupdata where calling_number=\''+phone_number+'\' and date between \''+date1+'\' and \''+date2+'\';"}';
              //console.log('REQUEST JSON',MysqlReportJson1);

              //let MysqlReportJson1 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"trainee","dbpassword":"prabhu@1996","dbname":"trainee","tablename":"callhihi","query":"(SELECT date,day,time FROM callhihi WHERE user = '+target+'  and other = '+other+'  and date between \''+c+'\' and \''+d+'\' ORDER BY sno ASC LIMIT 1) UNION ALL (SELECT date,day,time FROM callhihi WHERE user = '+target+'  and other = '+other+'  and date between \''+c+'\' and \''+d+'\' ORDER BY sno DESC LIMIT 1);"}'

                // MysqlReportJson1 = JSON.parse(MysqlReportJson1);



                //console.log('REQUEST JSON',MysqlReportJson1);






                  let datareturn=[];

                //   $.ajax({
                //     url: 'http://localhost:8080/api/reporting/getdynamictabledata',
                //     type: 'POST',
                //     dataType: 'json',
                //     contentType: "application/json; charset=utf-8",

                //     data: MysqlReportJson1,
                //     success: function (data, textStatus, xhr) {
                //       //console.log("======DATA FROM NODE========");

                //         //console.log(data);

                //         var allrows = data.allcol;
                //         var datareturn=[];



                //         (allrows).forEach((valueobj, index) => {

                //           var calling_number = valueobj[0];
                //           var calling_number_name = valueobj[1];
                //           var called_number = valueobj[2];
                //           var called_number_name = valueobj[3];
                //           var date = valueobj[4];
                //           var time = valueobj[5];
                //           var duration = valueobj[6];
                //           var tower = valueobj[7];
                //           var call_type = valueobj[8];
                //           var imei = valueobj[9];
                //           datareturn.push([calling_number,calling_number_name,called_number,called_number_name,date,time,duration,tower,call_type,imei]);
                //         })

                //       //console.log(datareturn);

                //       $("#ablinkchart").css('display','');
                //       $("#sampledeliverylinkchart").dataTable().fnDestroy();



                //     $(document).ready(function()
                //     {
                //         table = $('#sampledeliverylinkchart').DataTable( {
                //             // "pagingType": "full_numbers",
                //             "lengthChange": true,
                //             "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
                //         lengthMenu: [
                //           [ 5,10,15, -1 ],
                //           [ '5','10','15','Show all' ]
                //         ]
                //         // order: [[1, 'asc']]
                //         // buttons: [
                //         //   'print'
                //         // ]

                //         } );



                //     } );

                //         // table = $('#sampledelivery').DataTable( {
                //         //   "lengthChange": true,
                //         //   "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
                //         //   "lengthMenu": [ [5,10, 25, 50, -1], [5,10, 25, 50, "All"] ],
                //         //   buttons: [
                //         //     'print'
                //         //   ]

                //         //   } );



                //       // });




                //       var selectedlength = datareturn.length;
                //       $('#sampledeliverybodylinkchart').html('');
                //       var body = '';
                //       $.each(datareturn, function (index, valueobj) {
                //         body = body + '<tr align="center" >  ';
                //         for (var i = 0; i < 10; i++) {
                //             body = body + ' <td align="center"> ' + valueobj[i] + ' </td> ';

                //       }
                //         body = body + '</tr>';
                //       });

                //       //console.log(body);
                //       $('#sampledeliverybodylinkchart').append(body);
                //       $("#sampledeliverylinkchart").show();
                //       $("#emaillinkchart").show();



                //     },
                //     error: function (xhr, textStatus, errorThrown) {
                //         //console.log('Error in Operation');
                //     }
                // });


                          // The api calling
            //                 AppServiceBackendApiObj1.GetDynamicTableData(MysqlReportJson1, function (returnObj) {
            //                   if (returnObj.final_status) {


            //                     //console.log(returnObj);
            //                     var allrows = returnObj.allcol;
            //                     //console.log(allrows);

            //                     // (allrows).forEach((valueobj, index) => {

            //                     //   var day = (valueobj[0]);
            //                     //   var date = (valueobj[1]);
            //                     //   var time = (valueobj[2]);
            //                     //   datareturn.push([date,day,time]);
            //                     // })
            //                   }


            // });
          });














            //   //console.log(d.id);

            // });
            // .on("dblclick", dblclick);
            // .call(force.drag);


          svg.selectAll('circle').call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)

          );

          node.append('title')
            .text((d) => d.id);

          simulation
            .nodes(ret_res.nodes)
            .on('tick', ticked);

          simulation.force<d3.ForceLink<any, any>>('link')
            .links(ret_res.links);

          function ticked() {
            link
              .attr('x1', function(d: any) { return d.source.x; })
              .attr('y1', function(d: any) { return d.source.y; })
              .attr('x2', function(d: any) { return d.target.x; })
              .attr('y2', function(d: any) { return d.target.y; });

            node
              .attr('cx', function(d: any) { return d.x; })
              .attr('cy', function(d: any) { return d.y; });
          }


      function dragstarted(d) {
        if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) { simulation.alphaTarget(0); }
        d.fx = null;
        d.fy = null;
      }

    function click() {
      d3.select(this).select("text").transition()
              .duration(750)
              .attr("x", 22)
              .style("fill", "steelblue")
              .style("stroke", "lightsteelblue")
              .style("stroke-width", ".5px")
              .style("font", "20px sans-serif");

      d3.select(this).select("circle").transition()
              .duration(750)
              .attr("r", 16);
    }

    function dblclick() {
      d3.select(this).select("text").transition()
              .duration(750)
              .attr("x", 12)
              .style("fill", "black")
              .style("stroke", "none")
              .style("stroke-width", "none")
              .style("font", "10px sans-serif");

      d3.select(this).select("circle").transition()
              .duration(750)
              .attr("r", 6);
    }

    function getData(d){
      alert(d.id);
      //console.log(d.id);

      var phone_number=d.id;

       this.demo(d,date1,date2);








    //   //console.log('-----------INSIDE getNodeTableData-----------');

    //   //console.log(phone_number,date1,date2);

    //   let MysqlReportJson1 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"select calling_number, calling_number_name,called_number,called_number_name,date,time,duration,tower,calltype,imei from cdr_new_mockupdata where calling_number='+phone_number+' and date between \''+date1+'\' and \''+date2+'\';"}';

    //     //let MysqlReportJson1 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"trainee","dbpassword":"prabhu@1996","dbname":"trainee","tablename":"callhihi","query":"(SELECT date,day,time FROM callhihi WHERE user = '+target+'  and other = '+other+'  and date between \''+c+'\' and \''+d+'\' ORDER BY sno ASC LIMIT 1) UNION ALL (SELECT date,day,time FROM callhihi WHERE user = '+target+'  and other = '+other+'  and date between \''+c+'\' and \''+d+'\' ORDER BY sno DESC LIMIT 1);"}'

    //       MysqlReportJson1 = JSON.parse(MysqlReportJson1);
    //       let datareturn=[];


    //               //The api calling
    //                 this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson1, function (returnObj) {
    //                   if (returnObj.final_status) {
    //                     //console.log("======DATA FROM NODE========");


    //                     //console.log(returnObj);
    //                     var allrows = returnObj.allcol;
    //                     //console.log(allrows);

    //                     // (allrows).forEach((valueobj, index) => {

    //                     //   var day = (valueobj[0]);
    //                     //   var date = (valueobj[1]);
    //                     //   var time = (valueobj[2]);
    //                     //   datareturn.push([date,day,time]);
    //                     // })
    //                   }


    // });

















    }



    })
    $("#svg1").css('display','');
    $("#linkh3").css('display','');

  }

  demo(d,date1,date2)
  {
    alert('ALERT IN DEMO'+d);


    var phone_number=d.id;









    //console.log('-----------INSIDE getNodeTableData-----------');

    //console.log(phone_number,date1,date2);

    let MysqlReportJson1 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"select calling_number, calling_number_name,called_number,called_number_name,date,time,duration,tower,calltype,imei from cdr_new_mockupdata where calling_number='+phone_number+' and date between \''+date1+'\' and \''+date2+'\';"}';

      //let MysqlReportJson1 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"trainee","dbpassword":"prabhu@1996","dbname":"trainee","tablename":"callhihi","query":"(SELECT date,day,time FROM callhihi WHERE user = '+target+'  and other = '+other+'  and date between \''+c+'\' and \''+d+'\' ORDER BY sno ASC LIMIT 1) UNION ALL (SELECT date,day,time FROM callhihi WHERE user = '+target+'  and other = '+other+'  and date between \''+c+'\' and \''+d+'\' ORDER BY sno DESC LIMIT 1);"}'

        MysqlReportJson1 = JSON.parse(MysqlReportJson1);
        let datareturn=[];


                //The api calling
                  this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson1, function (returnObj) {
                    if (returnObj.final_status) {
                      //console.log("======DATA FROM NODE========");


                      //console.log(returnObj);
                      var allrows = returnObj.allcol;
                      //console.log(allrows);

                      // (allrows).forEach((valueobj, index) => {

                      //   var day = (valueobj[0]);
                      //   var date = (valueobj[1]);
                      //   var time = (valueobj[2]);
                      //   datareturn.push([date,day,time]);
                      // })
                    }


  });















  }


  getNodeTableData(phone_number,date1,date2)
  {
    //console.log('-----------INSIDE getNodeTableData-----------');

    //console.log(phone_number,date1,date2);

    let MysqlReportJson1 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"select calling_number, calling_number_name,called_number,called_number_name,date,time,duration,tower,calltype,imei from cdr_new_mockupdata where calling_number='+phone_number+' and date between \''+date1+'\' and \''+date2+'\';"}';

      //let MysqlReportJson1 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"trainee","dbpassword":"prabhu@1996","dbname":"trainee","tablename":"callhihi","query":"(SELECT date,day,time FROM callhihi WHERE user = '+target+'  and other = '+other+'  and date between \''+c+'\' and \''+d+'\' ORDER BY sno ASC LIMIT 1) UNION ALL (SELECT date,day,time FROM callhihi WHERE user = '+target+'  and other = '+other+'  and date between \''+c+'\' and \''+d+'\' ORDER BY sno DESC LIMIT 1);"}'

        MysqlReportJson1 = JSON.parse(MysqlReportJson1);
        let datareturn=[];


                //The api calling
                  this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson1, function (returnObj) {
                    if (returnObj.final_status) {
                      //console.log("======DATA FROM NODE========");


                      //console.log(returnObj);
                      var allrows = returnObj.allcol;
                      //console.log(allrows);

                      (allrows).forEach((valueobj, index) => {

                        var day = (valueobj[0]);
                        var date = (valueobj[1]);
                        var time = (valueobj[2]);
                        datareturn.push([date,day,time]);
                      })
                    }


  });
}






  isAvailable(){
    var c = (this.from).toString();
    var d = (this.to).toString();
    var a = parseInt(this.number);
    //console.log("@#@#@#");
    //console.log(typeof(c));
    //console.log(d);
    //console.log("@#@#@#");


    // let _this=this;
    // let MysqlReportJson = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"trainee","dbpassword":"prabhu@1996","dbname":"trainee","tablename":"callhihi","query":"SELECT COUNT(*) FROM callhihi WHERE user='+a+' AND date BETWEEN \''+c+'\' AND \''+d+'\';"}';

    let MysqlReportJson = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"SELECT COUNT(*) FROM cdr_new_mockupdata WHERE calling_number='+a+' AND date BETWEEN \''+c+'\' AND \''+d+'\';"}';


    MysqlReportJson = JSON.parse(MysqlReportJson);
        let _this=this;
          // var path = "/home/trainee/Documents/cd_06-12-18/Cloudhiti_29-11-18/cd_fe_23-11-18/cloudhiti/cdPendrive/backend/Queries/checkCallDetails.sql";
          // var params=new Array();

          // params.push(a);
          // params.push(c);
          // params.push(d);
          // var MysqlReportJson={
          //   "sqlPath" : path ,
          //   "classname" : this.classname ,
          //   "dburl" : this.dburl,
          //   "dbport" : this.dbport,
          //   "dbusername" : this.dbusername,
          //   "dbpassword" : this.dbpassword,
          //   "dbname" : this.dbname2,
          //   "parameters":params
          // };

        let datareturn=[];
                //The api calling
                this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
                  if (returnObj.final_status) {
                    var allrows = returnObj.allcol;
                    var a = parseInt(allrows[0]);
                    if(a==0)
                    {
                      alert("data is not available for the selected period");
                      $("#ab").css('display','none');
                      $("#sampledelivery").css('display','none');
                      $("#chart4").css('display','none');
                      $("#chart5").css('display','none');
                      $("#ab2").css('display','none');
                      $("#sampledelivery2").css('display','none');
                      $("#sampledelivery_wrapper").css('display','none');
                      $('#sdh3').css('display','none');
                      $('#sd2h3').css('display','none');

                    }
      }
    })

  }

  isPeriod(c,d){
    //console.log("Inside isPeriod");


    //console.log(c,d);
    if(c==null || d==null){
      alert("Please select the period");
      $("#ab").css('display','none');
      $("#sampledelivery").css('display','none');
      $("#chart4").css('display','none');
      $("#chart5").css('display','none');
      $("#ab2").css('display','none');
      $("#sampledelivery2").css('display','none');
      $("#sampledelivery_wrapper").css('display','none');
      $("#fclc").css('display','none');
      $('#sdh3').css('display','none');
      $('#sd2h3').css('display','none');
    }
  }

  top5CallersNoOfCalls(){
    let _this = this;
    let x = (this.from);
    let y = (this.to);

    this.isPeriod(x,y);
    // this.isPeriod();
    this.isAvailable();
    if(this.number==null || this.number==0){
      alert("Please give the input Number");
      $("#ab").css('display','none');
      $("#sampledelivery").css('display','none');
      $("#chart4").css('display','none');
      $("#ab2").css('display','none');
      $("#sampledelivery2").css('display','none');
      $("#sampledelivery_wrapper").css('display','none');
    }
    else{

      var a = parseInt(this.number);
      var c = (this.from).toString();
      var d = (this.to).toString();

        // let MysqlReportJson1 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"trainee","dbpassword":"prabhu@1996","dbname":"trainee","tablename":"callhihi","query":"SELECT * FROM callhihi where user= '+a+' and date between \''+c+'\' and \''+d+'\' ORDER BY duration desc limit 5;"}'
        let MysqlReportJson1 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"select calling_number,calling_number_name,called_number,called_number_name,count(sno) from cdr_new_mockupdata where calling_number='+a+' and date between \''+c+'\' and \''+d+'\' group by 3 order by 1 desc limit 5;"}';

        MysqlReportJson1 = JSON.parse(MysqlReportJson1);

        let datareturn=[];

                //The api calling
                this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson1, function (returnObj) {
                  if (returnObj.final_status) {
                    //console.log("==============");

                    //console.log(returnObj);
                    var allrows = returnObj.allcol;
                    //The local array for store data

                    (allrows).forEach((valueobj, index) => {

                      var calling_number = valueobj[0];
                      var calling_number_name = valueobj[1];
                      var called_number = valueobj[2];
                      var called_number_name = valueobj[3];
                      var noOfCalls = valueobj[4];
                      datareturn.push([calling_number,calling_number_name,called_number,called_number_name,noOfCalls]);
                    })
                  }
                  //console.log(datareturn);
                  // var settings = {
                  //   layout: {
                  //     pageSidebarClosed: false, // sidebar menu state
                  //     pageContentWhite: true, // set page content layout
                  //     pageBodySolid: false, // solid body color state
                  //     pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
                  //   },
                  //   assetsPath: './assets',
                  //   globalPath: './assets/global',
                  //   layoutPath: './assets/layouts/layout',
                  // };

                  $("#abcalls").css('display','');
                  // var table = $('#sampledelivery2').DataTable({


                  //   "searching": false,
                  //   "paging": false,
                  //   "info": false,
                  //   "lengthChange": false,
                  //   "destroy": true,
                  //   "responsive": true,
                  //   // "scrollY": 300
                  //   // // paging: false,
                  //   // "lengthMenu": 5

                  // });


                  // var oTable = table;


                  // // settings.layout.pageContentWhite = true;
                  // // settings.layout.pageBodySolid = false;
                  // // settings.layout.pageSidebarClosed = false;


                  // //var selectedlength=data.colnames.length;
                  // var selectedlength = datareturn.length;
                  // //console.log(selectedlength);
                  // if ($("#sampledelivery2").oTable) {
                  //   $("#sampledelivery2").oTable.fnDestroy();
                  // }
                  $('#sampledeliverybody2calls').html('');
                  var body = '';
                  //The append data in table as table row
                  $.each(datareturn, function (index, valueobj) {
                    body = body + '<tr align="center" " >  ';
                    //<td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td>
                    for (var i = 0; i < 5; i++) {
                        body = body + ' <td align="center"> ' + valueobj[i] + ' </td> ';

                  }
                    body = body + '</tr>';
                  });

                  //console.log(body);
                  $('#sampledeliverybody2calls').append(body);


                  // this.initTable3();

                  //  $('.sampledelivery2').show();
                  $('#sampledelivery').css('display','none');
                  $("#ab").css('display','none');
                  $("#chart4").css('display','none');
                  $("#chart5").css('display','none');
                  $("#sampledelivery_wrapper").css('display','none');
                  $('#sdh3').css('display','none');
                //   $('#sampledelivery').DataTable( {
                //     paging: false,
                //     searching: false
                // } );
                $('#sd2h3calls').css('display','');
                $('#sampledelivery2').hide();
                $('#sd2h3').css('display','none');
                $("#ab2").css('display','none');


                $('#sampledelivery2calls').show();
                $("#emailcalldetails").hide();
                $("#emailtop5calls").show();
                $("#emailtop5duration").hide();

                })
              }
  }

  showChartsinit(){
    let _this = this;
    // this.isPeriod();
    let x = (this.from);
    let y = (this.to);

    this.isPeriod(x,y);
    this.isAvailable();

    if(this.number==null || this.number==0){
      alert("Please give the input Number");
      $("#ab").css('display','none');
      $("#sampledelivery").css('display','none');
      $("#chart4").css('display','none');
      $("#chart5").css('display','none');
      $("#sampledelivery_wrapper").css('display','none');
    }
    else{

      var a = this.number;
      var c = (this.from).toString();
      var d = (this.to).toString();
      // var path = "/home/trainee/Documents/cd_06-12-18/Cloudhiti_29-11-18/cd_fe_23-11-18/cloudhiti/cdPendrive/backend/Queries/chartinit.sql";
        let MysqlReportJson1 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"select sum(case when calltype = \'IN\' and calling_number='+a+' and date between \''+c+'\' and \''+d+'\'  then 1 else 0 end) IncomingCount,sum(case when calltype = \'SMT\' and calling_number='+a+' and date between \''+c+'\' and \''+d+'\' then 1 else 0 end) MissedCount, sum(case when calltype = \'OUT\' and calling_number='+a+' and date between \''+c+'\' and \''+d+'\' then 1 else 0 end) outgoingCount from cloudhiti.cdr_new_mockupdata group by calltype;"}';

        //let MysqlReportJson1 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"trainee","dbpassword":"prabhu@1996","dbname":"trainee","tablename":"callhihi","query":"select sum(case when direction = \'Incoming\' and user='+a+' and date between \''+c+'\' and \''+d+'\'  then 1 else 0 end) IncomingCount,sum(case when direction = \'Missed\' and user='+a+' and date between \''+c+'\' and \''+d+'\' then 1 else 0 end) MissedCount, sum(case when direction = \'Outgoing\' and user='+a+' and date between \''+c+'\' and \''+d+'\' then 1 else 0 end) outgoingCount from trainee.callhihi group by direction;"}'

        MysqlReportJson1 = JSON.parse(MysqlReportJson1);
      // var params= [];
      // params.push(a);
      // params.push(c);
      // params.push(d);
      // params.push(a);
      // params.push(c);
      // params.push(d);
      // params.push(a);
      // params.push(c);
      // params.push(d);
      // var MysqlReportJson={
      //   "sqlPath" : path ,
      //   "classname" : this.classname ,
      //   "dburl" : this.dburl,
      //   "dbport" : this.dbport,
      //   "dbusername" : this.dbusername,
      //   "dbpassword" : this.dbpassword,
      //   "dbname" : this.dbname2,
      //   "parameters":params
      // };


                //The api calling
                  this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson1, function (returnObj) {
                    if (returnObj.final_status) {
                      //console.log("==============");


                      //console.log(returnObj);
                      var allrows = returnObj.allcol;
                      inComing = parseInt(allrows[1][0]);
                      missed=parseInt(allrows[2][1]);
                      outGoing=parseInt(allrows[3][2])

                      //console.log(inComing,outGoing,missed);
                      _this.showChartsfinal(inComing,outGoing,missed);


            }

          })
        }
  }








    formatDate (input) {
      var datePart = input.match(/\d+/g),
      year = datePart[0], // get only two digits
      month = datePart[1], day = datePart[2];

      return day+'/'+month+'/'+year;
    }

  checkFCLC(){
    let _this = this;
    var target = parseInt(this.target);
    var other = parseInt(this.other);
    let x = (this.from2);
    let y = (this.to2);

    this.isPeriod(x,y);

    if(this.target==null || this.target==0 || this.other==null || this.other==0){
      alert("Please give the input Number");
      $("#fclc").css('display','none');
      $("#ab3").css('display','none');
          $("#h3").css('display','none');
    }
    else{

      var c = (this.from2).toString();
      var d = (this.to2).toString();
      let MysqlReportJson1 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"(SELECT date,day_of_week,time FROM cdr_new_mockupdata WHERE calling_number = '+target+'  and called_number = '+other+'  and date between \''+c+'\' and \''+d+'\' ORDER BY sno ASC LIMIT 1) UNION ALL (SELECT date,day_of_week,time FROM cdr_new_mockupdata WHERE calling_number = '+target+'  and called_number = '+other+'  and date between \''+c+'\' and \''+d+'\' ORDER BY sno DESC LIMIT 1);"}';

      //let MysqlReportJson1 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"trainee","dbpassword":"prabhu@1996","dbname":"trainee","tablename":"callhihi","query":"(SELECT date,day,time FROM callhihi WHERE user = '+target+'  and other = '+other+'  and date between \''+c+'\' and \''+d+'\' ORDER BY sno ASC LIMIT 1) UNION ALL (SELECT date,day,time FROM callhihi WHERE user = '+target+'  and other = '+other+'  and date between \''+c+'\' and \''+d+'\' ORDER BY sno DESC LIMIT 1);"}'

        MysqlReportJson1 = JSON.parse(MysqlReportJson1);
        let datareturn=[];


                //The api calling
                  this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson1, function (returnObj) {
                    if (returnObj.final_status) {
                      //console.log("==============");

                      //console.log("Om baba ***********");
                      //console.log(returnObj);
                      var allrows = returnObj.allcol;
                      (allrows).forEach((valueobj, index) => {

                        var day = (valueobj[0]);
                        var date = (valueobj[1]);
                        var time = (valueobj[2]);
                        datareturn.push([date,day,time]);
                      })
                    }
                      //console.log(datareturn);
                      var selectedlength = datareturn.length;
                      $('#fclcbody').html('');
                      var body = '';
                      $.each(datareturn, function (index, valueobj) {
                        body = body + '<tr align="center" >  ';
                        for (var i = 0; i < 4; i++) {

                          //console.log(index);

                          if(i==0 && index==0)
                          {
                            body = body + ' <td align="center"> ' +"First Call"+ ' </td> ';

                          }
                          else if(i==0 && index==1)
                          {
                            body = body + ' <td align="center"> ' +"Last Call"+ ' </td> ';

                          }
                          else
                          {
                            body = body + ' <td align="center"> ' + valueobj[i-1] + ' </td> ';
                          }
                      }
                        body = body + '</tr>';
                      });

                      //console.log(body);
                      $('#fclcbody').append(body);
                      $('#fclc').show();


          })

          $("#ab3").css('display','');
          $("#h3").css('display','');
          $("#emailfclc").show();
        }

  }

  checkCallDetails(){


    // let _this = this;
    let x = (this.from);
    let y = (this.to);

    this.isPeriod(x,y);





    var c = (this.from).toString();
    var d = (this.to).toString();


    var a = parseInt(this.number);
    // //console.log(a);
    this.isAvailable();

    // //console.log("======"+this.isAvailable());
    // //console.log(this.available);
    // //console.log("$$$$$$");
    // //console.log(b);
    if(this.number==null || this.number==0){
      alert("Please give the input Number");
      $("#ab").css('display','none');
      $("#sampledelivery").css('display','none');
      $("#sampledelivery_wrapper").css('display','none');
      $('#sdh3').css('display','none');
    }
    else{
      let _this=this;
      // var path = "/home/trainee/Documents/cd_06-12-18/Cloudhiti_29-11-18/cd_fe_23-11-18/cloudhiti/cdPendrive/backend/Queries/checkCallDetails.sql";
      // var params=new Array();

      // params.push(a);
      // params.push(c);
      // params.push(d);

      // var MysqlReportJson={
      //   "sqlPath" : path ,
      //   "classname" : this.classname ,
      //   "dburl" : this.dburl,
      //   "dbport" : this.dbport,
      //   "dbusername" : this.dbusername,
      //   "dbpassword" : this.dbpassword,
      //   "dbname" : this.dbname2,
      //   "parameters":params
      // };

      let MysqlReportJson = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"SELECT * FROM cdr_new_mockupdata where calling_number= '+a+' and date between \''+c+'\' and \''+d+'\';"}';

      MysqlReportJson = JSON.parse(MysqlReportJson);

      let datareturn=[];

              // let datareturn=[];
            //The api calling
            this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
              if (returnObj.final_status) {
                //console.log("==============");

                //console.log(returnObj);
                var allrows = returnObj.allcol;
                //The local array for store data

                (allrows).forEach((valueobj, index) => {

                  var calling_number = valueobj[0];
                  var calling_number_name = valueobj[1];
                  var called_number = valueobj[2];
                  var called_number_name = valueobj[3];
                  var date = valueobj[4];
                  var time = valueobj[5];
                  var duration = valueobj[6];
                  var tower = valueobj[7];
                  var call_type = valueobj[8];
                  var imei = valueobj[9];
                  datareturn.push([calling_number,calling_number_name,called_number,called_number_name,date,time,duration,tower,call_type,imei]);
                })
              }
              //console.log(datareturn);

              $("#ab").css('display','');
              $("#sampledelivery").dataTable().fnDestroy();



            $(document).ready(function()
            {
                table = $('#sampledelivery').DataTable( {
                    // "pagingType": "full_numbers",
                    "lengthChange": true,
                    "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
                lengthMenu: [
                  [ 5,10,15, -1 ],
                  [ '5','10','15','Show all' ]
                ]
                // order: [[1, 'asc']]
                // buttons: [
                //   'print'
                // ]

                } );



            } );

                // table = $('#sampledelivery').DataTable( {
                //   "lengthChange": true,
                //   "sDom": '<"top"fl>rt<"bottom"ip><"clear">',
                //   "lengthMenu": [ [5,10, 25, 50, -1], [5,10, 25, 50, "All"] ],
                //   buttons: [
                //     'print'
                //   ]

                //   } );



              // });




              var selectedlength = datareturn.length;
              $('#sampledeliverybody').html('');
              var body = '';
              $.each(datareturn, function (index, valueobj) {
                body = body + '<tr align="center" >  ';
                for (var i = 0; i < 10; i++) {
                    body = body + ' <td align="center"> ' + valueobj[i] + ' </td> ';

              }
                body = body + '</tr>';
              });

              //console.log(body);
              $('#sampledeliverybody').append(body);


              // this.initTable3();

              // $('.sampledelivery').show();
              $('#sampledelivery2').css('display','none');
              $('#sampledelivery2calls').css('display','none');
              $('#sd2h3calls').css('display','none');
              $('#abcalls').css('display','none');
              $("#ab2").css('display','none');
              $("#chart4").css('display','none');
              $("#chart5").css('display','none');
              $('#sdh3').css('display','');
              $('#sd2h3').css('display','none');


              $('#sampledelivery').show();
              $("#emailcalldetails").show();
              $("#emailtop5calls").hide();
              $("#emailtop5duration").hide();


            })


          }




  }


  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}


linkchart(){


  let _this=this;
  var c = (this.from3).toString();
  var d = (this.to3).toString();
  let MysqlReportJson = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"SELECT calling_number,called_number FROM cdr_new_mockupdata where date between \''+c+'\' and \''+d+'\';"}';

  // let MysqlReportJson = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"trainee","dbpassword":"prabhu@1996","dbname":"trainee","tablename":"callhihi","query":"SELECT user,other FROM callhihi LIMIT 20;"}';

  MysqlReportJson = JSON.parse(MysqlReportJson);

  var datareturn=[];
  var nodearray=[];
  var linkarray=[];
  var ds=[];
  var dt=[];
  var finalarray=[];
          //The api calling
          this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
            if (returnObj.final_status) {


              // //console.log(returnObj[0][0]);





              var allrows = returnObj.allcol;

              for(var i=0;i<allrows.length;i++){
                ds.push(allrows[i][0]);
                dt.push(allrows[i][1]);
              }
              //console.log("ds",ds);
              //console.log("dt",dt);


              finalarray = (ds.concat(dt)).filter(_this.Unique);
              //console.log("finalarray",finalarray);

              for (var i=0; i<allrows.length; i++) {
                var listI = allrows[i];
                loopJ: for (var j=0; j<allrows.length; j++) {
                    var listJ = allrows[j];
                    if (listI === listJ) continue; //Ignore itself
                    for (var k=listJ.length; k>=0; k--) {
                        if (listJ[k] !== listI[k]) continue loopJ;
                    }
                    // At this point, their values are equal.
                    allrows.splice(j, 1);
                }
            }



            for(var i=0;i<finalarray.length;i++){
               nodearray.push({"id":finalarray[i]})
            }


            //console.log("nodearray",nodearray);

              for(i=0;i<allrows.length;i++){
                linkarray.push({"source":allrows[i][0],"target":allrows[i][1],"value":5})
            }
            //console.log("linkarray",linkarray);




              jsondata={

                "nodes":nodearray,
                "links":linkarray
              }
              //console.log(jsondata);

              // _this.AppServiceObj.WriteJson(jsondata, function(returnObj) {
              //  //console.log('*********************DATA RETURNED***************',returnObj);
              //  _this.linkChart();
              // })
              _this.linkChart(c,d);



            }

          })




}
Unique(value, index, self) {
  return self.indexOf(value) === index;
}
  arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

  distSource(){
    let _this=this;
    var source = [];

    // let MysqlReportJson = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"trainee","dbpassword":"prabhu@1996","dbname":"trainee","tablename":"callhihi","query":"SELECT user FROM callhihi LIMIT 20;"}';
    let MysqlReportJson = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"SELECT user FROM cdrdata LIMIT 20;"}';

    MysqlReportJson = JSON.parse(MysqlReportJson);

            //The api calling
            this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
              if (returnObj.final_status) {
                //console.log("==============");

                // //console.log(returnObj[0][0]);



                var allrows = returnObj.allcol;
                //console.log("inside distsource all rows",allrows[1][0])
                source = _this.arrayUnique(allrows);
                //console.log("inside distsource source",source)

                // //console.log('SOURCE ALLROWS INSIDE DISTSOURCE FUNCTION',allrows);
                var i;
                for (i = 0; i <source.length; i++) {
                    distsource.push(source[i][0]);
                }

                //console.log('INSIDE DISTSOURCE ARRAY **  DISTSOURCE FUNCTION',distsource);

                // (allrows).forEach((valueobj, index) => {

                //   var source = (valueobj[0]);
                //   var target = (valueobj[1]);
                //   distsource.push([source,target]);
                // })
              }
  })
}
distTarget(){
  let _this=this;

  // let MysqlReportJson = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"trainee","dbpassword":"prabhu@1996","dbname":"trainee","tablename":"callhihi","query":"SELECT other FROM callhihi LIMIT 20"}';
  let MysqlReportJson = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"SELECT other FROM cdrdata LIMIT 20;"}';

  MysqlReportJson = JSON.parse(MysqlReportJson);

          //The api calling
          this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
            if (returnObj.final_status) {
              //console.log("==============");

              // //console.log(returnObj[0][0]);



              var allrows = returnObj.allcol;
              allrows= _this.arrayUnique(allrows);

              var i;
              for (i = 0; i <allrows.length; i++) {
                  disttarget.push(allrows[i][0]);
              }

              //console.log('INSIDE DISTTARGET ARRAY **  DISTTARGET FUNCTION',disttarget);


              // (allrows).forEach((valueobj, index) => {

              //   var source = (valueobj[0]);
              //   var target = (valueobj[1]);
              //   distsource.push([source,target]);
              // })
            }
})
}
  top5CallersDuration(){
    let _this = this;
    let x = (this.from);
    let y = (this.to);

    this.isPeriod(x,y);
    // this.isPeriod();
    this.isAvailable();
    if(this.number==null || this.number==0){
      alert("Please give the input Number");
      $("#ab").css('display','none');
      $("#sampledelivery").css('display','none');
      $("#chart4").css('display','none');
      $("#ab2").css('display','none');
      $("#sampledelivery2").css('display','none');
      $("#sampledelivery_wrapper").css('display','none');
    }
    else{

      var a = parseInt(this.number);
      var c = (this.from).toString();
      var d = (this.to).toString();

        // let MysqlReportJson1 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"trainee","dbpassword":"prabhu@1996","dbname":"trainee","tablename":"callhihi","query":"SELECT * FROM callhihi where user= '+a+' and date between \''+c+'\' and \''+d+'\' ORDER BY duration desc limit 5;"}'
        let MysqlReportJson1 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"SELECT * FROM cdr_new_mockupdata where calling_number= '+a+' and date between \''+c+'\' and \''+d+'\' ORDER BY duration desc limit 5;"}';

        MysqlReportJson1 = JSON.parse(MysqlReportJson1);

        let datareturn=[];

                //The api calling
                this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson1, function (returnObj) {
                  if (returnObj.final_status) {
                    //console.log("==============");

                    //console.log(returnObj);
                    var allrows = returnObj.allcol;
                    //The local array for store data

                    (allrows).forEach((valueobj, index) => {

                      var calling_number = valueobj[0];
                      var calling_number_name = valueobj[1];
                      var called_number = valueobj[2];
                      var called_number_name = valueobj[3];
                      var date = valueobj[4];
                      var time = valueobj[5];
                      var duration = valueobj[6];
                      var tower = valueobj[7];
                      var call_type = valueobj[8];
                      var imei = valueobj[9];
                      datareturn.push([calling_number,calling_number_name,called_number,called_number_name,date,time,duration,tower,call_type,imei]);
                    })
                  }
                  //console.log(datareturn);
                  // var settings = {
                  //   layout: {
                  //     pageSidebarClosed: false, // sidebar menu state
                  //     pageContentWhite: true, // set page content layout
                  //     pageBodySolid: false, // solid body color state
                  //     pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
                  //   },
                  //   assetsPath: './assets',
                  //   globalPath: './assets/global',
                  //   layoutPath: './assets/layouts/layout',
                  // };

                  $("#ab2").css('display','');
                  // var table = $('#sampledelivery2').DataTable({


                  //   "searching": false,
                  //   "paging": false,
                  //   "info": false,
                  //   "lengthChange": false,
                  //   "destroy": true,
                  //   "responsive": true,
                  //   // "scrollY": 300
                  //   // // paging: false,
                  //   // "lengthMenu": 5

                  // });


                  // var oTable = table;


                  // // settings.layout.pageContentWhite = true;
                  // // settings.layout.pageBodySolid = false;
                  // // settings.layout.pageSidebarClosed = false;


                  // //var selectedlength=data.colnames.length;
                  // var selectedlength = datareturn.length;
                  // //console.log(selectedlength);
                  // if ($("#sampledelivery2").oTable) {
                  //   $("#sampledelivery2").oTable.fnDestroy();
                  // }
                  $('#sampledeliverybody2').html('');
                  var body = '';
                  //The append data in table as table row
                  $.each(datareturn, function (index, valueobj) {
                    body = body + '<tr align="center" " >  ';
                    //<td><label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"> <span></span>  </label> </td>
                    for (var i = 0; i < 10; i++) {
                        body = body + ' <td align="center"> ' + valueobj[i] + ' </td> ';

                  }
                    body = body + '</tr>';
                  });

                  //console.log(body);
                  $('#sampledeliverybody2').append(body);


                  // this.initTable3();

                  //  $('.sampledelivery2').show();
                  $('#sampledelivery').css('display','none');
                  $("#ab").css('display','none');
                  $("#chart4").css('display','none');
                  $("#chart5").css('display','none');
                  $("#sampledelivery_wrapper").css('display','none');
                  $('#sdh3').css('display','none');
                //   $('#sampledelivery').DataTable( {
                //     paging: false,
                //     searching: false
                // } );
                $('#sd2h3').css('display','');

                  $('#sampledelivery2').show();
                  $('#sampledelivery2calls').css('display','none');
                  $('#sd2h3calls').css('display','none');
                  $('#abcalls').css('display','none');
                  $("#emailcalldetails").hide();
                  $("#emailtop5calls").hide();
                  $("#emailtop5duration").show();

                })
              }
  }

  // printDiv():void{
  //   var w=window.open();
  //   w.document.write(document.getElementById('printArea2').innerHTML);
  //   w.document.close();
  //   w.focus();
  //   w.print();
  //   w.close();
  // }

  printDiv(): void {
    let printContents,printContents2,printContents4, popupWin;
    // @page { size: auto;  margin: 0mm; }
    $("#sampledelivery_info").css('display','none');
    $("#sampledelivery_filter").css('display','none');
    $("#sampledelivery_paginate").css('display','none');
    $("#sampledelivery_length").css('display','none');
    $("#im1").css({"display": "block", "margin-left": "auto","margin-right": "auto"});

    printContents = document.getElementById('printArea').innerHTML;
    printContents2 = document.getElementById('printArea2').innerHTML;
    printContents4 = document.getElementById('printAreacalls').innerHTML;

    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>

            #sampledelivery th, #sampledelivery td{ border: 0.5px solid black;}
            #sampledelivery2 th, #sampledelivery2 td{ border: 0.5px solid black}
            #sampledelivery2calls th, #sampledelivery2calls td{ border: 0.5px solid black}
          </style>
        </head>
        <body onload="window.print();window.close()">
          <img src="assets/img/brand/LIGHT-BACKGROUND-LOGO.png" style="width: 200px;height: 50px;display:block;margin-left:auto;margin-right:auto">
          ${printContents2}${printContents}
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
  }
//   printDiv2():void{
//     let newWin;
//     var divToPrint = document.getElementById('printArea3');
//     var htmlToPrint = '' +
//         '<style type="text/css">' +
//         '@page {' + 'size: auto;' +
//         'margin: 0mm;' + '}' +
//         '#fclc th, #fclc td {' +
//         'border:1px solid #000;'+ 'margin: 0mm;' +
//         '}' +
//         '</style>';
//     htmlToPrint += divToPrint.outerHTML;
//     newWin = window.open("");
//     newWin.document.write(htmlToPrint);
//     newWin.print();
//     newWin.close();
// }
printDiv3(): void {
  $("#sampledeliverylinkchart_info").css('display','none');
  $("#sampledeliverylinkchart_filter").css('display','none');
  $("#sampledeliverylinkchart_paginate").css('display','none');
  $("#sampledeliverylinkchart_length").css('display','none');
  $("#im1").css({"display": "block", "margin-left": "auto","margin-right": "auto"});
  let printContents3, popupWin;


  printContents3 = document.getElementById('printArealinkchart').innerHTML;
  // printContents3 = document.getElementById('printArea3').innerHTML;
  popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  popupWin.document.open();
  popupWin.document.write(`
    <html>
      <head>
        <style>
          @page { size: auto;  margin: 0mm; }
          #sampledeliverylinkchart th, #sampledeliverylinkchart td{ border: 1px solid black;}

        </style>
      </head>
      <body onload="window.print();window.close()">
        <img src="assets/img/brand/LIGHT-BACKGROUND-LOGO.png" style="width: 200px;height: 50px;display:block;margin-left:auto;margin-right:auto">
        ${printContents3}
      </body>
    </html>`
  );
  popupWin.document.close();
  $("#sampledeliverylinkchart_info").css('display','');
  $("#sampledeliverylinkchart_filter").css('display','');
  $("#sampledeliverylinkchart_paginate").css('display','');
  $("#sampledeliverylinkchart_info").css('display','');
  $("#sampledeliverylinkchart_length").css('display','');
  $("#im1").css('display','none');
}

printDiv2(): void {
  let printContents3, popupWin;


  printContents3 = document.getElementById('printArea3').innerHTML;
  // printContents3 = document.getElementById('printArea3').innerHTML;
  popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  popupWin.document.open();
  popupWin.document.write(`
    <html>
      <head>
        <style>
          @page { size: auto;  margin: 0mm; }
          #fclc th, #fclc td{ border: 1px solid black;}

        </style>
      </head>
      <body onload="window.print();window.close()">
        <img src="assets/img/brand/LIGHT-BACKGROUND-LOGO.png" style="width: 200px;height: 50px;display:block;margin-left:auto;margin-right:auto">
        ${printContents3}
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
}

// getdatagraphChart(){



//         let MysqlReportJson1 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"select sum(case when calltype = \'IN\' then 1 else 0 end) IncomingCount,sum(case when calltype = \'SMT\' then 1 else 0 end) MissedCount, sum(case when calltype = \'OUT\' then 1 else 0 end) outgoingCount from cloudhiti.cdr_new_mockupdata group by calltype;"}';


//         MysqlReportJson1 = JSON.parse(MysqlReportJson1);


//                   this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson1, function (returnObj) {
//                     if (returnObj.final_status) {
//                       //console.log("==============");


//                       //console.log(returnObj);
//                       var allrows = returnObj.allcol;
//                       inComing = parseInt(allrows[1][0]);
//                       missed=parseInt(allrows[3][1]);
//                       outGoing=parseInt(allrows[2][2])

//                       var total = inComing + missed + outGoing;
//                       var inper = (inComing/total)*100;
//                       var misper = (missed/total)*100;
//                       var outper = (outGoing/total)*100;
//                       //console.log("inside getdatachart@@&&&&&",inComing,outGoing,missed);
//                       this.getdatagraphs1(inper,misper,outper);

//             }
//             this.getdatagraphs1(inper,misper,outper);

//           })

// }



  getdatagraphs1(inper,misper,outper){
    let _this = this;

// Build the chart
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
                colors: [
                  '#8FB9C5',
                  '#60A3BC',
                  '#2899B5'
                ],
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: false
                  },
                  showInLegend: true
              }
          },
          series: [{
              name: 'Call Type',
              colorByPoint: true,
              data: [{
                  name: 'Incoming',
                  y: inper,
                  sliced: true,
                  selected: true
              }, {
                  name: 'Missed',
                  y: misper
              }, {
                  name: 'Outgoing',
                  y: outper
              }]
          }]
        };

          _this.chart1 = new Chart(chartObj);
        }
  getweekdayschart(){
    let MysqlReportJson = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"select count(sno),day_of_week from cdr_new_mockupdata group by 2;"}';

    MysqlReportJson = JSON.parse(MysqlReportJson);

    let _this = this;

      var allrows = [
        ['230'],['342'],['124'],['543'],['3233'],['1324'],['532']
      ];
      //console.log("weekdays@@@@@",allrows);
      let chartObj: any = {
        chart: {
            type: 'column',

            options3d: {
                enabled: true,
                alpha: 10,
                beta: 25,
                depth: 70
            }
        },
        credits:{
          enabled:false
        },
        getOptions:{
          weekdays: [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday'
        ]
        },
        title: {
            text: ''
        },
        subtitle: {
            text: 'In percentage(%)'
        },
        plotOptions: {
            column: {
                depth: 25
            }
        },
        xAxis: {
            categories: Highcharts.getOptions().lang.weekdays,
            labels: {
                skew3d: true,
                style: {
                    fontSize: '16px'
                }
            }
        },
        yAxis: {
            title: {
                text: null
            }
        },
        series: [{
            name: 'No. Of Calls',
            data: [parseInt(allrows[3][0]),parseInt(allrows[1][0]),parseInt(allrows[5][0]),parseInt(allrows[6][0]),parseInt(allrows[4][0]),parseInt(allrows[0][0]), parseInt(allrows[2][0])]
        }],
        colors: [
          '#e25f34'
        ]
      };
      _this.chart2 = new Chart(chartObj);
  }
  getdatagraphs2(){
      let _this=this;
      let chartObj: any = {
        chart: {
            type: 'column',

            options3d: {
                enabled: true,
                alpha: 10,
                beta: 25,
                depth: 70
            }
        },
        getOptions:{
          weekdays: [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday'
        ]
        },
        title: {
            text: ''
        },
        subtitle: {
            text: 'In percentage(%)'
        },
        plotOptions: {
            column: {
                depth: 25
            }
        },
        xAxis: {
            categories: Highcharts.getOptions().lang.weekdays,
            labels: {
                skew3d: true,
                style: {
                    fontSize: '16px'
                }
            }
        },
        yAxis: {
            title: {
                text: null
            }
        },
        series: [{
            name: 'Traffic',
            data: [90, 75, 74, 80, 72, 83, 93]
        }],
        colors: [
          '#8FB9C5'
        ]
      };
      // _this.chart2 = new Chart(chartObj);
     }


     getdatagraphs3(){
       let _this=this;

       let chartObj: any = {
        chart: {
            type: 'line'
        },
        credits:{
          enabled:false
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Average No. of Calls'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'ID_E1230',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'ID_E1231',
            data: [5.9, 5.2, 5.7, 8.5, 15.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        },
        {
          name: 'ID_E1232',
          data: [4.9, 4.2, 4.7, 7.5, 9.9, 14.2, 16.0, 15.6, 13.2, 9.3, 5.6, 3.8]
      },
      {
        name: 'ID_E1233',
        data: [3.9, 3.2, 3.7, 6.5, 8.9, 13.2, 15.0, 14.6, 12.2, 8.3, 4.6, 2.8]
    },
    {
      name: 'ID_E1234',
      data: [2.9, 2.2, 2.7, 5.5,7.9, 12.2, 14.0, 13.6, 11.2, 7.3, 3.6, 2.8]
  },

      ],
        colors: ['#F26851','#F08D7E','#FFC2B7','#f5835d','#e25f34'],

      };
      _this.chart3 = new Chart(chartObj);
          }

  showChartsfinal(a,b,c){
    let _this =this;
    let chartObj: any = {
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Direction of Call for Number ' + _this.number + ' from ' + _this.from +' to '+ _this.to
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          categories: ['InComing', 'OutGoing', 'Missed'],
          labels: {
            style: {
                fontSize:'15px'
            }
        },
          title: {
              text: null
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Number Of Calls',
              align: 'middle',
              style: {
                fontSize:'15px'
            }

          },
          labels: {
              overflow: 'justify',

          }
      },
      tooltip: {
          valueSuffix: ' '
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          // backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
          shadow: true
      },
      credits: {
          enabled: false
      },
      series: [{
          showInLegend: false,
          name: 'No. of Calls',
          data: [a, b, c]
      }
    ]
    };
    $("#chart4").css('display','');

    $("#ab").css('display','none');
    $('#sampledelivery2').css('display','none');
    $("#ab2").css('display','none');
    // $('#sampledelivery_wrapper').css('display','none');

    $('#sampledelivery').css('display','none');
    $("#sampledelivery_wrapper").css('display','none');
    $('#sdh3').css('display','none');
    $('#sd2h3').css('display','none');
    $('#sampledelivery2calls').css('display','none');
    $('#sd2h3calls').css('display','none');
    $('#abcalls').css('display','none');

    _this.chart4 = new Chart(chartObj);

  }
  showChartsinit2(){
    let _this = this;
    // this.isPeriod();
    let x = (this.from);
    let y = (this.to);

    this.isPeriod(x,y);
    this.isAvailable();

    if(this.number==null || this.number==0){
      alert("Please give the input Number");
      $("#ab").css('display','none');
      $("#sampledelivery").css('display','none');
      $("#chart4").css('display','none');
      $("#chart5").css('display','none');
      $("#sampledelivery_wrapper").css('display','none');
    }
    else{

      var a = parseInt(this.number);
      var c = (this.from).toString();
      var d = (this.to).toString();
        let MysqlReportJson1 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"select sum(case when day_of_week = \'Sunday\' and calling_number='+a+' and date between \''+c+'\' and \''+d+'\'  then 1 else 0 end) Sunday,sum(case when day_of_week = \'Monday\' and calling_number='+a+' and date between \''+c+'\' and \''+d+'\' then 1 else 0 end) Monday, sum(case when day_of_week = \'Tuesday\' and calling_number='+a+' and date between \''+c+'\' and \''+d+'\' then 1 else 0 end) Tuesday, sum(case when day_of_week = \'Wednesday\' and calling_number='+a+' and date between \''+c+'\' and \''+d+'\' then 1 else 0 end) Wednesday, sum(case when day_of_week = \'Thursday\' and calling_number='+a+' and date between \''+c+'\' and \''+d+'\' then 1 else 0 end) Thursday, sum(case when day_of_week = \'Friday\' and calling_number='+a+' and date between \''+c+'\' and \''+d+'\' then 1 else 0 end) Friday, sum(case when day_of_week = \'Saturday\' and calling_number='+a+' and date between \''+c+'\' and \''+d+'\' then 1 else 0 end) Saturday from cloudhiti.cdr_new_mockupdata group by day_of_week;"}'
        // let MysqlReportJson1 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"SELECT * FROM cdrdata where user= '+a+' and date between \''+c+'\' and \''+d+'\' ORDER BY duration desc limit 5;"}';

        MysqlReportJson1 = JSON.parse(MysqlReportJson1);


                //The api calling
                  this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson1, function (returnObj) {
                    if (returnObj.final_status) {
                      //console.log("==============");



                      var allrows = returnObj.allcol;
                      //console.log(allrows);
                      sun = parseInt(allrows[3][0]);
                      mon = parseInt(allrows[1][1]);
                      tue = parseInt(allrows[5][2]);
                      wed = parseInt(allrows[6][3]);
                      thu = parseInt(allrows[4][4]);
                      fri = parseInt(allrows[0][5]);
                      sat = parseInt(allrows[2][6]);

                      _this.showChartsfinal2(sun,mon,tue,wed,thu,fri,sat);


            }

          })
        }
  }
  showChartsfinal2(sun,mon,tue,wed,thu,fri,sat){
    let _this =this;
    let chartObj: any = {
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Week Day Traffic for Number ' + _this.number + ' from ' + _this.from +' to '+ _this.to
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          labels: {
            style: {
                fontSize:'15px'
            }
        },
          title: {
              text: null
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Number Of Calls',
              align: 'middle',
              style: {
                fontSize:'15px'
            }

          },
          labels: {
              overflow: 'justify',

          }
      },
      tooltip: {
          valueSuffix: ' '
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          // backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
          shadow: true
      },
      credits: {
          enabled: false
      },
      series: [{
          name: 'No. of Calls',
          data: [sun, mon, tue, wed, thu, fri, sat]
      }
    ]
    };
    $("#chart5").css('display','');
    $("#chart4").css('display','none');

    $("#ab").css('display','none');
    $('#sampledelivery2').css('display','none');
    $("#ab2").css('display','none');
    // $('#sampledelivery_wrapper').css('display','none');

    $('#sampledelivery').css('display','none');
    $("#sampledelivery_wrapper").css('display','none');
    $('#sdh3').css('display','none');
    $('#sd2h3').css('display','none');
    $('#sampledelivery2calls').css('display','none');
    $('#sd2h3calls').css('display','none');
    $('#abcalls').css('display','none');

    _this.chart5 = new Chart(chartObj);

  }

  locationMap(){
    let _this = this;
    let x = (this.frommap);
    let y = (this.tomap);

    this.isPeriod(x,y);
    // this.isAvailable();

    if(this.numbermap==null || this.numbermap==0){
      alert("Please give the input Number");
      $("#ab").css('display','none');
      $("#sampledelivery").css('display','none');
      $("#chart4").css('display','none');
      $("#chart5").css('display','none');
      $("#sampledelivery_wrapper").css('display','none');
    }
    else{

      var a = parseInt(this.numbermap);
      //console.log(a);

      var c = (this.frommap).toString();
      var d = (this.tomap).toString();
      //console.log(c);
      //console.log(d);
      // let MysqlReportJson1 = '{"classname":"com.mysql.jdbc.Driver","dburl":"jdbc:mysql://localhost:","dbport":"3306","dbusername":"trainee","dbpassword":"prabhu@1996","dbname":"trainee","tablename":"callhihi","query":"SELECT latitude, longitude,date,time FROM callhihi where user= '+a+' and date between \''+c+'\' and \''+d+'\';"}'
      let MysqlReportJson1 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"SELECT latitude, longitude,date,time,tower FROM cdr_new_mockupdata where calling_number= '+a+' and date between \''+c+'\' and \''+d+'\';"}'

        MysqlReportJson1 = JSON.parse(MysqlReportJson1);


                //The api calling
                  this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson1, function (returnObj) {
                    if (returnObj.final_status) {
                      //console.log("==============");



                      var allrows = returnObj.allcol;

                      //console.log(allrows);

                      for(var i=0;i<allrows.length;i++){
                        _this.markers.push({latitude:parseFloat(allrows[i][0]),longitude:parseFloat(allrows[i][1]),date:(allrows[i][2]),time:(allrows[i][3]),twrinfo:(allrows[i][4])})
                      }
                      //console.log(_this.markers);

                      $("#locationMap").css('display','');
                      $("#h3locmap").css('display','');
            }

          })

        }

  }
  onMouseOver(infoWindow, gm) {

    if (gm.lastOpen != null) {
        gm.lastOpen.close();
    }

    gm.lastOpen = infoWindow;

    infoWindow.open();
}

resetAll(){
  $("#ab").css('display','none');
  $("#sampledelivery").css('display','none');
  $("#chart4").css('display','none');
  $("#chart5").css('display','none');
  $("#ab2").css('display','none');
  $("#sampledelivery2").css('display','none');
  $("#sampledelivery_wrapper").css('display','none');
  $("#fclc").css('display','none');
  $('#sdh3').css('display','none');
  $('#sd2h3').css('display','none');
}







totalcalls() {
  let _this = this;

  //The json request
  let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
    this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
    '","dbname":"' + this.dbname2 + '","tablename":"' + this.tablename3 +
    '","query":"select count(*) from cdr_new_mockupdata;"}';
  ////console.log(MysqlReportJson)
  MysqlReportJson = JSON.parse(MysqlReportJson);


  //The api calling
  this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
    if (returnObj.final_status) {
      //The all data response in row format and store in variable
      var allrows = returnObj.allcol;
      //The local array for store data
      _this.total_calls = allrows[0][0];

      var myjson=JSON.stringify(MysqlReportJson);
      //console.log(myjson);
      // //console.log(_this.totalsale);
    }
  });

}


totalsuccessfulcalls() {
  let _this = this;
  var smt="SMT";


  //The json request
  let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
    this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
    '","dbname":"' + this.dbname2 + '","tablename":"' + this.tablename3 +
    '","query":"select count(*) from cdr_new_mockupdata where calltype not like \''+smt+'\';"}';
  ////console.log(MysqlReportJson)
  MysqlReportJson = JSON.parse(MysqlReportJson);


  //The api calling
  this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
    if (returnObj.final_status) {
      //The all data response in row format and store in variable
      var allrows = returnObj.allcol;
      //The local array for store data
      _this.total_successful_calls = allrows[0][0];

      var myjson=JSON.stringify(MysqlReportJson);
      //console.log(myjson);
      //console.log(_this.total_successful_calls);
    }
  });

}


totaldroppedcalls() {
  let _this = this;
  var smt="SMT";

  //The json request
  let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
    this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
    '","dbname":"' + this.dbname2 + '","tablename":"' + this.tablename3 +
    '","query":"select count(*) from cdr_new_mockupdata where calltype like \''+smt+'\';"}';
  ////console.log(MysqlReportJson)
  MysqlReportJson = JSON.parse(MysqlReportJson);


  //The api calling
  this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
    if (returnObj.final_status) {
      //The all data response in row format and store in variable
      var allrows = returnObj.allcol;
      //The local array for store data
      _this.total_dropped_calls = allrows[0][0];

      var myjson=JSON.stringify(MysqlReportJson);
      //console.log(myjson);
      // //console.log(_this.totalsale);
    }
  });

}


totaltowers() {
  let _this = this;

  //The json request
  let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
    this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
    '","dbname":"' + this.dbname2 + '","tablename":"' + this.tablename3 +
    '","query":"select count(distinct(tower)) from cdr_new_mockupdata;"}';
  ////console.log(MysqlReportJson)
  MysqlReportJson = JSON.parse(MysqlReportJson);


  //The api calling
  this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
    if (returnObj.final_status) {
      //The all data response in row format and store in variable
      var allrows = returnObj.allcol;
      //The local array for store data
      _this.total_towers = allrows[0][0];

      var myjson=JSON.stringify(MysqlReportJson);
      //console.log(myjson);
      // //console.log(_this.totalsale);
    }
  });

}



totalcallingpeople() {
  let _this = this;

  //The json request
  let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
    this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
    '","dbname":"' + this.dbname2 + '","tablename":"' + this.tablename3 +
    '","query":"select count(distinct(calling_number_name)) from cdr_new_mockupdata;"}';
  ////console.log(MysqlReportJson)
  MysqlReportJson = JSON.parse(MysqlReportJson);


  //The api calling
  this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
    if (returnObj.final_status) {
      //The all data response in row format and store in variable
      var allrows = returnObj.allcol;
      //The local array for store data
      _this.total_calling_people = allrows[0][0];

      var myjson=JSON.stringify(MysqlReportJson);
      //console.log(myjson);
      // //console.log(_this.totalsale);
    }
  });

}



totalcalledpeople() {
  let _this = this;

  //The json request
  let MysqlReportJson = '{"classname": "' + this.classname + '","dburl":"' + this.dburl + '","dbport":"' +
    this.dbport + '","dbusername":"' + this.dbusername + '","dbpassword":"' + this.dbpassword +
    '","dbname":"' + this.dbname2 + '","tablename":"' + this.tablename3 +
    '","query":"select count(distinct(called_number_name)) from cdr_new_mockupdata;"}';
  ////console.log(MysqlReportJson)
  MysqlReportJson = JSON.parse(MysqlReportJson);


  //The api calling
  this.AppServiceBackendApiObj.GetDynamicTableData(MysqlReportJson, function (returnObj) {
    if (returnObj.final_status) {
      //The all data response in row format and store in variable
      var allrows = returnObj.allcol;
      //The local array for store data
      _this.total_called_people = allrows[0][0];

      var myjson=JSON.stringify(MysqlReportJson);
      //console.log(myjson);
      // //console.log(_this.totalsale);
    }
  });

}











getpiechart1()
{


  let MysqlReportJson = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"select count(sno),calltype from cdr_new_mockupdata group by calltype;"}';
  MysqlReportJson = JSON.parse(MysqlReportJson);
  let _this = this;
  let arrayreturn2 = [];
  var result = JSON.stringify(arrayreturn2);

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
      pointFormat: 'Percentage: <b>{point.percentage:.1f}%</b> of Total <br/> Total Number : <b>{point.y}</b> '
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        colors: [
          '#F29479',
          '#FEC9B7',
          '#F08D7E',
          '#F26851'

        ],
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
          format: '<b>{point.name}</b>',

        },
        showInLegend:true
      }
    },
    series: [{
      name: 'Call-Type',
      colorByPoint: true,
      data: [
        {
          name: "incoming",
          y: 70
        },
        {
          name: "outgoing",
          y: 40
        },
        {
          name: "others",
          y: 90
        },
      ]
    }]
  };

  _this.chart1 = new Chart(chartObj);


}

maphome(){
  let _this = this;
  let MysqlReportJson1 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"select distinct(tower),latitude,longitude from cdr_new_mockupdata limit 30;"}'

  MysqlReportJson1 = JSON.parse(MysqlReportJson1);

                var allrows=new Array(30);
                var lat_val = 37.441000;
                var long_val = -120.569743;
                for (var j=0; j<10; j++){
                  allrows[j]=new Array(3);
                  allrows[j][0] = 'Tower_'+j;
                  allrows[j][1] = lat_val;
                  allrows[j][2] = long_val;
                  lat_val = lat_val + ((Math.random() * .9) + .01);
                  long_val = long_val + ((Math.random() * .9) + .01);

                }
                for(var i=0;i<10;i++){
                  _this.markers2.push({tower:allrows[i][0],lat:allrows[i][1].toString(),long:allrows[i][2].toString()});
                }
}


tablehome(){
        let MysqlReportJson1 = '{"classname":"'+this.classname+'","dburl":"'+this.dburl+'","dbport":"'+this.dbport+'","dbusername":"'+this.dbusername+'","dbpassword":"'+this.dbpassword+'","dbname":"'+this.dbname2+'","tablename":"'+this.tablename3+'","query":"select count(sno),calling_number from cdr_new_mockupdata group by 2 order by 1 desc limit 8;"}';

        MysqlReportJson1 = JSON.parse(MysqlReportJson1);

        let datareturn=[];

                    var allrows = [
                      [7,'1234567890'],
                      [12,'9876543210'],
                      [4,'9182736405'],
                      [5,'9112877634'],
                      [9,'9988776655'],
                      [17,'1982376450'],
                      [10,'7654897765'],
                      [3,'9876556789']
                    ];

                    (allrows).forEach((valueobj, index) => {

                      var calling_number = valueobj[1];
                      var no_of_calls = valueobj[0];

                      datareturn.push([calling_number,no_of_calls]);
                    });
                  $('#tablehomebody').html('');
                  var body = '';
                  $.each(datareturn, function (index, valueobj) {
                    body = body + '<tr align="center" " >  ';
                    for (var i = 0; i < 2; i++) {
                        body = body + ' <td align="center"> ' + valueobj[i] + ' </td> ';

                  }
                    body = body + '</tr>';
                  });

                  //console.log(body);
                  $('#tablehomebody').append(body);
                  $('#tablehome').show();
}

sendEmail(formDate,idoftable,subject){
  //console.log("a inside sendemail#@#@#@$$$$$$$",idoftable);
  //console.log("sender : "+formDate.emailfrom);
  var a = $("#"+subject).html();
  //console.log(a);
  var tabledata = document.getElementById(idoftable) as HTMLOutputElement;
  //console.log(tabledata.outerHTML);
  var tableHTML = tabledata.outerHTML.replace("id=\""+idoftable+"\"","id=\""+idoftable+"\" border=\"1\"");
  var EmailJson={
    "receiver": formDate.emailto,
    "subject": a,
    "tablecontent" : tableHTML,
    "htmltype": "table"
  };

  this.AppServiceBackendApiObj.SendEmail(EmailJson, function(returnObj) {
          //console.log(returnObj)
        if (returnObj.status == "true") {
          alert("Email sent");
        }
        else
        {
          alert("Error");
        }
      });
}

openForm(a) {
  document.getElementById(a).style.display = "block";
}

  closeForm(a) {
    document.getElementById(a).style.display = "none";
    }
}



interface Marker {
  latitude: Number;
  longitude: Number;
  date: String;
  time: String;
  twrinfo: String
  // draggable: boolean;
}
interface Marker1 {
  lat: Number;
  long: Number;
  date: String;
  time:String;
  twrinfo: String;
}
interface Marker2 {
  tower: String;
  lat: Number;
  long: Number;
}


