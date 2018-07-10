<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>系统管理</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<jsp:include page="../../resource/jsp/header_easyui.jsp"/>
		<script type="text/javascript" src="./system/page/module/manage/js/manage.js"></script>
	</head>
	<body>
		<!-- 弹出信息 -->
		<div class="page_window">
			<div class="window_body h_50 w_50">
				<span class="fa fa-close window_close"></span>
				<div class="h_100 w_100">
					<iframe id='windowFrame' src="" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
				</div>
			</div>
		</div>
		<div class="sysClass">
			<ul class="code_tab clearfix">
				<li class="checked">用户管理</li>
				<li>角色管理</li>
			</ul>
	        <div class="code_con">
	            <div class="code_cons">
	            	<table class="w_100 h_20 pd16" cellspacing="0" cellpadding="0">
						<tr>
							<td>
								<input id="user_name" type="text" class="search_input" placeholder="请输入用户名称"/>
								<a href="javascript:void(0)" class="btn bk_query" onclick="reloadList('user');">
									<i class="fa fa-search"></i>查询
								</a>
								<a href="javascript:void(0)" class="btn bk_add" onclick="operate('user_add','','');">
									<i class="fa fa-pencil"></i>新增
								</a>
							</td>
						</tr> 
			        </table>
			        <table id="userList" class="w_100 h_80 sys_table" cellspacing="0" cellpadding="0">
			           <thead class="h_20 w_100">
							<tr>
								<th></th>
								<th>登录工号</th>
								<th>账户</th>
								<th>名称</th>
								<th>手机号</th>
								<th>角色</th>
								<th class="w_30">操作</th>
							</tr>
						</thead>
       					<tbody class="h_80 w_100 ofa">
       					</tbody>
			        </table>
				</div>
           		<div class="code_cons" style="display:none;">
           			<table class="w_100 h_20 pd16" cellspacing="0" cellpadding="0">
						<tr>
							<td>
								<input id="role_name" type="text" class="search_input" placeholder="请输入角色名称"/>
								<a href="javascript:void(0)" class="btn bk_query" onclick="reloadList('role');">
									<i class="fa fa-search"></i>查询
								</a>
								<a href="javascript:void(0)" class="btn bk_add" onclick="operate('role_add','','');">
									<i class="fa fa-pencil"></i>新增
								</a>
							</td>
						</tr> 
			        </table>
			        <table id="roleList" class="w_100 h_80 sys_table" cellspacing="0" cellpadding="0">
			           <thead class="h_20 w_100">
							<tr>
								<th></th>
								<th class="w_20">角色名称</th>
								<th class="w_50">菜单列表</th>
								<th class="w_30">操作</th>
							</tr>
						</thead>
       					<tbody class="h_80 w_100 ofa">
       					</tbody>
			        </table>
				</div>
		    </div>
		</div>
		<script type="text/javascript">
			$(".code_tab li").click(function(){
                var index_tab=$(this).index();
                $(this).siblings("li").removeClass("animated flipInY checked");
                $(this).addClass("animated flipInY checked");
                $(".code_con").children(".code_cons").removeClass("animated flipInX").hide();
                $(".code_con").children(".code_cons").eq(index_tab).show().addClass("animated flipInX");
            });
			$(".window_close").click(function(){closeWindow();});
			initPage();
		</script>
	</body>
</html>