from flask import Flask,redirect
from flask import request
from flask_cors import CORS
import requests
import boto3
from requests.models import Response
import sys

import csv
import os
import pymysql

import urllib.request
import webbrowser

import TestSendEmail as testSendEmail
import sendEmailUsernamePassword as sendemailusernamepassword

from sklearn.cluster import KMeans

import numpy as np
import pandas as pd
import json


file_path = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)
CORS(app)


@app.route("/", methods=['GET'])
def hello():
  return 'hello'


@app.route("/api/getswift", methods=['POST'])
def getswift():
  getSwiftApi = request.get_json()['getswiftapikey']
  jobType = request.get_json()['jobtype']
  accessKey = request.get_json()['accessKey']
  secretKey = request.get_json()['secretKey']
  key = request.get_json()['key']
  bucket = request.get_json()['bucketName']

  response = {}

  if jobType == 'job':
    # #print('jobtype : job')
    getswift_data_byid_list = []
    URL = "https://app.getswift.co/api/v2/deliveries?apiKey=" + getSwiftApi + "&startDate=2015-01-04T02:08:32.997&filter=Successful"

    try:
      r = requests.get(url=URL)
    except():
      response['status'] = '0'
      response['message'] = 'Max retries exceeded with url'
      sys.exit()

    data = r.json()
    # #print(data)
    getswift_data_byid_list = getSwiftDataJob(data, getswift_data_byid_list)

    pagecount = data['pageCount']
    currentpage = data['currentPage']
    #print(pagecount)

    # #hardcoding current page
    currentpage = 1
    #print(currentpage)
    count = 1
    # the_response = Response()

    while (int(currentpage) < 3):
      try:
        nextPageUrl = data['nextPageUrl']
        r = requests.get(url=nextPageUrl)
        data = r.json()
        getswift_data_byid_list = getSwiftDataJob(data, getswift_data_byid_list)

        currentpage = data['currentPage']

        #print(currentpage)

        # the_response.status = "1"

        response['status'] = '1'

      except():
        count += 1
        # the_response.status = "0"
        # the_response.message = "cannot get data"

        response['status'] = '0'
        response['message'] = 'cannot get data'
        continue
      count += 1
    try:
      #print(getswift_data_byid_list)
      putFileToS3(getswift_data_byid_list, accessKey, secretKey, bucket, key)
      # the_response.message = "uploaded data to S3"

      response['message'] = 'uploaded data to S3'
    except():

      response['status'] = '0'
      response['message'] = 'cannot upload data to S3'

      # getswift_data_byid_list = [{'id':'9334b972-e3f6-4ff3-9bd4-4bb6d3c43358','created':'2018-12-19T06:45:36.94Z','pickupLocation_name':'Firepie Orders'},{'id':'78a9aada-e344-45e9-9ec1-4956993fdae7','created':'2018-12-19T05:55:56.623Z','pickupLocation_name':'Firepie Orders'}]
      # #print(count)
      # #print(getswift_data_byid_list)
      # count += 1
      # currentpage += 1
    # the_response.status = "1"
    response['status'] = '1'

    response_string = '{"status":"' + response['status'] + '","message":"' + response['message'] + '"}'
  return response_string


