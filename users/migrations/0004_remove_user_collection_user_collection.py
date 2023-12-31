# Generated by Django 4.2.5 on 2023-10-03 17:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0002_game_likes'),
        ('users', '0003_remove_user_bio_remove_user_favourites_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='collection',
        ),
        migrations.AddField(
            model_name='user',
            name='collection',
            field=models.ManyToManyField(blank=True, related_name='collected_games', to='games.game'),
        ),
    ]
