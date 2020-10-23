from django.db import models

# Create your models here.
class TopicTag(models.Model):
    name = models.CharField(max_length = 100)
class CompanyTag(models.Model):
    name = models.CharField(max_length = 100)



class Questions(models.Model):
    name = models.CharField(max_length=255)
    path = models.CharField(max_length=500)
    company_tags = models.ManyToManyField(CompanyTag)
    topic_tags = models.ManyToManyField(TopicTag)

    def __str__(self):
        return self.name