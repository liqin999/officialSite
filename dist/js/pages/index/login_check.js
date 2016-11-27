(function(){
    //注册信息的时候表单校验
    var ctr = true,ctr1=true;
    var selfValidate = window.myj.selfValidate;
    $("#login_user").removeClass("disabled");
    $(".signUp").removeClass("disabled");
    selfValidate($("#user_form"),true);
    selfValidate($("#findpass_form"),true);
    $("#login_user").addClass("disabled");
    $(".signUp").addClass("disabled");
    selfValidate({
        $input:$("#pasd_t"),
        rule:function(newPassword){
            return newPassword === $("#password").val();
        },
        promptTxt:"两次输入密码不一致"
    },true);

    function checkInput(username){
        var regEmail = /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$)|(^$)/;
        var regPhone = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
        if(regPhone.test(username) || regEmail.test(username)){
            return true;
        }else{
            return false;
        }
    }
    function checkPassword(password) {
        var regPassword = /^[a-zA-Z0-9]{6,18}$/;
        if(regPassword.test(password)){
            return true;
        }else{
            return false;
        }
    }
    /* 
     功能：保存cookies函数  
     参数：name，cookie名字；value，值 
     */
    function SetCookie(name,value){
        var Days = 30;   //cookie 将被保存一月
        var exp  = new Date();  //获得当前时间
        exp.setTime(exp.getTime() + Days*24*60*60*1000);  //换成毫秒
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
    /*
     功能：获取cookies函数
     参数：name，cookie名字
     */
    function getCookie(name){
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr != null){
            return unescape(arr[2]);
        }else{
            return null;
        }
    }
    /*模板安装的进度条*/
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
        },50);
    };
    $("#login_submit").click(function(e){
        var Email = $("#tet").val();
        var password = $("#pasd").val();
        var valid = $("#verify_code").val();
        var $body=$("body"),      //body
            $login_user=$("#login_user"),    //整个登录注册大盒子
            $login=$(".login"),             //登录页面
            $signUp=$(".signUp");         //注册页面

        if(Email == '')
        {
            alert("请输入手机号码或者邮箱");
            $(".Email").focus();
            return false;
        }else
        {
            if(!(checkInput(Email)))
            {
                alert('请输入正确的手机号或者邮箱');
                $(".Email").focus();
                return false;
            }
        }
        if(password == '')
        {
            alert("请输入登录密码");
            $("#pasd").focus();
            return false;
        }
        if(valid == '')
        {
            alert("请输入验证码");
            $("#verify_code").focus();
            return false;
        }
        /*表单提交Ajax提交部分
        $.post(rootUrl+"/Ucenter/Login/islogin",{"Email":Email,"password":password,"valid":valid},function(data){

            if(data.status == "success"){
                alert('登录成功');
                //$(".y_suer").removeClass('disabled').html(Email);
                //$(".user").addClass('disabled');
                location.href = rootUrl+'/Ucenter/Index/index';
                // $body.removeClass("modal-open");
                // $body.css("padding-right","0px");
                // $login_user.hide();
                // $login.hide();
                // $signUp.hide();
                return true;
            }else{
                alert(data.msg);
                $("#tet").focus();
                return false;
            }

        },"json")
        return false;*/
        //判断状态值是否已经登录，进行模板安装过程
        var barwidth=parseInt($(".temp_true_proBar").width());
        var opele=$(".temp_true_proBar")
        var $judge=$("#judge").val();
        if($judge == "1"){
            var login_url_er = ucenterUrl+"/index.php/Ucenter/Login/installTemp";
            $.ajax(login_url_er, {
                data: {
                    "Email":Email,
                    "password":password,
                    "valid":valid,
                },
                dataType: 'jsonp',
                crossDomain: true,
                success: function(data) {
                    if(data.status == "success"){
                        $login.hide();
                        $(".login_user_bar").show();
                        $("#setup_template").show();
                        $(".temp_pupbox").animate({top:"50%"},1000,function(){
                            setTimeout(function(){  scrollbar(barwidth,opele);},100)
                        });
                        $(".login_user").hide()
                    }else{
                        alert(data.msg);
                        $("#tet").focus();
                        return false;
                    }
                }
            });
          return false;
        }else{
            var login_url = ucenterUrl+"/index.php/Ucenter/Login/islogin";
            $.ajax(login_url, {
                data: {
                    "Email":Email,
                    "password":password,
                    "valid":valid,
                },
                dataType: 'jsonp',
                crossDomain: true,
                success: function(data) {
                    if(data.status == "success"){
                        alert('登录成功');
                        SetCookie('username',Email);
                        location.href = ucenterUrl+'/index.php/Ucenter/Index/index';
                        return true;
                    }else{
                        alert(data.msg);
                        $("#tet").focus();
                        return false;
                    }
                }
            });
            return false;
        }


    });


    /**
     * 刷新验证码
     */
    $(".login_com").click(function () {
        var path = ucenterUrl+"/index.php/Ucenter/Login/verify?id="+new Date().getTime();
        //console.log('111',path);
        $("#verify").attr("src",path);
    });


    /**
     * 找回密码发送验证码
     */
    $(".js-send-pass").click(function () {
        if(ctr1){
            var findmobile = $("#mtetx").val();
            if(findmobile == ''){
                $("#mtetx").trigger("blur");
                $("#mtetx").focus();
                return false;
            }else {
            }
            validCode($(this),"ctr1");
            var sms_url = ucenterUrl+"/index.php/Ucenter/Login/sendSms";
            $.ajax(sms_url, {
                data: {
                    "mobile":findmobile
                },
                dataType: 'jsonp',
                crossDomain: true,
                success: function(data) {
                    if(data.status == "success"){
                        alert(data.msg);
                    }else{
                        alert(data.msg);

                    }
                }
            });
            return false;
        }

    });

    /*验证码函数部分，使用一个js处理  把里面的函数合并成一个 传递参数的不同执行相应的动作 一个开关一个文本信息*/
    function validCode(codehtml,toggle){
        window.clearInterval(timer1);
        var curTime=60;
        codehtml.html("60秒后重发");
        if(toggle == "ctr"){
            ctr = false;
        }else if(toggle == "ctr1"){
            ctr1 = false;
        }
        var timer1=window.setInterval(function(){
            //$(".sendCode").removeClass('sendSms');
            curTime--;
            codehtml.html(curTime+"秒后重发");
            if(curTime==0){
                clearInterval(timer1);
                codehtml.html("重新发送验证码");
                if(toggle == "ctr"){
                    ctr = true;
                }else if(toggle == "ctr1"){
                    ctr1 = true;
                }
            }
        },1000);
    };

    function validCode1(codehtml){
        var curTime=60;
        codehtml.html("60秒后重发");
        ctr1 = false;
        timer2=window.setInterval(function(){
            //$(".sendCode").removeClass('sendSms');
            curTime--;
            codehtml.html(curTime+"秒后重发");
            if(curTime==0){
                clearInterval(timer1);
                codehtml.html("重新发送验证码");
                ctr1 = true;
            }
        },1000);
    };

    /*注册会员离开焦点的验证 包括手机号或者邮箱重名的校验*/
    $("#tetx").on("blur",function(){
        if($(this).parent("p").hasClass("err")){
            return;
        }else{
            var reg_url = ucenterUrl+"/index.php/Ucenter/Register/checkUserName";
            $.ajax(reg_url, {
                data: {
                    "user":$("#tetx").val(),
                },
                dataType: 'jsonp',
                crossDomain: true,
                success: function(data) {
                    var canRegister = false;
                    if(data.status == "success"){
                        canRegister = true;
                       /* $("#tetx").parent("p").removeClass("err");
                        $("#tetx").nextSibling("div.err-tip").remove();*/
                    }else{
                        //用户注册后执行相应的提示信息 动态拼接字符串  尝试用this的方式实现
                        $("#tetx").parent("p").addClass("err");
                        $("#tetx").siblings(".err-tip").show();
                        $("#tetx").siblings(".err-tip").find("span").text("此手机号已经注册,请重新输入");
                    }
                    /**
                     * 会员注册发送验证码
                     */
                    $(".js-send-member").click(function () {
                        if(canRegister){
                            if(ctr){
                                var mobile = $("#tetx").val();
                                if(mobile == ''){
                                    $("#tetx").trigger("blur");
                                    $("#tetx").focus();
                                    return false;
                                }else {
                                }
                                validCode($(this),"ctr");
                                var sms_url = ucenterUrl+"/index.php/Ucenter/Login/sendSms";
                                $.ajax(sms_url, {
                                    data: {
                                        "mobile":mobile
                                    },
                                    dataType: 'jsonp',
                                    crossDomain: true,
                                    success: function(data) {
                                        if(data.status == "success"){
                                            alert(data.msg);
                                        }else{
                                            alert(data.msg);

                                        }
                                    }
                                });
                                return false;
                            }
                        }else{
                           /* alert("已经注册");*/
                        }
                    });

                }
            });
        }
    });

    /*注册会员离开焦点的验证 网址的重名校验*/
    $("#pasd_scwz").on("blur",function(){
        if($(this).parent("p").hasClass("err")){
            return;
        }else{
            var reg_url = ucenterUrl+"/index.php/Ucenter/Register/checkUserUrl";
            $.ajax(reg_url, {
                data: {
                    "user":$("#pasd_scwz").val(),
                },
                dataType: 'jsonp',
                crossDomain: true,
                success: function(data) {
                    if(data.status == "success"){
                      /*  $("#pasd_scwz").parent("p").removeClass("err");
                        $("#pasd_scwz").nextSibling("div.err-tip").remove();*/
                    }else{
                        $("#pasd_scwz").parent("p").addClass("err");
                        $("#pasd_scwz").siblings(".err-tip").show();
                        $("#pasd_scwz").siblings(".err-tip").find("span").text("此网址已经注册，请重新输入");
                        return false;
                    }
                }
            });
        }
    });

    /*注册提交*/
    /*表单提交部分*/
