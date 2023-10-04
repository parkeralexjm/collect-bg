from .common import CategorySerializer
from games.serializers.common import GameSerializer


class PopulatedCategorySerializer(CategorySerializer):
    games = GameSerializer(many=True)
