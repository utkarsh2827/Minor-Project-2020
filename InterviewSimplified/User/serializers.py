from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Profile
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','id', 'email']
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self,data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

class ProfileSerializer(serializers.ModelSerializer):
    gender = serializers.CharField(source='get_gender_display')
    user = UserSerializer()
    class Meta:
        model = Profile
        exclude = ['id']