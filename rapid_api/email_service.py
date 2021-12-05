import requests
import json
from django.conf import settings

url = settings.RAPID_EMAIL_BASE_POINT



def sendMail(content, subject, dest_email, dest_name, from_name="Book My Guide"):
    payload = json.dumps({
        "owner_id": "57302215",
        "token": "NGuxC0S19zFZsh6cqNPGqANL",
        "smtp_user_name": "smtp36090962",
        "message": {
            "text": content,
            "subject": subject,
            "from_email": "noreply@rapidemail.rmlconnect.net",
            "from_name": from_name,
            "to": [
                {
                    "email": dest_email,
                    "name": dest_name,
                    "type": "to"
                }
            ],
            "headers": {
                "Reply-To": "noreply@rapidemail.rmlconnect.net",
                "X-Unique-Id": "id "
            },

        }
    })
    headers = {
        'Reply-To': 'message.reply@example.com',
        'X-Unique-Id': 'id',
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

# sendMail("hello i am api", "this is test", "singhpriyansh51001@gmail.com", "Priyansh")
