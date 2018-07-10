<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>省内漫游</title>
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
		<!--地图信息-->
		<div class="box1 h_100 w_60">
		    <div class="content">
		        <div id="mapInfo" class="user_title mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box2 h_100 w_40">
		    <div class="content">
		        <div class="user_title mt64">
		        	<div class="select_head">
					    <div id="roam_enter"     class="select_title">漫入</div>
					    <div id="roam_leave"    class="select_title">漫出</div>
				    </div>
		        </div>
				<div id="enterOrLeaveInfo" class="page_module mt20">				    
					<table class="custom_table_new" cellspacing="0" cellpadding="0">
						<tbody class="ch">
							<tr>
								<td class="w_10"><span class="br_12">1</span></td>
								<td class="w_30">西宁市</td>
								<td class="w_20"><i class="arrow"></i></td>
								<td class="w_30">果洛蒙古族藏族自治州</td>
								<td class="w_10">4500</td>
							</tr>
						</tbody>
					</table>
				</div>
		    </div>
		</div>
		<script type="text/javascript" src="./system/page/module/roam/js/proviceRoam.js"></script>
		<script type="text/javascript">
			$("div[id^='roam_']").click(function(){
				$("div[id^='roam_']").each(function(){
					$(this).css("background","transparent");
				});
				$(this).css("background","#ffc600");
				var id=$(this).attr('id');
				var viewType=id.substring(5);
				//加载函数
				var pm=getMapParam(currentType,mapTarget);
				if(viewType=='enter')
				{	loadEnterInfo(pm);}
				if(viewType=='leave'){
					loadLeaveInfo(pm);}
			});
			loadEcharts({
			
				components:['map'],
				mapExtend:false,
				event:true,
				funcModule:function(){
					var pm=getMapParam(currentType,mapTarget);
					loadMapInfo(pm);
					loadEnterInfo(pm);					
					loadFlag=false;
				}
			});
   		</script>
	</body>
</html>