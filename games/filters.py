from django_filters import rest_framework as filters
from .models import Game


class GameFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Game
        fields = ['categories', 'mechanics', 'name']
