import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class AppServiceBackendApi {
  constructor(private http: HttpClient) { }
  backendApiUrl = environment.backendApiUrl;
  backendPythonApiUrl = environment.backendPythonApiUrl;

  GetDynamicTableData( MysqlReportJson:Object,cb: Function) : any {
  }
  QueryBackend(TestDataJson:Object,cb: Function) : any {
    this.http.post(this.backendApiUrl+'api/reporting/querybackend',TestDataJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {
        cb(data);
    },
    (err) => {
      cb({status:false});
    });
  }

  // CreateFolder(KeyDataJson:Object,cb: Function):any{
  //   console.log(KeyDataJson);
  //   this.http.post(environment.backendApiUrl+'createFolderS3',KeyDataJson,{headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data=>{
  //     cb(data);
  //   },
  //   (err) => {
  //     cb({status:false});
  //   });
  // }

  SendRegistrationEmail( EmailJson:Object,cb: Function) : any {
    this.http.post(environment.backendPythonApiUrl+'api/sendemailusernamepassword',EmailJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {
        cb(data);
    },
    (err) => {
        cb({status:false});
    });
  }
  


  SendEmail( EmailJson:Object,cb: Function) : any {
    this.http.post(this.backendPythonApiUrl+'api/sendemail',EmailJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb({status:false});
    });
  }

  GetBucketContian( GetBucketContianJson:Object,cb: Function) : any {

    console.log(this.backendApiUrl+'api/s3operation/bucketcontains ');

    var myjson=JSON.stringify(GetBucketContianJson);

    console.log('GetBucketContianJson *********   '+myjson);

    this.http.post(this.backendApiUrl+'api/s3operation/bucketcontains ',GetBucketContianJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {
    cb(data);
  },
  (err) => {
      cb({status:false});
  }); 
  }
  
  GetAwsFilePreview( fileDetailsJson:Object,cb: Function) : any {
    this.http.post(this.backendApiUrl+'api/s3operation/filepreviewByLines',fileDetailsJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {
    cb(data);
},
(err) => {
    cb({status:false});
}); 
} 

DeleteAwsFolder( deleteAwsFolderJson:Object,cb: Function) : any {
  this.http.post(this.backendApiUrl+'api/s3operation/deletefolder',deleteAwsFolderJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} }  ).subscribe(data => {
  cb(data);
},
(err) => {
  cb({status:false});
}); 
} 

}
