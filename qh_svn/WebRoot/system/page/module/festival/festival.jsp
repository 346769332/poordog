<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>节日专题</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<jsp:include page="../../resource/jsp/header_echarts3.jsp"/>
		<script type="text/javascript" src="${path}/js/animateBackground.js"></script>
		<script type="text/javascript" src="${path}/echarts3/echarts-wordcloud.min.js"></script>
	</head>
	<body>
		<div class="p_div">
			<div class="w_25 h_100 f_l sys_h1_border">
				<div class="w_100 h_10 of_h">
					<div class="fs_select_title">
						<a id="title_wy" class="checked" href="javascript:void(0);">五一</a>
						<a id="title_gq" href="javascript:void(0);">国庆</a>
						<a id="title_cj" href="javascript:void(0);">春节</a>
					</div>
				</div>
				<div id="mapInfo" class="w_100 h_40"></div>
				<div class="w_100 h_50">
					<div class="w_100 h_40 of_h">
						<div class="sys_title_bg_line mt8">关键词</div>
						<div id="keywordsInfo" class="w_95 h_65 m_0_a"></div>
					</div>
					<div class="w_100 h_60 of_h">
						<div class="sys_title_bg_line mt8">性别年龄</div>
						<div class="w_100 h_80">
							<div id="ageInfo" class="w_50 h_100 f_l"></div>
							<div id="sexInfo" class="w_50 h_100 f_r"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="w_50 h_100 f_l">
				<div class="w_95 h_100 m_0_a">
					<div class="w_100 h_40 sys_ww_border">
						<div id="chinaMapInfo" class="w_70 h_100 f_l"></div>
						<div class="w_30 h_100 f_r">
							<div class="w_100 h_10 ta_c">
								<div class="mt8 h_24px other_title fz_18 fw_b">漫入用户数</div>
							</div>
							<div class="w_100 h_20">
								<div class="roll_num_32">
					          		<span class="num b0" id="roll_num_roamuser"></span>
					    		</div>
							</div>
							<div id="containsInfo" class="w_100 h_65"></div>
						</div>
					</div>
					<div class="w_100 h_20 d_t">
						<div class="w_50 h_100 d_tc of_h">						
							<div class="roll_num_bg">
								<div class="roll_name">上网总用户</div>
								<div class="roll_num">
									<div class="roll_num_32">
						          		<span class="num num_bg b1" id="roll_num_user"></span>
						    		</div>
								</div>
							</div>
						</div>					
						<div class="w_50 h_100 d_tc of_h ta_r">						
							<div class="roll_num_bg">
								<div class="roll_name">总流量</div>
								<div class="roll_num">
									<div class="roll_num_32">
						          		<span class="num num_bg b1" id="roll_num_flow"></span>
						    		</div>
								</div>
							</div>
						</div>
					</div>
					<div class="w_100 h_40">
						<div class="w_48 h_100 f_l sys_z1_border">
							<div class="head_title"><a href="javascript:void(0);">APP分类</a></div>
							<div id="appInfo" class="w_100 h_85"></div>
						</div>
						<div class="w_48 h_100 f_r sys_z1_border">
							<div class="head_title"><a href="javascript:void(0);">出行方式</a></div>
							<div id="travelWayInfo" class="w_100 h_85"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="w_25 h_100 f_r sys_h1_border">
				<div class="w_100 h_60">
					<div class="sys_title_bg_line mt8">省内景点排行</div>
					<div id="scenicRank" class="w_100 h_80 of_a"></div>
				</div>
				<div class="w_100 h_40">
					<div id="inRankInfo" class="w_48 h_100 f_l"></div>
					<div id="outRankInfo" class="w_48 h_100 f_r"></div>						
				</div>
			</div>
		</div>
		<script type="text/javascript" src="./system/page/module/festival/js/festival.js"></script>
	</body>
</html>