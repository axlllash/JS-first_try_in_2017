#-*-coding:utf-8-*-
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.views.generic.base import View
from django.shortcuts import render
from bdrs_system.settings import REDIS_HOST, REDIS_PORT

import redis
import logging
import chardet

def level_auth(*args):
    def echo(func):
        def wrapper(request, *arg, **kwargs):
            level = request.session.get('level')
            if not level:
                return HttpResponseRedirect('/login/')
            if int(level) in args:
                return func(request, *arg, **kwargs)
            return HttpResponseRedirect('/levelerror/')
        return wrapper
    return echo

def loginIndex(request):
    return render(request,'users/loginIndex.html')

def clear_session(request):
	request.session.clear()

@level_auth(0,1,2)
def index(request):
    return render(request,'users/index.html', {'userid':request.session['userid'], 'username':request.session['username']})

def userLogin(request):
    errors=[]
    account=None
    password=None
    if request.method=='POST':
        account=request.POST.get('account')
        password=request.POST.get('password')
        print(account)
        print(password)
        conn = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)
        data = conn.hgetall('student:' + account)
        print(data)
        if data:
            if data[b'password'] == password.encode('utf-8'):
                request.session['userid'] = account
                request.session['username'] = data[b'username'].decode('gbk', errors='ignore')
                request.session['level'] = data[b'level'].decode('utf-8')
                # logging.debug(request.session['usrname'])
                # logging.debug(request.session['level'])
                # logging.debug("success") 
                user = {}
                user['is_authenticated'] = True
                user['info'] = account + ":" + request.session['username'] 
                return HttpResponseRedirect('/index')
            else:
                errors.append('用户名或密码错误')
        else:
            errors.append('用户名或密码错误')
        return render(request,'users/loginIndex.html',{'errors':errors})

    

@level_auth(0,1,2)
def userLogout(request):
    clear_session(request)
    return HttpResponseRedirect('/')

@level_auth(0,1,2)
def userSettings(request):
    return render(request,'users/settings.html', {'userid':request.session['userid'], 'username':request.session['username']})












# @level_auth(0,1,2)
# def ChangePassWord(request):
#     if request.method == 'POST':
#         return ChangePassWordPost(request)
#     else:
#         return ChangePassWordGet(request)

# def ChangePassWordGet(request):
#     form = ChangePSWForm()
#     return render(request,'changepsw.html', {'form': form, 'error':None})

# def ChangePassWordPost(request):
#     form = ChangePSWForm(request.POST)
#     if form.is_valid():
#         userid = request.session['userid']
#         oldpassword = form.cleaned_data['oldpassword']
#         newpassword = form.cleaned_data['newpassword']
#         newpasswordagain = form.cleaned_data['newpasswordagain']
#         if newpassword == newpasswordagain:
#             conn = redis.Redis(host='127.0.0.1', port=6379, db=0)
#             nowpsd = conn.hget('student:' + str(userid), b'password')
#             if nowpsd == oldpassword.encode('utf-8'):
#                 conn.hset('student:' + str(userid), b'password', newpassword)
#                 return render(request,'changepsw.html', {'form':form, 'message':'密码修改成功'})
#             else:
#                 return render(request,'changepsw.html', {'form':form, 'error':'旧密码输入错误'})     
#         else:
#             return render(request,'changepsw.html', {'form':form, 'error':'两次输入的新密码不一致'})
#     else:
#         return render(request,'changepsw.html', {'form':form, 'error':'无效的提交数据'})
