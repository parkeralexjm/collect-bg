from rest_framework.generics import CreateAPIView, GenericAPIView, ListAPIView, RetrieveUpdateAPIView
from .serializers.common import RegistrationSerializer
from .serializers.populated import PopulatedUserSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticatedOrReadOnly

User = get_user_model()


class UserView(GenericAPIView):
    queryset = User.objects.all()
    print(queryset)


class RegisterView(UserView, CreateAPIView):
    serializer_class = RegistrationSerializer


class UserDetailView(UserView, RetrieveUpdateAPIView):
    serializer_class = PopulatedUserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
