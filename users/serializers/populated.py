from games.serializers.populated import PopulatedGameSerializer
from users.serializers.common import UserSerializer, UserCollectionSerializer


class PopulatedUserCollectionSerializer(UserCollectionSerializer):
    collection = PopulatedGameSerializer(many=True)


class PopulatedUserSerializer(UserSerializer):
    following = UserSerializer(many=True)


class PopulatedUserCollectionFollowingSerializer(UserSerializer):
    collection = PopulatedGameSerializer(many=True)
    following = PopulatedUserCollectionSerializer(many=True)
