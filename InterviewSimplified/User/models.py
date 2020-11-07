from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Profile(models.Model):
    MALE = 'M'
    FEMALE = 'F'
    OTHER = 'O'
    gender_choices = [
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (OTHER, 'Other')
    ]
    firstname = models.CharField(max_length = 100)
    lastname = models.CharField(max_length = 100)
    gender = models.CharField(max_length = 1, choices=gender_choices)
    branch = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    graduation_year = models.IntegerField()
    cgpa = models.DecimalField(max_digits=4, decimal_places=2)
    work_experience = models.IntegerField()


    user = models.OneToOneField(User, on_delete=models.CASCADE)