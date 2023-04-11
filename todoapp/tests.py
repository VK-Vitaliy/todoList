import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import TaskModelViewSet
from .models import Task


class TestTodoAppViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/')
        view = TaskModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_task(self):
        factory = APIRequestFactory()
        request = factory.post('/api/', {'title': 'test task',
                                         'user_name': "Test",
                                         'user_email': 'test@mail.ru',
                                         }, format='json')
        view = TaskModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
