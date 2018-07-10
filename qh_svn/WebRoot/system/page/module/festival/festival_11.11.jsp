<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>双十一专题</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<jsp:include page="../../resource/jsp/header_echarts.jsp"/>
	</head>
	<body>
		<!--APP应用top10-->
		<div class="box1">
		    <div class="content">
				<div class="con-title mt20">
					<i class="fa fa-th-large"></i>&nbsp;应用TOP10
		            <div class="fr r_menu">
		            	<a href="javascript:void(0)" id="app_user" class="active">用户</a>
		            	<a href="javascript:void(0)" id="app_flow">流量</a>
		            </div>
				</div>
		        <div id="appInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<!--地图信息-->
		<div class="box1">
		    <div class="content">
		        <div id="mapInfo" class="mp page_module ofh"></div>
		    </div>
		</div>
		<div class="box2">
		    <div class="content">
		        <div class="con-title mt20">
		        	<i class="fa fa-feed"></i>&nbsp;流量
				</div>
		        <div id="flowInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-user"></i>&nbsp;用户特征
		            <div class="fr r_menu">
		            	<a href="javascript:void(0)" id="user_sex" class="active">性别</a>
		            	<a href="javascript:void(0)" id="user_age">年龄</a>
		            </div>
		        </div>
	        	<div id="userInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box1">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-file-word-o"></i>&nbsp;热词
		            <div class="fr r_menu">
		            	<a href="javascript:void(0)" id="hotword_" class="active">全部</a>
		            	<a href="javascript:void(0)" id="hotword_jd">京东</a>
		            	<a href="javascript:void(0)" id="hotword_tb">淘宝</a>
		            	<a href="javascript:void(0)" id="hotword_sn">苏宁易购</a>
		            </div>
		        </div>
	        	<div class="mt32 page_module w_30 fl ofh">
	        		<ul>
						<li class="roll_li mt64">
							<i class="fa fa-coffee lg"></i>&nbsp;&nbsp;食品<br/>
							<div class="roll_div">
								<div id="rankSP" class="roll_font"></div>
							</div>
						</li>
						<li class="roll_li">
							<i class="fa fa-female lg"></i>&nbsp;&nbsp;服装<br/>
							<div class="roll_div">
								<div id="rankFS" class="roll_font"></div>
							</div>
						</li>
						<li class="roll_li">
							<i class="fa fa-fax lg"></i>&nbsp;&nbsp;家电<br/>
							<div class="roll_div">
								<div id="rankJD" class="roll_font"></div>
							</div>
						</li>
						<li class="roll_li">
							<i class="fa fa-commenting lg"></i>&nbsp;&nbsp;其他<br/>
							<div class="roll_div">
								<div id="rankQT" class="roll_font"></div>
							</div>
						</li>
					</ul>
	        	</div>
	        	<div id="hotWordInfo" class="mt20 page_module w_70 fr ofh"></div>
		    </div>
		</div>
		<div class="box2" style="width: 20%;">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-user-plus"></i>&nbsp;114访问人数
		        </div>
		        <div id="visit114Info" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<div class="box2" style="width: 20%;">
		    <div class="content">
		        <div class="con-title">
		        	<i class="fa fa-money"></i>&nbsp;翼支付交付质量
		        </div>
		        <div id="wingPayInfo" class="mt20 page_module ofh"></div>
		    </div>
		</div>
		<script type="text/javascript" src="./system/page/module/festival/js/festival_11.11.js"></script>
		<script type="text/javascript">
			$(".r_menu a").click(function(){
				var id=$(this).attr('id');
				var index=id.indexOf('_');
				var idPrefix=id.substring(0,index+1);
				var viewType=id.substring(index+1);
				$("a[id^='"+idPrefix+"']").each(function(){
					$(this).removeClass('active');
				});
				$(this).addClass('active');
				var pm=getMapParam(currentType,mapTarget);
				if(idPrefix=='app_'){
					appType=viewType;
					pm.queryType=appType;
					loadAppInfo(pm);
				}
				if(idPrefix=='user_'){
					userType=viewType;
					pm.queryType=userType;
					loadUserInfo(pm);
				}
				if(idPrefix=='hotword_'){
					if(viewType=='jd'){
						hotWordType='京东';
					}else if(viewType=='tb'){
						hotWordType='淘宝';
					}else if(viewType=='sn'){
						hotWordType='苏宁易购';
					}else{
						hotWordType='';
					}
					pm.queryType=hotWordType;
					loadHotWordInfo(pm);
				}
			});
			loadEcharts({
				components:['pie','bar','line','radar','map'],
				mapExtend:true,
				event:true,
				funcModule:function(){				
					loadAppInfo(null);
					loadMapInfo();
					loadFlowInfo(null);
					loadUserInfo(null);
					loadHotWordInfo(null);
					loadVisit114Info(null);
					loadWingPayInfo(null);					
					loadFlag=false;
				}
			});
   		</script>
	</body>
</html>