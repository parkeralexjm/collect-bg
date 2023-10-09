from django.urls import path
from .views import ChatMessageListView, ChatMessageDetailView

# Path: /api/Messages/
urlpatterns = [
    path('', ChatMessageListView.as_view()),
    path('<int:pk>/', ChatMessageDetailView.as_view()),
    path('post/', ChatMessageDetailView.as_view())
]
