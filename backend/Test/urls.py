# Test/urls.py
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
<<<<<<< HEAD
    path('app01/', include('app01.urls')),
    path('', views.index),
]
=======
    path('api/', include('app01.urls')),  # API 端點在 /api/ 下
    path('', RedirectView.as_view(url='/api/', permanent=False)),  # 根路徑重定向到 /api/
]
>>>>>>> main
