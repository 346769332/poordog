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
		<jsp:include page="../../resource/jsp/header_echarts.jsp"/>
		<link rel="stylesheet" type="text/css" href="${path}/css/custom.table.css"/>
	</head>
	<body>
		<div class="page_details">
			<table class="custom_table" cellspacing="0" cellpadding="0">
				<thead><tr><th colspan="6">总体详情</th></tr></thead>
				<tbody>
					<tr id="total">
						<td colspan="6" class="ch">
							<span class="head pr_8">●</span>
							累计商户<span id="shopSum" class="first">200</span>户,
							当日新增商户<span id="addSum" class="first">200</span>户;<br/>
							其中【
							翼支付累计<span id="yzfSum" class="first">200</span>户,
							翼支付当日新增<span id="yzfAdd" class="first">200</span>户;						
							交费易累计<span id="jfySum" class="first">200</span>户,
							交费易当日新增<span id="jfyAdd" class="first">200</span>户;						
							开通受理业务累计<span id="ywSum" class="first">200</span>户,
							开通受理业务当日新增<span id="ywAdd" class="first">200</span>户;】
						</td>
					</tr>
					<tr id="shop1" style="display: none">
						<td class="w_13 pr_8 ch" align="right">门店名称:</td>
						<td class="w_20 cb" align="left" id="shopName">群科隆飞商贸</td>
						<td class="w_13 pr_8 ch" align="right">负责人:</td>
						<td class="w_19 cb" align="left" id="shopManager">待定</td>
						<td class="w_13 pr_8 ch" align="right">门店类型:</td>
						<td class="w_32b cb" align="left" id="shopType">农村样板饭店</td>
					</tr>
					<tr id="shop2" style="display: none">
						<td class="w_13 pr_8 ch" align="right">地址:</td>
						<td class="w_20 cb" align="left" id="shopAddress">化隆昂思多乡</td>
						<td class="w_13 pr_8 ch" align="right">渠道补贴信息:</td>
						<td class="w_19 cb" align="left" id="channelInfo">暂无</td>
						<td class="w_13 pr_8 ch" align="right">门店设备管理:</td>
						<td class="w_32b cb" align="left" id="shopDivece">暂无管理</td>
					</tr>
					<tr id="shop3" style="display: none">
						<td class="w_13 pr_8 ch" align="right">交费易交易:</td>
						<td class="w_20 cb" align="left"><span id="jfyCount" class="first">41</span>笔(<span id="jfyTotal" class="first">5000</span>元)</td>
						<td class="w_13 pr_8 ch" align="right">翼支付交易:</td>
						<td class="w_19 cb" align="left"><span id="yzfCount" class="first">30</span>笔(<span id="yzfTotal" class="first">2100</span>元)</td>
						<td class="w_13 pr_8 ch" align="right">业务发展量:</td>
						<td class="w_32b cb" align="left">移动(<span id="ydCount" class="first">5</span>)宽带(<span id="kdCount" class="first">1</span>)融合套餐(<span id="rhCount" class="first">0</span>)</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!--地图信息-->
		<div class="box2 w_60 h_100">
		    <div class="content">
		        <div id="mapInfo" class="user_title mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box1 w_40 h_36b">
		    <div class="content">
		        <div class="con-title mt20">
		        	<i class="fa fa-paypal"></i>&nbsp;交费易商铺TOP
				</div>
		        <div id="easyPayInfo" class="table_module">
		        	<table class="custom_table" cellspacing="0" cellpadding="0">
		        		<thead>
		        			<tr>
		        				<th class="w_15">排名</th>
		        				<th class="w_45">交易门店</th>
		        				<th class="w_20">交易笔数</th>
		        				<th class="w_20">交易金额</th>
		        			</tr>
		        		</thead>
		        		<tbody class="ac">
		        			<tr>
		        				<td class="first" align="center">1</td>
		        				<td align="center"><span class="block">受乐赵家寺综合商店受乐赵家寺综合商店受乐赵家寺综合商店</span></td>
		        				<td align="center">200</td>
		        				<td align="center">14000</td>
		        			</tr>
		        			<tr>
		        				<td class="second" align="center">2</td>
		        				<td align="center">受乐赵家寺综合商店</td>
		        				<td align="center">200</td>
		        				<td align="center">14000</td>
		        			</tr>
		        		</tbody>
		        	</table>
		        </div>
		    </div>
		</div>
		<div class="box1 w_40 h_32b">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-money"></i>&nbsp;翼支付商铺TOP
		        </div>
	        	<div id="wingPayInfo" class="table_module">
	        		<table class="custom_table" cellspacing="0" cellpadding="0">
	        			<thead style="display: none;">
		        			<tr>
		        				<th class="w_8 first">排行</th>
		        				<th>详情</th>
		        			</tr>
		        		</thead>
	        			<tbody>
		        			<tr>
		        				<td class="w_8 first">1、</td>
		        				<td>和盛园[交易笔数:13笔,交易总额:5200元]</td>
		        			</tr>
		        		</tbody>
		        	</table>
	        	</div>
		    </div>
		</div>
		<div class="box1 w_40 h_32b">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-group"></i>&nbsp;发展量商铺TOP
		        </div>
	        	<div id="developInfo" class="table_module">
	        		<table class="custom_table" cellspacing="0" cellpadding="0">
	        			<tbody>
		        			<tr>
		        				<td class="w_8 first">1、</td>
		        				<td>东农场三连翼商联综合服务站[移动:2户,宽带:2户,融合:1户]</td>
		        			</tr>
		        		</tbody>
		        	</table>
		        </div>
		    </div>
		</div>
		<script type="text/javascript" src="./system/page/module/business/js/business.js"></script>
		<script type="text/javascript">
			loadEcharts({
				components:['map'],
				mapExtend:true,
				event:true,
				funcModule:function(){
					//loadMapInfo();
					loadMapInfo({'target':'青海','title':false,'legend':false});
					loadDetailInfo(null);
					loadEasyPayInfo(null);
					loadWingPayInfo(null);
					loadDevelopInfo(null);
					loadFlag=false;
				}
			});
   		</script>
	</body>
</html>