from django.urls import path

from . import views

app_name="questionnaire"
urlpatterns = [
    path('',views.questionPage,name='questionPage'),
    path('experiment/',views.experiment,name='experiment'),
]