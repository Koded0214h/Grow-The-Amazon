from rest_framework import serializers
import random
from .models import Tree
from users.models import Planter

class TreeSerializer(serializers.ModelSerializer):
    planter_name = serializers.CharField(source='planter.name', read_only=True)
    tree_type_display = serializers.CharField(source='get_tree_type_display', read_only=True)
    
    class Meta:
        model = Tree
        fields = (
            'id', 'name', 'tree_type', 'tree_type_display', 'position_x', 'position_y', 'position_z',
            'planter', 'planter_name', 'planted_at', 'is_real_tree_planted'
        )
        read_only_fields = ('planted_at', 'is_real_tree_planted')

class PlantTreeSerializer(serializers.Serializer):
    user_name = serializers.CharField(max_length=100)
    tree_name = serializers.CharField(max_length=100)
    tree_type = serializers.ChoiceField(choices=Tree.TREE_TYPES, required=False, default='KAPOK')
    
    def create(self, validated_data):
        user_name = validated_data['user_name']
        tree_name = validated_data['tree_name']
        tree_type = validated_data.get('tree_type', 'KAPOK')
        
        # Get or create planter
        planter, created = Planter.objects.get_or_create(
            name=user_name
        )
        
        # Generate random position
        position_x = random.uniform(-8, 8)
        position_z = random.uniform(-8, 8)
        
        # Create tree
        tree = Tree.objects.create(
            name=tree_name,
            tree_type=tree_type,
            planter=planter,
            position_x=position_x,
            position_z=position_z
        )
        
        # Update planter's tree count
        planter.trees_planted += 1
        planter.save()
        
        return tree
    
    def to_representation(self, instance):
        return TreeSerializer(instance).data