from rest_framework.generics import CreateAPIView, GenericAPIView, ListAPIView, RetrieveUpdateAPIView, UpdateAPIView
from .serializers.common import RegistrationSerializer, AllUsersSerializer, UserSerializer
from .serializers.populated import PopulatedUserSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response

User = get_user_model()


class UserView(GenericAPIView):
    queryset = User.objects.all()


class RegisterView(UserView, CreateAPIView):
    serializer_class = RegistrationSerializer


class UsersView(UserView, ListAPIView):

    serializer_class = AllUsersSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class UserDetailView(UserView, RetrieveUpdateAPIView):
    serializer_class = PopulatedUserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class UserFollowView(UserView, UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = self.get_object()  # get the single user
        print(user.following.all())
        if request.data['id'] in user.following.all():
            user.following.remove(request.data['id'])
            user.save()
            return Response(status=204)
        else:
            user.following.add(request.data['id'])
            user.save()
        return Response(status=201)
