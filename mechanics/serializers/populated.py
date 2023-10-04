from .common import MechanicSerializer
from games.serializers.common import GameSerializer


class PopulatedMechanicSerializer(MechanicSerializer):
    games = GameSerializer(many=True)
