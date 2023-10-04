from .common import GameSerializer
from categories.serializers.common import CategorySerializer
from mechanics.serializers.common import MechanicSerializer


class PopulatedGameSerializer(GameSerializer):
    categories = CategorySerializer(many=True)
    mechanics = MechanicSerializer(many=True)
