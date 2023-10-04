from games.serializers.common import GameSerializer
from users.serializers.common import UserSerializer


class PopulatedUserSerializer(UserSerializer):
    collection = GameSerializer(many=True)
