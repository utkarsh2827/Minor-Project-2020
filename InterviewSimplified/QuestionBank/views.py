from django.shortcuts import render
from .models import *
from django.http import JsonResponse, FileResponse
import os
from django.conf import settings
from rest_framework import generics
from .serializers import QuestionSerializer
# Create your views here.

def get_tag_list(request):
    d = {}
    d["company_tags"] = sorted(set([x.name for x in CompanyTag.objects.all()]))
    d["topic_tags"] = sorted(set([x.name for x in TopicTag.objects.all()]))
    return JsonResponse(d)





def get_question(request):
    question_id = request.GET.get('id',2)
    question = Questions.objects.filter(id = question_id)[0]
    question_file = question.path
    question_file = os.path.join(settings.BASE_DIR, 'QuestionBank'+question_file)
    question_name = question.name
    d = {}
    d["questionName"] = question_name
    f = open(question_file,'r')
    d["questionText"] = f.read()
    f.close()
    return JsonResponse(d)


class QuestionListView(generics.ListAPIView):
    serializer_class = QuestionSerializer
    question_name = None
    company_tag = None
    topic_tag = None


    def filter_questions(self):
        questions = Questions.objects.all()
        if self.question_name and self.question_name!='':
            questions&=Questions.objects.filter(name__contains=self.question_name)
        if self.company_tag and self.company_tag!="All":
            questions&=Questions.objects.filter(company_tags__name=self.company_tag)
        if self.topic_tag and self.topic_tag!="All":
            questions&=Questions.objects.filter(topic_tags__name=self.topic_tag)
        return questions

    def get_queryset(self):
        self.question_name = self.request.GET.get('question', None)
        self.company_tag = self.request.GET.get('company', None)
        self.topic_tag = self.request.GET.get('topic', None)

        return self.filter_questions()
