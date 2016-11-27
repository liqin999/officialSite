$(function(){
    //检测当前浏览器的版本信息
    var agent = navigator.userAgent.toLowerCase();
    var winW = parseFloat($(window).width());
    var head_left_img = (winW-1200)/2+478;
    var head_right_img = (winW-1200)/2+388;
    if(agent.indexOf("msie")>-1){
    }else{
        $(".head_left_img").css({left:-head_left_img});
        $(".head_right_img").css({right:-head_right_img});
        window.setTimeout(function(){
            $(".head_left_img").animate({left:"3%"},500);
            $(".head_right_img").animate({right:"3%"},500);
        },500)
    }
});