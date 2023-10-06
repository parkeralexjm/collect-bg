#  Views
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from lib.views import UserListCreateAPIView

# Permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from lib.permissions import IsOwnerOrReadOnly

# Model
from .models import ChatMessage

# Serializer
from .serializers.common import ChatMessageSerializer
from .serializers.populated import PopulatedChatMessageSerializer

# Class Views


class ChatMessageListView(ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = ChatMessage.objects.all()
    serializer_class = PopulatedChatMessageSerializer


class ChatMessageDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
