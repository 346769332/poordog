<%@ page language="java" import="java.security.SecureRandom" pageEncoding="utf-8"%>
<% 	request.setAttribute("path",request.getContextPath());%>
<!DOCTYPE html>
<html>
  <head>
    <title>登录</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="Login large screen system">
	<link rel="stylesheet" type="text/css" href="${path}/css/login.css" />
	<link rel="stylesheet" type="text/css" href="${path}/css/font.min.css" />
	<script type="text/javascript">
		if(window!=top){
			top.location.href=location.href;
		}
		if(navigator.appName!="Netscape"){
			alert("很抱歉,为了更好的展示效果，请使用谷歌浏览器！");
			window.location.href="http://www.google.cn/chrome/browser/desktop/index.html";
		}else{
			console.log("分辨率："+window.screen.width+"*"+window.screen.height);
			if(window.screen.width<1366||window.screen.height<768){
				alert("为了更好的展示效果，建议请将分辨率调至1366*768及以上！");
			}
		}
	</script>
	<script type="text/javascript" src="${path}/easyui/jquery.min.js"></script>
	<script type="text/javascript">
        function getValue(o){
        	var thisVal="";
        	if(o!=null){
	        	thisVal=$.trim(o);
        	}
        	return thisVal;
        }
        function checkPhone(str){
        	if(!(/^1[34578]\d{9}$/.test(str))){
        		return false;
        	}
        	return true;
        }
        function checkCd(str){
        	if(!(/^[a-zA-Z0-9]{4}$/.test(str))){
        		return false;
        	}
        	return true;
        }        
        function login(type){
        	$("#acct_tips").html("");
			$("#phone_tips").html("");
        	var param,tips;
        	if(type=='acct'){
        		var acctCode=getValue($("#acctCode").val());
        		var acctToken=getValue($("#acctToken").val());
        		var checkCode=getValue($("#checkCode").val());        		
        		if(acctCode.length==0){
        			$("#acct_tips").html("请输入登录工号!");
        			return false;
        		}
        		if(acctToken.length==0){
        			$("#acct_tips").html("请输入登录密码!");
        			return false;
        		}
        		if(checkCode.length==0){
        			$("#acct_tips").html("请输入验证码!");
        			return false;
        		}
        		if(!checkCd(checkCode)){
        			$("#acct_tips").html("验证码格式错误!");
        			return false;
        		}
        		param={'type':"code",'acct':acctCode,'token':acctToken,'checkCode':checkCode};
        	}else if(type=='phone'){
        		var phoneNum=getValue($("#phoneNum").val());
        		var messageCode=getValue($("#messageCode").val());
        		if(phoneNum.length==0){
        			$("#phone_tips").html("请输入手机号码!");
        			return false;
        		}
        		if(messageCode.length==0){
        			$("#phone_tips").html("请输入短信验证码!");
        			return false;
        		}
        		if(!checkPhone(phoneNum)){
        			$("#phone_tips").html("非手机号码!");
        			return false;        			
        		}
        		param={'type':"phone",'acct':phoneNum,'token':acctToken,'msgCode':messageCode};
        	}else{
        		return false;
        	}        	
        	<%
				String token= SecureRandom.getInstance("SHA1PRNG").toString();
				session.setAttribute("__TOKEN_CODE",token);
			%>
        	param.randomCode="<%=token%>";
        	$.ajax({
				url : "${path}/login/login.do",
		        data : param,
		  		type: 'post',
		        dataType : "json",
		        success : function(data){
		        	if(data!=null){
		        		if(data.result=='success'){
		        			window.location="${path}/system/page/module/main/index.jsp";
							//document.documentElement.webkitRequestFullScreen();
		        		}else{
		        			if(type=='acct'){
				        		$("#acct_tips").html(data.message);
				        		$("#phone_tips").html("");
		        			}
		        			if(type=='phone'){
				        		$("#phone_tips").html(data.message);
				        		$("#acct_tips").html("");
		        			}
		        		}
		        	}else{
	        			if(type=='acct'){
			        		$("#acct_tips").html("登录失败!");
			        		$("#phone_tips").html("");
	        			}
	        			if(type=='phone'){
			        		$("#phone_tips").html("登录失败!");
			        		$("#acct_tips").html("");
	        			}
		        	}
				},
		        error : function(data){
        			if(type=='acct'){
		        		$("#acct_tips").html("登录失败!");
		        		$("#phone_tips").html("");
        			}
        			if(type=='phone'){
		        		$("#phone_tips").html("登录失败!");
		        		$("#acct_tips").html("");
        			}
		        }
			});
        }
	</script>
  </head>
  <body class="login_body">
    <div class="w1200">
	    <div class="logo">
	    	<img src="${path}/images/login_logo.png" alt=""/>
	    </div>
	    <div class="main">
	        <div class="login_box">
	            <ul class="tit_tab clearfix">
	                <li class="checked">工号登录</li>
	                <li>手机登录</li>
	            </ul>
	            <div class="tab_con clearfix">
	                <div class="tab_cons show">
	                  <ul class="clearfix">
	                      <li>
	                          <i><img src="${path}/images/login-u.png" alt=""/></i>
	                          <input id="acctCode" type="text" placeholder="工号" required />
	                      </li>
	                      <li>
	                          <i><img src="${path}/images/login-m.png" alt=""/></i>
	                          <input id="acctToken" type="password" placeholder="密码" required />
	                      </li>
	                      <li>
	                          <i><img src="${path}/images/login-yz.png" alt=""/></i>
	                          <input id="checkCode" type="text" style="width: 218px;" placeholder="验证码" required />
	                          <i><img id="checkCodeImg" class="codeImg" src="${path}/login/validateCode.do" onclick="refresh()" alt=""/></i>
	                      </li>
	                      <li id="acct_tips" class="login_tips"></li>
	                      <li class="login_btn" onclick="login('acct');">登&nbsp;&nbsp;录</li>
	                  </ul>
	                </div>
	                <div class="tab_cons" style="display:none;">
	                    <ul class="clearfix">
	                        <li>
	                            <i><img src="${path}/images/login-u.png" alt=""/></i>
	                            <input id="phoneNum" type="text" placeholder="手机号码" required />
	                        </li>
	                        <li>
	                            <i><img src="${path}/images/login-yz.png" alt=""/></i>
	                            <input id="messageCode" type="text" placeholder="验证码" required style="width: 100px;"/>
	                            <a href="javascript:void(0)" class="link_btn">获取验证码</a>
	                        </li>
	                      	<li id="phone_tips" class="login_tips"></li>
	                        <li class="login_btn" onclick="login('phone');">登&nbsp;&nbsp;录</li>
	                    </ul>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>	
	<script type="text/javascript">
	$(function(){
        $(document).ready(function(e){
			$(this).keydown(function (e){
				if(e.which&&e.which == "13"){
					$(".tab_con").children(".tab_cons:visible").find(".login_btn").trigger('click');
				}
			})
		});
		$(".link_btn").click(function(){
			$("#phone_tips").text("");
			var phoneNum=$.trim($("#phoneNum").val());
			if(phoneNum==null||phoneNum.length==0){
				$("#phone_tips").text("请输入手机号码！");
				return false;
			}
       		if(!checkPhone(phoneNum)){
       			$("#phone_tips").html("非手机号码!");
       			return false;        			
       		}
			var timeCounter=180;
			function timeCount(){
		        if(timeCounter==0){
		        	timeCounter = 180;
					$(".link_btn").removeAttr("disabled");
		        	$(".link_btn").css({"background":"#b85c7d","pointer-events":"auto"});//
					$(".link_btn").text("获取短信验证码");
					$("#phone_tips").html("");
		        }else{
		        	$(".link_btn").attr("disabled","true");
		        	$(".link_btn").css({"background":"#B0B0B0","pointer-events":"none"});
					$(".link_btn").text("重新获取("+timeCounter+"s)");
		            timeCounter--;
		            setTimeout(function(){
		                timeCount();
		            },
		            1000);
		        }
	    	}
			$.ajax({
				url : "${path}/login/msgCode.do",
				data : {'acct':phoneNum},
				type: 'post',
				dataType : "json",
				success : function(data){
					if(data.result=='success'){
						$("#phone_tips").html("短信验证码已发送!");
		    			timeCount();
					}else{
						$("#phone_tips").html(data.result);
					}
				},
		        error : function(data){
					$("#phone_tips").html("短信验证码获取出错！");
		        }
			});
		});
        $(".tit_tab li").click(function(){
        	$("#acct_tips").html("");
        	$("#phone_tips").html("");
            var index_tab=$(this).index();
            $(this).siblings("li").removeClass("checked");
            $(this).addClass("checked");
            $(".tab_con").children(".tab_cons").removeClass("show");
            $(".tab_con").children(".tab_cons").hide();
            $(".tab_con").children(".tab_cons").eq(index_tab).addClass("show");
            $(".tab_con").children(".tab_cons").eq(index_tab).show();
        });
        $("#checkCodeImg").click(function(){
        	$(this).attr('src','${path}/login/validateCode.do?'+Math.random());
        });
	});
	</script>
  </body>
</html>