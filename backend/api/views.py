import json
from telnetlib import STATUS
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404, HttpResponse, JsonResponse
from .serializer import FileSerializer, MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer, Files_Serializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, viewsets
from rest_framework.decorators import APIView
from .models import Files, User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status

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

class FileDetail(APIView):
    # permission_classes = [IsAuthenticated]
    """
    Retrieve, update or delete a file instance.
    """
    def get_object(self, pk):
        try:
            return Files.objects.get(pk=pk)
        except Files.DoesNotExist:
            raise Http404
    # get file
    def get(self, request, pk, format=None):
        file = self.get_object(pk)
        serializer = Files_Serializer(file)
        return Response(serializer.data)
    

    def put(self, request, format=None):
        serializer = FileSerializer(data=request.DATA)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # update
    def put(self, request, pk, format=None):
        file = self.get_object(pk)
        serializer = Files_Serializer(file, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # delete file
    def delete(self, request, pk, format=None):
        file = self.get_object(pk)
        file.delete()
        return JsonResponse({"Success":"Successfully deleted"})
        # return Response(status=STATUS.HTTP_204_NO_CONTENT)


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