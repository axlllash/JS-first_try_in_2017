#-*-coding:utf-8-*-
from django.shortcuts import render
from django.http import HttpResponse
from users.views import level_auth
from bdrs_system.settings import REDIS_HOST, REDIS_PORT

import redis
# import logging
import json

@level_auth(0,1,2)
def questionPage(request):
    userid = request.session['userid']
    username = request.session['username']
    conn = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)
    majorclass = conn.hget('student:' + str(userid), 'majorclass').decode('utf-8')
    # logging.debug(majorclass)
    booklist = conn.smembers('book:' + str(majorclass))
    # logging.debug(booklist)
    allinfo = []
    for inbook in booklist:
        book = {}
        book['ID'] = inbook.decode('utf-8')
        bookinfo = conn.hgetall('book:' + book['ID'])
        book['name'] = bookinfo[b'name'].decode('gbk', errors='ignore')
        book['price'] = bookinfo[b'price'].decode('utf-8')
        book['discount'] = bookinfo[b'discount'].decode('utf-8')
        allinfo.append(book)
    # logging.debug(allinfo)
    # jsondata = json.dumps(allinfo)
    # logging.debug(jsondata)
    return render(request, 'questionnaire/questionnaire.html', {'allinfo':allinfo, 'userid':userid, 'username':username, 'error':None})

def experiment(request):
    if request == "POST":
        print("返回的数据是")
        print(request.body)
    return HttpResponse(request.body)