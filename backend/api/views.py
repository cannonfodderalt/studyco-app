from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import StudySpot, Criteria, SpotCriteria


# Create your views here.
class ListSpots(APIView):
    def get(self, request):
        spots = StudySpot.objects.all()
        data = [{"name": spot.name, "latitude": spot.latitude, "longitude": spot.longitude} for spot in spots]
        return Response(data)
    
class ListCriteria(APIView):
    def get(self, request):
        criteria = Criteria.objects.all()
        data = [{"attribute": crit.attribute} for crit in criteria]
        return Response(data)
    
class ListSpotCriteria(APIView):
    def get(self, request):
        spot_criteria = SpotCriteria.objects.all()
        data = []
        for sc in spot_criteria:
            data.append({
                "studySpot": {
                    "name": sc.studySpot.name
                },
                "criteria": {
                    "attribute": sc.criteria.attribute
                }
            })
        return Response(data)
    
class ListSpotsWithCriteria(APIView):
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