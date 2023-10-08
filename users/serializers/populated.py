from games.serializers.populated import PopulatedGameSerializer
from users.serializers.common import UserSerializer


class PopulatedUserSerializer(UserSerializer):
    collection = PopulatedGameSerializer(many=True)
