from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, UserDetailView, UsersView, UserFollowView, UserCollectionUpdateView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view()),
    path('register/', RegisterView.as_view()),
    path('user/<int:pk>', UserDetailView.as_view()),
    path('users/', UsersView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('<int:pk>/follow/', UserFollowView.as_view()),
    path('<int:pk>/collection/', UserCollectionUpdateView.as_view())
]
