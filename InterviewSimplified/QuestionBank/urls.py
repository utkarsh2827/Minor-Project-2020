from django.urls import path
from . import views
urlpatterns = [
    path('api/questions', views.get_questions_list, name = 'questions'),
]