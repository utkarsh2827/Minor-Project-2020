from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Experience(models.Model):
    company_name=models.CharField(default = "", max_length = 50)
    designation=models.CharField(default = "",max_length = 50)
    no_of_rounds = models.IntegerField(default = 1)
    compensation=models.CharField(default = "",max_length = 50)
    university_name=models.CharField(default = 0,max_length = 50)
    years_of_experience= models.IntegerField(default = 0)
    additional_info= models.TextField(default = "")
    time_added = models.DateTimeField(auto_now_add=True)
    form_data = models.JSONField()
    user = models.ForeignKey(User, on_delete = models.CASCADE)


    @property
    def title(self):
        return f"{self.company_name} | {self.designation} | {self.time_added.strftime('%d-%m-%Y')}"

    def __str__(self):
        return self.title
