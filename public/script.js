function gotourl(){
    var input=document.getElementById("url").value;
    console.log(input);
    window.location.href=("new/"+input);
    return false;
    }