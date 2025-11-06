from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import login, logout
from django.contrib.auth.models import AnonymousUser
from .models import CustomUser, AnonymousPlanting
from .serializers import UserSerializer, AnonymousPlantingSerializer
from trees.models import Tree

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            login(request, user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        from django.contrib.auth import authenticate
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return Response(UserSerializer(user).data)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    @action(detail=False, methods=['post'])
    def logout(self, request):
        logout(request)
        return Response({'message': 'Logged out successfully'})
    
    @action(detail=False, methods=['get'])
    def current_user(self, request):
        if request.user.is_authenticated:
            serializer = self.get_serializer(request.user)
            return Response(serializer.data)
        return Response({'user': None})

class AnonymousPlantingViewSet(viewsets.ModelViewSet):
    queryset = AnonymousPlanting.objects.all()
    serializer_class = AnonymousPlantingSerializer
    
    def get_queryset(self):
        # Users can only see their own anonymous plantings
        if hasattr(self.request, 'session') and self.request.session.session_key:
            return AnonymousPlanting.objects.filter(
                session_key=self.request.session.session_key
            )
        return AnonymousPlanting.objects.none()
    
    def create(self, request):
        session_key = request.session.session_key
        if not session_key:
            request.session.save()
            session_key = request.session.session_key
        
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(session_key=session_key)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)