from rest_framework import serializers
from .models import StudySpot, Criteria, SpotCriteria

class StudySpotSerializer(serializers.ModelSerializer):
    criteria = serializers.SerializerMethodField()

    class Meta:
        model = StudySpot
        fields = ['id', 'name', 'latitude', 'longitude', 'criteria']

    def get_criteria(self, spot):
        criteria = Criteria.objects.filter(
            id__in=SpotCriteria.objects.filter(studySpot=spot).values_list('criteria', flat=True)
        )
        return CriteriaSerializer(criteria, many=True).data
    
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