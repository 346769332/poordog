<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>景点漫游</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<jsp:include page="../../resource/jsp/header_echarts.jsp"/>
		<link rel="stylesheet" type="text/css" href="${path}/css/custom.table.css"/>
	</head>
	<body>
		<!--地图信息-->
		<div class="box1 h_100 w_55">
		    <div class="content">
		        <div id="mapInfo" class="user_title mt20 page_module ofh"></div>
		    </div>
		</div>
		<!-- 漫入信息 -->
		<div class="box2 w_45">
		    <div class="content">
		        <div class="con-title mt20">
		        	<i class="fa fa-sign-in"></i>&nbsp;漫入信息
				</div>
		        <div id="roamInInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box2 w_45">
		    <div class="content avg_wfl">
		        <div class="con-title">
		        	<i class="fa fa-send-o"></i>&nbsp;漫入方式
		        </div>
	        	<div id="roamInTypeInfo" class="mt20 page_module ofh"></div>
		    </div>
		    <div class="content avg_wfr">
		        <div class="con-title">
		        	<i class="fa fa-institution"></i>&nbsp;旅游景点排行
		        </div>
	        	<div id="scenicRankInfo" class="mt20 page_module">	        		
					<table class="custom_table_24" cellspacing="0" cellpadding="0">						
						<thead class="bk ch">
							<tr>
								<th class="w_10">排行</th>
								<th>景点名称</th>
								<th class="w_25">漫入用户数</th>
							</tr>
						</thead>
						<tbody class="ac">
							<tr>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
	        	</div>
		    </div>
		</div>
		<script type="text/javascript" src="./system/page/module/roam/js/scenicRoam.js"></script>
		<script type="text/javascript">
			loadEcharts({
				components:['line','bar','map'],
				mapExtend:false,
				event:true,
				funcModule:function(){
					loadMapInfo({'target':'青海','title':false,'legend':false});
					loadRoamInInfo(null);
					loadRoamInTypeInfo(null);
					loadScenicRankInfo(null);					
					loadFlag=false;
				}
			});
   		</script>
	</body>
</html>