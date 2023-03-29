from django.shortcuts import render
from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ModelViewSet

from todoapp.serializers import TaskModelSerializer
from todoapp.models import Task


class TaskModelViewSet(ModelViewSet):
    serializer_class = TaskModelSerializer
    queryset = Task.objects.all()
