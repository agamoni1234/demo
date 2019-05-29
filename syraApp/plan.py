from django.shortcuts import render
from django.http import HttpResponse, HttpRequest , JsonResponse
from .models import *
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json
from django.core import serializers

#Insert value in Plan
@csrf_exempt
@api_view(['POST'])
def planCreate(request):
    name = request.POST.get('name')
    planTypeId = request.POST.get('planTypeId')
    monthlyCharge = request.POST.get('monthlyCharge')
    setupFees = request.POST.get('setupFees')
    contarctInMonth = request.POST.get('contarctInMonth')
    siteSpecification = request.POST.get('siteSpecification')
    knowledgeSpecification = request.POST.get('knowledgeSpecification')
    allowBotLimit = request.POST.get('allowBotLimit')
    initialTraining = request.POST.get('initialTraining')
    advanceTraining = request.POST.get('advanceTraining')
    textQueryPermonth = request.POST.get('textQueryPermonth')
    scrapping = request.POST.get('scrapping')
    entity = request.POST.get('entity')
    intent = request.POST.get('intent')
    logRetainingDay = request.POST.get('logRetainingDay')
    analyticsPlanId = request.POST.get('analyticsPlanId')
    websiteEmbedding = request.POST.get('websiteEmbedding')
    facebookEmbedding = request.POST.get('facebookEmbedding')
    slackEmbedding = request.POST.get('slackEmbedding')
    skypeEmbedding = request.POST.get('skypeEmbedding')
    telegramEmbedding = request.POST.get('telegramEmbedding')
    kikEmbedding = request.POST.get('kikEmbedding')
    supportId = request.POST.get('supportId')

    try:
        if(name == ""):
            message = "Please provide proper plan name"
            status = 400
        else:
            checkExistingPlan = Plan.objects.filter(name = name).exists()
            if(checkExistingPlan == True):
                message = "Plan Name already exists"
                status = 409
            else:
                checkPlanType = PlanType.objects.filter(id = planTypeId).exists()
                checkAnalyticsPlan = AnalyticsPlan.objects.filter(id = analyticsPlanId).exists()
                checkSupportAvailability = SupportAvailability.objects.filter(id = supportId).exists()
                if(checkPlanType == True & checkAnalyticsPlan == True & checkSupportAvailability == True):
                    newPlanObj = Plan(name = name, planTypeId = PlanType.objects.get(id = planTypeId), monthlyCharge= monthlyCharge, setupFees = setupFees, contarctInMonth = contarctInMonth, siteSpecification = siteSpecification, knowledgeSpecification =knowledgeSpecification, allowBotLimit = allowBotLimit, initialTraining = initialTraining, advanceTraining = advanceTraining, textQueryPermonth = textQueryPermonth, scrapping = scrapping, entity = entity, intent = intent, logRetainingDay = logRetainingDay, analyticsPlanId = AnalyticsPlan.objects.get(id = analyticsPlanId), websiteEmbedding = websiteEmbedding, facebookEmbedding = facebookEmbedding, slackEmbedding = slackEmbedding, skypeEmbedding = skypeEmbedding, telegramEmbedding = telegramEmbedding, kikEmbedding = kikEmbedding, supportId = SupportAvailability.objects.get(id = supportId))
                    newPlanObj.save()
                    message = "Insert in plan table is successful"
                    status = 200
                elif(checkPlanType == True & checkAnalyticsPlan == False & checkSupportAvailability == True):
                    message = "Please check your analytics plan"
                    status = 403
                elif(checkPlanType == False & checkAnalyticsPlan == True & checkSupportAvailability == True):
                    message = "Please choose right plan"
                    status = 403
                elif(checkPlanType == True & checkAnalyticsPlan == True & checkSupportAvailability == False):
                    message = "Please choose proper support"
                    status = 403
                else:
                    message = "Please provide proper information"
                    status = 403
    except:
        status = 404
        message = "Error occoured"  
    
    return Response({
        'status' : status,
        'message' : message
    })

