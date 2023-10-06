from django.db import models

# Create your models here.


class Mechanic(models.Model):
    name = models.CharField(max_length=255)
    id = models.PositiveIntegerField(primary_key=True)
    games = models.ManyToManyField(
        'games.Game',
        related_name='mechanic_game',
        blank=True
    )

    def __str__(self):
        return self.name
