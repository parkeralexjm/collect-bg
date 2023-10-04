from django.urls import path
from .views import MechanicListView

urlpatterns = [
    path('', MechanicListView.as_view())
]
