window.loginIndex = {};
window.loginIndex.num = 1;
window.loginIndex.distance = 0;
window.loginIndex.incrementNumber = 20;

function prepare(){
  //动画区
  window.loginIndex.pictures = document.getElementsByClassName("pictures")[0];
  var circles = document.getElementsByClassName("circles")[0];
  window.loginIndex.circlesLi = circles.getElementsByTagName("li");
  window.loginIndex.element = window.loginIndex.circlesLi[0];
  addClass(window.loginIndex.circlesLi[0],"focus");
  for(var i = 0,len = window.loginIndex.circlesLi.length;i < len;i++){
    (function(arg){
      window.loginIndex.circlesLi[arg].onclick = function(ev){
        clearTimeout(window.loginIndex.clearTime);
        var ev = ev || window.loginIndex.event;
        var target = ev.target || ev.srcElement;
        removeClass(window.loginIndex.element,"focus");
        addClass(target,"focus");
        window.loginIndex.element = target;
        window.loginIndex.num = arg;
        window.loginIndex.clearTime=setTimeout(animation,0);
        window.loginIndex.pictures.style.transform = "translate(-" + arg * 20 + "%)";
        window.loginIndex.pictures.style.MozTransform = "translate(-" + arg * 20 + "%)";
        window.loginIndex.pictures.style.oTransform = "translate(-" + arg * 20 + "%)";
        window.loginIndex.pictures.style.msTransform = "translate(-" + arg * 20 + "%)";
        window.loginIndex.pictures.style.webkitTransform = "translate(-" + arg * 20 + "%)";
      }
    })(i)
  }
  //登录区
  window.loginIndex.loginForm = document.getElementsByClassName("loginForm")[0];
  window.loginIndex.loginButton = window.loginIndex.loginForm.getElementsByClassName("login")[0];
  var pusername = window.loginIndex.loginForm.getElementsByClassName("pusername")[0];
  var ppassword = window.loginIndex.loginForm.getElementsByClassName("ppassword")[0];
  window.loginIndex.account = window.loginIndex.loginForm.getElementsByClassName("username")[0];
  window.loginIndex.password = window.loginIndex.loginForm.getElementsByClassName("password")[0];
  var error1 = window.loginIndex.loginForm.getElementsByClassName("error1")[0];
  var error2 = window.loginIndex.loginForm.getElementsByClassName("error2")[0];
  window.loginIndex.loginButton.onclick = function(){return submitForm();};
  window.loginIndex.account.onblur = function(){
    if(!window.loginIndex.account.value){
        removeClass(window.loginIndex.loginButton,"alert");
        removeClass(error1,"visible");
        window.loginIndex.loginButton.onclick = function(){return false;};
        addClass(window.loginIndex.loginButton,"alert");
        addClass(error1,"visible");
        return;
    }else{
        window.loginIndex.loginButton.onclick = submitForm;
        removeClass(window.loginIndex.loginButton,"alert");
    }
    removeClass(error1,"visible");
    return;
  }
  window.loginIndex.password.onblur = function(){
    if(!window.loginIndex.password.value){
        removeClass(window.loginIndex.loginButton,"alert");
        removeClass(error2,"visible");
        window.loginIndex.loginButton.onclick = function(){return false;};
        addClass(window.loginIndex.loginButton,"alert");
        addClass(error2,"visible");
        return;
    }else{
        window.loginIndex.loginButton.onclick = submitForm;
        removeClass(window.loginIndex.loginButton,"alert");
    }
    removeClass(error2,"visible");
    return;
  }
}
function animation(){
  removeClass(window.loginIndex.element,"focus");
  window.loginIndex.element = window.loginIndex.circlesLi[window.loginIndex.num];
  addClass(window.loginIndex.element,"focus");
  window.loginIndex.distance = window.loginIndex.num*window.loginIndex.incrementNumber;
  if(window.loginIndex.num == 0){
    window.loginIndex.incrementNumber = 20;
  }else if(window.loginIndex.num == 4){
    window.loginIndex.incrementNumber = -20;
  } 
  window.loginIndex.pictures.style.transform = "translate(-" + Math.abs(window.loginIndex.distance) + "%)";
  window.loginIndex.pictures.style.MozTransform = "translate(-" + Math.abs(window.loginIndex.distance) + "%)";
  window.loginIndex.pictures.style.oTransform = "translate(-" + Math.abs(window.loginIndex.distance) + "%)";
  window.loginIndex.pictures.style.msTransform = "translate(-" + Math.abs(window.loginIndex.distance) + "%)";
  window.loginIndex.pictures.style.webkitTransform = "translate(-" + Math.abs(window.loginIndex.distance) + "%)";
  window.loginIndex.num += window.loginIndex.incrementNumber/20;
  window.loginIndex.clearTime=setTimeout(animation,4000);
}

function submitForm(){
  window.loginIndex.loginButton.onclick = function(){return false;};
  var account = window.loginIndex.account;
  var password = window.loginIndex.password;
  var error1 = window.loginIndex.loginForm.getElementsByClassName("error1")[0];
  var error2 = window.loginIndex.loginForm.getElementsByClassName("error2")[0];
  if(!account.value){
    removeClass(window.loginIndex.loginButton,"alert");
    removeClass(error1,"visible");
    window.loginIndex.loginButton.onclick = function(){return false;};
    addClass(window.loginIndex.loginButton,"alert");
    addClass(error1,"visible");
    return false;
  }else{
    removeClass(error1,"visible");
    removeClass(window.loginIndex.loginButton,"alert");
  }
  if(!password.value){
    removeClass(window.loginIndex.loginButton,"alert");
    removeClass(error2,"visible");
    window.loginIndex.loginButton.onclick = function(){return false;};;
    addClass(window.loginIndex.loginButton,"alert");
    addClass(error2,"visible");
    return false;
  }else{
    removeClass(error2,"visible");
    removeClass(window.loginIndex.loginButton,"alert");
  }
  window.loginIndex.loginForm.submit();
    return true;
}
addLoadEvent(prepare);
addLoadEvent(function(){window.loginIndex.clearTime=setTimeout(animation,2000)});
