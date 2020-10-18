from django.urls import path
from . import views
urlpatterns = [
    path('api/questions/', views.get_questions_list, name = 'questions'),
    path('api/questions-by-tags/', views.get_questions_list_by_tags, name = 'questions-by-tags'),
    path('api/tags/', views.get_tag_list, name = 'tags'),
    path('api/question/', views.get_question, name = 'questionText'),
]