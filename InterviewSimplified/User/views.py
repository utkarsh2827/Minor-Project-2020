from django.shortcuts import render
from .serializers import *
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework.exceptions import APIException
from rest_framework import status



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