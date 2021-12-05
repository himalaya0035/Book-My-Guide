from django.contrib.auth.decorators import login_required
from django.urls import include, path
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import TokenRefreshView

from accounts.jwt import MyTokenObtainPairView
from accounts.views import UserDashboardView

urlpatterns = [
    path('oauth/', include('accounts.oauth.urls')),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('dashboard', UserDashboardView.as_view())
]
