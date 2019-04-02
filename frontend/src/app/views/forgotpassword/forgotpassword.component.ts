import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../app.service';
import {
  AppServiceBackendApi
}
from '../../app.servicebackendapi';
import {
  environment
}
from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'forgotpassword.component.html'
})
export class ForgotPasswordComponent {

  constructor(private formBuilder: FormBuilder,public AppServiceBackendApiObj:
    AppServiceBackendApi,private router : Router,private http: HttpClient,private AppServiceObj:AppService,private spinner: NgxSpinnerService) { }

  username:any;
  firstname:any;
  lastname:any;
  email:any;
  password:any;
  password1:any;
  backendApiUrl= environment.backendApiUrl;
  classname = environment.classname;
  dburl = environment.dburl;
  dbport = environment.dbport;
  dbusername = environment.dbusername;
  dbpassword = environment.dbpassword;
  dbname = '';
  tablename = '';
  dbname3 = environment.dbname3;
  tablename2 = '';
  sqlpath=environment.sqlfilepath;
  keyname='';
  bucketname=''

  forgotpasswordForm: FormGroup;
  submitted = false;

  accVerify : any;
  accVerifyMasked : any;

  ngOnInit() {
    this.forgotpasswordForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.forgotpasswordForm.controls; }

  async onSubmit() {
    let _this = this;
    this.submitted = true;
    _this.spinner.show();

    if (this.forgotpasswordForm.invalid) {
        return;
    }

    var uuid=this.getUuidv4();

    var params=new Array();

    params.push(uuid);
    params.push(this.email);

    var path=this.sqlpath+"getUserByEmail.sql";

    var MysqlReportJson={
      "sqlPath" : path ,
      "classname" : this.classname ,
      "dburl" : this.dburl,
      "dbport" : this.dbport,
      "dbusername" : this.dbusername,
      "dbpassword" : this.dbpassword,
      "dbname" : this.dbname3,
      "parameters":params
    };

    this.AppServiceBackendApiObj.QueryBackend(MysqlReportJson, function (data) {
      console.log("Callback QB : ",data);
      if(!data.result.affectedRows){
        _this.spinner.hide();
        alert("Sorry! user doesn't exist. Please register.");

        _this.router.navigate(['/login'])
        return;
      }
      else{
        if(data.status == true)
        {
          _this.sendEmail(_this.firstname,_this.email,_this.password,uuid);
          _this.spinner.hide();
          $('#full-page').empty();
          $('#full-page').append('<jw-modal id="custom-modal-1" style="float:center;"> <h1><br> <h3>Please check your email for the password reset link.<h3></h1></jw-modal>');
        }
        else
        {
          if(data.final_status==0)
          {
            alert('Email id doesn\'t exist.\n Please enter the correct email id');

          }
        }
      }
    });
  }

  sendEmail(fname,email,pass,uuid){
    console.log("Inside sendEmail ... ");
    this.accVerify=environment.backendPythonApiUrl+'api/passwordchangeauth1?uuid='+uuid

    var html = "<html><body><p>Hi there!</p><p>Please click on the following link to change your password.</p><p><a href="+this.accVerify+">Click me</a></p></body></html>"

    var EmailJson={
      "receiver": email,
      "subject": "Changing password",
      "message": html
    };
    this.AppServiceBackendApiObj.SendRegistrationEmail(EmailJson, function(returnObj) {
    });
  }

  getUuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
