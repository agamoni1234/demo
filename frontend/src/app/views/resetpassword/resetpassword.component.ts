import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
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
import { NgxSpinnerService } from 'ngx-spinner';
var encryptedpassword;


@Component({
  selector: 'app-dashboard',
  templateUrl: 'resetpassword.component.html'
})
export class ResetPasswordComponent {

  email: string;
  temp_uuid: string;

  constructor(private formBuilder: FormBuilder,public AppServiceBackendApiObj:
    AppServiceBackendApi,public router : Router,private http: HttpClient,private AppServiceObj:AppService,private route: ActivatedRoute,private spinner: NgxSpinnerService) {
        this.route.queryParams.subscribe(params => {
            this.temp_uuid = params['uuid'];
        });
    }

  password:any;
  password1:any;
  encryptedpassword:string;

  classname = environment.classname;
  dburl = environment.dburl;
  dbport = environment.dbport;
  dbusername = environment.dbusername;
  dbpassword = environment.dbpassword;
  dbname = '';
  dbname3 = environment.dbname3;
  sqlpath=environment.sqlfilepath;

  registerForm: FormGroup;
  submitted = false;

  accVerify : any;
  accVerifyMasked : any;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({

        password: ['', [Validators.required, Validators.minLength(6)]],
        password1: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }


  async onSubmit() {
    var __this = this;
    __this.spinner.show();
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }
    if(this.password!=this.password1)
    {
      alert("Passwords don't match. Please re-enter password.");
      return;
    }

    await this.encryptPassword(this.password, await function(cb){
      encryptedpassword = cb;
      var params=new Array();
      params.push(encryptedpassword);
      params.push(__this.temp_uuid);
      var path=__this.sqlpath+"resetPassword.sql";
      var MysqlReportJson={
        "sqlPath" : path ,
        "classname" : __this.classname ,
        "dburl" : __this.dburl,
        "dbport" : __this.dbport,
        "dbusername" : __this.dbusername,
        "dbpassword" : __this.dbpassword,
        "dbname" : __this.dbname3,
        "parameters":params
      };
      __this.AppServiceBackendApiObj.QueryBackend(MysqlReportJson, function (data) {
        if(data.status == true)
        {
          __this.spinner.hide();
          __this.router.navigate(['/login'])
          var params=new Array();
          params.push(__this.temp_uuid);
          var path=__this.sqlpath+"getEmailOfUser.sql";
          var MysqlReportJson={
            "sqlPath" : path ,
            "classname" : __this.classname ,
            "dburl" : __this.dburl,
            "dbport" : __this.dbport,
            "dbusername" : __this.dbusername,
            "dbpassword" : __this.dbpassword,
            "dbname" : __this.dbname3,
            "parameters":params
          };
          __this.AppServiceBackendApiObj.QueryBackend(MysqlReportJson, function (data) {
              __this.sendEmail(data.result[0].email);
              var path1=__this.sqlpath+"removeTemporary_uuid.sql";
              var MysqlReportJson1={
                "sqlPath" : path1 ,
                "classname" : __this.classname ,
                "dburl" : __this.dburl,
                "dbport" : __this.dbport,
                "dbusername" : __this.dbusername,
                "dbpassword" : __this.dbpassword,
                "dbname" : __this.dbname3,
                "parameters":params
              };
              __this.AppServiceBackendApiObj.QueryBackend(MysqlReportJson1, function (data1) {
              });
          });
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


  async encryptPassword(password,currentObj)
  {
    var encryptjson={
      text:password
    };
    await this.AppServiceObj.Encrypt(encryptjson, function(returnObj) {
      currentObj(returnObj.result);
    });
  }

  sendEmail(email){

    var html = "<html><body><p>Hello,</p><p>Your password has been updated successfully!</p></body></html>"

    var EmailJson={
      "receiver": email,
      "subject": "Password Reset",
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
