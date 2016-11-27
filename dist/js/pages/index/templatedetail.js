$(function(){
    $('#element_id').cxScroll({
        minus: true,
        plus: true,
        time: 2000,
    });
    $(".box").on("mouseover",function(){
        $(".cxscroll .prev").show();
        $(".cxscroll .next").show();
    }).on("mouseout",function(){
      /*  $(".cxscroll .prev").hide();
        $(".cxscroll .next").hide();*/
    });
    $(".cxscroll .prev").on("mouseover",function(){
        $(".cxscroll .prev").show();
        $(".cxscroll .prev").addClass("prev_white");
        $(".cxscroll .next").show();
        $(".cxscroll .next").addClass("next_white");
    }).on("mouseout",function(){
      /*  $(".cxscroll .prev").hide();*/
        $(".cxscroll .prev").removeClass("prev_white");
    /*    $(".cxscroll .next").hide();*/
        $(".cxscroll .next").removeClass("next_white");
    });
    $(".cxscroll .next").on("mouseover",function(){
        $(".cxscroll .prev").show();
        $(".cxscroll .prev").addClass("prev_white");
        $(".cxscroll .next").show();
        $(".cxscroll .next").addClass("next_white");
    }).on("mouseout",function(){
        $(".cxscroll .prev").removeClass("prev_white");
        $(".cxscroll .next").removeClass("next_white");
       /* $(".cxscroll .prev").hide();
        $(".cxscroll .next").hide();*/
    });
    var $user=$(".user"),     //首页登陆按钮
        $body=$("body"),      //body
        $user_login=$(".user_login"),   //登录页面  注册按钮
        $us_ad=$(".us_ad"),				//免费试用==注册按钮
        $login_user=$("#login_user"),    //整个登录注册大盒子
        $login=$(".login"),             //登录页面
        $signUp=$(".signUp"),            //注册页面
        $user_reg=$(".user_reg"),
        $user_admin=$(".user_admin");     //注册页面下面的登陆按钮
    function getCookie(name){
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr != null){
            return unescape(arr[2]);
        }else{
            return null;
        }
    }
    //模板安装过程：判断是否登录的状态。
    var barwidth=parseInt($(".temp_true_proBar").width());
    var opele=$(".temp_true_proBar")
    $(".js-user").on("click",function(){
        var url = ucenterUrl+ucenterPath+'/Login/loginCheck';
        var login_name = getCookie('username');
        var temp_val = $(this).attr('data-temp-val');
        //console.log('username==',login_name);
        $.ajax(url, {
            data: {
                'username':login_name
            },
            dataType: 'jsonp',
            crossDomain: true,
            success: function(data) {
                if(data.code == 0){
                    $login_user.show();
                    $login.show();
                    $(".find_pass_infor").hide();
                }else if(data.code == 1){
                    var install_url = ucenterUrl+ucenterPath+'/Login/installUserTemplate';
                    $.ajax(install_url,{
                        data:{
                            'username':login_name,
                            'template':temp_val
                        },
                        dataType: 'jsonp',
                        crossDomain: true,
                        success:function (data) {

                        }
                    });
                    $(".login_user_bar").show();
                    $("#setup_template").show();
                    $(".temp_pupbox").animate({top:"50%"},1000,function(){
                        setTimeout(function(){  scrollbar(barwidth,opele);},100)
                    });
                }
            }
        });


    });
    //这是X号的隐藏功能
  /*  $(".login_close").on("click",function(){
        $("#setup_template").hide()
    });*/
    function scrollbar(val,ele){
        var timer=window.setInterval(function(){
            var step=5;
            if(val>=280){
                window.clearInterval(timer);
                $(".temp_tip_infor1").hide();
                $(".temp_tip_infor2").show();
            }else{
                val+=step;
                ele.width(val);
            }
        },300);
    };
    $(".template_close").on("click",function(){
        $("#setup_template").hide();
    })

})
