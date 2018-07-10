<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>欠费详情</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<jsp:include page="../../resource/jsp/header_echarts.jsp"/>
	</head>
	<body>
		<!--地图-->
		<div class="box2">
		    <div class="content">
		        <div id="mapInfo" class="w_100 h_95 bt_line br_line bl_line bb_line"></div>
		    </div>
		</div>
		<!--当月欠费金额趋势-->
		<div class="box2 w_60">
		    <div class="content">
				<div class="con-title bb_line tcb">
					<i class="fa fa-line-chart"></i>&nbsp;当月欠费金额趋势
				</div>
		        <div id="trendInfo" class="w_100 h_85"></div>
		    </div>
		</div>
		<!--销量-->
		<div class="box2">
		    <div class="content">
		        <div class="con-title bb_line tcb">
		        	<i class="fa fa-gavel"></i>&nbsp;分析结论
				</div>
		        <div id="resultInfo" class="w_100 h_80 disable"></div>
		    </div>
		</div>
		<!--4G用户发展排行-->
		<div class="box2 w_60">
		    <div class="content">
		        <div class="con-title bb_line tcb">
		        	<i class="fa fa-pie-chart"></i>&nbsp;欠费组成分布
		        </div>
	        	<div id="formInfo" class="w_100 h_80"></div>
		    </div>
		</div>
		<script type="text/javascript" src="./system/page/module/operation/js/oweFee.js"></script>
		<script type="text/javascript">
			loadEcharts({
				components:['pie','line','map'],
				mapExtend:true,
				event:true,
				funcModule:function(){
					loadMapInfo();
					loadTrendInfo(null);
					loadFormInfo(null);
					loadFlag=false;
				}
			});
   		</script>
	</body>
</html>