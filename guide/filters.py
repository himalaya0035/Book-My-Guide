from rest_framework import filters

from guide.models import Package


class CityAndStateNameFilterBackend(filters.BaseFilterBackend):
    """
    Filter that only allows users to see their own objects.
    """

    def filter_queryset(self, request, queryset, view):
        # print(request.query_params)
        query__place_id = request.query_params.get('place_id')
        if query__place_id:
            return queryset.filter(guide__place_id=query__place_id)

        query__place_name = request.query_params.get('place_name')
        query__state_name = request.query_params.get('state_name')
        query__city_name = request.query_params.get('city_name')
        if query__place_name:
            return queryset.filter(guide__place__place_name__iexact=query__place_name)
        if query__city_name and query__state_name:
            return queryset.filter(guide__place__location__city=query__city_name, guide__place__location__state=query__state_name)

        return queryset

# class LocationSearchFilter(filters.BaseFilterBackend):
#
#     def filter_queryset(self, request, queryset, view):
#         # print(request.query_params)
#         query__place_id = request.query_params.get('place_id')
#         if query__place_id:
#             return queryset.filter(guide__place_id=query__place_id)
#
#         query__place_name = request.query_params.get('place_name')
#         query__state_name = request.query_params.get('state_name')
#         query__city_name = request.query_params.get('city_name')
#         if query__place_name:
#             return queryset.filter(guide__place__place_name__iexact=query__place_name)
#         if query__city_name and query__state_name:
#             return queryset.filter(guide__place__location__city=query__city_name, guide__place__location__state=query__state_name)
#
#         return queryset
