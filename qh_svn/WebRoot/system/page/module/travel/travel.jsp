<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>青海旅游</title>
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
		<!--漫入用户省份分布-->
		<div class="box1">
		    <div class="content">
				<div class="con-title mt20">
					<i class="fa fa-map-o"></i>&nbsp;漫入用户省份分布
				</div>
		        <div id="userProviceInfo" class="mt10 page_module">
		        	<table class="custom_table" cellspacing="0" cellpadding="0">						
						<thead class="bk ch">
							<tr>
								<th class="w_10">排行</th>
								<th>省份</th>
								<th class="w_18">漫入人数</th>
								<th class="w_25">人均逗留时长</th>
								<th class="w_15">起始地</th>
								<th class="w_15">终止地</th>
							</tr>
						</thead>
						<tbody class="ac">
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
		        </div>
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
		        	<i class="fa fa-star-o"></i>&nbsp;旅游热门线路
				</div>
		        <div id="travelHotLine" class="mt10 page_module h_50 ofh">
		        </div>
		        <div class="con-title mt10">
		        	<i class="fa fa-star-o"></i>&nbsp;本地网热门线路
				</div>
		        <div class="mt10 page_module h_64 ofh">
		        	<div id="localHotLine"></div>
		        </div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-line-chart"></i>&nbsp;省最近30天漫入人数
		        </div>
	        	<div id="lastRoamInInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box2">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-sort-amount-desc"></i>&nbsp;省漫入用户景点排行
		        </div>
	        	<div id="scenicRankInfo" class="mt20 page_module">	        		
		        	<table class="custom_table" cellspacing="0" cellpadding="0">						
						<thead class="bk ch">
							<tr>
								<th class="w_10">排行</th>
								<th>景点名称</th>
								<th class="w_15">漫入人数</th>
								<th class="w_25">人均逗留时长</th>
							</tr>
						</thead>
						<tbody class="ac">
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
	        	</div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-sort-amount-desc"></i>&nbsp;本地网漫入用户信息
		        </div>
		        <div id="localUserInfo" class="mt20 page_module">
		        	<table class="custom_table_24" cellspacing="0" cellpadding="0">						
						<thead class="bk ch">
							<tr>
								<th class="w_10">排行</th>
								<th>本地网</th>
								<th class="w_15">漫入人数</th>
								<th class="w_25">人均逗留时长</th>
							</tr>
						</thead>
						<tbody class="ac">
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
		        </div>
		    </div>
		</div>
		<script type="text/javascript" src="./system/page/module/travel/js/travel.js"></script>
		<script type="text/javascript">
			loadEcharts({
				components:['line','map'],
				mapExtend:true,
				event:true,
				funcModule:function(){
					loadUserProviceInfo(null);
					loadMapInfo();
					loadTravelHotLine();
					loadLocalHotLine(null);
					loadLastRoamInInfo(null);
					loadScenicRankInfo(null);
					loadLocalUserInfo(null);					
					loadFlag=false;
				}
			});
   		</script>
	</body>
</html>