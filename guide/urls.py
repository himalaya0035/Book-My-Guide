from django.urls import path
from . import views

urlpatterns = [
    path('register-guide', views.TourGuideRegistrationView.as_view()),
    path('register-partner', views.PartnerRegistrationView.as_view()),
    path('all-packages', views.PackageListView.as_view()),
    path('all-location', views.LocationListView.as_view()),
    path('all-places', views.PlacesListView.as_view()),
    path('place/<int:pk>', views.PlaceView.as_view()),
    path('all-guides', views.GuidesListView.as_view()),
    path('<int:pk>', views.GuideDetailView.as_view()),
    path('package-create', views.PackageCreateView.as_view()),
    #TODO
    path('<int:pk>/availability', views.PackageAvailabilityView.as_view()),
    path('dashboard', views.TourGuideDashboard.as_view()),
    path('get-location', views.LocationView.as_view()),
    path('search', views.search_view),
    path('update', views.PackageUpdateView.as_view())
]
