var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var Twitter = require('twitter');
var config = require('./config.js');
var Sentiment = require('sentiment');
var fs = require('fs');
var path = require("path");
var Aws=require('aws-sdk');
var bucket_contents = [];
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const dbConnection = require('./db');
const folderSize = Number('1024000');
var VerifyToken = require('./Verify');
var data=null;

router.use(function (user, req, res, next) {
  res.status(200).send(user);
});

//Added by RJN - JAN,28th
router.post('/encrypt',function(req, res, next) {
  let reqobj= req.body;
  var password=reqobj.text;

  var hashedPassword = bcrypt.hashSync(password, 8);
  res.status(200).send({ result: hashedPassword});
});

router.get('/twitterDemo',VerifyToken,function(req, res, next) {
    var T = new Twitter(config);

    console.log("RQST ::: ",req.headers.data);
  
    var params = {
        q: req.headers.data,
        count: 20,
        result_type: 'recent',
        lang: 'en'
    }
    T.get('search/tweets', params, function(err, data) {
        if(!err){
            var tweets = data.statuses;
            var sentiment = new Sentiment();
            tweets.forEach(tweet => {
              let txt = tweet.retweeted_status ? tweet.retweeted_status.text : tweet.text;
              let txt_removedurl = txt.split(/ |\n/).filter(v => !v.startsWith('http')).join(' ');
              let txt_final = txt_removedurl.replace(/\s([@][\w_-]+)/g,'');

              let result = sentiment.analyze(txt_final);
              let score = parseFloat(result['score']);
              let sentiment_score = "";
              if (score > 0){
                sentiment_score = "Positive"
              }
              else if(score < 0){
                sentiment_score = "Negative"
              }
              else{
                sentiment_score = "Neutral"
              }
              tweet['sentiment_score'] = sentiment_score;
              tweet['sentiment_score_raw'] = score;              
            });
            console.log("Tweets : ",tweets);
            res.status(200).send({ result: tweets,status: true });
  
        } else {
            console.log(err);
        }
    });
});

//REPLACEMENT OF JAVA JOB - QUERY BACKEND.
router.post('/api/reporting/querybackend',function(req, res, next) {

  let connection = dbConnection.dbConnection();
  
  fs.readFile(req.body['sqlPath'], 'utf-8', (err, sql) => { 
      if (err) throw err; 

      var param = req.body['parameters'];
      param.forEach(element => {
        sql = sql.replace("%s",element);
      });

      var sql_final = sql;

      connection.query(sql_final, function (error, results, fields) {
        connection.end();
        if (error) return res.status(500).send({ status: false })
        console.log("Results : ",results,fields);
        res.status(200).send({ result: results,status: true });
      });
  });
});

//to check existing folder in s3
router.post('/checkExistingFolder',VerifyToken,function(req,res){
    var accessKey = req.body.accessKey;
    var secretKey = req.body.secretKey;
    var bucketName = req.body.bucketName;
    var folderName = req.body.folderName;
    var s3=new Aws.S3({
      accessKeyId:accessKey,
      secretAccessKey:secretKey
    });
    var checkFolderParam = {
      Bucket:bucketName,
      Prefix:folderName
    };
    s3.listObjects(checkFolderParam,function(err,data){
      if(err)
      {
        res.status(500).send({result:err,status:false,message:"Internal error"})
        console.log(err);
      }
      else{
        console.log(data);
        console.log(data.Contents.length);
        if(data.Contents==0)
        {
          res.status(404).send({result:data,status:true,message:"Folder is not found"});
        }
        if(data.Contents.length!=0){
          res.status(200).send({result:data,status:true,message:"Folder is found"});
        }
      }
    });
});

