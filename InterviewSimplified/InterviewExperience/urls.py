from django.urls import path
from . import views
urlpatterns = [
    path('api/exp/', views.SaveExperience.as_view(), name = 'experience'),
    path('api/list-exp/', views.list_experience, name = 'list-experience'),
    path('api/experience/', views.get_experience, name = 'experience-detail'),
    path('api/comments/', views.CommentListAPI.as_view(), name ='comments'),
    path('api/comment/add/', views.AddCommentAPI.as_view(), name = 'add-comment'),
    
]