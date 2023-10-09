from games.serializers.populated import PopulatedGameSerializer
from users.serializers.common import UserSerializer


class PopulatedUserCollectionSerializer(UserSerializer):
    collection = PopulatedGameSerializer(many=True)


class PopulatedUserSerializer(UserSerializer):
    collection = PopulatedGameSerializer(many=True)
    following = PopulatedUserCollectionSerializer(many=True)
