from django.urls import path
from . import views
urlpatterns = [
    path('api/exp/', views.save_experience, name = 'experience'),
    path('api/list-exp/', views.list_experience, name = 'list-experience'),
    path('api/experience/', views.get_experience, name = 'experience-detail'),
    
]