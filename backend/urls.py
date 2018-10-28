from django.contrib import admin
from django.urls import path, include

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('microblog.urls'), name='microblog'),
]

urlpatterns += [
    path('api-token-auth/', obtain_jwt_token),
    path('api-token-refresh/', refresh_jwt_token),
]
