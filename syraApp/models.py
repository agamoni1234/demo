from django.db import models
import datetime

class SupportAvailability(models.Model):
    description =models.CharField(max_length = 50)
    class Meta:
        db_table = 'supportAvailability'


class PlanType(models.Model):
    name = models.CharField(max_length = 40)
    class Meta:
        db_table = 'planType'

class AnalyticsPlan(models.Model):
    plan = models.CharField(max_length = 50)
    class Meta:
        db_table = 'analyticsPlan'

class Plan(models.Model):
    name = models.CharField(max_length=30)
    planTypeId = models.ForeignKey(PlanType, related_name='+', on_delete=models.CASCADE, db_column='planTypeId')
    monthlyCharge = models.IntegerField(11)
    setupFees = models.IntegerField(11)
    contarctInMonth = models.IntegerField(11)
    siteSpecification = models.IntegerField(11)
    knowledgeSpecification = models.IntegerField(11)
    allowBotLimit = models.IntegerField(11)
    initialTraining = models.IntegerField(11)
    advanceTraining = models.IntegerField(11)
    textQueryPermonth = models.IntegerField(11)
    scrapping = models.IntegerField(11)
    entity = models.IntegerField(11)
    intent = models.IntegerField(11)
    logRetainingDay = models.IntegerField(11)
    analyticsPlanId = models.ForeignKey(AnalyticsPlan, related_name='+', on_delete=models.CASCADE, db_column='analyticsPlanId')
    websiteEmbedding = models.IntegerField(11)
    facebookEmbedding = models.IntegerField(11)
    slackEmbedding = models.IntegerField(11)
    skypeEmbedding = models.IntegerField(11)
    telegramEmbedding = models.IntegerField(11)
    kikEmbedding = models.IntegerField(11)
    supportId = models.ForeignKey(SupportAvailability, related_name='+', on_delete=models.CASCADE, db_column='supportId')
    class Meta:
        db_table = 'Plan'

class BotDomain(models.Model):
    name = models.CharField(max_length = 200)
    createdDate = models.DateTimeField(null = True)
    class Meta:
        db_table = 'botDomain'

class Customer(models.Model):
    email = models.CharField(primary_key = True, max_length = 50)
    fName = models.CharField(max_length = 50)
    lName = models.CharField(max_length = 50)
    password = models.CharField(max_length = 30)
    contactNo = models.CharField(max_length = 15)
    address1 = models.CharField(max_length = 50)
    address2 = models.CharField(max_length = 50)
    city = models.CharField(max_length = 30)
    country = models.CharField(max_length = 30)
    zipCode = models.IntegerField(11)
    jobTitle = models.CharField(max_length = 30)
    planId = models.ForeignKey(Plan, related_name='+', on_delete=models.CASCADE, db_column='planId')
    businessRequirement = models.CharField(max_length = 100)
    createdDate = models.DateTimeField(null = True)
    class Meta:
        db_table = 'Customer'

class CustomerPlan(models.Model):
    customerId = models.ForeignKey(Customer, related_name='+', on_delete=models.CASCADE, db_column='customerId')
    planId = models.ForeignKey(Plan, related_name='+', on_delete=models.CASCADE, db_column='planId')
    activationDate = models.DateTimeField(null = True)
    expiryDate = models.DateTimeField(null = True)
    createdDate = models.DateTimeField(null = True)
    isActive = models.BooleanField(default = False)
    class Meta:
        db_table = 'CustomerPlan'


class BotDeployment(models.Model):
    customerId = models.ForeignKey(Customer, related_name='+', on_delete=models.CASCADE, db_column='customerId')
    welcomeMessage = models.CharField(max_length = 200)
    backGroundColor = models.CharField(max_length = 20)
    goalDefination = models.CharField(max_length = 200)
    domainId = models.ForeignKey(BotDomain, related_name='+', on_delete=models.CASCADE, db_column='domainId')
    deploymentDate = models.DateTimeField(null = True)
    deletedDate = models.DateTimeField(null = True)
    isPlanActive = models.BooleanField(default = False)
    firstMessage =  models.CharField(max_length = 200)
    secondMessage = models.CharField(max_length = 200)
    website = models.CharField(max_length = 200)
    apiKey = models.CharField(max_length = 70, null = False)
    createdDate = models.DateTimeField(null = True)
    class Meta:
        db_table = 'BotDeployment'
