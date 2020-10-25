from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *
from rest_framework.views import APIView
from .serializers import *
import json
from django.contrib.auth.models import User
# Create your views here.

@csrf_exempt
def save_experience(request):
    data = json.loads(request.body.decode('utf-8'))
    formData = data['basicInfo']
    formData['designation'] = formData['profile']
    formData['form_data'] = {'roundInfo':data['roundInfo']}
    serializer = ExperienceSerializer(data = formData)
    if serializer.is_valid():
        serializer.save(user = User.objects.first())
        return HttpResponse("Done!!!")
    return HttpResponse("Failed!!")


def list_experience(request):
    exps = Experience.objects.all()

    l = []
    l = ExperienceSerializer(exps, many=True).data
    return JsonResponse({'list':l})