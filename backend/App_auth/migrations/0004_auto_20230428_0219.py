# Generated by Django 3.2.18 on 2023-04-27 20:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('App_auth', '0003_alter_customuser_password'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profilemodel',
            name='auth_token',
        ),
        migrations.RemoveField(
            model_name='profilemodel',
            name='is_verified',
        ),
    ]