def getSwiftDataJob(data, getswift_data_byid_list):
  getswift_data_dict = {}
  getswift_data = data['data']

  for eachdata in getswift_data:
    jobId = eachdata['id']
    getswift_eachdata_dict = {}

    # GETTING ID
    getswift_eachdata_dict['id'] = eachdata['id']

    # CREATING TIME
    getswift_eachdata_dict['created'] = eachdata['created']

    # PICKUP DETAILS
    # #print(eachdata['pickupLocation'])
    #print('\n\n')

    getswift_eachdata_dict['pickupLocation_name'] = eachdata['pickupLocation']['name']
    getswift_eachdata_dict['pickupLocation_address'] = eachdata['pickupLocation']['address']
    getswift_eachdata_dict['pickupLocation_phone'] = eachdata['pickupLocation']['phone']
    getswift_eachdata_dict['pickupLocation_postcode'] = eachdata['pickupLocation']['postcode']
    getswift_eachdata_dict['pickupLocation_suburb'] = eachdata['pickupLocation']['suburb']

    # DROPOFF DETAILS
    getswift_eachdata_dict['dropoffLocation_name'] = eachdata['dropoffLocation']['name']
    getswift_eachdata_dict['dropoffLocation_address'] = eachdata['dropoffLocation']['address']
    getswift_eachdata_dict['dropoffLocation_phone'] = eachdata['dropoffLocation']['phone']
    getswift_eachdata_dict['dropoffLocation_postcode'] = eachdata['dropoffLocation']['postcode']
    getswift_eachdata_dict['dropoffLocation_suburb'] = eachdata['dropoffLocation']['suburb']

    # CURRENT STATUS
    getswift_eachdata_dict['currentStatus'] = eachdata['currentStatus']

    # DRIVER DETAILS
    getswift_eachdata_dict['driver_identifier'] = eachdata['driver']['identifier']
    getswift_eachdata_dict['driver_name'] = eachdata['driver']['name']
    getswift_eachdata_dict['driver_phone'] = eachdata['driver']['phone']
    getswift_eachdata_dict['driver_photoUrl'] = eachdata['driver']['photoUrl']
    getswift_eachdata_dict['driver_email'] = eachdata['driver']['email']
    getswift_eachdata_dict['driverTip'] = eachdata['driverTip']

    # PICKUP TIME
    getswift_eachdata_dict['pickupTime'] = eachdata['pickupTime']

    # DROPOFF TIME
    getswift_eachdata_dict['dropoffTime_earliestTime'] = eachdata['dropoffTime']['earliestTime']
    getswift_eachdata_dict['dropoffTime_latestTime'] = eachdata['dropoffTime']['latestTime']

    # Reference
    getswift_eachdata_dict['reference'] = eachdata['reference']

    # deliveryInstructions
    getswift_eachdata_dict['deliveryInstructions'] = eachdata['deliveryInstructions']

    # deliveryFee
    getswift_eachdata_dict['deliveryFee'] = eachdata['deliveryFee']

    # pickupTime
    getswift_eachdata_dict['pickupTime'] = eachdata['pickupTime']

    # Distance_Straight_Km
    getswift_eachdata_dict['Distance_Straight_Km'] = eachdata['estimatedDistance']['kilometres']

    # Distance_Straight_Miles
    getswift_eachdata_dict['Distance_Straight_Km'] = eachdata['estimatedDistance']['miles']

    # ADDING DETAILS FOR EACH DATA INTO A DICTIONARY JOB ID AS KEY
    getswift_data_dict[jobId] = getswift_eachdata_dict

    getswift_data_byid_list.append(getswift_eachdata_dict)
    return getswift_data_byid_list


