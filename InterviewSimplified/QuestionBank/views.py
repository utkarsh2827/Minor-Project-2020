from django.shortcuts import render
from .models import *
from django.http import JsonResponse, FileResponse
import os
from django.conf import settings
from .serializers import QuestionSerializer
# Create your views here.
def filter_questions(query):
    questions = Questions.objects.filter(name__contains=query)
    return questions

def filter_by_tags(company, topic):
    questions = Questions.objects.filter(company_tags__name=company) if company!='All' else Questions.objects.all()
    questions = questions & (Questions.objects.filter(topic_tags__name=topic) if topic!='All' else Questions.objects.all())
    return questions

def get_tag_list(request):
    d = {}
    d["company_tags"] = sorted(set([x.name for x in CompanyTag.objects.all()]))
    d["topic_tags"] = sorted(set([x.name for x in TopicTag.objects.all()]))
    return JsonResponse(d)

def get_questions_list_by_tags(request, company = 'All', topic = 'All'):
    
    questions = filter_by_tags(company, topic)
    
    response = {"questionList":QuestionSerializer(questions, many = True).data}
    return JsonResponse(response)

def get_questions_list(request):
    query = request.GET.get('query',None)
    questions = Questions.objects.all()
    if query:
        questions = filter_questions(query)
    
    response = {"questionList":QuestionSerializer(questions, many = True).data}
    return JsonResponse(response)



def get_question(request):
    question_id = request.GET.get('id',2)
    question_file = Questions.objects.filter(id = question_id).get().path
    question_file = os.path.join(settings.BASE_DIR, 'QuestionBank'+question_file)
    f = open(question_file,'rb')
    
    return FileResponse(f)
