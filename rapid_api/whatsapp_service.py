import datetime

import requests
import json

url = "https://rapidapi.rmlconnect.net/wbm/v1/message"


# user full name
# Book My Guide


def send_whatsapp(guide_name, date_str: str, place_name, guide_contact, user_contact):
    payload = json.dumps(
        {
            "phone": user_contact,
            "media": {
                "type":
                    "media_template",
                "template_name":
                    "welcome",
                "lang_code": "en",
                "body": [
                    {
                        "text": f"Book My Guide Your Booking Details are Tour guide Name : {guide_name} Date and Time : {date_str} Place : {place_name} contact : {guide_contact}"
                    }
                ]
            }
        })

    headers = {
        'Content-Type': 'application/json',
        'Authorization': '617bf293245383001100f86e'
    }

    response = requests.request("POST", url, headers=headers, data=payload)


# send_whatsapp("Naman Agarwal", datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S"), "Taj Mahal", "+917505256816",
#               "+917618166335")
