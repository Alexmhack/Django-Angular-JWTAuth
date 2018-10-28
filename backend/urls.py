from django.contrib import admin
from django.urls import path

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from microblog.views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
]

urlpatterns += [
    path('api-token-auth/', obtain_jwt_token),
    path('api-token-refresh/', refresh_jwt_token),
]
