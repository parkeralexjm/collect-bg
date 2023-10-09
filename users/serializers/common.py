from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'displayname', 'email',
                  'first_name', 'last_name', 'collection', 'image', 'following')


class AllUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',
                  'first_name', 'last_name', 'image')


class RegistrationSerializer(serializers.ModelSerializer):

    # This is us specifying that we don't want password or password_confirmation to be serialized when querying the object
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password',
                  'password_confirmation',)

    def validate(self, data):
        # Validate method passes in the request body data, so in this case things username, password & password_confirmation
        # We can run our validation here, and then either throw an error or return the data
        password = data.get('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError('Passwords do not match.')
        return data

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
