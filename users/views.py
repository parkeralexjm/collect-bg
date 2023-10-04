from rest_framework.generics import CreateAPIView, GenericAPIView, ListAPIView
from .serializers.common import RegistrationSerializer
from .serializers.populated import PopulatedUserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class UserView(GenericAPIView):
    queryset = User.objects.all()


class RegisterView(UserView, CreateAPIView):
    serializer_class = RegistrationSerializer


class UserDetailView(UserView, ListAPIView):
    serializer_class = PopulatedUserSerializer
