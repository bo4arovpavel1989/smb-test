function Unloader(){
 
    var o = this;
 
    this.unload = function(evt)
    {
        var message = "Вы уверены, что хотите покинуть страницу?";
        if (typeof evt == "undefined") {
            evt = window.event;
        }
        if (evt) {
            evt.returnValue = message;
        }
        return message;
    }
 
    this.resetUnload = function()
    {
        $(window).off('beforeunload', o.unload);
 
         setTimeout(function(){
            $(window).on('beforeunload', o.unload);
        }, 2000);
    }
 
    this.init = function()
    {
         
        $(window).on('beforeunload', o.unload);
 
        
    }
    this.init();
}
 
(function(){
    if(typeof window.obUnloader != 'object')
    {
        window.obUnloader = new Unloader();
    }
})();