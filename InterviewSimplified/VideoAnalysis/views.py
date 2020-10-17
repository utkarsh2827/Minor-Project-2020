from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def video_processing(request):
    fileaddress = f"./VideoAnalysis/videos/{request.user}_temp.webm"
    with open(fileaddress, "wb") as f:
        for chunk in request.FILES['blob'].chunks():
            f.write(chunk)
    return HttpResponse(f"File Saved at {fileaddress}")
    