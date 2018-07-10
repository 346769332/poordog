<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>省内旅游</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<jsp:include page="../../resource/jsp/header_echarts3.jsp"/>
		<link rel="stylesheet" type="text/css" href="${path}/css/custom.table.css"/>
	</head>
	<body>
		<div class="box1 w_35 h_60">
		    <div class="content">
				<div class="con-title mt20">
					<i class="fa fa-map-o"></i>&nbsp;景点漫游
				</div>
				<div class="mt10 page_module h_85 ofh">
					<div class="w_40 h_100 fl ofh">
						<div class="title_t1">出行方式</div>
						<div id="travelWayInfo" class="page_module fl ofh"></div>
					</div>
					<div id="scenicTable" class="w_60 h_100 fr ofh">
						<div class="title_t1">国庆前后对比<span class="font-14">单位：个</span></div>
						<table class="custom_table_new" cellspacing="0" cellpadding="0">
							<thead class="bk ch">
								<tr>
									<th class="w_70" colspan="2">景点名称</th>
									<th class="w_15">节前</th>
									<th class="w_15">节后</th>
								</tr>
							</thead>
							<tbody class="ch">
								<tr>
									<td class="w_5"><span class="br_12">1</span></td>
									<td class="w_65">果洛蒙古族藏族自治州</td>
									<td class="w_15">2500</td>
									<td class="w_15">4500</td>
								</tr>
								<tr>
									<td class="w_5"><span class="br_12">2</span></td>
									<td class="w_65">青海湖</td>
									<td class="w_15">2500</td>
									<td class="w_15">4500</td>
								</tr>
								<tr>
									<td class="w_5"><span class="br_12">3</span></td>
									<td class="w_65">坎布拉国家森林公园</td>
									<td class="w_15">2500</td>
									<td class="w_15">4500</td>
								</tr>
								<tr>
									<td class="w_5"><span class="br_12">4</span></td>
									<td class="w_65">黑马河</td>
									<td class="w_15">2500</td>
									<td class="w_15">4500</td>
								</tr>
								<tr>
									<td class="w_5"><span class="br_12">5</span></td>
									<td class="w_65">塔尔寺</td>
									<td class="w_15">2500</td>
									<td class="w_15">4500</td>
								</tr>
								<tr>
									<td class="w_5"><span class="br_12">6</span></td>
									<td class="w_65">果洛蒙古族藏族自治州</td>
									<td class="w_15">2500</td>
									<td class="w_15">4500</td>
								</tr>
								<tr>
									<td class="w_5"><span class="br_12">7</span></td>
									<td class="w_65">青海湖</td>
									<td class="w_15">2500</td>
									<td class="w_15">4500</td>
								</tr>
								<tr>
									<td class="w_5"><span class="br_12">8</span></td>
									<td class="w_65">坎布拉国家森林公园</td>
									<td class="w_15">2500</td>
									<td class="w_15">4500</td>
								</tr>
								<tr>
									<td class="w_5"><span class="br_12">9</span></td>
									<td class="w_65">黑马河</td>
									<td class="w_15">2500</td>
									<td class="w_15">4500</td>
								</tr>
								<tr>
									<td class="w_5"><span class="br_12">10</span></td>
									<td class="w_65">塔尔寺</td>
									<td class="w_15">2500</td>
									<td class="w_15">4500</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="box1 w_30 h_60">
			<div class="content">
				<div class="mp title_select">
					<ul>
						<li><a href="javascript:void(0)" id="select_day">日</a></li>
						<li><a href="javascript:void(0)" id="select_week">周</a></li>
						<li><a href="javascript:void(0)" id="select_month">月</a></li>
					</ul>
				</div>
		        <div id="roamMapInfo" class="mp page_module ofh"></div>
		    </div>
		</div>
		<div class="box1 w_35 h_60">
		    <div class="content">
				<div class="con-title mt20">
					<i class="fa fa-map-o"></i>&nbsp;省内漫游
				</div>
				<div class="page_module">
		        	<div class="mt20 select_head">
					    <div id="roam_enter" class="select_title">漫入</div>
					    <div id="roam_leave" class="select_title">漫出</div>
				    </div>
					<div id="enterOrLeaveInfo" class="page_module h_90">
						<table class="custom_table_new" cellspacing="0" cellpadding="0">
							<tbody class="ch">
								<tr>
									<td class="w_10"><span class="br_12">1</span></td>
									<td class="w_25">西宁市</td>
									<td class="w_20"><i class="arrow"></i></td>
									<td class="w_25">果洛</td>
									<td class="w_20">4500</td>
								</tr>
								<tr>
									<td class="w_10"><span class="br_12">2</span></td>
									<td class="w_25">西宁市</td>
									<td class="w_20"><i class="arrow"></i></td>
									<td class="w_25">海东</td>
									<td class="w_20">4500</td>
								</tr>
								<tr>
									<td class="w_10"><span class="br_12">3</span></td>
									<td class="w_25">西宁市</td>
									<td class="w_20"><i class="arrow"></i></td>
									<td class="w_25">海北</td>
									<td class="w_20">4500</td>
								</tr>
								<tr>
									<td class="w_10"><span class="br_12">4</span></td>
									<td class="w_25">西宁市</td>
									<td class="w_20"><i class="arrow"></i></td>
									<td class="w_25">玉树</td>
									<td class="w_20">4500</td>
								</tr>
								<tr>
									<td class="w_10"><span class="br_12">5</span></td>
									<td class="w_25">西宁市</td>
									<td class="w_20"><i class="arrow"></i></td>
									<td class="w_25">黄南</td>
									<td class="w_20">4500</td>
								</tr>
								<tr>
									<td class="w_10"><span class="br_12">6</span></td>
									<td class="w_25">西宁市</td>
									<td class="w_20"><i class="arrow"></i></td>
									<td class="w_25">海北</td>
									<td class="w_20">4500</td>
								</tr>
								<tr>
									<td class="w_10"><span class="br_12">7</span></td>
									<td class="w_25">西宁市</td>
									<td class="w_20"><i class="arrow"></i></td>
									<td class="w_25">玉树</td>
									<td class="w_20">4500</td>
								</tr>
								<tr>
									<td class="w_10"><span class="br_12">8</span></td>
									<td class="w_25">西宁市</td>
									<td class="w_20"><i class="arrow"></i></td>
									<td class="w_25">黄南</td>
									<td class="w_20">4500</td>
								</tr>
								<tr>
									<td class="w_10"><span class="br_12">9</span></td>
									<td class="w_25">西宁市</td>
									<td class="w_20"><i class="arrow"></i></td>
									<td class="w_25">玉树</td>
									<td class="w_20">4500</td>
								</tr>
								<tr>
									<td class="w_10"><span class="br_12">10</span></td>
									<td class="w_25">西宁市</td>
									<td class="w_20"><i class="arrow"></i></td>
									<td class="w_25">黄南</td>
									<td class="w_20">4500</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>		
		<div class="box1 w_35 h_40">
		    <div class="content">
				<div class="con-title mt10 title-css pl_16">
					景点漫入漫出
				</div>
				<div id="scenicRoamInfo" class="mt10 page_module ofh"></div>
			</div>
		</div>
		<div class="box1 w_30 h_40">
		    <div class="content">				
		        <div class="con-title mt10 title-css pl_16">
					全国漫入漫出
				</div>
				<div id="nativeRoamInfo" class="page_module ofh"></div>
			</div>
		</div>
		<div class="box1 w_35 h_40">
		    <div class="content">
				<div id="localMapInfo" class="w_100 h_95 ofh"></div>
			</div>
		</div>
		<script type="text/javascript" src="./system/page/module/travel/js/proviceTravel.js"></script>
	</body>
</html>