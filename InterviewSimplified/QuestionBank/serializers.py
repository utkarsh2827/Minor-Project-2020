from rest_framework import serializers
from .models import *

class CompanyTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyTag
        fields = ["name"]

class TopicTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicTag
        fields = ["name"]

class QuestionSerializer(serializers.ModelSerializer):
    company_tags = CompanyTagSerializer(many = True)
    topic_tags = TopicTagSerializer(many = True)

    class Meta:
        model = Questions
        exclude = ['path']