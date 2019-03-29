"""bdrs_system URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from error.views import LevelErrorHandler
from checkselection.views import CheckselectionHandler
from resultmanagement.views import ResultManagementHandler

urlpatterns = [
    # path('admin/', admin.site.urls, name = 'admin'),
    # path('', LoginHandler),
    # path('login/', LoginHandler, name = 'login'),
    # path('changepsw/', ChangePassWord, name = 'changepsw'),
    # path('levelerror/', LevelErrorHandler, name = 'levelerror'),
    # path('home/', HomeHandler, name = 'home'),
    # path('selection/', SelectionHandler, name = 'selection'),
    # path('checkselection/', CheckselectionHandler, name = 'checkselection'),
    # path('resultmanagement/', ResultManagementHandler, name = 'resultmanagement'),
    path('', include('users.urls', namespace='users')),
    path('questionnaire/',include('questionnaire.urls',namespace='questionnaire')),
]
