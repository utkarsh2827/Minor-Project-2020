from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
class ExperienceSerializer(serializers.ModelSerializer):
    title = serializers.ReadOnlyField()
    class Meta:
        model = Experience
        exclude = ['user', 'time_added']

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class CommentSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    date_time = serializers.CharField()
    class Meta:
        model = Comment
        exclude = ['id','experience','date_added']
        depth = 1