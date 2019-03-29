from django.shortcuts import render
from users.views import level_auth
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from bdrs_system.settings import REDIS_HOST, REDIS_PORT

import redis
import logging

@level_auth(0,1,2)
def CheckselectionHandler(request):
    if request.method == 'POST':
        return HttpResponseRedirect('/commonerror/',{'info':'GotPOSTinCheckselectionHandler'})
    else:
        return CheckselectionHandlerGet(request)

def CheckselectionHandlerGet(request):
    userid = request.session['userid']
    username = request.session['username']
    level = request.session['level']   
    conn = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)
    majorclass = conn.hget('student:' + str(userid), 'majorclass').decode('utf-8')
    booklist = conn.smembers('book:' + str(majorclass))
    choosedbooklist = conn.hgetall('submit_set:' + str(userid))
    allbook = []
    for inbook in booklist:
        book = {}
        book['ID'] = inbook.decode('utf-8')
        bookinfo = conn.hgetall('book:' + book['ID'])
        book['name'] = bookinfo[b'name'].decode('gbk', errors='ignore')
        book['price'] = bookinfo[b'price'].decode('utf-8')
        book['discount'] = bookinfo[b'discount'].decode('utf-8')
        if inbook in choosedbooklist:
            book['choosed'] = 1
        else:
            book['choosed'] = 0
        allbook.append(book)
    stuinfo = conn.hgetall('student:' + str(userid))
    logging.debug(stuinfo)
    origin_total_price = stuinfo[b'origin_total_price'].decode('utf-8')
    real_total_pricel = stuinfo[b'real_total_price'].decode('utf-8')
    return render(request,'checkselection.html', {'allbook':allbook, 'userid':userid, 'username':username, 'error':None, 'origin_total_price':origin_total_price, 'real_total_pricel':real_total_pricel})
    # return HttpResponse('喵')
