from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'spots', views.StudySpotViewSet, basename='spot')
router.register(r'criteria', views.CriteriaViewSet, basename='criteria')
router.register(r'spotcriteria', views.SpotCriteriaViewSet, basename='spotcriteria')

urlpatterns = [
    path('', include(router.urls)),
]
