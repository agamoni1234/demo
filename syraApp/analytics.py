from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.shortcuts import render
from time import strptime, strftime, mktime, gmtime
from collections import OrderedDict
import pandas as pd
import collections
import requests
import json
import numpy as np
import os

def home(request):
    return render(request,'syraApp/home.html')

@csrf_exempt
@api_view(['GET','POST'])
def showIntents(request):
    try:
        # modelApiKey = request.POST.get('modelApiKey')
        email = "agamoni@ghosh.in"
        projectName = "Tax"
        dirname = os.path.dirname(__file__)
        fileName = "projects/" + email + "/" + projectName + "/Logs/log.csv"
        filePath = os.path.join(dirname, fileName)
        intentList = []
        list = []
        with open(filePath, encoding="utf8") as f:
            next(f)
            for line in f:
                intentList.append(line.split('||')[4])
        intentDict = {i: intentList.count(i) for i in intentList}
        intentDict_Decending = sorted(intentDict.items(), key=lambda kv: kv[1], reverse=True)[:10]
        for item in intentDict_Decending:
            list.append([item[0], item[1]])
        data = list
        message = "File is read successfully"
        status = 200
    except Exception as e :
        message = str(e)
        status = 400
        data = []
    context = {'intentData' : data, 'message' : message, 'status' : status}
    return render(request, 'syraApp/analytics.html', context = context )
    # return  Response({
    #      'message' : message,
    #      'status' : status,
    #      'data' : data
    #  })


@csrf_exempt
@api_view(['GET','POST'])
def showLinks(request):
    try:
        modelApiKey = request.POST.get('modelApiKey')
        email = "agamoni@ghosh.in"
        projectName = "Tax"
        dirname = os.path.dirname(__file__)
        fileName = "projects/" + email + "/" + projectName + "/Logs/linkLogs.csv"
        filePath = os.path.join(dirname, fileName)
        linksList = []
        list = []
        with open(filePath, encoding="utf8") as f:
            next(f)
            next(f)
            for line in f:
                linksList.append(line.split('||')[2])
        linksDict = {i: linksList.count(i) for i in linksList}
        linksDict_Decending = sorted(linksDict.items(), key=lambda kv: kv[1], reverse=True)[:10]
        totalLinkCount = 0
        for item in linksDict_Decending:
            totalLinkCount += int(item[1])
        for item in linksDict_Decending:
            percentValue = float(item[1])/totalLinkCount*100
            list.append({'name': item[0], 'y' : float("%.2f" % percentValue)})
        data = list
        # print(data)
        message = "File is read successfully"
        status = 200

    except Exception as e:
        message = str(e)
        status = 400
        data = []

    return Response({
        'message' : message,
        'status' : status,
        'linksData' : data
    })

@csrf_exempt
@api_view(['POST'])
def showLinksPerSessions(request):
    try:
        modelApiKey = request.POST.get('modelApiKey')
        email = "agamoni@ghosh.in"
        projectName = "Tax"
        dirname = os.path.dirname(__file__)
        fileName = "projects/" + email + "/" + projectName + "/Logs/linkLogs.csv"
        filePath = os.path.join(dirname, fileName)
        linkFile = open(filePath, encoding="utf8")
        linkData = linkFile.read().replace(" || ", "|").split("\n")
        linkData.pop(0)
        linkData.pop(0)
        linkData.pop(len(linkData) - 1)
        sessiondata = []
        sessionLinkData = []
        df = pd.DataFrame([item.split('|') for item in linkData], columns=['DateTime', 'IpAddress', 'URL', 'Session'])
        groupBySession = df.groupby(['URL'])
        for group in groupBySession:
            Url = group[1]["URL"].values[0]
            sessiondata = group[1]["Session"].values
            print(sessiondata)
            unique_elements, counts_elements = np.unique(sessiondata, return_counts=True)
            # print(unique_elements.items(0))
            sessionLinkData.append({"name" : Url, "data":[{"name": unique_elements.item(0), "value" : counts_elements.item(0)}]})
            # print(np.asarray((unique_elements, counts_elements)))
            # print(sessionLinkData)
            # print(Url)
            # print(sessiondata)
            # listLinks.append({'DateTime' :group[1]["DateTime"].values[0], 'URL' :group[1]["URL"].values[0], 'Session' :group[1]["Session"].values[0], 'IpAddress' :group[1]["IpAddress"].values[0]} )
        print(sessionLinkData)
        message = "File is read successfully"
        status = 200
        sessionData = sessionLinkData
    except Exception as e:
        message = str(e)
        status = 500
    return Response({
        'message': message,
        'status': status,
        'sessionData': sessionData,
    })

@csrf_exempt
@api_view(['GET','POST'])
def showQuestions(request):
    try:
        modelApiKey = request.POST.get('modelApiKey')
        email = "agamoni@ghosh.in"
        projectName = "Tax"
        dirname = os.path.dirname(__file__)
        fileName = "projects/" + email + "/" + projectName + "/Logs/log.csv"
        filePath = os.path.join(dirname, fileName)
        questionList = []
        list = []
        with open(filePath, encoding="utf8") as f:
            next(f)
            for line in f:
                questionList.append(line.split('||')[2])
        questionsDict = {i: questionList.count(i) for i in questionList}
        questionsDict_Decending = sorted(questionsDict.items(), key=lambda kv: kv[1], reverse=True)[:10]
        for item in questionsDict_Decending:
            list.append([item[0], item[1]])
        questionData = list
        message = "File is read successfully"
        status = 200

    except Exception as e:
        message = str(e)
        status = 400
        questionData = []

    return Response({
        'messgae': message,
        'status' : status,
        'questionData' : questionData
    })

