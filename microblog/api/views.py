from django.db.models import Q

from rest_framework import generics
from rest_framework import permissions

from .serializers import BlogPostSerializer
from microblog.models import BlogPost

class BlogPostAPIView(generics.ListAPIView):
	serializer_class = BlogPostSerializer

	def get_queryset(self):
		qs = BlogPost.objects.all().order_by("-timestamp")
		query = self.request.GET.get('q', None)
		if query is not None:
			qs = qs.filter(
				Q(content__icontains=query) |
				Q(title__icontains=query)
			)
		return qs


class BlogPostCreateAPIView(generics.CreateAPIView):
	serializer_class = BlogPostSerializer
	permission_classes = (permissions.IsAuthenticated,)

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)
