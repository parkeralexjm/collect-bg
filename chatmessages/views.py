#  Views
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from lib.views import UserListCreateAPIView

# Permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from lib.permissions import IsOwnerOrReadOnly

# Model
from .models import ChatMessage

# Serializer
from .serializers.common import ChatMessageSerializer

# Class Views


class ChatMessageListView(UserListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer


class ChatMessageDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
