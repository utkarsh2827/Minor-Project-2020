from django.urls import path
from . import views
urlpatterns = [
    path('api/questions/', views.QuestionListView.as_view(), name = 'questions'),
    path('api/tags/', views.get_tag_list, name = 'tags'),
    path('api/question/', views.get_question, name = 'questionText'),
]