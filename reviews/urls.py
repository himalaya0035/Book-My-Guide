from django.urls import path

from . import views

urlpatterns = [
    path('create', views.CreateReviewView.as_view())
]