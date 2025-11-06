from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q, Count
from .models import Tree
from users.models import Planter
from .serializers import TreeSerializer, PlantTreeSerializer

class TreeViewSet(viewsets.ModelViewSet):
    queryset = Tree.objects.all().select_related('planter')
    serializer_class = TreeSerializer
    
    def get_serializer_class(self):
        if self.action == 'create':
            return PlantTreeSerializer
        return TreeSerializer
    
    def get_queryset(self):
        queryset = Tree.objects.all().select_related('planter')
        
        # Search functionality
        search_query = self.request.GET.get('search', '')
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(planter__name__icontains=search_query)
            )
        
        return queryset
    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            tree = serializer.save()
            return Response(
                TreeSerializer(tree).data, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        total_trees = Tree.objects.count()
        real_trees_planted = Tree.objects.filter(is_real_tree_planted=True).count()
        
        # Top planters
        top_planters = Planter.objects.annotate(
            tree_count=Count('tree')
        ).order_by('-tree_count')[:10]
        
        return Response({
            'total_trees': total_trees,
            'real_trees_planted': real_trees_planted,
            'top_planters': [
                {'name': planter.name, 'trees_planted': planter.tree_count}
                for planter in top_planters
            ]
        })
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        query = request.GET.get('q', '')
        if not query:
            return Response([])
        
        trees = Tree.objects.filter(
            Q(name__icontains=query) |
            Q(planter__name__icontains=query)
        )[:20]
        
        # Also search planters for the users section
        planters = Planter.objects.filter(
            name__icontains=query
        )[:10]
        
        return Response({
            'trees': TreeSerializer(trees, many=True).data,
            'users': [
                {
                    'id': planter.id,
                    'name': planter.name,
                    'trees_planted': planter.trees_planted
                }
                for planter in planters
            ]
        })