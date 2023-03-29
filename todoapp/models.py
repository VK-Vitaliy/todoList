from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=360)
    user_name = models.CharField(max_length=360, blank=True)
    user_email = models.CharField(max_length=360, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)

    objects = models.Manager()

    def __str__(self):
        return self.title
