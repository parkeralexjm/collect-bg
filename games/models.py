from django.db import models

# Create your models here.


class Game(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    thumbnail = models.URLField()
    image = models.URLField()
    name = models.CharField()
    description = models.CharField()
    yearpublished = models.PositiveIntegerField()
    minplayers = models.PositiveIntegerField()
    maxplayers = models.PositiveIntegerField()
    playingtime = models.PositiveIntegerField()
    minage = models.PositiveIntegerField()
    categories = models.ManyToManyField(
        'categories.Category',
        related_name='game_category',
        blank=True
    )
    mechanics = models.ManyToManyField(
        'mechanics.Mechanic',
        related_name='game_mechanic',
        blank=True
    )
    likes = models.ManyToManyField(
        'users.User',
        related_name='liked_games',
        blank=True
    )

    def __str__(self):
        return f'{self.name} ({self.yearpublished})'
