from rest_framework import serializers
from .models import *

class ExperienceSerializer(serializers.ModelSerializer):
    title = serializers.ReadOnlyField()
    class Meta:
        model = Experience
        exclude = ['user', 'time_added']