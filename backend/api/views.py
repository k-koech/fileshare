import json
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from .serializer import FileSerializer, MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer, Files_Serializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, viewsets
from .models import Files, User
from rest_framework.permissions import AllowAny, IsAuthenticated

class MyTokenObtainPairView(TokenObtainPairView):
    queryset = User.objects.all()
    serializer_class = MyTokenObtainPairSerializer
    
class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class FileUploadView(generics.ListCreateAPIView):
    queryset = Files.objects.all()
    serializer_class = FileSerializer

class Files_ViewSet(generics.ListCreateAPIView):
    queryset = Files.objects.all()
    serializer_class = Files_Serializer



@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/upload/',
        '/api/files/',
        '/api/token/refresh/',
    ]
    return Response(routes)