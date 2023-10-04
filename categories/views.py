from rest_framework.generics import ListCreateAPIView
from .models import Category
from .serializers.common import CategorySerializer
from .serializers.populated import PopulatedCategorySerializer


class CategoryListView(ListCreateAPIView):
    queryset = Category.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CategorySerializer
        return PopulatedCategorySerializer
