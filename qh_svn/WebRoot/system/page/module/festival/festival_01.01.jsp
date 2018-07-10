<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>春节专题</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<jsp:include page="../../resource/jsp/header_echarts.jsp"/>
	</head>
	<body>
		<!--用户活跃top-->
		<div class="box1">
		    <div class="content">
				<div class="con-title mt20">
					<i class="fa fa-user"></i>&nbsp;用户活跃TOP
				</div>
		        <div id="userActiveInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<!--话务量信息-->
		<div class="box2">
		    <div class="content">
		        <div class="user_title mt20 text-center">较去年春节,省际话务量环比为<span id="rate">13%</span></div>
		        <div class="mt20 page_module ofh">
		        	<div id="tollCallInfo" class="h_85 w_45 fl"></div>
		        	<div id="cdmaCallInfo" class="h_85 w_45 fr"></div>
		        </div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div class="con-title mt20">
		        	<i class="fa fa-envelope"></i>&nbsp;短信量
				</div>
		        <div id="messageInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-exchange"></i>&nbsp;互联互通
		        </div>
	        	<div id="contactInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box2">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-comment-o"></i>&nbsp;社交
		        </div>
	        	<div id="socialInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-area-chart"></i>&nbsp;户均业务量
		            <div class="fr r_menu">
		            	<a href="javascript:void(0)" id="avg_call" class="active">话务量</a>
		            	<a href="javascript:void(0)" id="avg_message">短信量</a>
		            	<a href="javascript:void(0)" id="avg_flow">数据量</a>
		            </div>
		        </div>
		        <div id="averageInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<script type="text/javascript" src="./system/page/module/festival/js/festival_01.01.js"></script>
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
					loadUserActiveInfo();
					loadTollCallInfo();
					loadCdmaCallInfo();
					loadMessageInfo();
					loadContactInfo();
					loadSocialInfo();
					loadAverageInfo();					
					loadFlag=false;
				}
			});
   		</script>
	</body>
</html>