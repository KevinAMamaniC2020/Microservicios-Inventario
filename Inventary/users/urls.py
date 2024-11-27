from django.urls import path, include
from .views import CustomRegisterView,UserListView,CustomLoginView

urlpatterns = [
    path('register/', CustomRegisterView.as_view(), name='register'),
    path('login/', CustomLoginView.as_view(), name='custom_login'),
    path('users/', UserListView.as_view(), name='user-list'),  
]