#Delete value from Plan
@csrf_exempt
@api_view(['GET','POST',])
def planDelete(request):
    id = request.POST.get('id')
    checkExistingPlan = Plan.objects.filter(id = id).exists()
    try:
        if(checkExistingPlan == True):
            Plan.objects.filter(id = id).delete()
            message = "Data is deleted successfully"
            status = 200
        else:
            message = "Data not Found!!"
            status = 200
    except:
        status = 404
        message = "Error occoured"  
    return Response({
        'status' : status,
        'message' : message
    })

#Retrieve data from Plan
@csrf_exempt
@api_view(['GET','POST',])
def planFetch(request):
    id = request.POST.get('id')
    planObj = Plan.objects.filter(id = id)
    try:
        data = list(planObj.values())
        return JsonResponse(data, safe=False)
    except:
        data = "No Data found"
        return JsonResponse(data, safe=False)

#Update Data into Plan
@csrf_exempt
@api_view(['GET','POST',])
def planUpdate(request):
    id = request.POST.get('id')
    name = request.POST.get('name')
    planTypeId = request.POST.get('planTypeId')
    monthlyCharge = request.POST.get('monthlyCharge')
    setupFees = request.POST.get('setupFees')
    contarctInMonth = request.POST.get('contarctInMonth')
    siteSpecification = request.POST.get('siteSpecification')
    knowledgeSpecification = request.POST.get('knowledgeSpecification')
    allowBotLimit = request.POST.get('allowBotLimit')
    initialTraining = request.POST.get('initialTraining')
    advanceTraining = request.POST.get('advanceTraining')
    textQueryPermonth = request.POST.get('textQueryPermonth')
    scrapping = request.POST.get('scrapping')
    entity = request.POST.get('entity')
    intent = request.POST.get('intent')
    logRetainingDay = request.POST.get('logRetainingDay')
    analyticsPlanId = request.POST.get('analyticsPlanId')
    websiteEmbedding = request.POST.get('websiteEmbedding')
    facebookEmbedding = request.POST.get('facebookEmbedding')
    slackEmbedding = request.POST.get('slackEmbedding')
    skypeEmbedding = request.POST.get('skypeEmbedding')
    telegramEmbedding = request.POST.get('telegramEmbedding')
    kikEmbedding = request.POST.get('kikEmbedding')
    supportId = request.POST.get('supportId')
    try:
        if(name == ""):
            message = "please provide proper plan name!!"
            status = 404
        else:
            checkPlanType = PlanType.objects.filter(id = planTypeId).exists()
            checkAnalyticsPlan = AnalyticsPlan.objects.filter(id = analyticsPlanId).exists()
            checkSupportAvailability = SupportAvailability.objects.filter(id = supportId).exists()
            if(checkPlanType == True & checkAnalyticsPlan == True & checkSupportAvailability == True):
                planObj = Plan.objects.get(id = id)
                if(planObj is not None):
                    planObj.name = name
                    planObj.planTypeId = PlanType.objects.get(id = planTypeId)
                    planObj.monthlyCharge = monthlyCharge
                    planObj.setupFees = setupFees
                    planObj.contarctInMonth = contarctInMonth
                    planObj.siteSpecification = siteSpecification
                    planObj.knowledgeSpecification = knowledgeSpecification
                    planObj.allowBotLimit = allowBotLimit
                    planObj.initialTraining = initialTraining
                    planObj.advanceTraining = advanceTraining
                    planObj.textQueryPermonth = textQueryPermonth
                    planObj.scrapping = scrapping
                    planObj.entity = entity
                    planObj.intent = intent
                    planObj.logRetainingDay = logRetainingDay
                    planObj.analyticsPlanId = AnalyticsPlan.objects.get(id = analyticsPlanId)
                    planObj.websiteEmbedding = websiteEmbedding
                    planObj.facebookEmbedding = facebookEmbedding
                    planObj.slackEmbedding = slackEmbedding
                    planObj.skypeEmbedding = skypeEmbedding
                    planObj.telegramEmbedding = telegramEmbedding
                    planObj.kikEmbedding = kikEmbedding
                    planObj.supportId = SupportAvailability.objects.get(id = supportId)
                    planObj.save()
                    message = "data is changed successfully"
                    status = 200
                else:
                    message = "Plan is not found"
                    status = 404
            else:
                message = "Please provide proper information"
                status = 403 
    except:
        message = "data is not found"
        status = 404
    return Response({
        'message' : message,
        'status' : status
    })