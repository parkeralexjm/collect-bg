# Generated by Django 4.2.5 on 2023-10-13 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0003_remove_game_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='image',
            field=models.URLField(default='placeholder'),
            preserve_default=False,
        ),
    ]
