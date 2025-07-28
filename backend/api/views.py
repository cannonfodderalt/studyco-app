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


# Custom endpoint: StudySpots with their associated criteria
class SpotsWithCriteriaView(APIView):
    def get(self, request):
        spots = StudySpot.objects.all()
        data = []
        for spot in spots:
            criteria_list = SpotCriteria.objects.filter(studySpot=spot)
            criteria_data = [{"attribute": sc.criteria.attribute} for sc in criteria_list]
            data.append({
                "name": spot.name,
                "latitude": spot.latitude,
                "longitude": spot.longitude,
                "criteria": criteria_data
            })
        return Response(data)


# Custom endpoint: Criteria with their associated study spots
class CriteriaWithSpotsView(APIView):
    def get(self, request):
        criteria = Criteria.objects.all()
        data = []
        for c in criteria:
            spotList = SpotCriteria.objects.filter(criteria=c)
            spotData = [{"name": sc.studySpot.name} for sc in spotList]
            data.append({
                "attribute": c.attribute,
                "spots": spotData
            })
        return Response(data)