def putFileToS3(getswift_data_byid_list, accessKey, secretKey, bucket, key):
  myFile = open(file_path + '/getswiftdata.csv', 'w')
  with myFile:
    # myFields = ['id', 'created','pickupLocation_name','pickupLocation_address',
    #             'pickupLocation_phone','pickupLocation_postcode','pickupLocation_suburb',
    #             'dropoffLocation_name','dropoffLocation_address','dropoffLocation_phone',
    #             'dropoffLocation_postcode','dropoffLocation_suburb','currentStatus',
    #             'driver_identifier','driver_name','driver_phone','driver_photoUrl','driver_email',
    #             'pickupTime','dropoffTime_earliestTime','dropoffTime_latestTime']

    myFields = ['GetSwift_Job_Id', 'Reference', 'Current_Stage', 'Subtotal_Price', 'Total_Price', 'Delivery_Price',
                'Tip', 'Tax', 'Created_UTC', 'Completed_UTC',
                'Available_Date_UTC', 'Time_Zone', 'Created_Local', 'Urgency', 'Delivery_Instructions', 'On_Commission',
                'Percentage_Driver_Fee',
                'Payment_At_Pickup', 'Merchant_Name', 'Driver_Name', 'Driver_ID', 'Pickup_Address', 'Pickup_Suburb',
                'Pickup_Postcode', 'Pickup_Name',
                'Pickup_Email', 'Pickup_Phone', 'Destination_Adress', 'Destination_Suburb', 'Destination_Postcode',
                'Destination_Name', 'Destination_Email',
                'Destination_Phone', 'Available_To_Accept', 'Accepted_To_Pickup', 'Pickup_To_Destination',
                'Accepted_to_Completed', 'Total_Job_Time',
                'Available_Time_Local', 'Received_Local_Time', 'Accepted_Local_Time', 'Pickedup_Local_Time',
                'Completed_Local_Time',
                'Cancelled_Local_Time', 'Cancellation_Notes', 'Total_Item_Lines', 'Total_Item_Qty',
                'Distance_Straight_Km', 'Distance_Straight_Miles',
                'Distance_By_Road_Source', 'Distance_By_Road_Km', 'Distance_By_Road_Miles', 'Purchase_Receipt_Total',
                'Rating', 'Rating_Comments',
                'Expected_Finish_Time_Earliest', 'Expected_Finish_Time_Latest', 'Notes', 'Arrived_Pickup_UTC',
                'Arrived_Dropoff_UTC', 'Source',
                'Tracking_link_visited', 'Driver_Match_key']
    writer = csv.DictWriter(myFile, fieldnames=myFields)
    writer.writeheader()
    for eachdata in getswift_data_byid_list:
      # #print(eachdata)
      writer.writerow({'GetSwift_Job_Id': eachdata['id'],
                       'Reference': eachdata['reference'],
                       'Current_Stage': eachdata['currentStatus'],
                       'Subtotal_Price': '0',
                       'Total_Price': '0',
                       'Delivery_Price': '0',
                       'Tip': eachdata['driverTip'],
                       'Tax': '0',
                       'Created_UTC': eachdata['created'],
                       'Completed_UTC': '0',
                       'Available_Date_UTC': '0',
                       'Time_Zone': '0',
                       'Created_Local': '0',
                       'Urgency': '0',
                       'Delivery_Instructions': eachdata['deliveryInstructions'].replace(',', ''),
                       'On_Commission': '0',
                       'Percentage_Driver_Fee': eachdata['deliveryFee'],
                       'Payment_At_Pickup': '0',
                       'Merchant_Name': '0',
                       'Driver_Name': eachdata['driver_name'],
                       'Driver_ID': eachdata['driver_identifier'],
                       'Pickup_Address': eachdata['pickupLocation_address'].replace(',', ''),
                       'Pickup_Suburb': eachdata['pickupLocation_suburb'].replace(',', ''),
                       'Pickup_Postcode': eachdata['pickupLocation_postcode'].replace(',', ''),
                       'Pickup_Name': eachdata['pickupLocation_name'].replace(',', ''),
                       'Pickup_Email': '',
                       'Pickup_Phone': eachdata['pickupLocation_phone'].replace(',', ''),
                       'Destination_Adress': eachdata['dropoffLocation_address'].replace(',', ''),
                       'Destination_Suburb': eachdata['dropoffLocation_suburb'].replace(',', ''),
                       'Destination_Postcode': eachdata['dropoffLocation_postcode'].replace(',', ''),
                       'Destination_Name': eachdata['dropoffLocation_name'].replace(',', ''),
                       'Destination_Email': '',
                       'Destination_Phone': eachdata['dropoffLocation_phone'].replace(',', ''),
                       'Available_To_Accept': '',
                       'Accepted_To_Pickup': '',
                       'Pickup_To_Destination': '',
                       'Accepted_to_Completed': '',
                       'Total_Job_Time': '',
                       'Available_Time_Local': '',
                       'Received_Local_Time': '',
                       'Accepted_Local_Time': '',
                       'Pickedup_Local_Time': eachdata['pickupTime'],
                       'Completed_Local_Time': '',
                       'Cancelled_Local_Time': '',
                       'Cancellation_Notes': '',
                       'Total_Item_Lines': '',
                       'Total_Item_Qty': '',
                       'Distance_Straight_Km': eachdata['Distance_Straight_Km'],
                       'Distance_Straight_Miles': eachdata['Distance_Straight_Km'],
                       'Distance_By_Road_Source': '',
                       'Distance_By_Road_Km': '',
                       'Distance_By_Road_Miles': '',
                       'Purchase_Receipt_Total': '',
                       'Rating': '',
                       'Rating_Comments': '',
                       'Expected_Finish_Time_Earliest': eachdata['dropoffTime_earliestTime'],
                       'Expected_Finish_Time_Latest': eachdata['dropoffTime_latestTime'],
                       'Notes': '',
                       'Arrived_Pickup_UTC': '',
                       'Arrived_Dropoff_UTC': '',
                       'Source': '',
                       'Tracking_link_visited': '',
                       'Driver_Match_key': ''})

      # 'dropoffLocation_name': eachdata['dropoffLocation_name'].replace(',',''),
      # 'dropoffLocation_address': eachdata['dropoffLocation_address'].replace(',',''),
      # 'dropoffLocation_phone': eachdata['dropoffLocation_phone'],
      # 'dropoffLocation_postcode': eachdata['dropoffLocation_postcode'],
      # 'dropoffLocation_suburb': eachdata['dropoffLocation_suburb'].replace(',',''),
      # 'driver_phone': eachdata['driver_phone'],
      # 'driver_photoUrl': eachdata['driver_photoUrl'].replace(',',''),
      # 'driver_email': eachdata['driver_email'].replace(',',''),
      # 'dropoffTime_earliestTime': eachdata['dropoffTime_earliestTime'],
      # 'dropoffTime_latestTime': eachdata['dropoffTime_latestTime']})
  session = boto3.Session(
    aws_access_key_id=accessKey,
    aws_secret_access_key=secretKey,
  )
  s3 = session.resource('s3')

  s3.meta.client.upload_file(file_path + '/getswiftdata.csv', bucket, key)
  os.remove(file_path + '/getswiftdata.csv')


