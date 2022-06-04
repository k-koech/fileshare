from requests import Response
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Files, User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import update_last_login
from django.contrib.auth.password_validation import validate_password



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['is_admin'] = user.is_admin
        return token
        #  data['user'] = UserSerializer(self.user).data
    #    data['refresh'] = str(refresh)
        # data['access'] = str(refresh.access_token)

        
class UserSerializer(serializers.ModelSerializer):
    is_admin = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'is_admin']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        # write_only=True,
         required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email','username', 'password', 'password2')
        # extra_kwargs = {"username": {"error_messages": {"required": "Give yourself a username"}}}

    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"passwordError": "Password fields did not match!"})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
           email=validated_data['email'], username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        if user.save():
            raise serializers.ValidationError({"successFULL": "Successfully saved!"})
        return user

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = '__all__'


class Files_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = '__all__'

  
# class LoginSerializer(TokenObtainPairSerializer):

#     def validate(self, attrs):
#         data = super().validate(attrs)

#         refresh = self.get_token(self.user)

#         data['user'] = UserSerializer(self.user).data
#         data['refresh'] = str(refresh)
#         data['access'] = str(refresh.access_token)

#         if api_settings.UPDATE_LAST_LOGIN:
#             update_last_login(None, self.user)

#         return data


# class RegisterSerializer(UserSerializer):
#     password = serializers.CharField(max_length=128, min_length=8, write_only=True, required=True)
#     email = serializers.EmailField(required=True, write_only=True, max_length=128)

#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'password', 'is_active', 'created', 'updated']

#     def create(self, validated_data):
#         try:
#             user = User.objects.get(email=validated_data['email'])
#         except ObjectDoesNotExist:
#             user = User.objects.create_user(**validated_data)
#         return user

# .......................................
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'password']
#         extra_kwargs = {'password': {'write_only': True, 'required': True}}

#     def create(self, validated_data):
#         user = User.objects.create_user(**validated_data)
#         Token.objects.create(user=user)
#         return user