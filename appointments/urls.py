from django.urls import path

from . import views


urlpatterns = [
    path('create', views.BookAppointmentView.as_view()),
    path('get-appointments', views.GetAppointmentsView.as_view()),
    # path('get-appointments/<int:pk>', views.ListBookingsView.as_view()),
    path('get-appointmentss', views.ListBookingsView.as_view()),
    path('get-availability/<int:guide_id>', views.GuideAvailabilityView.as_view()),
    path('<int:pk>', views.BookingDetailView.as_view()),
    # path('get-timings', views.GuideTimingsView.as_view()),
    # path('get-appointments', views.GetAppointmentsView.as_view())
]
