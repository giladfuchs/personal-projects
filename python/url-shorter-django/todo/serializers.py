from rest_framework import serializers
from .models import UrlShort


class taskSerializer(serializers.ModelSerializer):
    class Meta:
        model = UrlShort
        fields = (
            'id',
            'url',
            'count'
        )
