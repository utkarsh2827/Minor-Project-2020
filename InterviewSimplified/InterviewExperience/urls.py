from django.urls import path
from . import views
urlpatterns = [
    path('api/exp/', views.save_experience, name = 'questions'),
    
]