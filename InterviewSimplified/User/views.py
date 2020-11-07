from django.shortcuts import render
from .models import Profile
from .serializers import *
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework.exceptions import APIException
from rest_framework import status
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.utils import IntegrityError

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.validated_data
        return Response({
            "user" :UserSerializer(user, context = self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })



class ProfileAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ProfileSerializer

    def get(self, request, format = 'json'):
        obj = Profile.objects.get(user = request.user)
        return Response(ProfileSerializer(obj).data)

@csrf_exempt
def register(request):
    try:
        if request.method=="POST":
            username = request.POST.get('username', None)
            email = request.POST.get('email', None)
            password = request.POST.get('password', None)
            user = User.objects.create_user(username = username, email=email, password=password)
            firstname = request.POST.get('firstname')
            lastname = request.POST.get('lastname')
            gender = request.POST.get('gender')
            branch = request.POST.get('branch')
            city = request.POST.get('city')
            graduation_year = int(request.POST.get('graduation_year'))
            cgpa = float(request.POST.get('cgpa'))
            work_experience = int(request.POST.get('work_experience'))
            obj = Profile(user = user, firstname=firstname, lastname = lastname, gender=gender, branch=branch, city = city, graduation_year=graduation_year, cgpa = cgpa, work_experience=work_experience)
            obj.save()
            return JsonResponse({"success":True})
    except IntegrityError:
        return JsonResponse({"success":False, "message":"Username already exists"}, status=500)