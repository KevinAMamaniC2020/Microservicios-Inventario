from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from dj_rest_auth.views import LoginView
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer
from rest_framework import generics
from .models import Usuario
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework import status


class CustomRegisterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user)
            return Response({
                'token':token.key,
                "user":serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomLoginView(LoginView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Recuperar el usuario validado
        user = serializer.validated_data['user']

        # Crear o recuperar el token del usuario
        token, created = Token.objects.get_or_create(user=user)

        # Devolver la respuesta con el token y datos del usuario
        return Response({
            "token": token.key,
            "user": {
                "id": user.id,
                "username": user.username,
            }
        }, status=status.HTTP_200_OK)

class UserListView(generics.ListAPIView):
    queryset = Usuario.objects.all()  
    serializer_class = UserSerializer