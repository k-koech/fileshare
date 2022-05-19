from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenRefreshView,)
from . import views



urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/<int:pk>/', views.UserDetail.as_view()),

    path('register/', views.RegisterView.as_view(), name='auth_register'),

    path('upload/', views.FileUploadView.as_view(), name='upload'),
    path('files/', views.Files_ViewSet.as_view(), name="files"),

    path('', views.getRoutes)
]

