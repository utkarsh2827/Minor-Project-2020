from django.urls import path
from . import views
urlpatterns = [
    path('api/process_video/', views.VideoProcessing.as_view(), name = 'start'),
]