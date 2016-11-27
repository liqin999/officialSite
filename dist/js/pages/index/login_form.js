$(document).ready(function () {
	$("#verify").attr("src",ucenterUrl+ucenterPath+"/Login/verify?id="+Date.parse(new Date()));
	//注册会员或者找回密码时候根据不同的输入信息，改变验证码的提示信息
	var changeCodeText = function (opea,ohtml){
		var regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/;
		var regPhone = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
		var user_info ;
		opea.on("blur",function(){
			user_info = opea.val();
			if(regEmail.test(user_info)){
				ohtml.text("向邮箱发送验证码")
			}else if(regPhone.test(user_info)){
				ohtml.text("向手机发送验证码")
			}
		})
	};
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
	//设置body的modal-open样式
	var setBody_modal_openclass = function(){
		if(!$("body").hasClass("modal-open")){
			$("body").addClass("modal-open");
			if(ios_c){
				$("body").css("padding-right","0px");
			}else{
				$("body").css("padding-right","17px");
				//当出现弹框的时候，背景图像超出滚动条的部分隐藏 modify by lq 2016.9.21
				$(".y_banner .ban_img > ul > li.ban_li1").css({"backgroundSize":"97.55% 100%"});
				$(".y_banner .ban_img > ul > li.ban_li2").css({"backgroundSize":"97.55% 100%"});
				$(".y_banner .ban_img > ul > li.ban_li3").css({"backgroundSize":"97.55% 100%"});
			}
		}
	}
	//清空默认附件的账户和密码
	var cleantetxAndpassword = function(){
		//清空默认的谷歌浏览器默认附件的账户名和密码
		$("#tetx").val("");
		$("#password").val("");
	}
	//关闭
	var login_close = function (){
		$("body").removeClass("modal-open");
		$("body").css("padding-right","0px");
		//表单清空,然后相应的隐藏
		/*$("#user_form")[0].reset();
		$("#login_form")[0].reset();
		$("#findpass_form")[0].reset();*/
		$(".find_pass_infor").hide();
		$(".login_user").hide();
		$(".login").hide();
		$(".signUp").hide();
		window.location.reload(true);
	};
	//
	var init = function (){
		var cboxed=$("#boxk").prop("checked");
		var tp_box=$("#tp_chebox").prop("checked");
		if(cboxed){
			$("#user_submit").attr("disabled",false).css("background","#7ab55c");
		}else{
			$("#user_submit").attr("disabled",true).css("background","#aaa");
		}
		if(tp_box){
			$(".shap_btn").css("background","#7ab45d").attr("disabled",false);
		}else{
			$(".shap_btn").css("background","#aaa").attr("disabled",true);
		}
	}
	//进入注册页面
	function show_user(){
		changeCodeText($("#tetx"),$(".js-send-member"));
		setBody_modal_openclass();
		cleantetxAndpassword();
		$(".find_pass_infor").hide();
		$(".login_user").show();
		$(".login").hide();
		$(".signUp").show();
	}
	//进入登录页面 头部会员中心点击
	$(".user").click(function(){
		changeCodeText($("#mtetx"),$(".js-send-pass"));
		setBody_modal_openclass();
		var requestUrl = ucenterUrl+ucenterPath+'/Login/loginCheck';
		var login_name = getCookie('username');
		$.ajax(requestUrl, {
			data: {'username':login_name},
			dataType: 'jsonp',
			crossDomain: true,
			success: function(data) {
				if(data.code == 0){
					$(".login_user").show();
					$(".login").show();
					$(".find_pass_infor").hide();
				}else if(data.code == 1){
					var redirectUrl = ucenterUrl+ucenterPath+'/Index/index';
					window.location.href=redirectUrl;
				}
			}
		});

	});
	//固定按钮的弹框
	var $register_btn=$(".register_btn"),
		$main_last_btn=$(".main_last_btn"),
		$activity_btn=$(".activity_btn"),
		$user_reg=$(".user_reg");
	$register_btn.on("click",function(){
		show_user();
	});
	$main_last_btn.on("click",function(){
		show_user();
	});
	$activity_btn.on("click",function(){
		show_user();
	});
	$user_reg.on("click",function(){
		/*$(".user").trigger("click");*/
		/*show_user();*/
		var requestUrl = ucenterUrl+ucenterPath+'/Login/loginCheck';
		var login_name = getCookie('username');
		$.ajax(requestUrl, {
			data: {'username':login_name},
			dataType: 'jsonp',
			crossDomain: true,
			success: function(data) {
				if(data.code == 0){
					$(".find_pass_infor").hide();
					$(".login_user").show();
					$(".signUp").show();
				}else if(data.code == 1){
					var redirectUrl = ucenterUrl+ucenterPath+'/Index/index';
					window.location.href=redirectUrl;
				}
			}
		});
	});
	//登录页面  没有账号？立即注册点击
	$(".user_login").click(function(){	show_user();});
	//免费试用14天 点击
	$(".us_ad").click(function(){show_user();});
	//免费试用 点击
	$(".sp_open_btn").click(function(){show_user();});
	//已有账号立即登录
	$(".user_admin").click(function(){
		$(".login").show();
		$(".signUp").hide();
	});
	//banner  免费试用 登录
	$(".y_banner").on("click",".y_btn",function(){	show_user();});
	//关闭按钮
	$(".login_close").click(function(){
		login_close();
	});
	/*设置默认选中服务条款*/
	init();
	$("#boxk").click(function(){
		init();
	})
	$("#tp_chebox").click(function(){
		init();
	})
	//
	$("#fixed_top").on("click","div",function(){
		$('html,body').animate({"scrollTop":0},300);
	});

	/*登录 注册 焦点验证*/
	//yanzheng();     //焦点验证
	/*$(".denglu").on("click",function(){
	 $body.removeClass("modal-open");
	 $login_user.hide();
	 $login.hide();
	 $signUp.hide();
	 })*/
	$(window).scroll(function () {
		var w_top=$(window).scrollTop();     //这个方法是当前滚动条滚动的距离
		//$(window).height()获取当前窗体的高度
		//$(document).height()获取当前文档的高度
		if(w_top<=900){
			$("#fixed_top").hide();
		}else{
			$("#fixed_top").show();
		}
	});
	$("#fixed_top").on("click","div",function(){
		$('html,body').animate({"scrollTop":0},300);
	});

	/*每个页面中固定的联系方式*/
		var $fixed_con=$("#fixed_contact");
		var $fixed_fold_con=$("#fixed_fold_contact");
		$fixed_con.find(".close_con").on("click",function(){
			$fixed_con.hide();
			$fixed_fold_con.show()
		});
		$fixed_fold_con.find(".close").on("click",function(){
			$fixed_fold_con.hide();
			$fixed_con.show()
		});
});



