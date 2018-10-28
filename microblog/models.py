from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class BlogPost(models.Model):
	user = models.Foreign(User, on_delete=models.CASCADE)
	date = models.DateTimeField(auto_add=True)
	content = models.TextField()

	def __str__(self):
		return str(self.user)
