from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    image = models.ImageField(default='default.jpg',
                              upload_to='profile_images')
    following = models.ManyToManyField(
        'users.User',
        related_name='following_users',
        blank=True
    )
    displayname = models.CharField(max_length=30, blank=True, null=True)
