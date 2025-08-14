from django.db import models

# Create your models here.
class StudySpot(models.Model):
    name = models.CharField(max_length=50)
    latitude = models.FloatField()
    longitude = models.FloatField()
    image_url = models.CharField(max_length=100, default='pikachu.jpg')
    
    def __str__(self):
        return self.name
    
class Criteria(models.Model):
    attribute = models.CharField(max_length=50)
    
    def __str__(self):
        return self.attribute
    
class SpotCriteria(models.Model):
    studySpot = models.ForeignKey(StudySpot, on_delete=models.CASCADE)
    criteria = models.ForeignKey(Criteria, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.studySpot) + " + " + str(self.criteria)