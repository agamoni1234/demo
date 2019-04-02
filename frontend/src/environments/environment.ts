// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


// To make it work at local environment replace the followings,
// host : localhost
// replace all the IPs with `localhost`
// replace sqlpath

export const environment = {
  production: false,
  host:'localhost',
  backendUrl:'http://localhost:3000/admin/',
  //backendApiUrl:'http://localhost:8080/', //NOT ANYMORE
  backendApiUrl:'http://localhost:3000/admin/',
  backendPythonApiUrl:'http://localhost:5000/',
  // backendUrl:'http://54.214.107.57:3000/admin/',
  // // backendApiUrl:'http://54.214.107.57:8080/',
  // backendApiUrl:'http://54.214.107.57:3000/admin/',
  // backendPythonApiUrl:'https://54.214.107.57:5000/',


  classname: "com.mysql.jdbc.Driver",
  dburl:"jdbc:mysql://cloudhiti.c0ttn3nzqakk.us-west-2.rds.amazonaws.com:",
  dbport:"3306",
  dbusername:"cloudhiti",
  dbpassword:"kolkata257!",
  dbname3:"cdrepo",

  sqlfilepath:"C:\\Users\\trainee\\Desktop\\Agamoni\\CloudhitiFE\\backend\\queries\\",
  accessKey :"AKIAJ3CQKJCIK5S3ZGEA",
  secretKey : "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",
  s3bucket : "filemanagement-demo"
  // sqlfilepath:"/home/ubuntu/consoleApp/CloudhitiFE/backend/queries/"
 };
