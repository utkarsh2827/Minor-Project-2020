from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
# Create your views here.

from django.views.decorators.csrf import csrf_exempt
from moviepy.editor import *
from .audio_to_text import *
from .most_used_words import *
from .piechart import *


@csrf_exempt
def video_processing(request):
    fileaddress = f"./VideoAnalysis/videos/temp.webm"
    with open(fileaddress, "wb") as f:
        for chunk in request.FILES['blob'].chunks():
            f.write(chunk)
    
    video = VideoFileClip('./VideoAnalysis/videos/temp.webm')
    video.write_videofile('c1.mp4')
    audio = AudioFileClip('./VideoAnalysis/videos/temp.webm')
    audio.write_audiofile('temp.wav')

    return HttpResponse(f"File Saved at {fileaddress}")

def generate(request):
    res={}
    
    generate_text('temp.wav')
    help1=audio_analysis('temp.wav')
    res['speaking_rate']=help1[0]
    res['wordcloud']=help1[1]
    res['barchart']=help1[2]
    res['pie_string']=piechart('c1.mp4')

    return JsonResponse(res)
    

    