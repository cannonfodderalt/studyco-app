from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import StudySpot, Criteria, SpotCriteria
from . import serializers


# Create your views here.
class listSpots(APIView):
    def get(self, request):
        spots = StudySpot.objects.all()
        serializer = serializers.StudySpotSerializer(spots, many=True)
        return Response(serializer.data)
    
class listCriteria(APIView):
    def get(self, request):
        criteria = Criteria.objects.all()
        serializer = serializers.CriteriaSerializer(criteria, many=True)
        return Response(serializer.data)
    
class listSpotCriteria(APIView):
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
    
class listCriteriaInSpot(APIView):
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
    
class listSpotsWithCriteria(APIView):
    def get(self, request):
        criteria = Criteria.objects.all()
        data = []
        for c in criteria:
            spotList = SpotCriteria.objects.filter(criteria=c)
            spotData = [{"attribute": sc.criteria.attribute} for sc in spotList]
            data.append({
                "attribute": c.attribute,
                "spots": spotData
            })
        return Response(data)
    
class addSpot(APIView):
    def get(self, request):
        return Response({"message": "This endpoint only accepts POST."})
    
    def post(self, request):
        serializer = serializers.StudySpotSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class addCriteria(APIView):
    def get(self, request):
        return Response({"message": "This endpoint only accepts POST."})
    
    def post(self, request):
        serializer = serializers.CriteriaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
class addSpotCriteria(APIView):
    def get(self, request):
        return Response({"message": "This endpoint only accepts POST."})
    
    def post(self, request):
        serializer = serializers.SpotCriteriaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
class deleteSpot(APIView):
    def delete(self, request, pk):
        try:
            spot = StudySpot.objects.get(pk=pk)
            spot.delete()
            return Response(status=204)
        except StudySpot.DoesNotExist:
            return Response({"error": "StudySpot not found"}, status=404)