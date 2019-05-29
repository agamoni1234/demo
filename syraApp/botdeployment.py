from django.shortcuts import render
from django.http import HttpResponse, HttpRequest , JsonResponse
from .models import *
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json
from django.core import serializers

#create Bot Deployment
@csrf_exempt
@api_view(['POST'])
def createBotDeployment(request):
    customerId = request.POST.get('customerId')
    welcomeMessage = request.POST.get('welcomeMessage')
    backGroundColor = request.POST.get('backGroundColor')
    goalDefination = request.POST.get('goalDefination')
    domainId = request.POST.get('domainId')
    deploymentDate = request.POST.get('deploymentDate')
    deletedDate = request.POST.get('deletedDate')
    isPlanActive = request.POST.get('isPlanActive')
    firstMessage = request.POST.get('firstMessage')
    secondMessage = request.POST.get('secondMessage')
    website = request.POST.get('website')
    apiKey = request.POST.get('apiKey')
    createdDate = request.POST.get('createdDate')
    
    try:
        existingCustomer = Customer.objects.filter(email = customerId).exists()
        if(existingCustomer == True):
            checkBots = BotDeployment.objects.filter(customerId = customerId)
            listUserBots = list(checkBots.values())
            countBots = len(listUserBots)
            
            filterExistingCustomerPlan = CustomerPlan.objects.filter(customerId = customerId).exists()
            filterExistingBotDomain = BotDomain.objects.filter(id = domainId).exists()
            
            checkExistingCustomerPlan = CustomerPlan.objects.filter(customerId = customerId)
            ExistingCustomerPlan = list(checkExistingCustomerPlan.values())
            print(filterExistingCustomerPlan)
            print(filterExistingBotDomain)
            if(filterExistingCustomerPlan == True & filterExistingBotDomain == True):
                for item in ExistingCustomerPlan:
                    checkBotLimit = Plan.objects.filter( id = item["planId_id"]) 
                    userPlanDetails = list(checkBotLimit.values())
                    for item in userPlanDetails:
                        allowedBotLimit = item["allowBotLimit"]
                        print("Allowed Bot limit : " + str(allowedBotLimit))
                        if(countBots < allowedBotLimit):
                            newBotDeployment = BotDeployment(customerId = Customer.objects.get(email = customerId),welcomeMessage = welcomeMessage, backGroundColor = backGroundColor ,goalDefination = goalDefination, domainId = BotDomain.objects.get(id = domainId), deploymentDate = deploymentDate, deletedDate = deletedDate, isPlanActive = isPlanActive, firstMessage = firstMessage, secondMessage = secondMessage, website = website, apiKey = apiKey, createdDate = createdDate )
                            newBotDeployment.save()
                            message = "New bot is deployed successfully"
                            status = 201
                        if(countBots >= allowedBotLimit):
                            message = "Bot limit exceeds. Please upgrade plan"
                            status = 403
            elif(filterExistingCustomerPlan == True & filterExistingBotDomain == False):
                message = "Please select bot domain"
                status = 200
            elif(filterExistingCustomerPlan == False & filterExistingBotDomain == True):
                message = "Please select your plan"
                status = 200
            else:
                message = "Please subscribe for bot"
                status = 200
        else:
            message = "Please register your name!!"
            status = 200
    except:
        message = "Error occured"
        status = 400
    
    return Response({
        'message' : message,
        'status' : status
    })

#delete Bot Deployement
@csrf_exempt
@api_view(['POST'])
def deleteBotDeployment(request):
    customerId = request.POST.get('customerId')
    id = request.POST.get('id')
    try:
        existingBotDeployement = BotDeployment.objects.filter(id = id, customerId = customerId).exists()
        if(existingBotDeployement == True):
            BotDeployment.objects.filter(id = id).delete()
            message = "Your bot is deleted successfully"
            status = 200
        else:
            message = "Please provide proper custome name"
            status = 403
    except: 
        message = "Error occurred"
        status = 400
    return Response({
        'message' : message,
        'status' : status
    })

#update Bot deployement
@csrf_exempt
@api_view(['POST'])
def updateBotDeployment(request):
    id = request.POST.get('id')
    customerId = request.POST.get('customerId')
    welcomeMessage = request.POST.get('welcomeMessage')
    backGroundColor = request.POST.get('backGroundColor')
    goalDefination = request.POST.get('goalDefination')
    domainId = request.POST.get('domainId')
    deploymentDate = request.POST.get('deploymentDate')
    deletedDate = request.POST.get('deletedDate')
    isPlanActive = request.POST.get('isPlanActive')
    firstMessage = request.POST.get('firstMessage')
    secondMessage = request.POST.get('secondMessage')
    website = request.POST.get('website')
    apiKey = request.POST.get('apiKey')
    createdDate = request.POST.get('createdDate')

    try:
        existingBotDeployement = BotDeployment.objects.filter(customerId = customerId).exists()
        if(existingBotDeployement == True):
            checkBotDomain = BotDomain.objects.filter(id = domainId).exists()
            if(checkBotDomain == True):
                botDeploymentObj = BotDeployment.objects.get(customerId = customerId, id = id)
                botDeploymentObj.welcomeMessage = welcomeMessage
                botDeploymentObj.backGroundColor = backGroundColor
                botDeploymentObj.goalDefination = goalDefination
                botDeploymentObj.deletedDate = deletedDate
                botDeploymentObj.isPlanActive = isPlanActive
                botDeploymentObj.firstMessage = firstMessage
                botDeploymentObj.secondMessage = secondMessage
                botDeploymentObj.website = website
                botDeploymentObj.apiKey = apiKey
                botDeploymentObj.createdDate = createdDate
                botDeploymentObj.deploymentDate = deploymentDate
                botDeploymentObj.customerId = Customer.objects.get(email = customerId)
                botDeploymentObj.save()
                message = "Your bot is updated successfully"
                status = 200
            else:
                message = "Please select proper bot domain"
                status = 403
        else:
            message = "User is not subscribed. Please go for it!!"
            status = 403
    except:
        message = "Error occurred. Domain can not be changed!!"
        status = 400
    return Response({
        'status': status,
        'message' : message
    })

#fetch Bot Deployment
@csrf_exempt
@api_view(['POST'])
def fetchBotDeployment(request):
    try:
        customerId = request.POST.get('customerId')
        checkExistingcustomer = BotDeployment.objects.filter(customerId = customerId).exists()
        if(checkExistingcustomer == True):
            checkConsumerBotDeployment = BotDeployment.objects.filter(customerId = customerId)
            dataBotDeployment = list(checkConsumerBotDeployment.values())
            return JsonResponse(dataBotDeployment, safe=False)
        else:
            dataBotDeployment = []
            return JsonResponse(dataBotDeployment, safe=False)
    except:
        return Response({
            'message' : 'Error occured',
            'status' : 400
        })
