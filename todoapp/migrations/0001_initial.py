# Generated by Django 4.1.7 on 2023-03-29 08:59

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Task",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=360)),
                ("user_name", models.CharField(blank=True, max_length=360)),
                ("user_email", models.CharField(blank=True, max_length=360)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("completed", models.BooleanField(default=False)),
            ],
        ),
    ]
