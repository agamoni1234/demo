from django.urls import path
# from django.urls import admin
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('create-support',views.createSupport, name = 'createSupport'),
    path('delete-support',views.deleteSupport, name = 'deleteSupport'),
    path('fetch-support',views.fetchSupport, name = 'fetchSupport'),
    path('update-support',views.updateSupport, name = 'updateSupport'),
    path('create-planType',views.createPlanType, name = 'createPlanType'),
    path('delete-planType',views.deletePlanType, name = 'deletePlanType'),
    path('fetch-planType',views.fetchPlanType, name = 'fetchPlanType'),
    path('update-planType',views.updatePlanType, name = 'updatePlanType'),
    path('create-botDeploment', views.createBotDeployment, name = 'createBotDeployment'),
    path('delete-botDeploment', views.deleteBotDeployment, name = 'deleteBotDeployment'),
    path('update-botDeploment', views.updateBotDeployment, name = 'updateBotDeployment'),
    path('fetch-botDeploment', views.fetchBotDeployment, name = 'fetchBotDeployment'),
    path('login', views.userLogin, name = 'userLogin'),
    path('reset-password', views.changePassword, name = 'changePassword'),
    path('plan-create', views.planCreate, name = 'planCreate'),
    path('plan-delete', views.planDelete, name = 'planDelete'),
    path('plan-fetch', views.planFetch, name = 'planFetch'),
    path('plan-update', views.planUpdate, name = 'planUpdate'),
    path('send-email', views.emailSend, name = 'emailSend'),
    path('view-intents', views.showIntents, name = 'showIntents'),
    path('view-links', views.showLinks, name = 'showLinks'),
    path('view-linksessions', views.showLinksPerSessions, name = 'showLinksPerSessions'),
    path('view-questions', views.showQuestions, name = 'showQuestions'),
    path('view-regions', views.showChatterDemographics, name = 'showChatterDemographics'),
    path('view-botresponse', views.showBotResponse, name = 'showBotResponse'),
    path('view-timeanalytics', views.showTiming, name = 'showTiming'),
    path('view-sessions', views.showSessions, name = 'showSessions')
]