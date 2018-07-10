<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>圣诞节</title>
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
		<!-- 弹出信息 -->
		<div class="page_window">
			<div class="bubble_body">
				<div class="bubble_flag"></div>
				<span class="fa fa-close bubble_close"></span>
				<div class="bubble_context">
					<div id="bubble_title" class="t_title"></div>
					<div class="bubble_text">
						<table class="custom_table_s" cellspacing="0" cellpadding="0">
							<thead>
								<tr>
									<td class="w_15"></td>
									<td class="w_65"></td>
									<td class="w_20"></td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><span class="br_radius sbr_f">1</span></td>
									<td>万达广场</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="box1 h_100">
			<!--兴趣点-->
			<div class="box1 w_100">
			    <div class="content">
					<div class="con-title mt20">
						<i class="fa fa-search"></i>&nbsp;兴趣点搜索
					</div>
			        <div id="interestInfo" class="mt20 page_module ofh"></div>
			    </div>
			</div>
			<div class="box1 w_100">
			    <div class="content">
			        <div class="con-title">
			        	<i class="fa fa-money"></i>&nbsp;翼支付
			        </div>
		        	<div id="wingPayInfo" class="mt20 page_module ofh">
		        		<table class="custom_table_24" cellspacing="0" cellpadding="0">
							<thead class="ch s_table_font">
								<tr>
									<td class="w_15"></td>
									<td class="w_65"></td>
									<td class="w_20"></td>
								</tr>
							</thead>
							<tbody class="ch">
							</tbody>
						</table>
		        	</div>
			    </div>
			</div>
		</div>
		<div class="box2 h_100">
		    <div class="content">
		    	<div class="mp mt128 page_module ofh h_32 ac">
		    		<span style="color:#fff3cf;font-size:28px;">商业圈</span><span style="font-size:16px;margin-left:8px;">排行</span>
		    	</div>
		        <div class="mt10 page_module ofh h_70 bk_map">
		        	<!--
			        <ul class="sq_nav clearfix">
			            <li><a id="info_t_trade" href="javascript:void(0)"><img src="${path}/images/sq_ico1.png" alt=""/>购物</a></li>
			            <li><a id="info_t_flow" href="javascript:void(0)"><img src="${path}/images/sq_ico2.png" alt=""/>人流量</a></li>
			            <li><a id="info_t_eat" href="javascript:void(0)"><img src="${path}/images/sq_ico3.png" alt=""/>吃</a></li>
			            <li><a id="info_t_drink" href="javascript:void(0)"><img src="${path}/images/sq_ico4.png" alt=""/>喝</a></li>
			            <li><a id="info_t_play" href="javascript:void(0)"><img src="${path}/images/sq_ico5.png" alt=""/>玩</a></li>
			        </ul>
			        <div class="sq_box">
			            <img src="${path}/images/g_ico.png" id="image_t_trade" alt="" class="sq_ico1 longAnimated infinite mouseDown">
			            <img src="${path}/images/w_ico.png" id="image_t_play" alt="" class="sq_ico2 longAnimated infinite mouseDown">
			            <img src="${path}/images/c_ico.png" id="image_t_eat" alt="" class="sq_ico3 longAnimated infinite mouseDown">
			            <img src="${path}/images/r-ico.png" id="image_t_flow" alt="" class="sq_ico4 longAnimated infinite mouseDown">
			            <img src="${path}/images/h_ico.png" id="image_t_drink" alt="" class="sq_ico5 longAnimated infinite mouseDown">
			            <img src="${path}/images/sq_pic.png" alt="" class="sq_ico6 animated bounceInUp">
			        </div>-->
		        </div>
		    </div>
		</div>
		<div class="box1 fr h_100">
			<div class="box1 w_100">
			    <div class="content">
			        <div class="con-title mt20">
			        	<i class="fa fa-phone"></i>&nbsp;话务量
					</div>
			        <div class="mt10 page_module ofh">
			        	<div id="callBusiInfo" class="h_90 w_45 fl"></div>
			        	<div id="msgBusiInfo" class="h_90 w_45 fr"></div>
			        </div>
			    </div>
			</div>
			<div class="box1 w_100">
			    <div class="content">
			        <div class="con-title">
			        	<i class="fa fa-th-large"></i>&nbsp;app排行
			        </div>
			        <div id="appInfo" class="mt20 page_module ofh"></div>
			    </div>
			</div>
		</div>
		<script type="text/javascript" src="./system/page/module/festival/js/festivalChristmas.js"></script>
		<script type="text/javascript">
			//弹出窗关闭按钮			
			$(".bubble_close").click(function(){
				$(".custom_table_s tbody").html('<tr><td colspan="2" style="color:red;">无数据！</td></tr>');
				$(".bubble_body").removeClass("animated bounceIn");
				$(".page_window").hide();
			});/*
			$("a[id^='info_']").click(function(){
				var id=$(this).attr('id');
				var type=id.substring(5);
				$("#image_"+type).trigger('click');
			});*/
			$("img[id^='image_']").click(function(e){
				var part=$(this).offset();
				var id=$(this).attr('id');
				var type=id.substring(6);
				loadMultipleInfo(type,{px:(part.left+32)+"px",py:(part.top-120)+"px"});
			});
			loadEcharts({
				components:['pie','bar','wordCloud'],
				mapExtend:false,
				event:false,
				funcModule:function(){
					loadInterestInfo();
					loadCallBusiInfo();
					loadMsgBusiInfo();
					loadWingPayInfo();
					loadAppInfo();
					loadFlag=false;
				}
			});
   		</script>
	</body>
</html>