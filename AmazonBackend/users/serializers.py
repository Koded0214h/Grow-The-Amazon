from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser, AnonymousPlanting

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password', 'profile_picture', 'trees_planted', 'created_at')
        read_only_fields = ('trees_planted', 'created_at')
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

class AnonymousPlantingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnonymousPlanting
        fields = ('id', 'user_name', 'trees_planted', 'created_at', 'updated_at')
        read_only_fields = ('trees_planted', 'created_at', 'updated_at')