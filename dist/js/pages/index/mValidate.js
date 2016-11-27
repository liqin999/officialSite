/**
 * Created with JetBrains WebStorm.
 * User: muyingjie
 * Date: 16-8-1
 * Time: 上午10:48
 * To change this template use File | Settings | File Templates.
 *
 * HTML格式
 * <input id="goods_name" name="goods_name" type="text" class="txt input-118" required  data-max="30" pattern="^.{1,30}$" />
 * <div class="default-tip"><i></i><span>支持汉字、英文、数字及“-”、“_”组合,最多30个字符</span></div>
 * <div class="err-tip"><i></i><span></span></div>
 *
 * 为input自定义一套规则 需传入一个对象，对象格式如下：
 * {
 *     $input:$input,
 *     rule:function(){},
 *     promptTxt:"" 默认显示输入不符合要求
 * }
 */
;(function(){
    window.myj=window.myj||{};
    window.myj.selfValidate=selfValidate;
    function selfValidate($input,isAddBlurEvent){
        var tagName;
        var needValidateInput;
        var isPassValidate;
        //当为input自定义一套规则时该变量接收传入的对象
        var oSelfRule;
        if($.isPlainObject($input)){
            oSelfRule=$input;
            $input=$input.$input;
        }

        tagName=$input.get(0).tagName.toLowerCase();
        needValidateInput=[];
        isPassValidate=true;

        if(tagName=="input" || tagName=="textarea"){
            if(isAddBlurEvent){
                $input.off("blur");
                $input.blur(function(){
                    validateOne($input);
                });
            }else{
                return validateOne($input);
            }
        }else if(tagName=="form"){
            $input.find("input,textarea").each(function(i,o){
                if(isNeedValidate($(o))){
                    needValidateInput.push($(o));
                }
            });

            if(isAddBlurEvent){
                $.each(needValidateInput,function(i,$o){
                    $o.off("blur");
                    $o.blur(function(){
                        validateOne($(this));
                    });
                });
            }else{
                $.each(needValidateInput,function(i,$o){
                    if(!validateOne($o)){
                        isPassValidate=false;
                    }
                });
                return isPassValidate;
            }
        }
        function isNeedValidate($input){
            var inputType=$input.attr("type");
            if(inputType == "radio" || inputType == "checkbox" || inputType == "file" || inputType == "button"){
                return false;
            }
            var $par=$input;
            //只要父级中有一个display为none，就不做校验
            var isHaveNonePar=false;
            while($par){
                if($par.get(0).nodeType==9){
                    break;
                }else if($par.css("display")=="none" && ($par.attr("type")!="hidden")){
                    isHaveNonePar=true;
                    break;
                }
                $par=$par.parent();
            }
            if(isHaveNonePar){
                return false;
            }

            //有下列四个属性其中之一，就要做校验
            var req=$input.attr("required") ? true : false;
            var maxLen=$input.attr("data-max");
            var minLen=$input.attr("data-min");
            var orgPattern=$input.attr("pattern");

            return !!(req || maxLen || minLen || orgPattern);
        }
        function validateOne($input){
            var req=$input.attr("required") ? true : false;
            var maxLen=$input.attr("data-max");
            var minLen=$input.attr("data-min");
            var orgPattern=$input.attr("pattern");
            var pattern=(orgPattern ? new RegExp(orgPattern) : null);
            var infoPre=$input.attr("infoPre");
//            console.log(req,maxLen,minLen,pattern);

            //defaultTip可以没有
            var $defaultTip=$input.parent().find(".default-tip").find("span");

            //errTip必须要有
            if($input.parent().find(".err-tip").length==0){
                $("<div class='err-tip' style='display: none; padding-left: 8px; line-height: "+$input.height()+"px;'><span></span></div>").insertAfter($input);
            }
            var $errTip=$input.parent().find(".err-tip").find("span");

            function hiddenDefaultTip($defaultTip){
                var $o=$defaultTip.parent();
                $o.css({"display":"none"});
            }
            function showDefaultTip($defaultTip){
                var $o=$defaultTip.parent();
                $o.css({"display":"inline-block"});
            }
            function hiddenCorrespondTip($conTip){
                var $o=$conTip.parent();
                $o.css({"display":"none"});

                $o.parent().removeClass("err");
            }
            function showCorrespondTip($conTip,errMsg){
                var $o=$conTip.parent();
                $o.css({"display":"inline-block"});

                $o.parent().addClass("err");
                $o.find("span").text(errMsg);
            }

            var val=$input.val();

            //先判断是否给$input加了自定义的检验规则
            if(oSelfRule && oSelfRule.rule){
                if(oSelfRule.rule(val)){
                    showDefaultTip($defaultTip);
                    hiddenCorrespondTip($errTip);
                    return true;
                }else{
                    hiddenDefaultTip($defaultTip);
                    showCorrespondTip($errTip,oSelfRule.promptTxt ? oSelfRule.promptTxt : "输入不符合要求");
                    return false;
                }
            }else{
                //校验非空
                if(req && !val){
                    hiddenDefaultTip($defaultTip);
                    showCorrespondTip($errTip,"该项不能为空");
                    return false;
                }else if(minLen && !isNaN(parseInt(minLen)) && (val.length < parseInt(minLen))){
                    hiddenDefaultTip($defaultTip);
                    showCorrespondTip($errTip,"至少输入"+minLen+"个字符");
                    return false;
                }else if(maxLen && !isNaN(parseInt(maxLen)) && (val.length > parseInt(maxLen))){
                    hiddenDefaultTip($defaultTip);
                    showCorrespondTip($errTip,"最多输入"+maxLen+"个字符");
                    return false;
                }else if(orgPattern && pattern && (val.length > 0) && !val.match(pattern)){
                    hiddenDefaultTip($defaultTip);
                    showCorrespondTip($errTip,"输入值不符合要求");
                    return false;
                }else{
                    showDefaultTip($defaultTip);
                    hiddenCorrespondTip($errTip);
                    return true;
                }
            }
        }
    }
})();
