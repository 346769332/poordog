<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>收入信息</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<jsp:include page="../../resource/jsp/header_echarts3.jsp"/>
    	<link rel="stylesheet" href="${path}/system/page/module/operation/css/operation.css"/>
		<script type="text/javascript" src="${path}/js/animateBackground.js"></script>
	</head>
	<body>
		<div class="w_40 h_100 f_l of_h">
			<div class="m_c2 p_w_broder">
				<div id="mapInfo" class="w_100 h_70"></div>
				<div class="w_100 h_30">
					<div class="headTitle"><a href="javascript:void(0);">消费总额</a></div>
					<div class="w_100 h_60 mt8 d_t">
						<div class="w_100 h_100 d_tc" >
					        <div class="roll_num_32 info_num">
					          	<span class="num num_bg b1" id="roll_num_sale"></span>
					    	</div>
				    	</div>
			    	</div>
				</div>
			</div>
		</div>
		<div class="w_60 h_100 f_r of_h">
			<div class="m_c1 p_wt_broder">
				<div class="headTitle"><a id="title_iptv" href="javascript:void(0);">用户数</a></div>
				<div id="userInfo" class="w_100 h_90"></div>
			</div>
			<div class="m_c1 p_wt_broder">
				<div class="headTitle"><a id="title_iptv" href="javascript:void(0);">翼支付金额</a></div>
				<div id="wingpayInfo" class="w_100 h_90"></div>
			</div>
		</div>
		<script type="text/javascript" src="./system/page/module/operation/js/income.js"></script>
	</body>
</html>