from django.shortcuts import render
from django.http import HttpResponse, HttpRequest , JsonResponse
from .models import *
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json
import smtplib, ssl
import configparser
from django.core import serializers
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

#User login
@csrf_exempt
@api_view(['POST'])
def userLogin(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    try:
        if(email is None):
            message = "Please provide your email"
            status = 403
        elif(password is None):
            message = "Please provide password"
            status = 403
        else:
            checkExistingCustomer = Customer.objects.filter(email = email, password = password).exists()
            if(checkExistingCustomer == True):
                message = "Login is successful!!"
                status = 200
            else:
                message = "Invalid credentials!!"
                status = 404
    except:
        message = "Error occured!!"
        status = 400
    return Response({
        'message' : message,
        'status' : status
    })

#Password Reset
@csrf_exempt
@api_view(['POST'])
def changePassword(request):
    oldPassword = request.POST.get('oldPassword')
    newPassword = request.POST.get('newPassword')
    email = request.POST.get('email')
    try:
        checkCustomer = Customer.objects.filter(email = email, password = oldPassword).exists()
        if(checkCustomer == True):
            customerObj = Customer.objects.get(email = email)
            customerObj.password = newPassword
            customerObj.save()
            message = "Password is updated successfully"
            status = 200
        else:
            message = "Please provide proper credentials"
            status = 404
    except:
        message = "Error occured!"
        status = 400
    
    return Response({
        'message' : message,
        'status' : status
    })

#Send Email
@csrf_exempt
@api_view(['POST'])
def emailSend(request):
    receiverEmail = request.POST.get('receiverEmail')
    smtpServer = "smtp.gmail.com"
    port = 465
    senderEmail = "agamoni@thirdeyedata.io"
    password = "agamoni@95"
    text = """\
            Hi,
            Please click <a href="https://chatbots.syra.ai">here</a> to verify your email"""
    context = ssl.create_default_context()
    try:
        message = MIMEMultipart("alternative")
        message["Subject"] = "Email Verification"
        message["From"] = senderEmail
        message["To"] = receiverEmail
        message.attach(MIMEText(text, "html"))
        with smtplib.SMTP_SSL(smtpServer, port, context=context) as server:
            server.login(senderEmail, password)
            server.sendmail(senderEmail, receiverEmail, message.as_string())
            message = "Mail is sent successfully!!"
            status = 200
    except Exception as e:
        message = str(e)
        status = 400
    return Response({
        'message' : message,
        'status' : status
    })