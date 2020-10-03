from django.shortcuts import render
from .models import Questions
from django.http import JsonResponse
# Create your views here.
def get_questions_list(request):
    questions = Questions.objects.all()
    l = []
    for x in questions:
        l.append({"name":x.name,"tags":list(x.tags.names())})
    response = {"questionList":l}
    return JsonResponse(response)
