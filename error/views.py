from django.shortcuts import render

def LevelErrorHandler(request):
    return render(request,'levelerror.html', {'error':'权限不足'})