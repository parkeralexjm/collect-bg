from .views import GameListView, GameDetailView, GameOwnedView
from django.urls import path


urlpatterns = [
    path('', GameListView.as_view()),
    path('<int:pk>/', GameDetailView.as_view()),
    path('<int:pk>/owned/', GameOwnedView.as_view())
]
