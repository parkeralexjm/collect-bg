from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    collection = models.ManyToManyField(
        'games.Game',
        related_name='collected_games',
        blank=True
    )
    messages = models.JSONField(default=list, blank=True)
    friends = models.JSONField(default=list, blank=True)
    displayname = models.CharField(max_length=30, blank=True, null=True)
