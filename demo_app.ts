import { Injectable } from '@angular/core'; 
import { HttpClient ,HttpRequest, HttpEvent } from '@angular/common/http';


//import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { environment } from '../environments/environment';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AppServiceBackendApi {
  constructor(private http: HttpClient) { }
  backendApiUrl = environment.backendApiUrl;//+"https://firepie.cloudhiti.com/"; 
  backendPythonApiUrl = environment.backendPythonApiUrl;
  
  //api/dboperation/getDatabases
  GetAllDatabase( AllDatabaseJson:Object,cb: Function) : any {

      

      this.http.post(this.backendApiUrl+'api/dboperation/getDatabases',AllDatabaseJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {
      console.log("get all databases ******** :"+data);
      cb(data);
    },
    (err) => {
        cb({status:false});
    }); 
  }
  //api/dboperation/showtables
  GetAllTables( AllTableJson:Object,cb: Function) : any {

      console.log(this.backendApiUrl+'api/dboperation/showtables');

    
      this.http.post(this.backendApiUrl+'api/dboperation/showtables',AllTableJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb({status:false});
    }); 
  }

  GetDynamicTableData( MysqlReportJson:Object,cb: Function) : any {

      console.log("in get dynamic table data : ********* "+this.backendApiUrl+'api/reporting/getdynamictabledata');

      var myjson=JSON.stringify(MysqlReportJson);

      console.log(myjson);

      this.http.post(this.backendApiUrl+'api/reporting/getdynamictabledata',MysqlReportJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {

      cb(data);
    },
    (err) => {
        cb({status:false});
    }); 
  }
  


  //api/s3operation/bucketlists 
    GetAllBucket( GetAllBucketJson:Object,cb: Function) : any {


      console.log(this.backendApiUrl+'api/s3operation/bucketlists');
      var myjson=JSON.stringify(GetAllBucketJson);
      console.log("json is *************       "+myjson);

      this.http.post(this.backendApiUrl+'api/s3operation/bucketlists',GetAllBucketJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb({status:false});
    }); 
    }
  
    ALLS3MYSQLPSQLAPI( ALLJson:any,cb: Function) : any {
      console.log()

      console.log("*********in ALLS3MYSQLPSQLAPI ******** : "+this.backendApiUrl+ALLJson.api);

      this.http.post(this.backendApiUrl+ALLJson.api,ALLJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb({status:false});
    }); 
    }

    PsqlToS3( PsqlToS3Json:Object,cb: Function) : any {
      this.http.post(this.backendApiUrl+'api/sparketl/rdbmstos3',PsqlToS3Json,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {
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


    JobSchedule( PsqlToS3Json:Object,cb: Function) : any {
      this.http.post(this.backendApiUrl+'/schedule/job',PsqlToS3Json,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb({status:false});
    }); 
    } 


    S3ToMysql( S3ToMysqlJson:Object,cb: Function) : any {
      this.http.post(this.backendApiUrl+'api/s3todatabase',S3ToMysqlJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb({status:false});
    }); 
    }   


    QueryBackend(TestDataJson:Object,cb: Function) : any {

        console.log(this.backendApiUrl+'api/reporting/querybackend');

        var myjson=JSON.stringify(TestDataJson);

        console.log('GetWordCloudContentJson GetLinkdinData*********   '+myjson);

        this.http.post(this.backendApiUrl+'api/reporting/querybackend',TestDataJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {
            cb(data);

            // console.log(data);
        },
        (err) => {
            cb({status:false});
        });
    }

    GetSwiftJob( S3ToMysqlJson:Object,cb: Function) : any {
        this.http.post(this.backendPythonApiUrl+'api/getswift',S3ToMysqlJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {
        cb(data);
    },
    (err) => {
        cb({status:false});
    }); 
    } 
                
    StopJob( StopJobJson:Object,cb: Function) : any {
        this.http.post(this.backendApiUrl+'api/streaming/kafka/stoptwitterstreaming',StopJobJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} } ).subscribe(data => {
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

    CreateAwsFolder( createAwsFolderJson:Object,cb: Function) : any {
        this.http.post(this.backendApiUrl+'api/s3operation/createfolder',createAwsFolderJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} }  ).subscribe(data => {
        cb(data);
    },
    (err) => {
        cb({status:false});
    }); 
    } 

     
    AwsFileUpload(file: File,accessKeyl,secretKeyl,S3key,bucketname): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('accesskey',accessKeyl);
    formdata.append('secretkey',secretKeyl);
    formdata.append('bucketName',bucketname);
    formdata.append('key',S3key)
    const req = new HttpRequest('POST', this.backendApiUrl+'api/s3operation/fileupload', formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
    return this.http.request(req);
    }


    RenameAwsFile( renameAwsFileJson:Object,cb: Function) : any {
    this.http.post(this.backendPythonApiUrl+'api/s3operation/renamefolder',renameAwsFileJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} }  ).subscribe(data => {
    cb(data);
  },
  (err) => {
      cb({status:false});
  }); 
    } 


    GetFileDetails( getFileDetailsJson:Object,cb: Function) : any {
    this.http.post(this.backendApiUrl+'api/s3operation/getobjectdetails',getFileDetailsJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} }  ).subscribe(data => {
    cb(data);
  },
  (err) => {
      cb({status:false});
  }); 
    } 


    MoveFile( MoveAwsFileJson:Object,cb: Function) : any {
    this.http.post(this.backendPythonApiUrl+'api/s3operation/movefile',MoveAwsFileJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} }  ).subscribe(data => {
    cb(data);
  },
  (err) => {
      cb({status:false});
  }); 
    } 


   

    AwsFileDownload( downloadAwsFileJson:Object,cb: Function) : any {
      this.http.post(this.backendPythonApiUrl+'api/s3operation/downloadfile',downloadAwsFileJson,{ headers:{'Accept': 'application/json' ,'Content-Type': 'application/json'} }  ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb({status:false});
    }); 
      } 
  
}
