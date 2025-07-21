from rest_framework import serializers
from .models import StudySpot, Criteria, SpotCriteria

class StudySpotSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50)
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()
    
    def create(self, validated_data):
        return StudySpot.objects.create(**validated_data)
    
class CriteriaSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    attribute = serializers.CharField(max_length=50)
    
    def create(self, validated_data):
        return Criteria.objects.create(**validated_data)
    
    
class SpotCriteriaSerializer(serializers.Serializer):
    studySpot = StudySpotSerializer()
    criteria = CriteriaSerializer()
    
    def create(self, validated_data):
        study_spot_data = validated_data.pop('studySpot')
        criteria_data = validated_data.pop('criteria')
        
        study_spot = StudySpot.objects.create(**study_spot_data)
        criteria = Criteria.objects.create(**criteria_data)
        
        return SpotCriteria.objects.create(studySpot=study_spot, criteria=criteria)