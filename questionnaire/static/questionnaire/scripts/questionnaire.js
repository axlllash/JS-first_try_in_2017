window.questionnaire = {};
window.questionnaire.icons = document.getElementsByClassName("fa-square");
window.questionnaire.questionDivs = document.getElementsByClassName("questionDiv");
window.questionnaire.submitButton = document.getElementById("submitButton");
window.questionnaire.questionForm = document.getElementsByClassName("questionForm")[0];
function prepare(){
  for(var i = 0,len = window.questionnaire.icons.length;i < len;i ++){
    (function(arg){
      window.questionnaire.icons[i].onclick = function(){
        var hiddenInput = window.questionnaire.questionDivs[arg].getElementsByTagName("input")[0];
        if(this.className.indexOf("fa-square") != "-1"){
          removeClass(this,"fa-square");
          addClass(this,"fa-check-square");
          hiddenInput.value = 1;
        } 
        else{
          removeClass(this,"fa-check-square");
          addClass(this,"fa-square");
          hiddenInput.value = 0;
        }
      }
    })(i)
  }
  window.questionnaire.submitButton.onclick = function(){
    window.questionnaire.submitButton.onclick = null;
    window.questionnaire.questionForm.submit();
  }
}
addLoadEvent(prepare);