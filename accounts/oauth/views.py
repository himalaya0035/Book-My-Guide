from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from accounts.jwt import MyTokenObtainPairView, MyTokenObtainPairSerializer
from accounts.oauth import utils
from guide.models import Partner, TourGuide


@api_view(['POST'])
def index(request):
    token = request.data.get('token')
    if not token:
        return Response({
            'token': 'Required Token Value'
        }, status=status.HTTP_406_NOT_ACCEPTABLE, )
    user_data = utils.verifyOAuthToken(token)
    if user_data is None:
        return Response({
            'token': 'Invalid or Expired Token'
        }, status=status.HTTP_401_UNAUTHORIZED)
    obj = utils.login(user_data)

    refresh = TokenObtainPairSerializer.get_token(obj)

    refresh['full_name'] = obj.full_name
    refresh['image'] = user_data.get('prof_img')
    refresh['email'] = user_data.get("email")

    partner_qs = Partner.objects.filter(user_id=obj.id)

    if partner_qs.exists():
        partner_obj = partner_qs.first()
        refresh['partner_is_verified'] = partner_obj.is_verified

        if tg_qs := TourGuide.objects.filter(user_id=partner_obj.id):
            if tg_qs.exists():
                refresh['tourguide_is_verified'] = tg_qs.first().is_verified

    return Response(
        {'access_token': str(refresh.access_token),
         'refresh_token': str(refresh)
         })
