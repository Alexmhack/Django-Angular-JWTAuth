# Django-Angular-JWTAuth
Angular frontend authentication example using Json Web Token (JWT) with Django as backend

**Repo contains Django code as backend and angular as frontend and authentication 
system using Django REST framework JWT**

To use this repo clone it and in root folder open the command prompt and run

```
pipenv install
python manage.py migrate
python manage.py runserver
```

# Project Initialization
1. Create virtualenv using pipenv
	```
	# install pipenv if not installed or you can use any other virtualenv package of your choice
	pip install pipenv
	pipenv install django djangorestframework djangorestframework-jwt python-decouple
	```

2. Activate virtualenv using
	```
	pipenv shell
	```

3. Start Django project
	```
	django-admin startproject backend .
	python manage.py migrate
	python manage.py createsuperuser
	python manage.py startapp microblog
	```

4. Configure Django project settings by adding rest framework and jwt and python-decouple

	First add support for env variables by creating a ```.env``` file and add
	```
	PROJECT_KEY=<your_secret_key>
	```
	```
	import os
	import datetime
	from decouple import config
	...
	SECRET_KEY = config('PROJECT_KEY')	# <- move secret key from here to .env file
	```

	Now add rest framework settings
	```
	INSTALLED_APPS = [
		...
		'rest_framework',
	]
	...
	# add at the bottom
	REST_FRAMEWORK = {
	    'DEFAULT_PERMISSION_CLASSES': (
	        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
	    ),
	    'DEFAULT_AUTHENTICATION_CLASSES': (
	        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
	        'rest_framework.authentication.SessionAuthentication',
	        'rest_framework.authentication.BasicAuthentication',
	    ),
	}
	...
	JWT_AUTH = {
	    'JWT_ALLOW_REFRESH': True,
	    'JWT_EXPIRATION_DELTA': datetime.timedelta(seconds=3600),
	}
	```

5. Start django app for blogs
	```
	python manage.py startapp microblog
	```
	And add it in ```INSTALLED_APPS```
