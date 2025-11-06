from django.db import models
from users.models import Planter

class Tree(models.Model):
    TREE_TYPES = [
        ('KAPOK', 'Kapok Tree'),
        ('MAHOGANY', 'Mahogany Tree'),
        ('RUBBER', 'Rubber Tree'),
        ('BRAZIL_NUT', 'Brazil Nut Tree'),
        ('ACAI', 'Açaí Palm'),
        ('COCOA', 'Cocoa Tree'),
        ('ROSEWOOD', 'Rosewood'),
        ('ANDEAN_ALDER', 'Andean Alder'),
        ('IRONWOOD', 'Ironwood'),
        ('CECROPIA', 'Cecropia'),
    ]
    
    name = models.CharField(max_length=100)
    tree_type = models.CharField(max_length=20, choices=TREE_TYPES, default='KAPOK')
    
    # 3D position in the forest
    position_x = models.FloatField(default=0.0)
    position_y = models.FloatField(default=0.0)
    position_z = models.FloatField(default=0.0)
    
    # Simple planter reference
    planter = models.ForeignKey(Planter, on_delete=models.CASCADE)
    
    planted_at = models.DateTimeField(auto_now_add=True)
    is_real_tree_planted = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-planted_at']
    
    def __str__(self):
        return f"{self.name} ({self.get_tree_type_display()}) planted by {self.planter.name}"