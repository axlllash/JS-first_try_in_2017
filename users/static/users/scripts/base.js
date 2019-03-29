function addLoadEvent(func){
  if(typeof window.onload != 'function'){
    window.onload=func;
  }
  else{
    oldfunc = window.onload;
    window.onload = function(){
      oldfunc();
        func();
      }
    }
}

function addClass(element,value){
  if(!element.className){
    element.className = value;
  }
  else{
    element.className = element.className + " " + value;
  }
}

function removeClass(element,value){
  try{
    var re = new RegExp("(\\s*"+value+")+");
    element.className = element.className.replace(re,"")
  }catch(e){}
}
