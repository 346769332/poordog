<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>全国漫游</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<jsp:include page="../../resource/jsp/header_echarts.jsp"/>
	</head>
	<body>
		<div class="page_select">
			<ul>
				<li><a href="javascript:void(0)" id="select_day">日漫入漫出</a></li>
				<li><a href="javascript:void(0)" id="select_week">周漫入漫出</a></li>
				<li><a href="javascript:void(0)" id="select_month">月漫入漫出</a></li>
			</ul>
		</div>
		<!--地图信息-->
		<div class="box1 h_100 w_70">
		    <div class="content">
		        <div id="nationalMapInfo" class="user_title mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div id="localMapInfo" class="user_title mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-envelope-o"></i>&nbsp;漫入漫出
		            <div class="fr r_menu">
		            	<a href="javascript:void(0)" id="roam_in" class="active">漫入</a>
		            	<a href="javascript:void(0)" id="roam_out">漫出</a>
		            </div>
		        </div>
	        	<div id="roamInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<script type="text/javascript" src="./system/page/module/roam/js/nationalRoam.js"></script>
		<script type="text/javascript">				
		$(function(){
			$("a[id^='roam_']").click(function(){
				$("a[id^='roam_']").each(function(){
					$(this).removeClass('active');
				});
				$(this).addClass('active');
				var id=$(this).attr('id');
				roamType=id.substring(5);
				loadRoamInfo();
			});
			$("a[id^='select_']").click(function(){
				$("a[id^='select_']").each(function(){
					$(this).css({"background":"transparent","color":"white","font-weight":"normal"});
				});
				$(this).css({"background":"white","color":"black","font-weight":"500"});
				var id=$(this).attr('id');
				selectType=id.substring(7);
				loadLocalMapInfo();
				loadNationalMapInfo({'target':'青海','queryType':selectType});
			});
			loadEcharts({
				components:['bar','map'],
				mapExtend:false,
				event:true,
				funcModule:function(){
					loadLocalMapInfo();
					loadNationalMapInfo({'target':'青海'});					
					loadFlag=false;
				}
			});
		});
   		</script>
	</body>
</html>