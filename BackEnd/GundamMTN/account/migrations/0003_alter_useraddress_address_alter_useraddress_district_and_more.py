# Generated by Django 4.1.6 on 2023-07-07 02:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_remove_useraddress_company_remove_useraddress_nation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraddress',
            name='address',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='useraddress',
            name='district',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='useraddress',
            name='full_name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='useraddress',
            name='phone_number',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='useraddress',
            name='province',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='useraddress',
            name='wards',
            field=models.CharField(max_length=50),
        ),
    ]