from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from .models import Usuario
from dj_rest_auth.serializers import LoginSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
from dj_rest_auth.serializers import TokenSerializer
from rest_framework import serializers

Usuario = get_user_model()


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        # Autenticar al usuario
        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Credenciales inválidas")

        # Verificar si el usuario está activo
        if not user.is_active:
            raise serializers.ValidationError("Esta cuenta está inactiva")

        # Agregar el usuario a los datos validados
        data['user'] = user
        return data
        
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id','name', 'username', 'profile_image']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id','username','name','profile_image', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = Usuario.objects.create(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'name', 'username', 'profile_image']