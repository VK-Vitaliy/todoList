from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import OrderingFilter

from todoapp.serializers import TaskModelSerializer
from todoapp.models import Task


class TaskPagination(PageNumberPagination):
    page_size = 4


class TaskModelViewSet(ModelViewSet):
    # permission_classes = [permissions.IsAdminUser]
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    serializer_class = TaskModelSerializer
    queryset = Task.objects.all()
    pagination_class = TaskPagination
    filter_backends = [OrderingFilter]
    ordering_fields = ['user_name', 'user_email', 'completed']
