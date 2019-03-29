var registerForm=document.getElementsByClassName("registerForm")[0];
var registerButton=registerForm.getElementsByClassName("submit")[0];
registerButton.onclick=submitForm;
function submitForm(){
    registerButton.onclick=null;
    registerButton.style.backgroundColor="grey";
    var account=registerForm.getElementsByClassName("username")[0];
    var name=registerForm.getElementsByClassName("name")[0];
    var password=registerForm.getElementsByClassName("password")[0];
    var password2=registerForm.getElementsByClassName("password2")[0];
    var email=registerForm.getElementsByClassName("email")[0];
    if(!account||!name||!password||!password2||!email&&password==password2){
        var error=document.getElementsByClassName("errors")[0];
        error.innerHTML="<p>"+"相关信息未填或填写错误"+"</p>";
        return false;
        loginButton.onclick=submitForm;
    }
    loginForm.submit();
    return true;
}