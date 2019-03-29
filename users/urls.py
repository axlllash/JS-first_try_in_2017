from django.urls import path

from . import views

app_name="users"
urlpatterns = [
    path('',views.loginIndex,name='loginIndex'),
    path('login/',views.loginIndex,name='loginIndex'),
    path('index/',views.index,name='index'),
    path('userLogin/',views.userLogin,name='userLogin'),
    path('userLogout/',views.userLogout,name='userLogout'),
    path('userSettings/',views.userSettings,name='userSettings'),
]