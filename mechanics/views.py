from rest_framework.generics import ListCreateAPIView
from .models import Mechanic
from .serializers.common import MechanicSerializer
from .serializers.populated import PopulatedMechanicSerializer


class MechanicListView(ListCreateAPIView):
    queryset = Mechanic.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return MechanicSerializer
        return PopulatedMechanicSerializer
