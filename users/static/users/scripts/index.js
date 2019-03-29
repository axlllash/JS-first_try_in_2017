window.index={};
window.index.container = document.getElementsByClassName("container")[0];
window.index.hellozone = document.getElementsByClassName("hellozone")[0];
window.index.p3 = document.getElementsByClassName("p3")[0];
window.index.contentTop = document.getElementsByClassName("contentTop")[0];
window.index.content = document.getElementsByClassName("content")[0];
window.index.contentTopLi = window.index.contentTop.getElementsByTagName("li");

function prepare(){
  window.index.clearTime = setTimeout(function(){
    addClass(window.index.container,"gradient");
    addClass(window.index.hellozone,"tfHello")
    window.onscroll = function(){
      console.log(document.documentElement.scrollTop);
      if(window.innerHeight/(document.documentElement.scrollTop || document.body.scrollTop)<= 7.32){
        removeClass(window.index.hellozone,"tfHello");
        if(window.index.p3.className.indexOf("tfp3") == "-1" && 
        window.index.hellozone.className.indexOf("tfHello") == "-1"){
          addClass(window.index.p3,"tfp3");
        }
      }
      else{ 
        if(window.index.hellozone.className.indexOf("tfHello") == "-1"){
          addClass(window.index.hellozone,"tfHello");
        }
      removeClass(window.index.p3,"tfp3");
      }  
    }
  },1); 
  for(var i = 0,len = window.index.contentTopLi.length;i < len;i ++){
    (function(arg){
      window.index.contentTopLi[arg].onclick=function(){
        removeClass(window.index.contentTopLi[0],"CTclick");
        removeClass(window.index.contentTopLi[1],"CTclick");
        addClass(this,"CTclick");
        removeClass(window.index.content.children[0],"CTV");
        removeClass(window.index.content.children[1],"CTV");
        addClass(window.index.content.children[arg],"CTV");
        this.style.left = "0";
        window.index.contentTopLi[Math.abs(arg-1)].style.left = "3.28rem"; 
      }
    })(i);
  }
}

addLoadEvent(prepare);