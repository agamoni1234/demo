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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
var encryptedpassword;


@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

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

  registerForm: FormGroup;
  submitted = false;

  accVerify : any;
  accVerifyMasked : any;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],

        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password1: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }


  async onSubmit() {
    let _this = this;
    this.submitted = true;
    _this.spinner.show();

    if (this.registerForm.invalid) {
        return;
    }
    if(this.password!=this.password1)
    {
      alert("Passwords don't match. Please re-enter password.");
      return;
    }
    var uuid=this.getUuidv4();

    await this.encryptPassword(this.password, await function(cb){
      encryptedpassword = cb;
      var params=new Array();

      params.push(_this.email);
      params.push(encryptedpassword);
      params.push(_this.username);
      params.push(_this.firstname);
      params.push(_this.lastname);
      params.push(uuid);

      var path=_this.sqlpath+"registerUser.sql";

      var MysqlReportJson={
        "sqlPath" : path ,
        "classname" : _this.classname ,
        "dburl" : _this.dburl,
        "dbport" : _this.dbport,
        "dbusername" : _this.dbusername,
        "dbpassword" : _this.dbpassword,
        "dbname" : _this.dbname3,
        "parameters":params
      };
      _this.AppServiceBackendApiObj.QueryBackend(MysqlReportJson, function (data) {
        if(data.status == true)
        {
          _this.sendEmail(_this.firstname,_this.email,_this.password,uuid);
          _this.spinner.show();
          $('#full-page').empty();
          $('#full-page').append('<jw-modal id="custom-modal-1" style="float:center;"> <h1>Thank you for registering! <br> <h3>Please check your email for the verification link.<h3></h1></jw-modal>');
        }
        else
        {
          if(data.final_status==0)
          {
            alert('User already exists.\n Please enter a different username or email id');

          }
        }
      });
    });
  }

  register():any {
    if(this.password==this.password1 && this.password!='')
    {
      var params=new Array();

      params.push(this.email);
      params.push(this.password);
      params.push(this.username);
      params.push(this.firstname);
      params.push(this.lastname);

      var path=this.sqlpath+"registerUser.sql";

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

      let _this = this;
      this.AppServiceBackendApiObj.QueryBackend(MysqlReportJson, function (data) {
      });
    }
  }

  async encryptPassword(password,currentObj)
  {
    var encryptjson={
      text:password
    };
    await this.AppServiceObj.Encrypt(encryptjson, function(returnObj) {
      currentObj(returnObj.result);
    });
  }

  sendEmail(fname,email,pass,uuid){
    this.accVerify=environment.backendPythonApiUrl+'api/authenticate?user='+this.username+'&uuid='+uuid

    var html = "<html><body><p>Hello," +fname+".</p><p>Here is your user name:</p>"+this.username+"<p>Here is your password:"+this.password+"</p><p><a href="+this.accVerify+">Click here to activate your account</a></p></body></html>"

    var EmailJson={
      "receiver": email,
      "subject": "Thank you for registering with ClouDhiti!",
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

  protect_email(user_email) {
    var part1 = user_email.split("uuid=");
    var res = part1[1].split('').reverse().join('');
    return res;
  }
}
