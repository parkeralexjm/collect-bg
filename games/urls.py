from .views import GameListView, GameDetailView, GameLikeView
from django.urls import path


urlpatterns = [
    path('', GameListView.as_view()),
    path('<int:pk>/', GameDetailView.as_view()),
    path('<int:pk>/like/', GameLikeView.as_view())
]