@app.route("/api/sendemailusernamepassword", methods=['POST'])
def sendEmailUsernamePwd():
  try:
    sendemailusernamepassword.sendEmailUsernamePassword(request.get_json())
    status = 'true'
    message = 'email sent'
  except():
    #print('exception')
    status = 'false'
    message = 'email cannot be sent'
  response_string = '{"status":"' + status + '","message":"' + message + '"}'

  return response_string


@app.route("/api/sendemail", methods=['POST'])
def sendEmail():
  try:
    testSendEmail.sendEmail(request.get_json())
    status = 'true'
    message = 'email sent'
  except():
    #print('exception')
    status = 'false'
    message = 'email cannot be sent'
  response_string = '{"status":"' + status + '","message":"' + message + '"}'

  return response_string


@app.route("/api/authenticate", methods=['GET'])
def aunthenticate():
  try:

    conn = pymysql.connect(host='cloudhiti.c0ttn3nzqakk.us-west-2.rds.amazonaws.com', password="kolkata257!",
                           user="cloudhiti")
    cursor = conn.cursor()

    args = request.args.to_dict()
    # username = args['user']
    uuid = args['uuid']

    # UNMASK NOW
    # uuid = uuid[::-1]
    # UNMASKING ENDS
    
    sql1 = "SELECT * from cdrepo.users_common WHERE uuid = %s"
    # params = (username,uuid)  
    
    cursor.execute(sql1, uuid)
    message = str(args)
    number_of_rows = str(len(cursor.fetchall()))

    if int(number_of_rows) > 0:
      status = 'true'
      message = 'Validated'
    else:
      status = 'false'
      message = 'Not Validated'


    if status == 'true':
          sql2 = "UPDATE cdrepo.users_common set status = 'active' where uuid=%s"
          affected_rows = cursor.execute(sql2, uuid)

          cursor.execute("SELECT * from cdrepo.users_common where uuid=%s",uuid)
          result_set = cursor.fetchall()

          sql_insert_users_statement = ("INSERT INTO cdrepo.users VALUES(%s,%s,%s,%s,%s,%s,%s,%s)")
          sql_insert_users_data = (result_set[0][11],result_set[0][0],result_set[0][1],result_set[0][2],result_set[0][3],'6','null','')
          cursor.execute(sql_insert_users_statement,sql_insert_users_data)

          conn.commit()

          # if(affected_rows > 0):
          #   webbrowser.open('http://54.214.107.57:3000/login',new=0)

  except():
    status = 'false'
    message = 'Not validataed'


  finally :
    conn.close()

  response_string = '{"status":"' + status + '","message":"' + message + '","result": "'+number_of_rows+'" }'

  # requests.get('http://54.214.107.57:3000/admin/login?username='+username+'&password='+result_set[0][1])


  # return response_string
  try :
    # return redirect('http://54.214.107.57:3000/login',code=302)
    # url = str('http://54.214.107.57:3000/login?username=' + username + '&password=' + password)
    # print(url)
    # return redirect('http://54.214.107.57:3000/login',code=302) #free EC2
    # return redirect('http://34.217.146.176:3000/login',code=302) #Paid EC2
    return redirect('http://localhost:3000/login',code=302)
    # this.http.get(this.backendUrl+'login?username='+username+'&password='+password)
    # return redirect('http://54.214.107.57:3000/login?username=' + result_set[0][3] + '&password=' + result_set[0][1])
    # print(r)

  except (err):
    print (err)
  

