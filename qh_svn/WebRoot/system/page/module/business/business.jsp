<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>翼商联盟</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<jsp:include page="../../resource/jsp/header_echarts3.jsp"/>
    	<link rel="stylesheet" href="${path}/system/page/module/business/css/business.css"/>
		<script type="text/javascript" src="${path}/js/animateBackground.js"></script>
	</head>
	<body>
		<div class="p_div">
			<div class="w_25 h_100 f_l of_h">
				<div class="w_100 h_20 ys_jy_border of_h">
					<div class="headTitle ml_16 ta_l"><a class="fz_16" href="javascript:void(0);">联通交易额</a></div>
					<div class="w_90 h_60 mt16 ml_32 d_t">
						<div class="w_100 h_100 d_tc" >
					        <div class="roll_num_64">
					          	<span class="num num_bg b1" id="roll_num_trade"></span>
					    	</div>
				    	</div>
			    	</div>
				</div>
				<div class="w_100 h_75 mt16 sys_h_border of_h">					
					<div class="head_title"><a href="javascript:void(0);">缴费易商铺</a></div>
					<div id="jfyInfo" class="w_100 h_90 mt16 of_a">
						<div class="w_95 h_48px ys_table_row ys_table_row_bk">
							<div class="d_tc w_15"><span class="sort_num h24 br4">1</span></div>
							<div class="d_tc w_85">
								<div class="w_90 h_24px ta_l shop_name">相古村翼商服务站</div>
								<div class="w_90 h_24px">
									<span class="f_l shop_val">交易笔数:</span>
									<span class="f_r shop_val">交易金额:</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="w_50 h_100 f_l of_h">
				<div class="w_95 h_95 m_16 d_t of_h">
					<div class="w_100 h_100 ys_dt_bg d_tc ta_c">
						<div id="mapInfo" class="w_100 h_65"></div>
						<div id="localMapInfo" class="w_100 h_65 hidden"></div>
						<div class="ys_details">
							<div class="title">
								<div class="title_name">总体详情</div>									
								<div class="title_text f_l">
									<span class="flag">●</span>
									<span class="text">
									累计交费易商户<span id="jfyCount" class="num">12</span>户,
									当日新增<span id="jfyDay" class="num">12</span>户,
									当月交易<span id="jfyTread" class="num">132213</span>
									</span>
								</div>									
								<div class="title_text f_r">
									<span class="flag">●</span>
									<span class="text">
									累计开通受理业务的商户<span id="busiCount" class="num">12</span>户,
									当日新增<span id="busiDay" class="num">12</span>户,
									当月交易<span id="busiTread" class="num">132213</span>
									</span>
								</div>
							</div>
							<div id="detailsInfo" class="w_100 h_60"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="w_25 h_100 f_r of_h">
				<div class="w_100 h_45 sys_z1_border of_h">
					<div class="head_title"><a href="javascript:void(0);">翼支付商铺</a></div>
					<div id="yzfInfo" class="w_100 h_90 mt16 of_a">
						<div class="w_95 h_64px ys_table_row ys_table_row_bk">
							<div class="d_tc w_15"><span class="sort_num h24 m_0a">1</span></div>
							<div class="d_tc w_85">
								<div class="w_90 h_24px ta_l shop_name">相古村翼商服务站</div>
								<div class="w_90 h_20px">
									<span class="f_l shop_val">交易笔数</span>
									<span class="f_r shop_val">交易金额</span>
								</div>
								<div class="w_90 h_20px">
									<span class="f_l shop_val fz_16 fw_b yellow">1313笔</span>
									<span class="f_r shop_val fz_16 fw_b yellow">213元</span>
								</div>
							</div>
						</div>
						<div class="w_95 h_48px ys_table_row ys_table_row_br">
							<div class="d_tc w_15"><span class="sort_num h24 m_0a">2</span></div>
							<div class="d_tc w_85">
								<div class="w_90 h_24px ta_l shop_name">相古村翼商服务站</div>
								<div class="w_90 h_24px">
									<span class="f_l shop_val">交易笔数:</span>
									<span class="f_r shop_val">交易金额:</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="w_100 h_50 mt16 sys_z1_border of_h">
					<div class="head_title"><a href="javascript:void(0);">发展量商铺</a></div>
					<div class="w_100 h_90 mt16">
						<div class="roll_num_bg">
							<div class="roll_name">总数</div>
							<div class="roll_num">
								<div class="roll_num_32">
					          		<span class="num num_bg b1" id="roll_num_fzl"></span>
					    		</div>
							</div>
						</div>
						<div id="fzlInfo" class="w_100 h_75 of_a">
							<div class="w_95 h_32px ys_table_row m_12">
								<div class="d_tc w_15"><span class="sort_num h24 br4 ys_other">1</span></div>
								<div class="d_tc w_85">
									<div class="w_90 h_16px ta_l">
										<span class="shop_val">夏琼北路合作营业厅(新)</span>
									</div>
									<div class="w_90 h_16px ta_l">
										<span class="shop_val">[移动:48户,宽带:23户]</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript" src="./system/page/module/business/js/business.js"></script>
	</body>
</html>