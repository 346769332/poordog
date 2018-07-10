<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>年货回家</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<jsp:include page="../../resource/jsp/header_echarts.jsp"/>
	</head>
	<body>
		<!--出行/购物软件TOP-->
		<div class="box1">
		    <div class="content">
				<div class="con-title mt20">
					<i class="fa fa-shopping-cart"></i>&nbsp;出行/购物软件TOP
				</div>
		        <div id="softInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<!--地图信息-->
		<div class="box2">
		    <div class="content">
		        <div id="mapInfo" class="user_title mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div class="con-title mt20">
		        	<i class="fa fa-send"></i>&nbsp;出行详情
				</div>
		        <div id="travelInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-th-large"></i>&nbsp;APP应用分类TOP
		        </div>
	        	<div id="appInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box2">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-file-word-o"></i>&nbsp;热词
		            <div class="fr r_menu">
		            	<a href="javascript:void(0)" id="hotWord_all" class="active">全部</a>
		            	<a href="javascript:void(0)" id="hotWord_jd">京东</a>
		            	<a href="javascript:void(0)" id="hotWord_tb">淘宝</a>
		            	<a href="javascript:void(0)" id="hotWord_sn">苏宁易购</a>
		            </div>
		        </div>
	        	<div class="mt20 page_module ofh">
	        		<div id="rollHotWord" class="h_100 w_40 fl ofh"></div>
	        		<div id="hotWordInfo" class="h_100 w_60 fr ofh"></div>
	        	</div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div id="userInfo" class="h_100 w_100 ofh"></div>
		    </div>
		</div>
		<script type="text/javascript" src="./system/page/module/festival/js/festival_01.01_goods.js"></script>
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
				components:['pie','bar','line','map'],
				mapExtend:true,
				event:true,
				funcModule:function(){
					loadSoftInfo();
					loadMapInfo();
					loadTravelInfo();
					loadUserInfo();
					loadAppInfo();
					loadHotWordInfo();					
					loadFlag=false;
				}
			});
   		</script>
	</body>
</html>