@app.route("/api/passwordchangeauth1", methods=['GET'])
def passwordchangeauth1():
  try:

    conn = pymysql.connect(host='cloudhiti.c0ttn3nzqakk.us-west-2.rds.amazonaws.com', password="kolkata257!",
                           user="cloudhiti")
    cursor = conn.cursor()

    args = request.args.to_dict()
    
    uuid = args['uuid']

    sql1 = "SELECT * from cdrepo.users WHERE temporary_uuid = %s"
    
    print("SQL Qry : ",sql1)
    cursor.execute(sql1, uuid)
    message = str(args)
    # number_of_rows = str(len(cursor.fetchall()))

    # if int(number_of_rows) > 0:
    #   status = 'true'
    #   message = 'Success'
    #   print("# of rows : "+number_of_rows)
    # else:
    #   status = 'false'
    #   message = 'Email Doesn\'t exist'
    #   print("# of rows : "+number_of_rows)


    listOfData = cursor.fetchall()
    print(listOfData)
    email_fetched = ''
    for data in listOfData :
      email_fetched = data[1]
      print("email_fetched : "+email_fetched)
      # cursor.execute("UPDATE cdrepo.users SET temporary_uuid=null where email=%s",email_fetched)

    print("email_fetched : "+email_fetched)
    # try:
      # cursor.execute("UPDATE cdrepo.users SET temporary_uuid=null where email=%s",email_fetched)
    # except(er):
      # print(er)

    conn.commit()

  except(err):
    status = 'false'
    message = 'Not validataed'
    print(err)


  finally :
    conn.close()

  response_string = '{"status":"true" }'


  try :
 
    # return redirect('http://54.214.107.57:3000/resetpassword?uuid='+uuid,code=302) #free EC2
    return redirect('http://localhost:3000/resetpassword?uuid='+uuid,code=302)
    # return redirect('http://34.217.146.176:3000/resetpassword?uuid='+uuid,code=302) #Paid EC2
  

  except (err):
    print (err)





@app.route("/api/ml/getcluster", methods = ['GET'])
def getClusters():
    dataset = pd.read_csv('Iris.csv')
    x = dataset.iloc[:, [1, 2, 3, 4]].values
    # Finding the optimum number of clusters for k-means classification

    wcss = []

    for i in range(1, 11):
        kmeans = KMeans(n_clusters=i, init='k-means++', max_iter=300, n_init=10, random_state=0)
        kmeans.fit(x)
        wcss.append(kmeans.inertia_)



    # Applying kmeans to the dataset / Creating the kmeans classifier

    kmeans = KMeans(n_clusters=3, init='k-means++', max_iter=300, n_init=10, random_state=0)
    y_kmeans = kmeans.fit_predict(x)
    sample_test = np.array([[5.7, 3.8, 1.7, 0.3], [5.7, 3.8, 1.7, 0.3], [5.7, 3.8, 1.7, 0.3], [5.7, 3.8, 1.7, 10.3]])
    second_test = sample_test.reshape(1, -1)
    print(kmeans.predict(sample_test))

    dataSentosa = []
    dataVersi = []
    dataVirginica = []

    # for i in range(10) :
    #     data.append( range(i,10) )

    i = 0
    for item in y_kmeans:
        i += 1
        if (i < 38):
            # if(item == 0,0):
            # print(x[y_kmeans == 0, 0][i], x[y_kmeans == 0, 1][i])

            dataSentosa.append([x[y_kmeans == 0, 0][i], x[y_kmeans == 0, 1][i]])
            dataVersi.append([x[y_kmeans == 1, 0][i], x[y_kmeans == 1, 1][i]])
            dataVirginica.append([x[y_kmeans == 2, 0][i], x[y_kmeans == 2, 1][i]])

    # print(dataSentosa)
    # print(dataVersi)
    # print(dataVirginica)

    data = {}
    data['cluster1'] = dataSentosa
    data['cluster2'] = dataVersi
    data['cluster3'] = dataVirginica

    json_data = json.dumps(data)

    print(json_data)







    # Visualising the clusters
    # plt.scatter(x[y_kmeans == 0, 0], x[y_kmeans == 0, 1], s=100, c='red', label='Iris-setosa')
    # plt.scatter(x[y_kmeans == 1, 0], x[y_kmeans == 1, 1], s=100, c='blue', label='Iris-versicolour')
    # plt.scatter(x[y_kmeans == 2, 0], x[y_kmeans == 2, 1], s=100, c='green', label='Iris-virginica')
    #
    # # Plotting the centroids of the clusters
    # plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], s=100, c='yellow', label='Centroids')
    # plt.legend()
    # plt.show()

    response = {}



    try:

        response['status'] = '1'
        response['message'] = json_data
    except Exception as e:
        print(e)
        response['status'] = '0'
        response['message'] = 'cluster not formed successfully'
    response_string = '{"status":"' + response['status'] + '","message":"' + response['message'] + '"}'

    return json_data







if __name__ == "__main__":


  app.run(host='0.0.0.0')