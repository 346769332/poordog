<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>用户管理</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<jsp:include page="../../resource/jsp/header_easyui.jsp"/>
	</head>
	<body>
		<div id="userInfo" class="w_100 h_100">
			<input type="hidden" id="fm_user_id" name="user_id">
			<table class="sp_table" cellspacing="0" cellpadding="0">
				<tr>
					<th>登录工号：</th>
					<td>
         				<input id="fm_login_code" name="login_code" type="text" data-options="required:true,validType:'length[2,10]'" class="easyui-validatebox" />
					</td>
					<th>登录密码：</th>
					<td>
         				<input id="fm_login_pd" name="login_pd" type="text" data-options="required:true,validType:'pwd'" class="easyui-validatebox" />
					</td>
				</tr>
				<tr>
					<th>系统账号：</th>
					<td>
         				<input id="fm_user_acct" name="user_acct" type="text" data-options="required:true,validType:'length[2,10]'" class="easyui-validatebox" />
					</td>
					<th>系统名称：</th>
					<td>
         				<input id="fm_user_name" name="user_name" type="text" data-options="required:true,validType:'length[2,10]'" class="easyui-validatebox" />
					</td>
				</tr>
				<tr>
					<th>归属地：</th>
					<td>
         				<input id="fm_region_ids" name="region_ids" class="easyui-combotree" />
					</td>
					<th>角色：</th>
					<td>
						<input id="fm_role_id" name="role_id" data-options="required:true,url:'common/role.do',valueField:'role_id',textField:'role_name'" class="easyui-combobox" />
					</td>
				</tr>
				<tr>
					<th>手机号码：</th>
					<td>
         				<input id="fm_user_phone" name="user_phone" type="text" data-options="required:true,validType:'mobile'" class="easyui-validatebox" />
					</td>
					<th></th>
					<td></td>						
				</tr>
				<tr>
					<td colspan="2" height="20%" align="center">
						<button id="save" type="button" class="easyui-linkbutton btn_w">保&nbsp;&nbsp;存</button>
					</td>
					<td colspan="2" align="center">
						<button id="cancel" type="button" class="easyui-linkbutton btn_w">取&nbsp;&nbsp;消</button>
					</td>					
				</tr>
			</table>
		</div>
		<script type="text/javascript" src="./system/page/module/manage/js/user.js"></script>
	</body>
</html>