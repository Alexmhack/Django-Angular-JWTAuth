from django.urls import path

from .views import BlogPostCreateAPIView, BlogPostAPIView

urlpatterns = [
	path('', BlogPostAPIView.as_view(), name='list'),
	path('create/', BlogPostCreateAPIView.as_view(), name='create'),
]
