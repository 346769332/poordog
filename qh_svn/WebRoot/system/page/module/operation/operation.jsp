<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>市场运营监控</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<jsp:include page="../../resource/jsp/header_echarts3.jsp"/>
    	<link rel="stylesheet" href="${path}/system/page/module/operation/css/operation.css"/>
		<script type="text/javascript" src="${path}/js/animateBackground.js"></script>
		<script type="text/javascript" src="${path}/js/jquery.animateNumber.min.js"></script>
	</head>
	<body>
		<!-- 弹出信息 -->
		<div class="page_window">
			<div class="body">
				<span class="fa fa-close close"></span>
				<div class="context">
					<iframe id='windowFrame' src="" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
				</div>
			</div>
		</div>
		<div class="p_div">
			<div class="w_100 h_48">
				<div class="w_25 h_100 f_l of_h sys_z1_border">
					<div class="head_title"><a id="title_wingpay" href="javascript:void(0);">翼支付</a></div>
					<div id="wingpayInfo" class="w_100 h_90"></div>
				</div>
				<div class="w_50 h_100 f_l of_h d_t">
					<div class="w_100 h_100 d_tc">
						<div class="center">
							<div class="roll_num_128 br_4g">
								<div class="w_100 h_32px fw_b fz_16 ta_c">4G套餐用户累计到达</div>
					        	<span class="num num_bg b1" id="roll_num_4g"></span>
							</div>
							<div class="w_90 ta_c mt32">统计口径：4G主套餐+4G流量升级包+4G畅聊流量包+开通LTE上网功能的非拆机用户</div>
						</div>
					</div>
				</div>
				<div class="w_25 h_100 f_r of_h sys_z1_border">
					<div class="head_title"><a id="title_income" href="javascript:void(0);">收入情况</a></div>
					<div id="incomeInfo" class="w_100 h_90"></div>
				</div>
			</div>
			
			<div class="w_100 h_48 mt16">
				<div class="w_25 h_100 f_l of_h sys_z1_border">
					<div class="head_title"><a id="title_itv" href="javascript:void(0);">ITV</a></div>
					<div id="itvInfo" class="w_100 h_90"></div>
				</div>
				<div class="w_50 h_100 f_l of_h">
					<div class="center h_100">
						<div class="w_100 h_100 p_broder_dt d_t">
							<div id="mapInfo" class="w_80 h_100 d_tc"></div>
							<div class="w_20 h_100 d_tc">
								<div id="m1" class="w_100 h_30"></div>
								<div id="m2" class="w_100 h_30"></div>
								<div id="m3" class="w_100 h_30"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="w_25 h_100 f_r of_h sys_z1_border">
					<div class="head_title"><a id="title_sale" href="javascript:void(0);">销量</a></div>
					<div class="w_100 h_15 mt16 of_h selecter">
			            <div class="w_100 h_100 d_tc">
			            	<div class="content">
				            	<a href="javascript:void(0)" id="saleUser" class="active">用户</a>
				            	<a href="javascript:void(0)" id="saleDinner">套餐</a>
			            	</div>
			            </div>
					</div>
					<div class="w_100 h_25 of_h">
						<div class="w_80 h_100 m_0a">
							<div class="w_20 h_100 f_l of_h d_t">
								<div class="d_tc fz_32 fw_b ta_c c_t">日</div>
							</div>
							<div class="w_40 h_100 f_l of_h d_t">
								<div class="w_100 h_100 d_tc ta_c">
									<div id="dayCJ" class="fz_18">1234243</div>
									<div class="c_y">拆机用户数</div>
								</div>						
							</div>
							<div class="w_40 h_100 f_r of_h d_t">
								<div class="w_100 h_100 d_tc ta_c">
									<div id="dayFZ" class="fz_18">1234243</div>
									<div class="c_y">发展用户数</div>
								</div>
							</div>
						</div>
					</div>
					<div class="w_100 h_45 of_h">
			        	<div id="yearSaleInfo" class="w_50 h_100 f_l"></div>
			        	<div id="monthSaleInfo" class="w_50 h_100 f_r"></div>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript" src="./system/page/module/operation/js/operation.js"></script>
	</body>
</html>