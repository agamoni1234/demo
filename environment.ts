// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  backendUrl:'http://localhost:3000/admin/',
  backendApiUrl:'http://localhost:8080/',
  backendPythonApiUrl:'https://localhost:5000/',


  classname: "com.mysql.jdbc.Driver",
  dburl:"jdbc:mysql://cloudhiti.c0ttn3nzqakk.us-west-2.rds.amazonaws.com:",
  dbport:"3306",
  dbusername:"cloudhiti",
  dbpassword:"kolkata257!",
  dbname:"firepie",
  tablename:"firepieorders",

  dbname2:"cloudhiti",
  tablename2:"getswift_api_deliveries_latest",
  tablename3:"cdr_new_mockupdata",
  dbname3:"cdrepo",


  keyname:"twitterstreaming_pizza_100_149_1547445134.txt",
  bucketname:"firepies3",

  sqlfilepath:"/home/rajan/ClouDhiti/Cloudhiti_ui/Cloudhiti2018/CloudhitiFE/backend/queries/",
  accessKey :"AKIAJ3CQKJCIK5S3ZGEA",
  secretKey : "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"
 };
