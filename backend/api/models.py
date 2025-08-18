from django.db import models
from .utils import generate_private_image_url

# Create your models here.
class StudySpot(models.Model):
    name = models.CharField(max_length=50)
    latitude = models.FloatField()
    longitude = models.FloatField()
    
    def __str__(self):
        return self.name
    
    def get_image_urls(self):
        images = SpotImages.objects.filter(studySpot=self)
        return [
            generate_private_image_url(img.image_url)
            for img in images
        ]
    
class Criteria(models.Model):
    attribute = models.CharField(max_length=50)
    
    def __str__(self):
        return self.attribute
    
class SpotCriteria(models.Model):
    studySpot = models.ForeignKey(StudySpot, on_delete=models.CASCADE)
    criteria = models.ForeignKey(Criteria, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.studySpot) + " + " + str(self.criteria)
    
class SpotImages(models.Model):
    studySpot = models.ForeignKey(StudySpot, on_delete=models.CASCADE)
    image_url = models.CharField(max_length=100, default='pikachu.jpg')
    
    def __str__(self):
        return str(self.studySpot) + " - " + self.image_url