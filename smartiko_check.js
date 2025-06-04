(function(){
if(localStorage.getItem("token") && !window.location.pathname.match(/deposit/)){
    window._smartico_user_id = window._growthbookRenderer.context.attributes.accountNumber;
    window._smartico_language = "EN"
    return true;}
else if(localStorage.getItem("token") && window.location.pathname.match(/deposit/)){
    window._smartico_user_id = null;
    window._smartico_language = null;
    return false;
}else if(!localStorage.getItem("token")){
    window._smartico_user_id = null;
    window._smartico_language = null;
    return false;}else{return false;}
})();
