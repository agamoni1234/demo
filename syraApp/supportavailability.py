from django.shortcuts import render
from django.http import HttpResponse, HttpRequest , JsonResponse
from .models import *
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json
from django.core import serializers

#insert Values into Support
@csrf_exempt
@api_view(['POST'])
def createSupport(request):
    description = request.POST.get('description')
    print(description)
    try:
        if(description == ""):
            message = "Please provide proper description"
            status = 403
        else:
            checkExistingSupport = SupportAvailability.objects.filter(description = description).exists()
            if(checkExistingSupport == True):
                message = "Support Name already exists"
                status = 409
            else:
                newSupportObj = SupportAvailability(description = description)
                newSupportObj.save()
                message = "Insert in support table is successful"
                status = 200
    except:
        status = 400
        message = "Error occoured"  
    return Response({
        'status' : status,
        'message' : message
    })

#delete value from Support
@csrf_exempt
@api_view(['POST'])
def deleteSupport(request):
    id = request.POST.get('id')
    checkExistingSupport = SupportAvailability.objects.filter(id = id).exists()
    try:
        if(checkExistingSupport == True):
            SupportAvailability.objects.filter(id = id).delete()
            message = "Data is deleted successfully"
            status = 200
        else:
            message = "Data not found"
            status = 404
    except:
        status = 400
        message = "Error occoured"  
    return Response({
        'status' : status,
        'message' : message
    })

#fetch from Support
@csrf_exempt
@api_view(['POST'])
def fetchSupport(request):
    id = request.POST.get('id')
    supportObj = SupportAvailability.objects.filter(id = id)
    try:
        data = list(supportObj.values())
        return JsonResponse(data, safe=False)
    except:
        data = "No Data found"
        return JsonResponse(data, safe=False)

#update to support
@csrf_exempt
@api_view(['POST'])
def updateSupport(request):
    id = request.POST.get('id')
    description = request.POST.get('description')
    try:
        if(description == ""):
            message = "Please provide proper description"
            status = 404
        else:
            supportObj = SupportAvailability.objects.get(id = id)
            supportObj.description = description
            supportObj.save()
            message = "Data is changed successfully"
            status = 200  
    except:
        message = "Data is not found"
        status = 404
    return Response({
        'message' : message,
        'status' : status
    })
