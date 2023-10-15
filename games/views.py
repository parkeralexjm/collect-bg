#  Views
from rest_framework.generics import (
    RetrieveUpdateDestroyAPIView,
    UpdateAPIView,
    GenericAPIView,
    ListAPIView
)
# from lib.views import UserListCreateAPIView

# Permissions
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from lib.permissions import IsOwnerOrReadOnly

# Model
from .models import Game

# Serializer
from .serializers.populated import PopulatedGameSerializer

# Rest Framework
from rest_framework.response import Response

# Paginations
from .paginations import CustomPagination

# Filter
from .filters import GameFilter
from django_filters import rest_framework as filters

# Generic view setting the queryset and serializer


class GameView(GenericAPIView):
    queryset = Game.objects.all()
    serializer_class = PopulatedGameSerializer


# Endpoint for view: /Games
class GameListView(GameView, ListAPIView):
    # Change this to Is Authenticated after development
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = CustomPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = GameFilter


# Detail view for Game
# Endpoint: /Games/:id
class GameDetailView(GameView, RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]


# Like view for Game
# Endpoint: /Games/:id/like
class GameLikeView(GameView, UpdateAPIView):
    permission_classes = [IsAuthenticated]

    # Overriding the patch method
    # This will produce like toggle behaviour
    def patch(self, request, *args, **kwargs):
        game = self.get_object()  #  get the single Game object

        # check if the user already appears in the list of likes, remove if so
        if request.user in game.likes.all():
            game.likes.remove(request.user)
            game.save()
            return Response(status=204)
        # If user does not exist in likes, add them
        else:
            game.likes.add(request.user)
            game.save()
            return Response(status=201)
