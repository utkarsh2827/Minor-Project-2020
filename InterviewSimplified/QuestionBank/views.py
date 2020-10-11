from django.shortcuts import render
from .models import Questions
from django.http import JsonResponse, FileResponse
import os
from django.conf import settings
# Create your views here.
def get_questions_list(request):
    questions = Questions.objects.all()
    l = []
    for x in questions:
        l.append({"id":x.id,"name":x.name,"tags":list(x.tags.names())})
    response = {"questionList":l}
    return JsonResponse(response)
def get_question(request):
    question_id = request.GET.get('id',2)
    question_file = Questions.objects.filter(id = question_id).get().path
    question_file = os.path.join(settings.BASE_DIR, 'QuestionBank'+question_file)
    f = open(question_file,'rb')
    
    return FileResponse(f)
