from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

@csrf_exempt
def save_experience(request):
    print(request.body)
    return HttpResponse("Done!!!")