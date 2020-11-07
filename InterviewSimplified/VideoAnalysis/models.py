from django.db import models
from django.contrib.auth.models import User
import json
# Create your models here.

class Analysis(models.Model):
    report = models.JSONField()
    date_added = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete = models.CASCADE)