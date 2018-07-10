<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>收入详情</title>
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
		<!--产品收入分析-->
		<div class="box2 w_60">
		    <div class="content">
				<div class="con-title bb_line tcb">
					<i class="fa fa-yen"></i>&nbsp;产品收入分析
				</div>
		        <div id="productInfo" class="w_100 h_85"></div>
		    </div>
		</div>
		<!--按账目类型分析-->
		<div class="box2">
		    <div class="content">
		        <div class="con-title bb_line tcb">
		        	<i class="fa fa-dollar"></i>&nbsp;按账目类型分析
				</div>
		        <div id="accountInfo" class="w_100 h_80"></div>
		    </div>
		</div>
		<!--当月收入趋势与上月对比-->
		<div class="box2 w_60">
		    <div class="content">
		        <div class="con-title bb_line tcb">
		        	<i class="fa fa-line-chart"></i>&nbsp;当月收入趋势与上月对比
		        </div>
	        	<div id="contrastsInfo" class="w_100 h_80"></div>
		    </div>
		</div>
		<script type="text/javascript" src="./system/page/module/operation/js/income.js"></script>
		<script type="text/javascript">
			loadEcharts({
				components:['pie','bar','line','map'],
				mapExtend:true,
				event:true,
				funcModule:function(){
					loadMapInfo();
					loadProductInfo(null);
					loadAccountInfo(null);
					loadContrastsInfo(null);					
					loadFlag=false;
				}
			});
   		</script>
	</body>
</html>