from django.db import models

# Create your models here.


class ChatMessage(models.Model):
    content = models.CharField(max_length=280)
    user = models.ForeignKey(
        'users.User',
        related_name='chatmessages',
        on_delete=models.CASCADE,
        null=True
    )
