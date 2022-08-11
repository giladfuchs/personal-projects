from django.db import models


class UrlShort(models.Model):
    id = models.AutoField(auto_created=True,
                                  primary_key=True,
                                  serialize=True,
                                  )
    url = models.CharField(max_length=250)
    count = models.BigIntegerField(default=0)