//to show contents of bucket
router.post('/showBucketContain',VerifyToken,function(req,res){
    bucket_contents =[];
    var accessKey = req.body.accesskey;
    var secretKey = req.body.secretKey;
    var bucketName = req.body.bucketName;
    var folderName = req.body.folderName;
    var s3=new Aws.S3({
      accessKeyId:accessKey,
      secretAccessKey:secretKey
    });
    
    var bucketParam={
      Bucket:bucketName,
      Prefix:folderName+"/"
    };

    s3.listObjects(bucketParam,function(err,data){
      console.log(bucketParam);
      if(err){
        console.log("Error is "+err);
        res.status(500).send({result:err,status:false,message:"Error occoured"})
      }
      else{
        data.Contents.forEach(element => {
          var elementData = {
            bucketName : bucketName,
            key : element.Key,
            size : element.Size,
            lastModified : element.LastModified,
            storageClass : element.StorageClass,
            owner : element.Owner,
            etag : element.ETag
          }
          bucket_contents.push(elementData);
        });
        res.status(200).send({bucket_contents,status:true,message:"Succcess!!"});
      }
    });
});

//to create folder in s3
router.post('/createFolderS3',VerifyToken,function(req,res){
    var accessKey = req.body.accessKey;
    var secretKey = req.body.secretKey;
    var bucketName = req.body.bucketName;
    var folderName = req.body.folderName+"/";
    var s3=new Aws.S3({
      accessKeyId:accessKey,
      secretAccessKey:secretKey
    });
    var params={
      Bucket:bucketName,
      Key:folderName,
      Body: JSON.stringify("", null, 5)
    };
    //Folder Upload
    s3.upload(params, function(s3Err, data) {
    if (s3Err)
    {
      console.log(s3Err);
      return res.status(500).send({ result:s3Err,status: "0" })
      throw s3Err;
    }
    else{
        console.log("-----------Folder created successfully-----------");
        var foldername = folderName;
        var comment = "Folder has been successfully ceated";
        var allObjects =  bucket_contents;
        return res.status(200).send({foldername,comment,allObjects,status: "1" })
      }
    });
});

function base64Encode(file) {
  var body = fs.readFileSync(file);
  return body.toString('base64');
}


//to upload files in existing folder
router.post('/uploadFileS3',VerifyToken,function(req,res){
    var accessKey = req.body.accessKey;
    var secretKey = req.body.secretKey;
    var bucketName = req.body.bucketName;
    var uploadedFileName = req.body.folderName;
    var parentFolder = req.body.parentFolder;
    var uploadedFileSize = req.body.fileSize;
    var fileContent = req.body.fileContent;
    var S3FolderSize = (null-0) ;
    
    //S3 access keys
    var s3=new Aws.S3({
      accessKeyId:accessKey,
      secretAccessKey:secretKey
    });
    var listObjectParam={
      Bucket:bucketName,
      Prefix:parentFolder+"/"
    };
    // console.log(listObjectParam);
    s3.listObjects(listObjectParam, function(err, data) {
      if (err)
      {
        return res.status(500).send({ status: false })
        console.log(err, err.stack);
      } 
      else
      {
        console.log(data.Contents);
        data.Contents.forEach(element => {element.Size
          S3FolderSize += ((element.Size)-0);
        });
        S3FolderSize += uploadedFileSize;
      }
      // console.log("File Content is : ",fileContent);
      if(S3FolderSize<=folderSize)
      {
        var uploadObject={
          Bucket:bucketName,
          Key:uploadedFileName,
          Body:fileContent,
          ACL: 'public-read'
        };
        // console.log(uploadObject);
        s3.upload(uploadObject, function(s3Err, data){
          if (s3Err)
          {
            console.log(s3Err);
            return res.status(500).send({ result:s3Err,status: false })
            throw s3Err;
          }
          else{
            console.log("---------------File Uploaded Successfully------------");
            s3.listObjects(listObjectParam,function(err,data){
              if (err)
              {
                return res.status(500).send({ status: false })
                console.log(err, err.stack);
              }
              else{
                console.log("-----------Show Details after uploading file---------");
                console.log(data);
                res.status(200).send({result:data,status:true,message:"File Uploaded Successfully"});
              }
            });
          }
        });
      }
      else{
        return res.status(500).send({ status: false,message:"Folder upload limit exceeds" })
      }
    });
});