/*    $("#user_submit").on("click",function(){
        selfValidate($("#user_form"),true);
    });*/
    $("#user_submit").on("click",function(){
       var formResult=selfValidate($("#user_form"));
        var Ephone = $("#tetx").val();
        var valid = $("#valid").val();
        var password = $("#password").val();
        var repassword = $("#pasd_t").val();
        var shopUrl = $("#pasd_scwz").val();
        var name = $("#name").val();
        /*if(Ephone == ''){
            alert('请输入手机号或者邮箱');
            $("#tetx").focus();
            return false;
        }else {
            if (!(checkInput(Ephone))) {
                alert('请输入正确的手机号或者邮箱');
                $("#tetx").focus();
                return false;
            }
        }

        if(name == ''){
            alert('请输入联系人姓名');
            $("#name").focus();
            return false;
        }
        if(valid == ''){
            alert('请输入验证码');
            $("#valid").focus();
            return false;
        }

        if(password == ''){
            alert('请输入密码');
            $("#password").focus();
            return false;
        }else{
            if(!(checkPassword(password))){
                alert('密码输入格式不正确,请重新输入');
                $("#password").focus();
                return false;
            }
        }

        if(repassword == ''){
            alert('请输入确认密码');
            $("#pasd_t").focus();
            return false;
        }else{
            if(!(checkPassword(repassword))){
                alert('确认密码输入格式不正确,请重新输入');
                $("#pasd_t").focus();
                return false;
            }
        }

        if(password != repassword){
            alert('两次密码匹配不正确');
            $("#pasd_t").focus();
            return false;
        }*/
       /* if(shopUrl == ''){
         alert('请输入商城域名');
         $("#pasd_scwz").focus();
         return false;
         }else{
         if(!(checkPassword(shopUrl))){
         alert('请输入正确商城网址');
         $("#pasd_scwz").focus();
         return false;
         }
         }*/
        if(shopUrl=='ucenter'){
            alert('该网址已被注册，请重新输入');
        }
        var reg_url = ucenterUrl+"/index.php/Ucenter/Register/register";
        if(formResult){
            $.ajax(reg_url, {
                data: {
                    "Ephone":Ephone,
                    "valid":valid,
                    "password":password,
                    "repassword":repassword,
                    "shopUrl":shopUrl,
                    "name":name
                },
                dataType: 'jsonp',
                crossDomain: true,
                success: function(data) {
                    if(data.status == "success"){
                        alert(data.msg);
                        location.href = ucenterUrl+'/index.php/Ucenter/Index/index';
                        $(".login_close").trigger("click");
                    }else{
                        alert(data.msg);

                    }
                },
            });
        }
        return false;
    });
    /*找回密码*/
    $("#forget_pass").on("click",function(){

        $("#mvalid").val("");
        $("#mpassword").val("");
        $(this).parents(".login").hide();
        $(".find_pass_infor").show();
        $(".muser_submit").on("click",function(){})
    });
    /*找回密码表单提交*/
    $("#pass_submit").click(function(){
        var formResult=selfValidate($("#findpass_form"));
        var Ephone = $("#mtetx").val();
        var valid = $("#mvalid").val();
        var password = $("#mpassword").val();
        var change_url = ucenterUrl+"/index.php/Ucenter/Login/changePassword";
        if(formResult){
            $.ajax(change_url, {
                data: {
                    "Ephone":Ephone,
                    "valid":valid,
                    "password":password,
                },
                dataType: 'jsonp',
                crossDomain: true,
                success: function(data) {
                    if(data.status == "success"){
                        alert(data.msg);

                        //location.href = ucenterUrl+'/index.php/Ucenter/Index/index';
                        $(".login_close").trigger("click");
                    }else{
                        alert(data.msg);

                    }
                },
            });
        }
        return false;
    })

})(jQuery);


