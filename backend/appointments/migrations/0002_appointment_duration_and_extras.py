from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='duration_minutes',
            field=models.PositiveIntegerField(default=60, verbose_name='Duração (minutos)'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='extra_services',
            field=models.CharField(blank=True, max_length=255, verbose_name='Serviços extras'),
        ),
    ]
