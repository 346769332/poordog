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
		<jsp:include page="../../resource/jsp/header_echarts3.jsp"/>
		<link rel="stylesheet" type="text/css" href="${path}/css/star-rating-svg.css"/>
		<link rel="stylesheet" type="text/css" href="${path}/css/custom.table.css"/>
		<link rel="stylesheet" type="text/css" href="${path}/video/css/mediaplayer.css"/>
		<link rel="stylesheet" type="text/css" href="${path}/video/css/mejs-skins.css"/>
		<script type="text/javascript" src="${path}/echarts3/echarts-wordcloud.min.js"></script>
		<script type="text/javascript" src="${path}/js/jquery.star-rating-svg.min.js"></script>
		<script type="text/javascript" src="${path}/video/media-player.min.js"></script>
	</head>
	<body>
		<div class="box1 w_32b h_100">
		    <div class="content">
				<div class="con-title mt32 title-css pl_10">
        			手机终端
        		</div>
        		<div class="h_30 mt8">
        			<div id="mobileInfo" class="w_50 h_100 fl"></div>
        			<div class="w_50 h_100 fr">
        				<div class="h_64 w_100 bk_02 bdr8">
        					<div class="h_100 w_50 fl">
        						<div class="title_t1">18.3/万人</div>
        						<div class="title_t2">3G用户</div>
        					</div>
		        			<div class="h_100 w_50 fr">
		        				<div class="title_t1">20.3/万人</div>
		        				<div class="title_t2">4G用户</div>
		        			</div>
        				</div>
        				<div id="brandInfo" class="h_65 w_100 mt8 bdr8"></div>
        			</div>
        		</div>
        		<div class="h_25 mt8">
		        	<div class="h_100 w_45 fl ml_10">
		        		<div class="con-title" class="title-css ac">年龄分布</div>
		        		<div id="ageInfo" class="w_100 h_80"></div>
		        	</div>
		        	<div class="h_100 w_50 fr">
		        		<div class="con-title" class="title-css ac">性别分布</div>
		        		<div id="sexInfo" class="w_100 h_80"></div>
		        	</div>
		        </div>
		        <div class="bb_0 ml_10">
		        	<a href="javascript:void(0);" name="class_app" class="t_select t_selected">app分类</a>
		        	<a href="javascript:void(0);" name="class_sale" class="t_select">消费行为</a>
		        	<a href="javascript:void(0);" name="class_tool" class="t_select">出行工具</a>
		        </div>
        		<div id="class_appInfo" class="mt10 h_30 w_100"></div>
        		<div id="class_saleInfo" class="mt10 h_30 w_100 module_hide"></div>
        		<div id="class_toolInfo" class="mt10 h_30 w_100 module_hide"></div>
			</div>
		</div>
		<div class="box1 w_36">
			<div class="content pdt64">
				<div class="video_media">
					<video class="mejs-wmp" width="100%" height="300" src="${path}/media/zgdx.mp4" type="video/mp4" 
					id="videoInfo" poster="${path}/media/images/zgdx.png" controls="controls" preload="none"></video>
				</div>
		    </div>
		</div>
		<div class="box1 w_32b">
		    <div class="content">
				<div class="con-title mt32 h_36">
		        	<a href="javascript:void(0);" name="mutil_scenic" class="t_select_01 t_selected_01"><i class="fa fa-cny"></i>逗留一天top景区</a>
		        	<a href="javascript:void(0);" name="mutil_trail" class="t_select_01"><i class="fa fa-cny"></i>客流轨迹</a>
		        	<a href="javascript:void(0);" name="mutil_rank" class="t_select_01"><i class="fa fa-cny"></i>景区排名</a>
		        </div>
		        <div id="mutil_scenicInfo" class="mt10 page_module h_85 ofh"></div>
		        <div id="mutil_trailInfo" class="mt10 page_module h_85 ofh module_hide"></div>
		        <div id="mutil_rankInfo" class="mt10 page_module h_85 ofh module_hide"></div>
			</div>
		</div>
		<div class="box1 w_36">
		    <div class="content">
				<div class="con-title mt10">
					<i class="fa fa-cny"></i>省内景点排行
				</div>
				<div id="scenicRankTable" class="mt10 page_module h_85 ofh">
					<table class="custom_table_new" cellspacing="0" cellpadding="0">
						<thead class="bk ch" style="display: none;">
							<tr>
								<th class="w_5"></th>
								<th class="w_40">景点名称</th>
								<th class="w_20">start</th>
								<th class="w_15">天气指数</th>
								<th class="w_20">消费特征指数</th>
							</tr>
						</thead>
						<tbody class="ch">
							<tr>
								<td class="w_5"><span class="br_12">1</span></td>
								<td class="w_40">果洛蒙古族藏族自治州</td>
								<td class="w_20"><div name="star_1_4"></div></td>
								<td class="w_15">天气指数</td>
								<td class="w_20">消费特征指数</td>
							</tr>
							<tr>
								<td class="w_5"><span class="br_12">2</span></td>
								<td class="w_40">青海湖</td>
								<td class="w_20"><div name="star_2_4.5"></div></td>
								<td class="w_15">天气指数</td>
								<td class="w_20">消费特征指数</td>
							</tr>
							<tr>
								<td class="w_5"><span class="br_12">3</span></td>
								<td class="w_40">坎布拉国家森林公园</td>
								<td class="w_20"><div name="star_3_2.5"></div></td>
								<td class="w_15">天气指数</td>
								<td class="w_20">消费特征指数</td>
							</tr>
							<tr>
								<td class="w_5"><span class="br_12">4</span></td>
								<td class="w_40">黑马河</td>
								<td class="w_20"><div name="star_4_4"></div></td>
								<td class="w_15">天气指数</td>
								<td class="w_20">消费特征指数</td>
							</tr>
							<tr>
								<td class="w_5"><span class="br_12">5</span></td>
								<td class="w_40">塔尔寺</td>
								<td class="w_20"><div name="star_5_2.5"></div></td>
								<td class="w_15">天气指数</td>
								<td class="w_20">消费特征指数</td>
							</tr>
							<tr>
								<td class="w_5"><span class="br_12">6</span></td>
								<td class="w_40">果洛蒙古族藏族自治州</td>
								<td class="w_20"><div name="star_6_3.5"></div></td>
								<td class="w_15">天气指数</td>
								<td class="w_20">消费特征指数</td>
							</tr>
							<tr>
								<td class="w_5"><span class="br_12">7</span></td>
								<td class="w_40">青海湖</td>
								<td class="w_20"><div name="star_7_5"></div></td>
								<td class="w_15">天气指数</td>
								<td class="w_20">消费特征指数</td>
							</tr>
							<tr>
								<td class="w_5"><span class="br_12">8</span></td>
								<td class="w_40">坎布拉国家森林公园</td>
								<td class="w_20"><div name="star_8_3"></div></td>
								<td class="w_15">天气指数</td>
								<td class="w_20">消费特征指数</td>
							</tr>
							<tr>
								<td class="w_5"><span class="br_12">9</span></td>
								<td class="w_40">黑马河</td>
								<td class="w_20"><div name="star_9_2.5"></div></td>
								<td class="w_15">天气指数</td>
								<td class="w_20">消费特征指数</td>
							</tr>
							<tr>
								<td class="w_5"><span class="br_12">10</span></td>
								<td class="w_40">塔尔寺</td>
								<td class="w_20"><div name="star_10_4"></div></td>
								<td class="w_15">天气指数</td>
								<td class="w_20">消费特征指数</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="box1 w_32b">
		    <div class="content">				
				<div class="con-title mt10">
					<i class="fa fa-cny"></i>景区流量监控
				</div>
        		<div id="scenicMapInfo"  class="mt10 page_module ofh"></div>
			</div>
		</div>
		<script type="text/javascript" src="./system/page/module/travel/js/qhTravel.js"></script>
	</body>
</html>