from django.db import models

class Planter(models.Model):
    name = models.CharField(max_length=100, unique=True)
    trees_planted = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-trees_planted']
    
    def __str__(self):
        return f"{self.name} ({self.trees_planted} trees)"