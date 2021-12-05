from rest_framework.permissions import IsAuthenticated

from rest_framework import generics

from accounts.seializers import UserDashboardSerializer

"""

full name 
mobile number 
profile image 


current booking || completed booking 
        tour title
        place image 
        date 
        id

"""


class UserDashboardView(generics.RetrieveAPIView):
    serializer_class = UserDashboardSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
