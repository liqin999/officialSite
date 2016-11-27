(function(){
	/*商城信息修改保存页面切换*/
	var svr=false;

	$(".shop_baocun").on("click",function(){
		svr=true;
		$(this).addClass("shop_hide");
		$(".shop_change").removeClass("shop_hide");
		$(".shop_store_con_min").find(".shop_old").show();
		$(".shop_store_con_min").find(".shop_new").hide();

	})

	$(".shop_change").on("click",function(){
		$(this).addClass("shop_hide");
		$(".shop_baocun").removeClass("shop_hide");
		$(".shop_store_con_min").find(".shop_old").hide();
		$(".shop_store_con_min").find(".shop_new").show();
		if(svr){
			$(".shop_add").hide();
			$(".shop_add_change").css("display","inline-block");
		}
	})




	/*安全设置页面弹出绑定效果*/
	//初次绑定邮箱效果/*安全设置页面弹出绑定效果*/
	//初次绑定邮箱效果

	/*安全设置页面弹出绑定效果*/
	//初次绑定邮箱效果
	$(".no_bind").on("click",function(){
		$(".popUp").show();    //bounceInDown
		$(".pop_email2").addClass("bounceInDown").show();
		pop_email2_next();
	})
	//执行 确定  取消按钮
	function pop_email2_next(){
		//确定 按钮
		$(".email2_yes").on("click",function(){
			$(".popUp").hide();    //bounceInDown
			$(".pop_email2").removeClass("bounceInDown").hide();
			$(".sec_email").show();
			$(".sec_email_no").hide();
		})
		//取消  按钮
		$(".email2_no").on("click",function(){
			$(".popUp").hide();    //bounceInDown
			$(".pop_email2").removeClass("bounceInDown").hide();
		})
	}
	//更改邮箱
	$(".yes_bind").on("click",function(){
		$(".popUp").show();    //bounceInDown
		$(".pop_email1").addClass("bounceInDown").show();
		pop_email1_next();
	});
	function pop_email1_next(){
		//下一步
		$(".email1_yes").on("click",function(){
			$(".pop_email1").removeClass("bounceInDown").hide();
			$(".pop_email2").show();
			pop_email2_next();
		})
		//取消  按钮
		$(".email1_no").on("click",function(){
			$(".popUp").hide();    //bounceInDown
			$(".pop_email1").removeClass("bounceInDown").hide();
		})
	}
	//重置密码
	$(".sec_lock").on("click",function(){
		$(".popUp").show();    //bounceInDown
		$(".pop_pasd").addClass("bounceInDown").show();
		pop_pasd_next();
	})
	function pop_pasd_next(){
		//确定 按钮
		$(".pasd_yes").on("click",function(){
			$(".popUp").hide();
			$(".pop_pasd").removeClass("bounceInDown").hide();


		})
		//取消  按钮
		$(".pasd_no").on("click",function(){
			$(".popUp").hide();
			$(".pop_pasd").removeClass("bounceInDown").hide();

		})
	}
	//商城信息图片放大效果
	$(".shop_enlarge").on("click",function(){
		var str="";
		var imgSrc=$(this).siblings("img").attr("src");
		str+='<div class="shop_fixed_img">'
			+'<div class="block"></div>'
			+'<div class="fixed_img_con">'
			+'<span class="close">x</span>'
			+'<img src="'+imgSrc+'" alt="">'
			+'</div>'
			+'</div> ';
		$("body").append(str);
		shop_close();
	})
	function shop_close(){
		$(".shop_fixed_img").on("click",".close",function(){
			$(this).parents(".shop_fixed_img").remove();
		})
	}

	//商城信息 绑定域名按钮
	var csr=false;
	$(".shop_yuming").on("click",function(){
		csr=$(this).attr('name');
		//if(!(csr)){
		if(csr == 'update'){
			$(".fixed_doman_sj").show();
		}else if(csr == 'band'){
			$(".fixed_doman_tj").show();
		}else{
			$(".fixed_doman_tj").show();
		}
		shcp_close()
	})
	//关闭按钮
	function shcp_close(){
		$(".fixed_dom").on("click",".close",function(){
			$(this).parents(".fixed_dom").hide();
		});
	}
	/*立即购买 单选按钮效果*/
	function buy_edition(){
		var $c_con1=$(".version"),
			$c_con1_radio=$c_con1.find('input[name="1"]'),
			$c_con2=$(".time"),
			$c_con2_radio=$c_con2.find('input[name="2"]');
		$c_con1_radio.on("click",function(){
			calculation();
		});
		$c_con2_radio.on("click",function(){
			calculation();
		});

	}
	var to_version;
	var to_year;
	var spay;
	/*计算函数*/
	function calculation(){
		var $c_con1=$(".version"),
			$c_con1_radio_ck=$c_con1.find('input[name="1"]'),
			$c_con2=$(".time"),
			$c_con2_radio_ck=$c_con2.find('input[name="2"]'),
			$val_month=$(".val_month"),
			$sellprice=$(".sellprice"),
			$oriprice=$(".oriprice"),

			price=0,year=0,mon=0,num=0,num_old= 0,version= 0;
		$.each($c_con1_radio_ck,function(i,v){
			if($(v).prop("checked")){
				version=$(v).attr("data-value");
				if(version==1){
					price=99;
				}else if(version==2){
					price=299;
				}
				to_version=version;
			}
		});
		$.each($c_con2_radio_ck,function(j,k){
			if($(k).prop("checked")){
				year=$(k).attr("data-value");
				to_year=year;
			}
		});

		var total_price=price*year;
		//var p=1;
		//if(year>=12){
		//	p=0.87;
		//}
        //
		//num=total_price*p*0.5
		num_old=total_price;
		num=total_price;

		if(year==3){
			$val_month.html("3个月");
			$oriprice.removeClass("line").html("原价：￥"+num);
			//$(".or_ic").addClass("hide");
		}else if(year==12){

			//$val_month.html("12个月[赠送2个月]");
			$val_month.html("12个月");

			$oriprice.addClass("line").html("原价：￥"+num_old);
			//$(".or_ic").removeClass("hide");
		}else if(year==24){
			//$val_month.html("24个月[赠送4个月]");
			$val_month.html("24个月");
			$oriprice.addClass("line").html("原价：￥"+num_old);
			//$(".or_ic").removeClass("hide");
		}else if(year==36){
			//$val_month.html("36个月[赠送6个月]");
			$val_month.html("36个月");
			$oriprice.addClass("line").html("原价：￥"+num_old);
			//$(".or_ic").removeClass("hide");
		}
		$sellprice.html("￥"+num+".00");
		$sellprice.val(num);
	}
	$("#go-buy").on("click",function(){

		spay=$("#s_pay").val();
		//alert(spay);
		$sellprice =$(".sellprice");
		$url       =$("#url").attr("name");
		$price     =$sellprice.val();
		if(spay=='true'){
			window.open($url+$price+'&v='+to_version+"&t="+to_year);
		}else{
			if($price<1 ){
				alert("请选择商品类别和时间");
			}else{
			window.open($url+$price+'&v='+to_version+"&t="+to_year);
			}
		}
	});
	buy_edition();

//价格购买页面去付款  弹出框遮罩层
	$(".shap_btn").on("click",function(){
		console.log(parseInt($(".sellprice").text()));
		if(parseInt($(".sellprice").html())!==0){
			$(".fixed_shape").show();
			shape_close();
		}

	})

	function shape_close(){
		$(".shape_close").on("click",function(){
			$(".fixed_shape").hide();
		})
	};
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



})(jQuery);
