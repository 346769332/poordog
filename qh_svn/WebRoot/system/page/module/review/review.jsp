<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>往年回顾</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<jsp:include page="../../resource/jsp/header_echarts.jsp"/>
	</head>
	<body>
		<!--话务量-->
		<div class="box1">
		    <div class="content">
				<div class="con-title mt20">
					<i class="fa fa-phone"></i>&nbsp;话务量
				</div>
		        <div id="callBusiInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<!--地图信息-->
		<div class="box2">
		    <div class="content">
		        <div id="mapInfo" class="mp page_module ofh"></div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div class="con-title mt20">
		        	<i class="fa fa-envelope"></i>&nbsp;短信量
				</div>
		        <div id="messageBusiInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-dollar"></i>&nbsp;缴费
		        </div>
	        	<div id="rechargeInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box2">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-signal"></i>&nbsp;手机用户上网情况
		        </div>
	        	<div id="mobileUserInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-user"></i>&nbsp;用户行为
		            <div class="fr r_menu">
		            	<a href="javascript:void(0)" id="user_app" class="active">APP</a>
		            	<a href="javascript:void(0)" id="user_url">URL</a>
		            	<a href="javascript:void(0)" id="user_keyword">关键词</a>
		            	<a href="javascript:void(0)" id="user_interest">兴趣点</a>
		            </div>
		        </div>
		        <div id="switch_appInfo" class="mt20 page_module ofh"></div>
		        <div id="switch_urlInfo" class="mt20 page_module module_hide ofh"></div>
		        <div id="switch_keywordInfo" class="mt20 page_module module_hide ofh"></div>
		        <div id="switch_interestInfo" class="mt20 page_module module_hide ofh"></div>
		    </div>
		</div>
		<script type="text/javascript" src="./system/page/module/review/js/review.js"></script>
		<script type="text/javascript">			
		$(function(){
			var switchTimer,switchConter=1;
			var switchObj=$("a[id^='user_']");
			//App、热词等切换
			function autoSwitch(){
				switchConter=switchConter%4;
				$(switchObj[switchConter++]).trigger('click');
			}
			function setTimer(){
				switchTimer=setInterval(autoSwitch,5000);
			}
			function clearTimer(){
				window.clearInterval(switchTimer);
			}
			$("div[id^='switch_']").each(function(){
				$(this).hover(clearTimer,setTimer);
			});
			$("a[id^='user_']").click(function(){
				$("a[id^='user_']").each(function(){
					$(this).removeClass('active');
				});
				$(this).addClass('active');
				var id=$(this).attr('id');
				var viewType=id.substring(5);
				$("div[id^='switch_']").each(function(){
					$(this).removeClass("animated bounceIn");
					$(this).hide();
				});
				$("#switch_"+viewType+"Info").show();
				if(viewType=='app'){
					loadAppInfo();
				}
				if(viewType=='url'){
					loadUrlInfo();
				}
				if(viewType=='keyword'){
					loadKeywordInfo();
				}
				if(viewType=='interest'){
					loadInterestInfo();
				}
				$("#switch_"+viewType+"Info").addClass("animated bounceIn");
			});
			loadEcharts({
				components:['pie','bar','line','map','radar','wordCloud'],
				mapExtend:true,
				event:true,
				funcModule:function(){
					loadCallBusiInfo();
					loadMapInfo();
					loadMessageBusiInfo();
					loadRechargeInfo();
					loadMobileUserInfo();
					loadAppInfo();
					loadUrlInfo();
					loadKeywordInfo();
					loadInterestInfo();					
					setTimer();					
					loadFlag=false;
				}
			});		
		});
   		</script>
	</body>
</html>