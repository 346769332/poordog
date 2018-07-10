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
    	<link rel="stylesheet" href="${path}/system/page/module/travel/css/travel.css"/>
		<link rel="stylesheet" type="text/css" href="${path}/system/page/resource/css/style.css"/>
		<link rel="stylesheet" type="text/css" href="${path}/system/page/resource/css/font.min.css"/>
		<script type="text/javascript" src="${path}/js/animateBackground.js"></script>
		<script type="text/javascript" src="${path}/echarts3/echarts-wordcloud.min.js"></script>	
	</head>
	<body>
		<div class="p_div">
			<div class="w_25 h_100 f_l">
				<div class="h_75 p-2-4 qh_wt_border">
					<div class="head_title"><a href="javascript:void(0);">客流来源</a></div>
					<div class="w_100 h_60 mt16">
						<div class="animated lightSpeedIn" style="width:90%;margin:20px auto 0px auto;background: url('./images/tj-bg.png') no-repeat; background-size: 100% 100%;height: 52px;line-height: 52px;vertical-align:middle;">
							<div style="float:left;width:50%;text-align: center;color: #2da3c7;">
								<span>到访</span>
								<span id='user'></span>
							</div>
							<div class="roll_num_32" style="float:right;width:50%;margin-top:10px;"> 
					          	<span class="num num_bg b0" id="roll_num_travel"></span>
					    	</div>
						</div>
						<div class="qh-in-title mt8">省内客流</div>
						<div style="float:right;  text-align:left;"><span id="sumintra">9999</span><span>人</span></div>
						<div id="inproTra" style="height: 150px;">
						</div>
						<div class="qh-in-title mt8">省外客流</div>
						<div style="float:right;  text-align:left;" ><span id="sumouttra">9999</span><span>人</span></div>						<div id="outproTra"  style="height: 150px;">终端图表</div>
						</div>
				</div>
				<div class="h_20 ys_wts_border mt8">
					<div class="head_title"><a href="javascript:void(0);">旅游热搜</a></div>
					<div class="w_100 h_70 mt8 p-0-4 clearfix">
						<div id="brandInfo" style="height: 100px;">终端图表</div>
					</div>
				</div>
			</div>
			
			
			<div class="w_50 h_100 f_l">
				<div class="w_95 h_45 m_16 qh-video clearfix" style="margin-bottom: 0;margin-top: 0;overflow: hidden;">
					<!-- <div style="padding: 3%;overflow: hidden;">
						<img src="./images/qh-pic1.jpg" width="100%" alt=""/>
					</div> -->
					<video class="mejs-wmp" width="100%" height="300" src="${path}/media/zgdx.mp4" type="video/mp4" 
					id="videoInfo" poster="${path}/media/images/zgdx.png" controls="controls" preload="none"></video>
				</div>
				<div class="w_95 h_50 m_16">
					<div class="w_48 h_100  f_l  ys_wts_border">
						<div class="head_title"><a href="javascript:void(0);">APP分类</a></div>
						<div id="class_appInfo" class="mt10 page_module h_85 ofh"></div>
					</div>
					<div class="w_48 h_100  f_r ys_wts_border">
						<div class="head_title"><a href="javascript:void(0);">省内景点排行</a></div>
					<div id="scenicRankTable" class="mt10 page_module h_85 ofh">
					<table class="custom_table_new" cellspacing="0" cellpadding="0">
						<thead class="bk ch" >
							<tr>
								<th class="w_5"></th>
								<th class="w_40">景点名称</th>
								<th class="w_30"></th>
								<th class="w_25">消费特征指数</th>
							</tr>
						</thead>
						<tbody class="ch">
							<tr>
								<td class="w_5"><span class="br_12">1</span></td>
								<td class="w_40">果洛</td>
								<td class="w_30"><div name="star_1_4"></div></td>
								<td class="w_25">AAAA</td>
							</tr>
							<tr>
								<td class="w_5"><span class="br_12">2</span></td>
								<td class="w_40">青海湖</td>
								<td class="w_30"><div name="star_2_4.5"></div></td>
								<td class="w_25">AA</td>
							</tr>
						</tbody>
					</table>
				</div>
					</div>
				</div>
				<div id="class_appInfo" class="mt10 h_30 w_100"></div>
				
			</div>
			<div class="w_25 h_100 f_r">
				<div class="w_100 h_45 ys_wts_border"> 				
					<!-- <div class="head_title"> -->
					<!-- <div class="introduce">
						<ul tabs clearfix>
							<li class="checked">逗留一天top景区</li>
				          	<li>客流轨迹</li>
				          	<li>景区排名</li>
				        </ul>
				    </div> -->
			        <!-- </div> -->
		        	<!-- <div id="mutil_scenicInfo" class="w_100 h_80"></div>
					<div id="mutil_trailInfo" class="w_100 h_80" ></div>
					<div id="mutil_rankInfo" class="w_100 h_80" ></div> -->
					<div class="content" >
						<div class="con-title mt328 h_36">
				        	<a href="javascript:void(0);" name="mutil_scenic" id="mutil_scenic" class="t_select_03 t_selected_01">逗留一天top景区</a>
				        	<a href="javascript:void(0);" name="mutil_trail" id="mutil_trail" class="t_select_03">客流轨迹</a>
				        </div>
					        <div id="mutil_scenicInfo" class="mt10 page_module h_85"></div>
					         <div id="mutil_trailInfo1" class="mt10 page_module h_85 ">
					        	 <div id="mutil_trailInfo" class=" w_100 h_95 "></div>
					       	</div> 
					</div>
			 	</div> 
				<div class="w_100 h_50 mt16 ys_wts_border">
					<div class="head_title"><a href="javascript:void(0);">景区流量监控</a></div>
					<div id="scenicMapInfo" class="w_100 h_90"></div>
				</div>
			</div>
			
		</div>
		<script type="text/javascript" src="./system/page/module/travel/js/qhTravel.js"></script>
	</body>
</html>