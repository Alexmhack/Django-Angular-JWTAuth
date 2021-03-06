from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class BlogPost(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	title = models.CharField(max_length=250)
	content = models.TextField()
	timestamp = models.DateTimeField(auto_now=True)
	updated = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return str(self.user)
