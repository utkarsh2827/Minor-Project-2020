from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Experience, Comment
from rest_framework.views import APIView
from .serializers import *
import json
from knox.auth import TokenAuthentication
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import generics, permissions
# Create your views here.



class SaveExperience(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        formData = data['basicInfo']
        formData['designation'] = formData['profile']
        formData['form_data'] = {'roundInfo':data['roundInfo']}
        serializer = ExperienceSerializer(data = formData)
        if serializer.is_valid():
            print("Saving")
            serializer.save(user = request.user)
            return Response({"message":"Success!"})
        return Response({"message":"Failed!"})

def list_experience(request):
    
    exps = Experience.objects.all()
    query = request.GET.get('query',None)
    if query:
        exps = Experience.objects.filter(company_name__contains=query)
    l = []
    l = ExperienceSerializer(exps, many=True).data
    return JsonResponse({'list':l})

def get_experience(request):
    exp = Experience.objects.get(pk=request.GET.get('id',2))
    return JsonResponse(ExperienceSerializer(exp).data)


class CommentListAPI(APIView):
    def get(self, request, *args, **kwargs):
        exp_id = int(request.GET.get('id'))
        exp = Experience.objects.get(pk = exp_id)
        comments = Comment.objects.filter(experience = exp)
        return Response(CommentSerializer(comments, many=True).data)


class AddCommentAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        exp_id = int(data['id'])
        exp = Experience.objects.get(pk = exp_id)
        text = data['comment_text']
        obj = Comment(user = request.user, text=text, experience = exp)
        obj.save()
        return Response({"message":"Comment Added"})