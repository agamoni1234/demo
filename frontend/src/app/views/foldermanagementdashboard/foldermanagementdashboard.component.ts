import { Component, OnInit,ViewChild,ViewEncapsulation, ɵConsole } from '@angular/core';
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


import {HttpClient, HttpResponse, HttpEventType} from "@angular/common/http";
import { CloudData, CloudOptions,ZoomOnHoverOptions } from 'angular-tag-cloud-module';

import * as $ from 'jquery';
// declare var $:any;

import 'highcharts-more';
let table=null;
let g1data=0;
let g2data=0;
let g3data=0;

import {
    TreeModel
}
from 'ng2-tree';
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-foldermanagementdashboard',
  templateUrl: './foldermanagementdashboard.component.html',
    styleUrls: ['./foldermanagementdashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FoldermanagementdashboardComponent implements OnInit {
    @ViewChild('treeComponentSource') treeComponentSource;
    @ViewChild('treeComponentDestination') treeComponentDestination;

    @ViewChild('ErrorSwal') private errorSwal;
    @ViewChild('SuccessSwal') private successSwal;

 

    constructor( private route: ActivatedRoute,private router: Router, private http: HttpClient, private AppServiceObj: AppService, private AppServiceBackendApiObj:
        AppServiceBackendApi,private spinner: NgxSpinnerService) {
      }
      
      ngOnInit() {

        this.AllSource=[
            {
                "name": this.userName + "_" + this.userId,
                "owner": {
                    "displayName": "biworkshop10",
                    "id": "0327c2fc5e2db9a1dfec4d36b333d0736b12b7e3654d64b26a374f8e7dbce4f3"
                },
                "creationDate": "2018-10-05T06:34:13.000+0000"
            }
        ]

        this.AllDestination=[
            {
                "name": environment.s3bucket,
                "owner": {
                    "displayName": "biworkshop10",
                    "id": "0327c2fc5e2db9a1dfec4d36b333d0736b12b7e3654d64b26a374f8e7dbce4f3"
                },
                "creationDate": "2018-10-05T06:34:13.000+0000"
            }
        ]

        this.Source = {
            "buckets": 
            [
                {
                    "name": environment.s3bucket,
                    "owner": {
                        "displayName": "biworkshop10",
                        "id": "0327c2fc5e2db9a1dfec4d36b333d0736b12b7e3654d64b26a374f8e7dbce4f3"
                    },
                    "creationDate": "2018-10-05T06:34:13.000+0000"
                }
            ]
        }

         this.Destination = {
            "buckets": [
                {
                    "name": environment.s3bucket,
                    "owner": {
                        "displayName": "biworkshop10",
                        "id": "0327c2fc5e2db9a1dfec4d36b333d0736b12b7e3654d64b26a374f8e7dbce4f3"
                    },
                    "creationDate": "2018-10-05T06:34:13.000+0000"
                }
            ]
        }
      }

      accessKey = environment.accessKey;
      secretKey = environment.secretKey;
      selectedSourceObject: any = 'Select Source';
      userName = localStorage.getItem("username");
      userId = localStorage.getItem("userId");
      
      savejobJson = {
        id: null,
        jobName: null,
        jobComment: null,
        sorcebucketName: null,
        sourcefolderPath: null,
        sourcefileKey: null,
        destinationbucketName: null,
        destinationfolderPath: null,
        destinationfileKey: null,
        sourcerdbmsnewtable: null,
        sourcerdbmstableName: null,
        sourcerdbmsnewtableTruncate: null,
        sourcerhashtag: null,
        sourcerbatchsize: null,
        sourcerkafkaName: null,
        destinationrdbmsnewtable: null,
        destinationrdbmstableName: null,
        destinationrdbmsnewtableTruncate: null,
        mlalgorithm: null,
        mlVariable: null,
        transformquery: null,
        jobjson: null,
        jobType: null,
        parentId: null,
        sourceType: null,
        targetType: null,
        sourceId: null,
        targetId: null,
        dumpaccessKey: null,
        dumpsecretKey: null,
        dumpbucketName: null,
        dumpKey: null,
        trainaccessKey: null,
        trainsecretKey: null,
        trainbucketName: null,
        trainKey: null
    };

    GetAllApiSourceJson: any;
    sourcediv = false;
    SourceTree: TreeModel;
    sourceobject = false;
    selectedSourceTreeObject: any = null;
    AllSource: any ;
    AllDestination:any;
    Source : any;
    Destination:any;
    fileNamePreview : string;
    filePath ="";
    fileContentString ="";
    isFile : any;
    awsKey = "";
    selectedFiles1: FileList;

    currentFileUpload: File;
    fileUnderBucket=true;
    currentFileDownload:File;


    SourceTree1: TreeModel;
    selectedDestinationTreeObject: any = null;
    GetAllApiDestinationJson: any;
    destinationdiv = false;
    targetcheck = false;
    selectedDestinationObject: any = 'Select Destination';
    filePathDestination:any;
    fileNamePreviewDestination:any;

    fileContent : any;



    fileDetailsFileLoc :any;
    fileDetailsFileName :any;
    fileDetailsFileSize :any;
    fileDetailsFileLastModified :any;
    newFilerename:any;

    nodeMenuItem = [
        { action: NodeMenuItemAction.NewTag, name: 'New File', cssClass: 'fa fa-file-o' },
        { action: NodeMenuItemAction.NewFolder, name: 'New Folder', cssClass: 'fa fa-folder-o' },
        { action: NodeMenuItemAction.Rename, name: 'Rename', cssClass: 'rename' },
        { action: NodeMenuItemAction.Remove, name: 'Delete', cssClass: 'remove' },
        { action: NodeMenuItemAction.Custom, name: 'NodeOptions', cssClass: 'fa fa-cog' }
        ];
                changeSource(){
                    var folderName = this.userName + "_" + this.userId;
                    console.log(this.AllSource);
                    let _this=this;

                    if (this.selectedSourceObject != "Select Source") {
                        this.savejobJson.sourceType = parseInt(this.selectedSourceObject.servertype_id);
                        this.savejobJson.sourceId = parseInt(this.selectedSourceObject.id);

                            this.GetAllApiSourceJson = '{"accesskey": "'+this.accessKey+'", "secretKey": "'+this.secretKey+'","bucketName": "'+environment.s3bucket+'","folderName": "'+folderName+'"}';
                            
                        console.log("GetAllBucket ***********   "+this.GetAllApiSourceJson);
                        this.GetAllApiSourceJson = JSON.parse(this.GetAllApiSourceJson)
                        
                            console.log("get bucket contains");
                            _this.sourcediv = true;
                        
                                _this.SourceTree = {
                                    value: " All Folder",
                                    settings: {
                                        'static': false,
                                        'cssClasses': {
                                            'expanded': 'fa fa-caret-down fa-lg',
                                            'collapsed': 'fa fa-caret-right fa-lg',
                                            'leaf': 'fa fa-lg',
                                            'empty': 'fa fa-caret-right disabled'
                                        },
                                        'templates': {
                                            'node': '<i class="fa fa-bitbucket fa-lg" style="color:#09afe8"></i>',
                                            'leaf': '<i class="fa fa-file" style="color:#09afe8"></i>',
                                            'leftMenu': '<i class="fa fa-navicon fa-lg" style="color:#09afe8"></i>'
                                        }
                                    },
                                    children: []
                                };
                                (this.Source.buckets).forEach(function(value, index) {
                                    console.log("Value is ", value);
                                    let object = {
                                        value: " " + value.name,
                                        path: "",
                                        settings: {
                                            isCollapsedOnInit: true
                                        },
                                        id: _this.savejobJson.sourceId + '_' + index,
                                        children: [{
                                            value: " Loading Object ....."
                                        }]
                                    }
                                    _this.SourceTree.children.push(object)
                                })
                            }
                        }
                
                public handleExpandedSorce(item: any): void {
                    console.log("-----------------");
                    console.log(item.node.node);
                    console.log(item.node.node.path);
                    console.log("-----------------");
                    const oopNodeController = this.treeComponentSource.getControllerByNodeId(item.node.node.id);
                    
                    if (item.node.node.path == "") {
                        var bucketName = item.node.node.value.trim();
                        var itempath = bucketName + '|';
                        this.GetAllApiSourceJson['bucketName'] = environment.s3bucket;
                        this.GetAllApiSourceJson['key'] = this.userName + "_" + this.userId;
                        var checkvalue = '';
                        var checkId = 0;
                    } else {
                        var bucketName = (item.node.node.path).split('|')[0];
                        console.log("bucket name in else :*******   "+bucketName);
                        var key = (item.node.node.path).split('|')[1] + item.node.node.value.trim() + '/';
                        this.GetAllApiSourceJson['bucketName'] = environment.s3bucket;
                        this.GetAllApiSourceJson['key'] = this.userName + "_" + this.userId;
                        this.awsKey = key;
                        var itempath = (item.node.node.path) + (item.node.node.value.trim()) + '/';
                        var checkId = (key).split('/').length;
                        checkId = checkId - 1;
                        var checkvalue = (key).split('/')[checkId - 1];
                    }
                    let _this = this;
                    console.log(this.GetAllApiSourceJson);
                    this.AppServiceObj.GetBucketContian(this.GetAllApiSourceJson, function(returnObj) {
                        console.log(returnObj);
                        var main = _this.extractbucketobject(returnObj.bucket_contents);
                        console.log(main)
                        var i = 0;
                        let item = [];
                        (main).forEach(function(value, index) {
                            (value).forEach(function(value1, index) {
                                i++;
                                if (checkId == 0) {
                                    if (value1.id == checkId) {
                                        if (typeof value1.files == 'undefined') {
                                            var found = item.some(function(el) {
                                                return el.value.trim() === value1.value && el.icon == 'fa fa-folder';
                                            });
                                            if (!found) {
                                                let obj = {
                                                    id: _this.savejobJson.sourceId + '_' + i,
                                                    settings: {
                                                        isCollapsedOnInit: true,
                                                        'templates': {
                                                            'node': '<i class="fa fa-folder" style="font-size: 16px;color:#09afe8;"></i>',
                                                            'leaf': '<i class="fa fa-file" style="color:#09afe8"></i>',
                                                            'leftMenu': '<i class="fa fa-file" style="color:#09afe8"></i>'
                                                        }
                                                    },
                                                    icon: 'fa fa-folder',
                                                    value: " " + value1.value,
                                                    path: itempath,
                                                    children: [{
                                                        value: " Loading Object ....."
                                                    }]
                                                };
                                                item.push(obj);
                                            }
                                        } else {
                                            var found = item.some(function(el) {
                                                return el.value.trim() === value1.value && el.icon == 'fa fa-file';;
                                            });
                                            if (!found) {
                                                //no more logic
                                                let obj = {
                                                    id: _this.savejobJson.sourceId + '_' + i,
                                                    settings: {
                                                        isCollapsedOnInit: true,
                                                        'templates': {
                                                            'node': '<i class="fa fa-file" style="color:#09afe8"></i>',
                                                            'leaf': '<i class="fa fa-file" style="color:#09afe8"></i>',
                                                            'leftMenu': '<i class="fa fa-file fa-lg" style="color:#09afe8"></i>'
                                                        }
                                                    },
                                                    path: itempath,
                                                    value: " " + value1.value,
                                                    icon: 'fa fa-file'
                                                };
                                                item.push(obj);
                                            }
                                        }
                                    }
                                } else {
                                    if (value1.id == checkId && value[checkId - 1].value == checkvalue) {
                                        if (typeof value1.files == 'undefined') {
                                            var found = item.some(function(el) {
                                                return el.value.trim() === value1.value && el.icon == 'fa fa-folder';
                                            });
                                            if (!found) {
                                                let obj = {
                                                    id: _this.savejobJson.sourceId + '_' + i,
                                                    settings: {
                                                        isCollapsedOnInit: true,
                                                        'templates': {
                                                            'node': '<i class="fa fa-folder" style="font-size: 16px;color:#09afe8;"></i>',
                                                            'leaf': '<i class="fa fa-file" style="color:#09afe8"></i>',
                                                            'leftMenu': '<i class="fa fa-file fa-lg" style="color:#09afe8"></i>'
                                                        }
                                                    },
                                                    value: " " + value1.value,
                                                    icon: 'fa fa-folder',
                                                    path: itempath,
                                                    callback: "source",
                                                    children: [{
                                                        value: " Loading Object ....."
                                                    }]
                                                };
                                                item.push(obj);
                                            }
                                        } else {
                                            var found = item.some(function(el) {
                                                return el.value.trim() === value1.value && el.icon == 'fa fa-file';
                                            });
                                            if (!found) {
                                                let obj = {
                                                    id: _this.savejobJson.sourceId + '_' + i,
                                                    settings: {
                                                        isCollapsedOnInit: true,
                                                        'templates': {
                                                            'node': '<i class="fa fa-file" style="color:#09afe8"></i>',
                                                            'leaf': '<i class="fa fa-file" style="color:#09afe8"></i>',
                                                            'leftMenu': '<i class="fa fa-file fa-lg" style="color:#09afe8"></i>'
                                                        }
                                                    },
                                                    value: " " + value1.value,
                                                    icon: 'fa fa-file',
                                                    path: itempath,
                                                    children: []
                                                };
                                                item.push(obj);
                                            };
                                        }
                                    }
                                }
                                oopNodeController.setChildren(item);
                            });
                        });
                    });

                }
                extractbucketobject(data: any) {
                    var mainArray = [];
                    console.log("data : ***** "+data);
                    (data).forEach(function(value, key1) {
                        var Newkey = value.key.split('/');
                        var bool;
                        var lastlength = Newkey.length;
                        if ((value.key).slice(-1) != "/") {
                            bool = true;
                            
                        } else {
                            bool = false;
                        }
                        var new2 = [];
                        (Newkey).forEach(function(value1, key) {
                            if (value1 != "") {
                                if (key == (lastlength - 1) && bool) {
                                    new2.push({
                                        id: key,
                                        value: value1,
                                        "files": '1',
                                        'size': value.size,
                                        'lastModified': value.lastModified
                                    });
                                } else {
                                    new2.push({
                                        id: key,
                                        value: value1
                                    });
                                }
                            }
                        });
                        mainArray.push(new2);
                    });
                    return mainArray;
                }

                public sourceSelected(item: any): void {
                    this.sourceobject = true;
                    this.selectedSourceTreeObject = item.node.node;
                    var json=JSON.stringify(this.selectedSourceTreeObject);
                    if(this.selectedSourceTreeObject.path!=""){
                        console.log("file path not null");
                        this.fileUnderBucket = false;
                        this.filePath = this.selectedSourceTreeObject.path.toString().split('|')[1]

                    }
                    this.fileNamePreview = this.selectedSourceTreeObject.value;
                    console.log("source selected : ******* "+json);
                    if(this.selectedSourceTreeObject.icon == "fa fa-folder"){
                        console.log("fafa folder");
                        this.isFile=false;
                    }else if(this.selectedSourceTreeObject.icon == "fa fa-file"){
                        console.log("fafa file");
                        this.isFile = true;
                    }
                    console.log("file path : "+this.filePath);

                }

                readFileContent(fileContentList){
                    this.fileContentString="";
            for (var i = 0;i<fileContentList.length;i++){
                    this.fileContentString=this.fileContentString+fileContentList[i]+"\n";
                }
                            
                }
                deleteAwsFolder(){
                    let _this = this;
                    _this.spinner.show();
                    console.log("key file : "+this.fileNamePreview.toString());
                    var S3key =this.filePath.trim()+this.fileNamePreview.trim();
                    var parentFolder = this.userName + "_" + this.userId;
                    if(!this.isFile){
                        console.log("it is a folder");
                        S3key = S3key+"/";
                    }
                    console.log("s3 key is : "+S3key);
                    var deleteFolderJson = {
                        accessKey : environment.accessKey,
                        secretKey : environment.secretKey,
                        bucketName : environment.s3bucket,
                        folderName : S3key,
                        parentFolder : parentFolder
                    }
                    console.log(deleteFolderJson);
                    this.AppServiceObj.DeleteAwsFolder(deleteFolderJson, function(returnObj) {
                        console.log(returnObj);
                        if(returnObj.status==true && returnObj.message == "Object is deleted successfully"){
                            _this.spinner.hide();
                            swal("","Folder(File) is deleted successfully","success");
                            // document.getElementById('deleteFolderSpan').textContent = 'Folder(File) is deleted successfully';
                            
                        }
                        if(returnObj.status==false && returnObj.message == "Object isn't deleted"){
                            _this.spinner.hide();
                            swal("","Folder(File) is not deleted successfully","error");
                            // document.getElementById('deleteFolderSpan').textContent = 'Folder(File) is not deleted successfully';
                            
                        }
                    }); 
                }
                /* refresh modal */

                createAwsFolder(formdate){
                    let _this = this;
                    _this.spinner.show();
                    console.log(formdate.foldername);
                    var S3key = "";
                    console.log(this.filePath);
                    if(this.filePath == ""){
                        var parentFolder = this.userName + "_" + this.userId;
                        S3key = parentFolder+"/"+formdate.foldername; 
                        console.log(S3key);
                    } else{
                        S3key =this.filePath.trim()+this.fileNamePreview.trim()+"/"+formdate.foldername;
                        console.log(S3key);
                    }
                    var createFolder = '{"accessKey":"'+ environment.accessKey+'","secretKey":"'+ environment.secretKey+'","bucketName" : "'+environment.s3bucket+'","folderName":"'+S3key.toString()+'"}';
                    var createFolderJson = JSON.parse(createFolder);
                    console.log(createFolderJson);
                    this.AppServiceObj.CreateAwsFolder(createFolderJson, function(returnObj) {
                        $('#myModalCreateFile').hide(); 
                        // document.getElementById('myModalCreateFile').style.display = "none";
                        console.log("Return Object ",returnObj);
                        if(returnObj.status==1){
                            _this.spinner.hide();
                            swal('',"Folder has been created successfully","success");
                            
                        }else{
                            _this.spinner.hide();
                            swal('',"Folder cannot be created","error");
                        }
                    });   
                }

                selectFile1(event) {
                    this.selectedFiles1 = event.target.files;
                    // console.log("File type is : "+this.selectedFiles1.item(0).type);
                    if(this.selectedFiles1.item(0).size >250000){
                    }
                    else{
                        var uploadedFile = event.target.files[0];
                        let fileReader = new FileReader();
                        if(this.selectedFiles1.item(0).type.includes("text/")){
                            fileReader.onload = (e) => {
                                this.fileContent = fileReader.result;
                                // console.log("Text File Details : "+this.fileContent);
                            }
                            fileReader.readAsText(uploadedFile);
                        }
                        if(this.selectedFiles1.item(0).type =='image/png'){
                            fileReader.onload = (e) => {
                                this.fileContent = fileReader.result;
                                // console.log("Image File Details : "+this.fileContent);
                            }
                            fileReader.readAsDataURL(uploadedFile);
                        }
                    }
                }
                //refresh upload folder modal

                //upload file in aws
                upload(event) {
                    // this.spinner.show();
                    this.fileUnderBucket =false;
                    var parentFolder =null;
                    console.log("in upload file path \""+this.filePath+"\"");
                    this.currentFileUpload = this.selectedFiles1.item(0);
                    var S3key = "";
                    parentFolder = this.userName + "_" + this.userId;

                    if(this.filePath == "" && !this.fileUnderBucket){
                        S3key = parentFolder+"/"+this.selectedFiles1.item(0).name;
                    }
                    else{
                    S3key =this.filePath.trim()+this.fileNamePreview.trim()+"/"+this.selectedFiles1.item(0).name;
                    }
                    // console.log("File Content is "+this.fileContent);
                    var fileUploadJson ={
                        accessKey : environment.accessKey,
                        secretKey : environment.secretKey,
                        bucketName : environment.s3bucket,
                        folderName : S3key,
                        parentFolder : parentFolder,
                        fileContent : this.fileContent,
                        fileName : this.selectedFiles1.item(0).name,
                        fileSize : this.selectedFiles1.item(0).size
                    }
                    this.AppServiceObj.AwsFileUpload(fileUploadJson,function(returnObj){
                        $('#myModalUploadFile').hide(); 
                        console.log(returnObj);
                        if(returnObj.status == true && returnObj.message == "File Uploaded Successfully"){
                            swal("","File is uploaded successfully","success");
                        }
                        else if(returnObj.status ==false && returnObj.message == "Folder upload limit exceeds"){
                            swal("","Folder upload limit exceeds","warning");
                        }
                        else{
                            swal("","Error Occured","error");
                        }
                    });
                    this.selectedFiles1 = undefined;
                }

                changeDestination() {

                    let _this=this;

                    if (this.selectedSourceObject != "Select Destination") {
                        this.savejobJson.sourceType = parseInt(this.selectedDestinationObject.servertype_id);
                        this.savejobJson.sourceId = parseInt(this.selectedDestinationObject.id);
                    
            
                            this.GetAllApiDestinationJson = '{"accesskey": "'+this.accessKey+'", "secretKey": "'+this.secretKey+'","bucketName" : environment.s3bucket}';
                    
                        console.log("GetAllBucket :   "+this.GetAllApiDestinationJson);
                        this.GetAllApiDestinationJson = JSON.parse(this.GetAllApiDestinationJson)
                        
                            console.log("get bucket contains");
                            _this.destinationdiv = true;
                        
                                _this.SourceTree1 = {
                                    value: ' All Folders',
                                    settings: {
                                        'static': false,
                                        'cssClasses': {
                                            'expanded': 'fa fa-caret-down fa-lg',
                                            'collapsed': 'fa fa-caret-right fa-lg',
                                            'leaf': 'fa fa-lg',
                                            'empty': 'fa fa-caret-right disabled'
                                        },
                                        'templates': {
                                            'node': '<i class="fa fa-bitbucket fa-lg"></i>',
                                            'leaf': '<i class="fa fa-file-o fa-lg"></i>',
                                            'leftMenu': '<i class="fa fa-navicon fa-lg"></i>'
                                        }
                                    },
                                    children: []
                                };
                                (this.Destination.buckets).forEach(function(value, index) {
                                    let object = {
                                        value: " " + value.name,
                                        path: "",
                                        settings: {
                                            isCollapsedOnInit: true
                                        },
                                        id: _this.savejobJson.sourceId + '_' + index,
                                        children: [{
                                            value: " Loading Object ....."
                                        }]
                                    }
                                    _this.SourceTree1.children.push(object)
                                })
                    
                }
                }


                public destinationSelected(item: any): void {

                    this.selectedDestinationTreeObject = item.node.node;
                    var json=JSON.stringify(this.selectedDestinationTreeObject);
                    if(this.selectedDestinationTreeObject.path!=""){
                        console.log("file path not null");
                        this.fileUnderBucket = false;
                        this.filePathDestination = this.selectedDestinationTreeObject.path.toString().split('|')[1]

                    }
                    this.fileNamePreviewDestination = this.selectedDestinationTreeObject.value;
                    console.log("source selected : ******* "+json);
                    if(this.selectedDestinationTreeObject.icon == "fa fa-folder"){
                        console.log("fafa folder");
                        this.isFile=false;
                    }else if(this.selectedDestinationTreeObject.icon == "fa fa-file"){
                        console.log("fafa file");
                        this.isFile = true;
                    }

                    console.log("file path : "+this.filePathDestination);

                }
                public handleMoved(item : any):void{
                    //alert("happening!");
                    this.selectedSourceTreeObject = item.node.node;
                    this.selectedDestinationTreeObject = item.node.parent.node;
                    console.log(item);
                    // console.log(item.node.parent.node);
                    // console.log(item.node.node);
                    this.filePath = this.selectedSourceTreeObject.path.toString().split('|')[1];
                    this.fileNamePreview = this.selectedSourceTreeObject.value;
                    this.filePathDestination = this.selectedDestinationTreeObject.path.toString().split('|')[1];
                    this.fileNamePreviewDestination = this.selectedDestinationTreeObject.value;
                    //this.moveFile();

                }

                public handleExpandedDestination(item: any): void {
                    const oopNodeController = this.treeComponentDestination.getControllerByNodeId(item.node.node.id);
                    //console.log(e.node.node.value.trim() ,e.node.node.path );
                    
                    if (item.node.node.path == "") {
                        var bucketName = item.node.node.value.trim();
                        // var bucketName = environment.s3bucket;

                        var itempath = bucketName + '|';
                        this.GetAllApiDestinationJson['bucketName'] = bucketName;
                        this.GetAllApiDestinationJson['key'] = "";
                        var checkvalue = '';
                        var checkId = 0;
                    } else {
                        var bucketName = (item.node.node.path).split('|')[0];
                        // var bucketName = environment.s3bucket;

                        console.log("bucket name in else :*******   "+bucketName);
                        var key = (item.node.node.path).split('|')[1] + item.node.node.value.trim() + '/';
                        this.GetAllApiDestinationJson['bucketName'] = bucketName;
                        this.GetAllApiDestinationJson['key'] = key;
                        this.awsKey = key;
                        var itempath = (item.node.node.path) + (item.node.node.value.trim()) + '/';
                        var checkId = (key).split('/').length;
                        checkId = checkId - 1;
                        var checkvalue = (key).split('/')[checkId - 1];
                    }
                    let _this = this;
                    this.AppServiceBackendApiObj.GetBucketContian(this.GetAllApiDestinationJson, function(returnObj) {
                        console.log("THIS IS A POINTER 1");
                        var main = _this.extractbucketobject(returnObj.bucket_contents);
                        console.log("THIS IS A POINTER 2");
                        console.log(main)
                        var i = 0;
            
                        let item = [];
                        (main).forEach(function(value, index) {
                            (value).forEach(function(value1, index) {
                                i++;
                                if (checkId == 0) {
                                    if (value1.id == checkId) {
                                        if (typeof value1.files == 'undefined') {
                                            var found = item.some(function(el) {
                                                return el.value.trim() === value1.value && el.icon == 'fa fa-folder';
                                            });
                                            if (!found) {
                                                let obj = {
                                                    id: _this.savejobJson.sourceId + '_' + i,
                                                    settings: {
                                                        isCollapsedOnInit: true,
                                                        'templates': {
                                                            'node': '<i class="fa fa-folder-o fa-lg"></i>',
                                                            'leaf': '<i class="fa fa-file-o fa-lg"></i>',
                                                            'leftMenu': '<i class="fa fa-file fa-lg"></i>'
                                                        }
                                                    },
                                                    icon: 'fa fa-folder',
                                                    value: " " + value1.value,
                                                    path: itempath,
                                                    children: [{
                                                        value: " Loading Object ....."
                                                    }]
                                                };
                                                item.push(obj);
                                            }
                                        } else {
                                            var found = item.some(function(el) {
                                                return el.value.trim() === value1.value && el.icon == 'fa fa-file';;
                                            });
                                            if (!found) {
                                                //no more logic
                                                let obj = {
                                                    id: _this.savejobJson.sourceId + '_' + i,
                                                    settings: {
                                                        isCollapsedOnInit: true,
                                                        'templates': {
                                                            'node': '<i class="fa fa-file-o fa-lg"></i>',
                                                            'leaf': '<i class="fa fa-file-o fa-lg"></i>',
                                                            'leftMenu': '<i class="fa fa-file fa-lg"></i>'
                                                        }
                                                    },
                                                    path: itempath,
                                                    value: " " + value1.value,
                                                    icon: 'fa fa-file'
                                                };
                                                item.push(obj);
                                            }
                                        }
                                    }
                                } else {
                                    if (value1.id == checkId && value[checkId - 1].value == checkvalue) {
                                        if (typeof value1.files == 'undefined') {
                                            var found = item.some(function(el) {
                                                return el.value.trim() === value1.value && el.icon == 'fa fa-folder';
                                            });
                                            if (!found) {
                                                let obj = {
                                                    id: _this.savejobJson.sourceId + '_' + i,
                                                    settings: {
                                                        isCollapsedOnInit: true,
                                                        'templates': {
                                                            'node': '<i class="fa fa-folder-o fa-lg"></i>',
                                                            'leaf': '<i class="fa fa-file-o fa-lg"></i>',
                                                            'leftMenu': '<i class="fa fa-file fa-lg"></i>'
                                                        }
                                                    },
                                                    value: " " + value1.value,
                                                    icon: 'fa fa-folder',
                                                    path: itempath,
                                                    callback: "destination",
                                                    children: []
                                                };
                                                item.push(obj);
                                            }
                                        } else {
                                            var found = item.some(function(el) {
                                                return el.value.trim() === value1.value && el.icon == 'fa fa-file';
                                            });
                                            if (!found) {
                                                let obj = {
                                                    id: _this.savejobJson.sourceId + '_' + i,
                                                    settings: {
                                                        isCollapsedOnInit: true,
                                                        'templates': {
                                                            'node': '<i class="fa fa-file-o fa-lg"></i>',
                                                            'leaf': '<i class="fa fa-file-o fa-lg"></i>',
                                                            'leftMenu': '<i class="fa fa-file fa-lg"></i>'
                                                        }
                                                    },
                                                    value: " " + value1.value,
                                                    icon: 'fa fa-file',
                                                    path: itempath,
                                                    children: []
                                                };
                                                item.push(obj);
                                            };
                                        }
                                    }
                                }
                                oopNodeController.setChildren(item);
                            });
                        });
                    });
            
                }
                
                //rename AWS file
                renameAwsFile(){
                    // this.spinner.show();
                    console.log("key file : "+this.fileNamePreview.toString());
                    console.log("file path : "+this.filePath);
                    console.log("New file : "+this.newFilerename);
                    var renameFile = '{"accessKey": "'+environment.accessKey+'", "secretKey": "'+environment.secretKey+'", "bucketName": "'+environment.s3bucket+'", "path": "'+this.filePath+'","oldFileName":"'+this.fileNamePreview.trim()+'", "newFileName": "'+this.newFilerename+'"}';
                    
                    this.AppServiceObj.RenameAwsFile(renameFile,function(returnObj){
                        $("#myModalRename").hide();
                        console.log(returnObj);
                        if(returnObj.status==true && returnObj.message =="Rename is successful"){
                            swal("","File rename is successful","success");
                        }else{
                            swal("","File can't be renamed","error");
                        }
                    });
                }
              
                //get file details
                getFileDetails(){
                    let _this=this;
                    _this.spinner.show();
                    console.log("key file : "+this.fileNamePreview.toString());
                    console.log("file path : "+this.filePath);
                    this.fileDetailsFileLoc = null;
                    this.fileDetailsFileName = null;
                    this.fileDetailsFileSize = null;
                    this.fileDetailsFileLastModified = null;
                    var S3Key =  this.filePath.trim()+this.fileNamePreview.trim();
                    var fileDetails = '{"accesskey": "'+environment.accessKey+'", "secretKey": "'+environment.secretKey+'", "bucketName": "'+environment.s3bucket+'","key": "'+S3Key.toString()+'"}';
                    console.log("file details req : "+fileDetails);
                    if(this.filePath==""){
                        this.fileDetailsFileLoc = "/"; 
                    } else {
                        this.fileDetailsFileLoc = this.filePath;
        
                    }
                    this.fileDetailsFileName = this.fileNamePreview.trim()
                    var fileDetailsResult = null;
                    this.AppServiceObj.GetFileDetails(fileDetails,function(returnObj){
                        console.log(returnObj);
                        if(returnObj.status==true && returnObj.message=="File Details"){
                            _this.spinner.hide();
                            fileDetailsResult = returnObj;
                            _this.fileDetailsFileSize = returnObj.result.ContentLength + " bytes";
                            _this.fileDetailsFileLastModified = new Date(returnObj.result.LastModified);
                        }
                        if(returnObj.status==false){
                            _this.spinner.hide();
                            $("#myModalFileDetails").hide();
                            swal("","Something went wrong","error");
                        }
                       });
                } 
        
                //download file
                downloadFile()
                {
                    console.log("key file : "+this.fileNamePreview.toString());
                    let filename=this.fileNamePreview.toString();
                    filename=filename.trim();
                    console.log("file path : "+this.filePath);
                    console.log("FileName" + filename)
                    var downloadFile = {
                        accessKey : environment.accessKey,
                        secretKey : environment.secretKey,
                        bucketName : environment.s3bucket,
                        fileName : filename,
                        filePath : this.filePath
                    }
                    console.log(downloadFile);
                    this.AppServiceObj.AwsFileDownload(downloadFile,function(returnObj){
                        console.log("Return Object ",returnObj);
                        if(returnObj.status==true && returnObj.message == "File is downloaded"){
                            swal("","File is downloaded","success");
                        }else{
                            swal("","File cannot be downloaded","error");
                        }
                    });
                }
                onMenuItemSelected()
                {
                    
                }
}



export interface NodeMenuItem {
    name: string;
    action: NodeMenuItemAction;
    cssClass: string;
  }
  
  
  
  export interface NodeMenuItemSelectedEvent {
    nodeMenuItemAction: NodeMenuItemAction;
    nodeMenuItemSelected?: string
  }


  export enum NodeMenuItemAction {
    NewFolder,
    NewTag,
    Rename,
    Remove,
    Custom
  }