@csrf_exempt
@api_view(['GET','POST'])
def showChatterDemographics(request):
    try:
        modelApiKey = request.POST.get('modelApiKey')
        email = "agamoni@ghosh.in"
        projectName = "Tax"
        dirname = os.path.dirname(__file__)
        fileName = "projects/" + email + "/" + projectName + "/Logs/log.csv"
        filePath = os.path.join(dirname, fileName)
        locationList = []
        countryCodeList = []
        regionDataList = []
        with open(filePath, encoding="utf8") as f:
            next(f)
            for line in f:
                locationList.append(line.split('||')[1])
        locationDict = {i: locationList.count(i) for i in locationList}
        locationDict_Decending = sorted(locationDict.items(), key=lambda kv: kv[1], reverse=True)[:10]
        for item in locationDict_Decending:
            ipAddess = item[0].replace(" ", "")
            ipAddessJson = json.loads(getIPDetails(ipAddess))
            countryCode = ipAddessJson["countryCode"]
            country = ipAddessJson["country"]
            countryCodeList.append([country, item[1], countryCode])
        dfRegionObj = pd.DataFrame(countryCodeList, columns=['country', 'value', 'code'])
        dfRegionGroup = dfRegionObj.groupby(["code","country"]).agg('sum')
        for row in dfRegionGroup.iterrows():
            regionDataList.append({'code2': row[0][0], 'value': row[1]["value"], 'code': row[0][0], 'name': row[0][1] })
        message = "File is read successfully"
        status = 200
        data = regionDataList
    except Exception as e:
        message = str(e)
        status = 500
        data = []
    
    return Response({
        'message' : message,
        'status' : status,
        'data' : data
    })

@csrf_exempt
@api_view(['GET','POST'])
def showBotResponse(request):
    try:
        modelApiKey = request.POST.get('modelApiKey')
        email = "agamoni@ghosh.in"
        projectName = "Tax"
        dirname = os.path.dirname(__file__)
        fileName = "projects/" + email + "/" + projectName + "/Logs/log.csv"
        filePath = os.path.join(dirname, fileName)
        botResponseList = []
        dataList = []
        with open(filePath, encoding="utf8") as f:
            next(f)
            for line in f:
                botResponseList.append(line.split('||')[4])
        totalBotResponse = len(botResponseList)
        wrongBotResponse = 0
        for item in botResponseList:
            item = item.rstrip(' ').lstrip(' ')
            if(item == "fallback"):
                wrongBotResponse +=1
        rightBotResponse = (int(totalBotResponse) - int(wrongBotResponse))/totalBotResponse * 100
        wrongBotResponse = wrongBotResponse/totalBotResponse * 100
        dataList.append(['Right Answer' , float("%.2f" % rightBotResponse)])
        dataList.append(['Wrong Answer' , float("%.2f" % wrongBotResponse) ])
        print(dataList)
        message = "File is read successfully"
        status = 200
        data = dataList
    except Exception as e:
        message = str(e)
        status = 500
        data = []
    return Response({
        'message' : message,
        'status' : status,
        'data' : data 
    })


@csrf_exempt
@api_view(['GET','POST'])
def showTiming(request):
    try:
        modelApiKey = request.POST.get('modelApiKey')
        email = "agamoni@ghosh.in"
        projectName = "Tax"
        dirname = os.path.dirname(__file__)
        fileName = "projects/" + email + "/" + projectName + "/Logs/log.csv"
        filePath = os.path.join(dirname, fileName)
        dateList = []
        timeStampList = []
        with open(filePath, encoding="utf8") as f:
            next(f)
            for line in f:
                logDateTime = line.split('||')[0].lstrip(' ').rstrip(' ')
                timestamp = strptime(logDateTime, '%Y-%m-%d %H:%M')
                timeEpoch = mktime(timestamp)
                timeStampList.append(int(timeEpoch))
        timeStampDict = {i: timeStampList.count(i) for i in timeStampList}
        for key, value in timeStampDict.items() :
            dateList.append([(key * 1000),value])
        data = dateList
        message = "File is read successfully"
        status = 200
    except Exception as e:
        message = str(e)
        status = 500
        data = []
    
    return Response({
        'message' : message,
        'status' : status,
        'data' : data
    })


@csrf_exempt
@api_view(['GET','POST'])
def showSessions(request):
    try:
        modelApiKey = request.POST.get('modelApiKey')
        email = "agamoni@ghosh.in"
        projectName = "Tax"
        dirname = os.path.dirname(__file__)
        fileName = "projects/" + email + "/" + projectName + "/Logs/log.csv"
        filePath = os.path.join(dirname, fileName)
        f = open(filePath, encoding = "utf8" )
        data = f.read().split("\n")
        data.pop(0)
        df = pd.DataFrame([item.split('||') for item in data],columns=['DateTime','IpAdress','Questions','Answers','Intents','Entites','session'])
        print(df)
        dfDateGroup = df.groupby(["DateTime"])
        message = "File is read successfully"
        status = 200

    except Exception as e:
        message = str(e)
        status = 500
    
    return Response({
        'message' : message,
        'status' : status
    })


def getIPDetails(ipAddress):
    try:
        url = "https://extreme-ip-lookup.com/json/" + ipAddress
        headers = {
            'Cache-Control': "no-cache"
        }
        response = requests.request("GET", url, headers = headers)
        return response.text
    except Exception as e:
        return str(e)


    




