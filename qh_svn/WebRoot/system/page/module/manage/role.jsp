<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>角色管理</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<jsp:include page="../../resource/jsp/header_easyui.jsp"/>
	</head>
	<body>
		<div id="roleInfo" class="w_100 h_100">
			<table class="sp_table menu_tree" cellspacing="0" cellpadding="0">
				<tr>
					<th height="15%" width="30%">角色名称：</th>
					<td>
         				<input id="fm_role_name" name="role_name" type="text" data-options="required:true,validType:'length[2,18]'" class="easyui-validatebox" />
					</td>
				</tr>
				<tr>
					<th>菜单权限：</th>
					<td>
						<div class="w_100 h_100 v_pc">
         					<ul id="menu_tree" name="menu_tree" class="easyui-tree w_192 h_360 ofa" checkbox="true"></ul>
         				</div>
					</td>
				</tr>
				<tr>
					<td height="10%" align="center" colspan="2">
						<button id="save" type="button" class="easyui-linkbutton btn_w">保&nbsp;&nbsp;存</button>
						<button id="cancel" type="button" class="easyui-linkbutton btn_w">取&nbsp;&nbsp;消</button>
					</td>					
				</tr>
			</table>
		</div>
		<script type="text/javascript" src="./system/page/module/manage/js/role.js"></script>
	</body>
</html>