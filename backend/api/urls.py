from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenRefreshView,)
from . import views



urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/<int:pk>/', views.UserDetail.as_view()),
   
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('users/resetpassword/<int:pk>/', views.UpdatePassword.as_view()),
    path('upload/', views.FileUploadView.as_view(), name='upload'),

    path('files/', views.Files_ViewSet.as_view(), name="files"),    
    path('file/<pk>', views.FileDetail.as_view(), name='view_file'),

    path('files/create', views.FileDetail.as_view(), name='create_file'),
    path('files/update/<pk>', views.FileDetail.as_view(), name='update_file'),
    path('file/delete/<pk>/', views.FileDetail.as_view(), name='delete_file'),

    # path('', views.getRoutes)
]

urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]

