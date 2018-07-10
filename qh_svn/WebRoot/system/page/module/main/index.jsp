<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
  <head>
    <title>Large Screen System</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="Large Screen System">
	<link rel="stylesheet" type="text/css" href="${path}/css/common.css" />
	<link rel="stylesheet" type="text/css" href="${path}/css/main.css" />
	<link rel="stylesheet" type="text/css" href="${path}/css/font.min.css" />
	<link rel="stylesheet" type="text/css" href="${path}/css/animate.min.css" />
	<script type="text/javascript" src="${path}/easyui/jquery.min.js"></script>
  </head>
  <body>
  	<div class="bk">
		<div class="fixed_b bk_img"></div>
  	</div>
	<div class="top_menu">
		<div class="fixed_c">
	    	<div class="top_menu_body">
		    	<div class="top_menu_info">
		    		<ul class="top_menu_ul">
					</ul>
		    	</div>
		    	<div class="login_info">
		    		<div class="login_system_info">		    			
						<span class="info_label">
							<span>欢迎</span>
							<span class="staff_info">
								<i class="fa fa-user"></i>
								<span>super</span>
							</span>
							<span>登录本系统!</span>
						</span>
						<label class="colse_label">
							<i class="fa fa-power-off"></i>
							<span class="colse_span">退出</span>
						</label>
		    		</div>
		    	</div>
	    	</div>
			<div class="top_menu_tip"></div>
		</div>
	</div>
	<div class="page_top">
		<div class="fixed_c">			
			<div class="title">
				<div class="top animatedDelay longAnimated flip">
					<div class="br"><h1>首页</h1></div>
					<div class="bottom"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="body_frame">
		<div class="fixed_b">
			<div class="p_bg">
				<div class="p_br">
					<div class="p_cr">
			<iframe id='mainFrame' src="${path}/system/page/module/festival/festival.jsp" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="page_menu">
		<div class="fixed_c">
			<div class="div_table">
			    <div class="div_table_row">
			        <div class="div_table_td">
			        	<div class="menu_tool">
			        		<a href="javascript:void(0);">&gt;</a>
			        	</div>
			        </div>
			        <div class="div_table_td bd">
						<div class="menu_body">
							<ul class="menu_ul">
							</ul>
						</div>
			        </div>
			    </div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		var menuList={};
		var thisWidth=window.screen.width;
		var thisHeight=window.screen.height;
		if(thisWidth>1366&&thisHeight>768){
			$(".fixed_c").css("width",thisWidth+"px");
			$(".bk").css({"width":thisWidth+"px","height":thisHeight+"px"});
			$(".body_frame").css({"width":thisWidth+"px","height":thisHeight+"px"});
			$(".fixed_b").css({"width":thisWidth+"px","height":thisHeight+"px"});
		}
		//右侧菜单事件
		$(".menu_tool").click(function(){
			$(".div_table_td.bd").toggle();
			var str=$(".menu_tool a").text();
			if(str=='>'){
				$(".menu_tool a").html("&lt;");
				$(".menu_tool a").css("color","transparent");
			}else{
				$(".menu_tool a").html("&gt;");
				$(".menu_tool a").css("color","white");
			}
		});
		//顶部菜单事件
		$(".top_menu").hover(function(){
			if($('.top_menu_body').is(':hidden')){
				$(".top_menu_body").slideDown('fast');
			}
		},function(){
			if(!$('.top_menu_body').is(':hidden')){
				$(".top_menu_body").slideUp('fast');
			}
		});
		//退出按钮事件		
		$(".colse_label").click(function(){
			$.ajax({
				url : "${path}/login/exit.do",
				async:false,
		  		type: 'post',
		        dataType : "json"
			});
		    window.location.reload();
		});
		function clearPageTimer(){
			var fun=document.getElementById('mainFrame').contentWindow.clearTimer;
			if( typeof fun=='function'){
		  			//存在且是function
		  			fun();
			}
			document.getElementById('mainFrame').contentWindow.document.write('');
		}
		//组织菜单结构
		function makeMenuList(data,type){
			var menuStr=""
			if(data!=null&&data!=''&&data.length>0){
				for(var i in data){
					menuStr+='<li><a href="javascript:void(0)" id="'+data[i].menu_code+'" ';
					if(type=='root'){
		        		menuList[data[i].menu_code]=data[i].child_menu_list;
		        		menuStr+='name="'+data[i].target_url+'" onclick="selectMenu(this,\'root\')">';
					}else{
		        		menuStr+='name="'+data[i].target_url+'" onclick="selectMenu(this,\'sub\')">';
					}
		        	menuStr+=data[i].menu_name+'</a></li>';
				}
			}
			return menuStr;
		}
		//选择菜单
		var thisMenu="";
		function selectMenu(e,type){
			var eCode=$(e).attr("id");
			var eSrc=$(e).attr("name");
			if(thisMenu==eCode){
				return false;
			}else{
				thisMenu=eCode;
			}
			//顶部菜单点击，加载子菜单
			if(type=='root'){
				//改变顶部菜单背景
				$(".top_menu_ul li a").each(function(){
					$(this).css({"background":"transparent","font-weight":"normal"});
				});
				$(e).css({"background":"#f73f3f","font-weight":"500"});
				var childMenuData=menuList[eCode];
				var subMenuStr=makeMenuList(childMenuData,'sub');							
				$(".menu_tool a").html("&gt;");
				$(".menu_tool a").css("color","white");
				if(subMenuStr.length>0){
					$(".div_table_td.bd").show();
					$(".page_menu").show();
		        	$(".menu_ul").html(makeMenuList(childMenuData,'sub'));
				}else{
					$(".page_menu").hide();
				}
		        if(eSrc!=null&&eSrc!=''&&eSrc!='#'&&eSrc.length>0){
		        	clearPageTimer();
		        	$("#mainFrame").attr("src",'${path}'+eSrc+'?random='+Math.random());
		        	$(".title h1").html($(e).text());
		        }else{
		        	if(subMenuStr.length>0){
						$(".menu_ul li:first a").trigger('click');
					}
		        }
			}else{
				//改变子菜单背景
				$(".menu_ul li a").each(function(){
					$(this).css({"color":"#fcedd0","font-weight":"normal"});
				});
				$(e).css({"color":"#f73f3f","font-weight":"500"});
		        clearPageTimer();
				$("#mainFrame").attr("src",'${path}'+eSrc+'?random='+Math.random());
		        $(".title h1").html($(e).text());
			}
		}
		//顶部菜单加载
		function loadTopMenu(){
			$.ajax({
				url : "${path}/login/info.do",
		  		type: 'post',
		        dataType : "json",
		        success : function(result){
		        	if(result!=null){
						$(".staff_info span").html(result.loginCode);
		        		$(".top_menu_ul").html(makeMenuList(result.menuList,'root'));		        		
						$(".top_menu_ul li:first a").trigger('click');
						$(".top_menu_ul li:nth-child(1) a").trigger('click');
		        	}
		        }
			});
		}
		//loadTopMenu();
	</script>
  </body>
</html>
