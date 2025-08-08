from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import StudySpot, Criteria, SpotCriteria
from . import serializers
from django_filters.rest_framework import DjangoFilterBackend


# StudySpot ViewSet
class StudySpotViewSet(viewsets.ModelViewSet):
    queryset = StudySpot.objects.all()
    serializer_class = serializers.StudySpotSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']


# Criteria ViewSet
class CriteriaViewSet(viewsets.ModelViewSet):
    queryset = Criteria.objects.all()
    serializer_class = serializers.CriteriaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['attribute']


# SpotCriteria ViewSet
class SpotCriteriaViewSet(viewsets.ModelViewSet):
    queryset = SpotCriteria.objects.all()
    serializer_class = serializers.SpotCriteriaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['studySpot', 'criteria']

