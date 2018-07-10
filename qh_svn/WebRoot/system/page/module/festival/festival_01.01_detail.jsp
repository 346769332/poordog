<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>春节详情</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<jsp:include page="../../resource/jsp/header_echarts.jsp"/>
	</head>
	<body>
		<!--互联网流量top10-->
		<div class="box1">
		    <div class="content">
				<div class="con-title mt20">
					<i class="fa fa-line-chart"></i>&nbsp;互联网流量
		            <div class="fr r_menu">
		            	<a href="javascript:void(0)" id="flow_sum" class="active">总流量</a>
		            	<a href="javascript:void(0)" id="flow_user">用户数</a>
		            	<a href="javascript:void(0)" id="flow_time">在线时长</a>
		            </div>
				</div>
		        <div id="flowInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<!--IP网总峰值-->
		<div class="box2">
		    <div class="content">		    	
				<div class="con-title user_title mt20">
					<i class="fa fa-bolt"></i>&nbsp;IP网总峰值
		            <div class="fr r_menu">
		            	<a href="javascript:void(0)" id="ipFlow_newyear" class="active">春节期间</a>
		            	<a href="javascript:void(0)" id="ipFlow_eve">除夕</a>
		            </div>
				</div>
		        <div id="ipFlowInfo" class="mt20 page_module h_65 ofh"></div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div class="con-title mt20">
		        	<i class="fa fa-phone"></i>&nbsp;话务量
		            <div class="fr r_menu">
		            	<a href="javascript:void(0)" id="call_newyear" class="active">春节期间</a>
		            	<a href="javascript:void(0)" id="call_eve">除夕</a>
		            </div>
				</div>
		        <div id="tollCallInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-exchange"></i>&nbsp;互联互通
		            <div class="fr r_menu">
		            	<a href="javascript:void(0)" id="contact_newyear" class="active">春节期间</a>
		            	<a href="javascript:void(0)" id="contact_eve">除夕</a>
		            </div>
		        </div>
	        	<div id="contactInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box2">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-envelope"></i>&nbsp;短信彩信
		            <div class="fr r_menu">
		            	<a href="javascript:void(0)" id="message_newyear" class="active">春节期间</a>
		            	<a href="javascript:void(0)" id="message_eve">除夕</a>
		            </div>
		        </div>
	        	<div id="messageInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div id="cdmaCallInfo" class="h_100 w_100 ofh"></div>
		    </div>
		</div>
		<script type="text/javascript" src="./system/page/module/festival/js/festival_01.01_detail.js"></script>
		<script type="text/javascript">
			/*
			$("a[id^='user_']").click(function(){
				$("a[id^='user_']").each(function(){
					$(this).removeClass('active');
				});
				$(this).addClass('active');
				var id=$(this).attr('id');
				var viewType=id.substring(5);
				//loadSaleInfo();
			});*/
			loadEcharts({
				components:['pie','bar','line'],
				mapExtend:false,
				event:false,
				funcModule:function(){
					loadFlowInfo();
					loadIpFlowInfo();
					loadTollCallInfo();
					loadCdmaCallInfo();
					loadContactInfo();
					loadMessageInfo();					
					loadFlag=false;
				}
			});
   		</script>
	</body>
</html>