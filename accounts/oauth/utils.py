from django.conf import settings
from django.contrib.auth import get_user_model
import requests

from accounts.models import User
from rapid_api.email_service import sendMail

user: User = get_user_model()


def login(user_data):
    obj, created = user.objects.get_or_create(email=user_data.get("email"), provider='Google')
    if created:
        obj.full_name = user_data.get("full_name")
        obj.prof_img = user_data.get("prof_img")
        obj.save()
        sendMail("Welcome", "Welcome", obj.email, obj.full_name)
    return obj


def verifyOAuthToken(token: str):
    url = settings.GOOGLE_ID_TOKEN_URL + token
    res = requests.get(url)
    if res.status_code != 200:
        return None
    data: dict[str, str] = res.json()
    if data.get("email_verified") != 'true':
        return None
    user_data = {
        "email": data.get("email"),
        "full_name": data.get("name"),
        "prof_img": data.get("picture"),
    }
    return user_data
