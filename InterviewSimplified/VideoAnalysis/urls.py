from django.urls import path
from . import views
urlpatterns = [
    path('api/process_video/', views.video_processing, name = 'start'),
    path('generate/', views.generate, name = 'analysis')
]