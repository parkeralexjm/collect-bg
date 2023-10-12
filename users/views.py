from rest_framework.generics import CreateAPIView, GenericAPIView, ListAPIView, RetrieveUpdateAPIView, UpdateAPIView
from .serializers.common import RegistrationSerializer, AllUsersSerializer, UserSerializer
from .serializers.populated import PopulatedUserSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class UserView(GenericAPIView):
    queryset = User.objects.all()


class RegisterView(APIView):
    def post(self, request):
        try:
            user_to_register = RegistrationSerializer(data=request.data)

            if user_to_register.is_valid():

                # print(user_to_register.validated_data)
                tokens = get_tokens_for_user(user_to_register.data)
                print(tokens)
                user_to_register.save()
                return Response(user_to_register.data, status.HTTP_201_CREATED)

            print(user_to_register.errors)
            return Response(user_to_register, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print('Exception -', e)
            return Response({'detail': str(e)}, status.HTTP_500_INTERNAL_SERVER_ERROR)


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
        if request.data['type'] == "remove":
            user.following.remove(request.data['id'])
            user.save()
            return Response(status=204)
        else:
            user.following.add(request.data['id'])
            user.save()
        return Response(status=201)


class UserCollectionUpdateView(UserView, UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        if request.data['type'] == 'add':
            user.collection.add(request.data['id'])
            user.save()
            return Response(status=201)
        else:
            user.collection.remove(request.data['id'])
            user.save()
        return Response(status=204)
