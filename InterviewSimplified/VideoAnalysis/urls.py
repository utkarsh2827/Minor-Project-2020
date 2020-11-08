from django.urls import path
from . import views
urlpatterns = [
    path('api/process_video/', views.VideoProcessing.as_view(), name = 'video'),
    path('api/video_list/', views.VideoReportList.as_view(), name = 'video_list'),
    path('api/video-summary/', views.VideoDetailAPI.as_view(), name = 'video-summary'),
]