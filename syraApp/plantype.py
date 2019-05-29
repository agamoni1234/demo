from django.shortcuts import render
from django.http import HttpResponse, HttpRequest , JsonResponse
from .models import *
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json
from django.core import serializers

#insert into PlanType
@csrf_exempt
@api_view(['POST'])
def createPlanType(request):
    name = request.POST.get('name')
    print(name)
    try:
        checkExistingPlanType = PlanType.objects.filter(name = name).exists()
        if(checkExistingPlanType == True):
            message = "Plan Name already exists"
            status = 409
        else:
            newPlanTypeObj = PlanType(name = name)
            newPlanTypeObj.save()
            message = "Insert in plan table is successful"
            status = 200
    except:
        status = 404
        message = "Error occoured"  
    return Response({
        'status' : status,
        'message' : message
    })

#delete from PlanType
@csrf_exempt
@api_view(['POST'])
def deletePlanType(request):
    id = request.POST.get('id')
    checkExistingplanType = PlanType.objects.filter(id = id).exists()
    try:
        if(checkExistingplanType == True):
            PlanType.objects.filter(id = id).delete()
            message = "Data is deleted successfully"
            status = 200
        else:
            message = "Data not found"
            status = 200
    except:
        status = 404
        message = "Error occoured"  
    return Response({
        'status' : status,
        'message' : message
    })

#fetch from PlanType
@csrf_exempt
@api_view(['POST'])
def fetchPlanType(request):
    id = request.POST.get('id')
    planTypetObj = PlanType.objects.filter(id = id)
    try:
        data = list(planTypetObj.values())
        return JsonResponse(data, safe=False)
    except:
        data = "No Data found"
        return JsonResponse(data, safe=False)

# update into PlanType
@csrf_exempt
@api_view(['POST'])
def updatePlanType(request):
    id = request.POST.get('id')
    name = request.POST.get('name')
    try:
        planTypeObj = PlanType.objects.get(id = id)
        planTypeObj.name = name
        planTypeObj.save()
        message = "data is changed successfully"
        status = 200
    except:
        message = "data is not found"
        status = 404
    return Response({
        'message' : message,
        'status' : status
    })
