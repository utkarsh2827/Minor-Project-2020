from django.db import models
from taggit.managers import TaggableManager

# Create your models here.

class Questions(models.Model):
    name = models.CharField(max_length=255)
    path = models.CharField(max_length=500)
    tags = TaggableManager()