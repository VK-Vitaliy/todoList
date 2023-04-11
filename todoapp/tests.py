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
        request = factory.get('/api/todo/')
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

    def test_edit_task(self):
        task = mixer.blend(Task)
        client = APIClient()
        response = client.put(f'/api/todo/{task.id}/', {"title": 'test task2'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_task_by_admin(self):
        task = mixer.blend(Task)
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        client.login(username='admin', password='admin123456')
        response = client.put(f'/api/todo/{task.id}/', {"title": 'test task2'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        task = Task.objects.get(id=task.id)
        self.assertEqual(task.title, 'test task2')
        client.logout()

    def test_delete_task(self):
        task = mixer.blend(Task)
        client = APIClient()
        response = client.delete(f'/api/todo/{task.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_task_by_admin(self):
        task = mixer.blend(Task)
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        client.login(username='admin', password='admin123456')
        response = client.delete(f'/api/todo/{task.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        client.logout()
