<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>首页</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Home">
		<jsp:include page="../../resource/jsp/header_echarts3.jsp"/>
    	<link rel="stylesheet" href="${path}/system/page/module/home/css/home.css"/>
		<script type="text/javascript" src="${path}/js/animateBackground.js"></script>
	</head>
	<body>
		<div class="p_div">
			<div class="w_25 h_100 f_l">
				<div class="h_50 ys_dt_border">
                     <div class="zhibiao pb_2_4 ">
						 <h2 >十二五期间青海公司主要发展指标</h2>
						 <div id="zhibiao" class="mt8">
						 </div>
					 </div>
					 <div id="twellthFiveYearPlanInfo" class="w_90 h_90"></div> 
				</div>
				<div class="h_46 mt8 ys_dt_border">
					<div class="headTitle1"><a href="javascript:void(0);">电信理念</a></div>
					<div class="w_95 h_90 pb_2_4">
						<div class="in_con" style="height: 90%">
							<p>企业发展：多年来，在集团公司的正确领导下，青海公司从自身实际出发，坚持 <span>“不自满、不懈怠、不折腾、不添乱”</span>的务实进取理念，保持了平稳健康的发展
							</p>
							<p>特殊的省情，凝炼出青海公司以 <span>“苦熬不如苦干”</span>为内涵的“三苦精神” (苦学、苦干、苦乐)</p>
							<p>	青海市场容量小，增量空间有限，行业竞争激烈，但也催生出 <span>“不唯预算唯市场”</span>的发展理念</p>
							<p>青海环境艰苦，但员工乐观向上，具有 <span>“五特别的青藏高原精神”和“大爱同心、挑战极限、坚韧不拔、感恩奋进”</span>的玉树抗震救灾精神
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="w_50 h_100 f_l ">
				<div class="w_95 h_70 m_16 d_t ys_dt_bg ">
					<div class="headTitle1" style="width: 30%; margin-top: -20px;"><a href="javascript:void(0);">组织架构</a>
					</div>
					<div class="w_95 h_90 m_16 clearfix  jgt-box animated bounceIn"></div>
				</div>
				<div class="w_95 h_23 m_16 d_t sys_z_border ">
					<div class="headTitle1" style="width: 30%;"><a href="javascript:void(0);">宽带降费提速</a>
					</div>
					<div class="w_95 h_100 m_16 clearfix">
						<div class="gk-tj"></div>
						<div id="broadbandSpeedInfo" class="w_100 h_60"></div>
					</div>
				</div>
			</div>
			<div class="w_25 h_100 f_r">
				<div class="w_100 h_20 gk_r_border">
					<div class="ml_16 ta_r" style="background: none; margin-right: 9%; "><a class="fz_16" style="color: #fff;
    line-height: 35px;"  href="javascript:void(0);">未实名拆机</a></div>
					<div class="w_90 h_60 mt16 ml_32 d_t">
						<div class="w_100 h_100 d_tc">
							<div class="roll_num_32 info_num ys_table_row_bk " style="width: 80%;">
								<span class="num num_bg b1" id="noRelaNameUser"></span>
							</div>
						</div>
						
					</div>
				</div>
				<div class="w_100 h_75 mt16 ys_dt_border">
					<div class="headTitle1"><a href="javascript:void(0);">行业特点</a></div>
					<div class="w_95 h_90 pb_2_4">
						<div class="in_con" style="height: 90%">
							<h3>青海毗邻 <span>新疆、西藏</span>地处维稳战线最前沿	</h3>
							<p>— 青海东部的西宁和海东占全省不到 <span>3%</span> 的土地，承载着全省近 <span>三分之二</span>的人口，其余地方人口稀少</p>
							<h3>用户规模小与运营成本高并存</h3>
						<p>— 青海地广人稀，建设运营成本高、投入产出效益低，服务密度（人口数/面积）小</p>
						<h3>维稳硬道理与发展硬任务并存</h3>
						<p>— 地处维稳战线最前沿，维稳是硬任务,发展也是硬道理；发展是政绩，稳定也是政绩</p>
						<h3>低价值市场与有效益发展并存</h3>
						<p>— 市场发育程度低，规模以上企业少，高端客户以政府部门为主，依赖政府投入、市场空间小、竞争激烈</p>

							</div>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript" src="./system/page/module/home/js/introduce.js"></script>
	</body>
</html>