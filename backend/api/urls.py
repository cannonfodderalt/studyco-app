from django.urls import path
from . import views

urlpatterns = [
    path('spots/', views.listSpots.as_view(), name='list_spots'),
    path('criteria/', views.listCriteria.as_view(), name='list_criteria'),
    path('spot-criteria/', views.listSpotCriteria.as_view(), name='list_spot_criteria'),
    path('criteria-in-spot/', views.listCriteriaInSpot.as_view(), name='list_criteria_in_spot'),
    path('spots-with-criteria/', views.listSpotsWithCriteria.as_view(), name='list_spots_with_criteria'),
    path('add-spot/', views.addSpot.as_view(), name='add_spot'),
    path('add-criteria/', views.addCriteria.as_view(), name='add_criteria'),
    path('add-spot-criteria/', views.addSpotCriteria.as_view(), name='add_spot_criteria'),
]
