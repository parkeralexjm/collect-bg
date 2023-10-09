from django.db import models

# Create your models here.


class ChatMessage(models.Model):
    content = models.CharField(max_length=280)
    posted = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        'users.User',
        related_name='chatmessages',
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return f'{self.user} ({self.content})'
