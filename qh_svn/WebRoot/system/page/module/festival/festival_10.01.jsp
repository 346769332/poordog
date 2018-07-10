<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>国庆专题</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<jsp:include page="../../resource/jsp/header_echarts.jsp"/>
	</head>
	<body>
		<!--地图信息-->
		<div class="box1 h_100 w_60">
		    <div class="content">
		        <div id="mapInfo" class="user_title mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box2">
		    <div class="content">
		        <div class="con-title mt20">
		        	<i class="fa fa-sign-in"></i>&nbsp;漫入信息
				</div>
		        <div id="roamInInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box2">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-sign-out"></i>&nbsp;漫出信息
		        </div>
	        	<div id="roamOutInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<script type="text/javascript" src="./system/page/module/festival/js/festival_10.01.js"></script>
		<script type="text/javascript">
			loadEcharts({
				components:['bar','map','radar'],
				mapExtend:false,
				event:false,
				funcModule:function(){
					loadMapInfo();
					loadRoamInInfo();
					loadRoamOutInfo();					
					loadFlag=false;
				}
			});
   		</script>
	</body>
</html>