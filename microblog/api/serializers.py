from rest_framework import serializers

from microblog.models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
	class Meta:
		model = BlogPost
		fields = '__all__'
