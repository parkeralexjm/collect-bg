from django.db import models

# Create your models here.


class Game(models.Model):
    id = models.IntegerField(primary_key=True)
    thumbnail = models.URLField()
    image = models.URLField()
    name = models.CharField()
    description = models.CharField()
    yearpublished = models.IntegerField()
    minplayers = models.IntegerField()
    maxplayers = models.IntegerField()
    playingtime = models.IntegerField()
    minage = models.IntegerField()
    categories = models.JSONField()
    mechanics = models.JSONField()

    # STR method overrides the default string shown on the admin index page for this model

    def __str__(self):
        return f"{self.name} ({self.yearpublished})"
