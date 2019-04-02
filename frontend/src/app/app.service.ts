import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable()
export class AppService {
  constructor(private http: HttpClient) { }

  token:any=localStorage.getItem("token");
  loggedinuser:any=localStorage.getItem("token");

  backendUrl = environment.backendUrl;
  backendApiUrl= environment.backendApiUrl;

  loginApi( username: string,password : string , cb: Function) : any {
    this.http.get(this.backendUrl+'login?username='+username+'&password='+password).subscribe(data => {
      this.token=data['token'];

      cb(data);
    },
    (err) => {
      cb(err.error);
    });
  }

  SourceCreate( SourceObj:Object,cb: Function) : any {

    this.http.post(this.backendUrl+'sourceCreate',SourceObj,{ headers:{'x-access-token': this.token ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb(err.error);
    });
  }

  GetAllSourceType( AllServerTypeJson:Object,cb: Function) : any {
      this.http.get(this.backendUrl+'sourceType',{ headers:{'x-access-token': this.token ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb(err.error);
    });
  }

  GetAllJobType( AllJobTypeJson:Object,cb: Function) : any {
      this.http.get(this.backendUrl+'jobType',{ headers:{'x-access-token': this.token ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb(err.error);
    });
  }

  GetAllSourceInformation( AllSourcejson:Object,cb: Function) : any {
      this.http.post(this.backendUrl+'sources',AllSourcejson,{headers:{'x-access-token': this.token ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb(err.error);
    });
  }

  SourceUpdate( AllSourcejson:Object,cb: Function) : any {
    this.http.put(this.backendUrl+'sourceUpdate',AllSourcejson,{headers:{'x-access-token': this.token ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb(err.error);
    });
  }

  GetOneSourceInformation( Sourcejson:Object,cb: Function) : any {

      //console.log("********* api for source : **********  "+this.backendUrl+'source');

      this.http.post(this.backendUrl+'source',Sourcejson,{headers:{'x-access-token': this.token ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb(err.error);
    });
  }

  DeleteSourceInformation( DeleteSourcejson:Object,cb: Function) : any {

      var myJSON = JSON.stringify(DeleteSourcejson);

      this.http.post(this.backendUrl+'deletesource',DeleteSourcejson,{headers:{'x-access-token': this.token ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb(err.error);
    });
  }

  JobCreate( AllJobjson:Object,cb: Function) : any {
    this.http.post(this.backendUrl+'createjob',AllJobjson,{headers:{'x-access-token': this.token ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb(err.error);
    });
  }

  GetOneJobInformation( Sourcejson:Object,cb: Function) : any {
      this.http.post(this.backendUrl+'job',Sourcejson,{headers:{'x-access-token': this.token ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb(err.error);
    });
  }

  DeleteJobInformation( DeleteSourcejson:Object,cb: Function) : any {
      this.http.post(this.backendUrl+'deletejob',DeleteSourcejson,{headers:{'x-access-token': this.token ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb(err.error);
    });
  }

  GetAllJobInformation(AllJobjson:Object,cb: Function) : any {
      this.http.post(this.backendUrl+'alljob',AllJobjson,{headers:{'x-access-token': this.token ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
    },
    (err) => {
        cb(err.error);
    });
  }

  WriteJson(jsondatareq:Object,cb: Function) : any {
      this.http.post(this.backendUrl+'createjson',jsondatareq,{headers:{'x-access-token': this.token ,'Content-Type': 'application/json'} } ).subscribe(data => {
      cb(data);
      //console.log("datainside_appservice",data);
      return data;
    },
    (err) => {
        cb(err.error);
    });
  }

  //Added by RJN - JAN 25th, 2019
  async Encrypt( EncryptJson:Object,cb: Function) {
    await this.http.post(this.backendUrl+'encrypt',EncryptJson,{ headers:{'Content-Type': 'application/json'}} ).subscribe(data => {
       cb(data);
     },
     (err) => {
         cb(err.error);
     });
  }


  TwitterAPI(data:any, cb: Function) : any {
    //console.log("Qwitter API");
      this.http.get(this.backendUrl+'twitterDemo',{headers:{'x-access-token': this.token ,'Content-Type': 'application/json','data':data} } ).subscribe(data1 => {
      cb(data1);
    },
    (err) => {
        cb(err.error);
    });
  }


  //AWS S3
  CreateFolder(data:any, cb: Function) : any {
      this.http.post(this.backendUrl+'createFolderS3',data,{headers:{'x-access-token': this.token,'Content-Type': 'application/json'} } ).subscribe(data1 => {
      cb(data1);
    },
    (err) => {
        cb(err.error);
    });
  }

  CheckExistingFolder(data:any,cb:Function) : any{
    this.http.post(this.backendUrl + 'checkExistingFolder',data,{headers:{'x-access-token': this.token,'Content-Type': 'application/json'} } ).subscribe(resdata =>{
    cb(resdata);
    },
    (err) => {
      cb(err.error);
    });
  }

  GetBucketContian(data:any,cb:Function) : any{
    this.http.post(this.backendUrl + 'showBucketContain',data,{headers:{'x-access-token': this.token,'Content-Type': 'application/json'} } ).subscribe(resdata =>{
      cb(resdata);
      },
      (err) => {
        cb(err.error);
      });
  }

  DeleteAwsFolder(data:any,cb:Function) :any{
    this.http.post(this.backendUrl + 'deleteObject',data,{headers:{'x-access-token': this.token,'Content-Type': 'application/json'} } ).subscribe(resdata =>{
      cb(resdata);
      },
      (err) => {
        cb(err.error);
      });
  }
  
  CreateAwsFolder(data:any,cb:Function) :any{
    this.http.post(this.backendUrl + 'createFolderS3',data,{headers:{'x-access-token': this.token,'Content-Type': 'application/json'} } ).subscribe(resdata =>{
      cb(resdata);
      },
      (err) => {
        cb(err.error);
      });
  }

  AwsFileUpload(data:any,cb:Function) :any{
    this.http.post(this.backendUrl + 'uploadFileS3',data,{headers:{'x-access-token': this.token,'Content-Type': 'application/json'} } ).subscribe(resdata =>{
      cb(resdata);
      },
      (err) => {
        cb(err.error);
      });
  }

  RenameAwsFile(data:any,cb:Function) :any{
    this.http.post(this.backendUrl + 'renameObject',data,{headers:{'x-access-token': this.token,'Content-Type': 'application/json'} } ).subscribe(resdata =>{
      cb(resdata);
      },
      (err) => {
        cb(err.error);
      });
  }

  GetFileDetails(data:any,cb:Function) :any{
    this.http.post(this.backendUrl + 'getFileDetail',data,{headers:{'x-access-token': this.token,'Content-Type': 'application/json'} } ).subscribe(resdata =>{
      cb(resdata);
      },
      (err) => {
        cb(err.error);
      });
  }

  AwsFileDownload(data:any,cb:Function) :any{
    this.http.post(this.backendUrl + 'downloadObject',data,{headers:{'x-access-token': this.token,'Content-Type': 'application/json'} } ).subscribe(resdata =>{
      cb(resdata);
      },
      (err) => {
        cb(err.error);
      });
  }
}

