from django.shortcuts import render
from users.views import level_auth
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from bdrs_system.settings import REDIS_HOST, REDIS_PORT

import redis
import logging

@level_auth(1,2)
def ResultManagementHandler(request):
    if request.method == 'POST':
        return ResultManagementHandlerPost(request)
    else:
        return ResultManagementHandlerGet(request)

def ResultManagementHandlerPost(request):
    userid = request.session['userid']
    username = request.session['username']    

def ResultManagementHandlerGet(request):
    userid = request.session['userid']
    username = request.session['username']
    conn = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)
    majorclasslist = conn.smembers('majorclasslist')
    majorclasslistdata = set()
    for majorclass in majorclasslist:
        # logging.debug(majorclass.decode('utf-8'))
        majorclasslistdata.add(majorclass.decode('utf-8'))
    # logging.debug(majorclasslistdata)
    return render(request,'resultmanagement.html', {'majorclasslistdata':majorclasslistdata, 'userid':userid, 'username':username, 'error':None})

# @level_auth(1,2)
# def ResultShowHandler(request, choosedclass):


# def ResultShowHandlerGet(request):
