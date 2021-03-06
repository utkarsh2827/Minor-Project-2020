from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings


from knox.auth import TokenAuthentication

from .models import Analysis

from moviepy.editor import *
from .audio_to_text import *
from .most_used_words import *
from .piechart import *
from .hr_questions import questions
from random import randrange
import json
import os


class VideoProcessing(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [
        permissions.IsAuthenticated
    ]
    
    def get(self, request, format = 'json'):
        choice = randrange(0, len(questions))
        return Response(dict(question = questions[choice]['Question'], id = choice))

    def post(self, request, format=None):
        fileaddress = os.path.join(settings.BASE_DIR, "temp.webm")
        f = open(fileaddress, "wb+")
        for chunk in request.FILES['blob'].chunks():
            f.write(chunk)
        f.close()
        video = VideoFileClip(fileaddress)
        video.write_videofile('c1.mp4')
        audio = AudioFileClip(fileaddress)
        audio.write_audiofile('temp.wav')
        choice = int(request.POST['question-id'])
        res={}
        
        text=generate_text('temp.wav')
        help1=audio_analysis('temp.wav')
        res['speaking_rate']=help1[0]
        res['wordcloud']=help1[1]
        res['barchart']=help1[2]
        res['pie_string']=piechart('c1.mp4')
        res['text']=text
        res['question'] = questions[choice]['Question']
        res['sug_answer'] = questions[choice]['Answer']
        obj = Analysis(user = request.user, report = res)
        obj.save()
        return Response(res)


# @csrf_exempt
# def video_processing(request):
#     if request.method=='POST':
#         fileaddress = f"./VideoAnalysis/videos/temp.webm"
#         with open(fileaddress, "wb") as f:
#             for chunk in request.FILES['blob'].chunks():
#                 f.write(chunk)
        
#         video = VideoFileClip('./VideoAnalysis/videos/temp.webm')
#         video.write_videofile('c1.mp4')
#         audio = AudioFileClip('./VideoAnalysis/videos/temp.webm')
#         audio.write_audiofile('temp.wav')
#         choice = request.POST['question-id']
#         res={}
        
#         generate_text('temp.wav')
#         help1=audio_analysis('temp.wav')
#         res['speaking_rate']=help1[0]
#         res['wordcloud']=help1[1]
#         res['barchart']=help1[2]
#         res['pie_string']=piechart('c1.mp4')
#         res['question'] = questions[choice]['Question']
#         res['sug_answer'] = questions[choice]['Answer']

#         return JsonResponse(res)
#     else:
#         choice = randrange(0, len(questions))
#         return JsonResponse(dict(question = questions[choice]['Question'], id = choice))

    
class VideoReportList(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def get(self,request, format = 'json'):
        l = Analysis.objects.filter(user = request.user)
        res = []
        for x in l:
            temp = dict(date_added = x.date_added.strftime("%d-%m-%Y"), id = x.id)
            res.append(temp)
        return Response(res)

class VideoDetailAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def get(self, request, format='json'):
        report_id = request.GET.get('id')
        report = Analysis.objects.get(user = request.user, id = report_id)
        return Response(report.report)


    