//to delete Object
router.post('/deleteObject',VerifyToken,function(req,res){
  
  var accessKey = req.body.accessKey;
  var secretKey = req.body.secretKey;
  var bucketName = req.body.bucketName;
  var folderName = req.body.folderName;
  var parentFolder = req.body.parentFolder;
  // var fileName = req.body.fileName;

  var s3=new Aws.S3({
    accessKeyId:accessKey,
    secretAccessKey:secretKey
  });
  
  var deleteParam={
    Bucket:bucketName,
    Key:folderName
  };

  s3.deleteObject(deleteParam,function(err,data){
    if(err){
      console.log(err);
      res.status(500).send({result:err,status:false,message:"Object isn't deleted"});
    }
    else{
      console.log(data);
      setTimeout(function() {
        var bucketParam={
          Bucket:bucketName,
          Prefix: parentFolder+"/"
        };
        s3.listObjects(bucketParam,function(err,data){
          console.log(bucketParam);
          if(err){
            res.status(500).send({result:err,status:false,message:"Error occoured"})
          }
          else{
            data.Contents.forEach(element => {
              var elementData = {
                bucketName : bucketName,
                key : element.Key,
                size : element.Size,
                lastModified : element.LastModified,
                storageClass : element.StorageClass,
                owner : element.Owner,
                etag : element.ETag
              }
              bucket_contents.push(elementData);
            });
          }
        });
        console.log(bucket_contents);
        res.status(200).send({bucket_contents,status:true,message:"Object is deleted successfully"});
    }, 4000);
    }
  })
})

//to download Object
router.post('/downloadObject',VerifyToken,function(req,res){
  var accessKey = req.body.accessKey;
  var secretKey = req.body.secretKey;
  var bucketName = req.body.bucketName;
  var filePath = req.body.filePath;
  var fileName = req.body.fileName;

  var s3=new Aws.S3({
    accessKeyId:accessKey,
    secretAccessKey:secretKey
  });
  
  var downloadParam={
    Bucket:bucketName,
    Key: filePath + fileName
  };
  // var tempFileName = path.join('/Downloads',fileName);
  // var tempFile = fs.createWriteStream(tempFileName);
  // s3.getObject(downloadParam).createReadStream().pipe(tempFile);
  s3.getObject(downloadParam,function(err,data){
    if(err)
    {
      res.status(500).send({result:err,status:false,message:"Download failed"});
    }
    else{
      fs.writeFileSync(fileName,data.Body.toString());
      res.status(200).send({message:"File is downloaded",status:true});
    }
  });

});

//to rename file
router.post('/renameObject',VerifyToken,function(req,res){
  var accessKey = req.body.accessKey;
  var secretKey = req.body.secretKey;
  var bucketName = req.body.bucketName;
  var oldName = req.body.oldFileName;
  var newName = req.body.newFileName;
  var path = req.body.path;
  
  var s3=new Aws.S3({
    accessKeyId:accessKey,
    secretAccessKey:secretKey
  });

  var renameParam={
    Bucket : bucketName,
    Key : path + newName,
    CopySource : bucketName + "/" + path + oldName
  };

  var deleteParam={
    Bucket:bucketName,
    Key: path + oldName
  }
  s3.copyObject(renameParam,function(err,data){
    console.log(renameParam);
    if(err){
      console.log("First Error " + err);
      res.status(500).send({result:err,status:false,message:"Internal error occured"})
    }
    else{
      console.log(data);
      s3.deleteObject(deleteParam,function(s3err,deldata){
        if(s3err){
          console.log("" + s3err);
        }
        else{
          console.log(data);
          res.status(200).send({result:data,status:true,message:"Rename is successful"});
        }
      })
    }
  })
});

//to get file details 
router.post('/getFileDetail',VerifyToken,function(req,res){
  var accessKey = req.body.accesskey;
  var secretKey = req.body.secretKey;
  var bucketName = req.body.bucketName;
  var key = req.body.key;

  var s3=new Aws.S3({
    accessKeyId : accessKey,
    secretAccessKey : secretKey
  });
  var fileParam = {
    Bucket:bucketName,
    Key: key
  }
  s3.headObject(fileParam,function(err,data){
    if(err){
      console.log(err);
      res.status(500).send({result:err,status:false,message:"Something went wrong"})
    }
    else{
      console.log("File details ",data);
      res.status(200).send({result:data,status:true,message:"File Details"})
    }
  });
});

module.exports = router;