from rest_framework.generics import ListCreateAPIView
from .models import Mechanic
from .serializers.common import MechanicSerializer


class MechanicListView(ListCreateAPIView):
    queryset = Mechanic.objects.all()
    serializer_class = MechanicSerializer
