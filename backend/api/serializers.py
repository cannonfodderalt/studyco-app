from rest_framework import serializers
from .models import StudySpot, Criteria, SpotCriteria

class StudySpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudySpot
        fields = '__all__'
    
class CriteriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Criteria
        fields = '__all__'
    
    
class SpotCriteriaSerializer(serializers.ModelSerializer):
    studySpot = StudySpotSerializer(read_only=True)
    criteria = CriteriaSerializer(read_only=True)

    class Meta:
        model = SpotCriteria
        fields = '__all__'
        
class SpotCriteriaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotCriteria
        fields = ['studySpot', 'criteria']