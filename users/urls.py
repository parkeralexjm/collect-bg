from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, UserDetailView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view()),
    path('register/', RegisterView.as_view()),
    path('user/<int:pk>', UserDetailView.as_view()),
    path('refresh/', TokenRefreshView.as_view())
]
