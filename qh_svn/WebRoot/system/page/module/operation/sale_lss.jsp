<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>销售详情</title>
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
		<!--今日销售套餐TOP10-->
		<div class="box2 w_60">
		    <div class="content">
				<div class="con-title bb_line tcb">
					<i class="fa fa-yen"></i>&nbsp;今日销售套餐TOP10
				</div>
		        <div id="dinnerSaleInfo" class="w_100 h_85"></div>
		    </div>
		</div>
		<!--销量-->
		<div class="box2">
		    <div class="content">
		        <div class="con-title bb_line tcb">
		        	<i class="fa fa-navicon"></i>&nbsp;销量
				</div>
		        <div id="saleValumeInfo" class="w_100 h_80"></div>
		    </div>
		</div>
		<!--4G用户发展排行-->
		<div class="box2 w_60">
		    <div class="content">
		        <div class="con-title bb_line tcb">
		        	<i class="fa fa-connectdevelop"></i>&nbsp;4G用户发展排行
		        </div>
	        	<div id="developUserInfo" class="w_100 h_80"></div>
		    </div>
		</div>
		<script type="text/javascript" src="./system/page/module/operation/js/sale.js"></script>
		<script type="text/javascript">
			loadEcharts({
				components:['pie','bar','map'],
				mapExtend:true,
				event:true,
				funcModule:function(){
					loadMapInfo();
					loadDinnerSaleInfo(null);
					loadSaleValumeInfo(null);
					loadDevelopUserInfo(null);					
					loadFlag=false;
				}
			});
   		</script>
	</body>
</html>