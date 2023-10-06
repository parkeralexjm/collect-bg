from .common import ChatMessageSerializer
from users.serializers.common import UserSerializer


class PopulatedChatMessageSerializer(ChatMessageSerializer):
    user = UserSerializer()
