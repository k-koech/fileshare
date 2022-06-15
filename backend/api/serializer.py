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
        token['id'] = user.id
        token['username'] = user.username
        token['email'] = user.email
        token['is_admin'] = user.is_admin
        return token
        
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
        fields = ('email','username','is_staff','is_admin', 'password', 'password2')
        # extra_kwargs = {"username": {"error_messages": {"required": "Give yourself a username"}}}

    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"passwordError": "Password fields did not match!"})
        return attrs
   
    def create(self, validated_data):
        user = User.objects.create(
           email=validated_data['email'], username=validated_data['username'],is_staff=validated_data['is_staff'], is_admin=validated_data['is_admin'])

        user.set_password(validated_data['password'])
        if user.save():
            raise serializers.ValidationError({"successFULL": "Successfully saved!"})
        return user



class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    class Meta:
        model = User
        fields = ['id', 'old_password', 'new_passwod']

    # old_password = serializers.CharField(required=True)
    # new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = '__all__'


