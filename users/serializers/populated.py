from games.serializers.populated import PopulatedGameSerializer
from users.serializers.common import UserSerializer, UserCollectionSerializer, UserCollectionOnlySerializer


class PopulatedUserCollectionSerializer(UserCollectionSerializer):
    collection = PopulatedGameSerializer(many=True)


class PopulatedUserSerializer(UserSerializer):
    following = UserSerializer(many=True)


class PopulatedUserCollectionFollowingSerializer(UserSerializer):
    collection = PopulatedGameSerializer(many=True)
    following = PopulatedUserCollectionSerializer(many=True)


class PopulatedUserCollectionOnlySerializer(UserCollectionOnlySerializer):
    collection = PopulatedGameSerializer(many=True)
