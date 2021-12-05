class CurrentUsersPartnerDefault:
    requires_context = True

    def __call__(self, serializer_field):
        return serializer_field.context['request'].user.partner

    def __repr__(self):
        return '%s()' % self.__class__.__name__

class CurrentPartnersTourGuideDefault:
    requires_context = True

    def __call__(self, serializer_field):
        return serializer_field.context['request'].user.partner.tourguide

    def __repr__(self):
        return '%s()' % self.__class__.__name__
